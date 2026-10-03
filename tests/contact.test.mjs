import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(file, overrides, globals = {}) {
  const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, require: (name) => overrides[name] ?? require(name),
    Request, Response, FormData, File, Buffer,
    console: { error() {} }, ...globals,
  }, { filename: file });
  return exports;
}

function request(values = {}) {
  const body = new FormData();
  for (const [key, value] of Object.entries({ name: "Test Customer", phone: "+94728000516", message: "<part> & details", ...values })) body.set(key, value);
  return new Request("http://localhost/api/contact", { method: "POST", body });
}

function route(send) {
  return load("src/app/api/contact/route.ts", {
    "next/server": { NextResponse: { json: Response.json } },
    resend: { Resend: class { emails = { send }; } },
  }, { process: { env: { RESEND_API_KEY: "test-only", FROM_EMAIL: "test@example.invalid", TO_EMAIL: "test@example.invalid" } } }).POST;
}

test("provider acceptance is the only successful result; message HTML is escaped", async () => {
  let sent;
  const response = await route(async (message) => { sent = message; return { data: { id: "mock-id" }, error: null }; })(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.match(sent.html, /&lt;part&gt; &amp; details/);
});

for (const [label, send, status] of [
  ["provider rejection", async () => ({ data: null, error: { message: "private provider diagnostic" } }), 502],
  ["missing acceptance id", async () => ({ data: {}, error: null }), 502],
  ["thrown network error", async () => { throw new Error("private API secret"); }, 500],
]) test(label, async () => {
  const response = await route(send)(request());
  const body = await response.json();
  assert.equal(response.status, status);
  assert.equal(body.ok, false);
  assert.match(body.error, /WhatsApp/);
  assert.doesNotMatch(JSON.stringify(body), /private|secret|diagnostic/);
});

test("invalid fields and unsupported attachment never reach the provider", async () => {
  let calls = 0;
  const response = await route(async () => { calls++; })(request({ name: "", phone: "bad", attachment: new File(["data"], "data.txt", { type: "text/plain" }) }));
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.errors.name && body.errors.phone && body.errors.attachment);
  assert.equal(calls, 0);
});

// Exercise the actual component handlers with deterministic hooks and form/fetch
// adapters. Browser tests separately cover DOM focus, keyboard and layout behavior.
function client(fetchResult, values = { name: "Test Customer", phone: "+94728000516", message: "Part details" }) {
  const state = [];
  let cursor = 0;
  const form = {
    values: { ...values }, resets: 0, focused: "",
    reset() { this.resets++; this.values = {}; },
    querySelector(selector) { return { focus: () => { this.focused = selector; } }; },
  };
  const hooks = {
    useState(initial) { const i = cursor++; if (!(i in state)) state[i] = initial; return [state[i], (next) => { state[i] = next; }]; },
    useRef() { return { current: form }; },
  };
  const Component = load("src/app/Contact-Us/ui/Contact-form.tsx", { react: hooks }, {
    fetch: fetchResult,
    FormData: class extends FormData { constructor(element) { super(); for (const [key, value] of Object.entries(element.values)) this.set(key, value); } },
  }).default;
  const render = () => { cursor = 0; return Component(); };
  return { form, render, submit: () => render().props.onSubmit({ preventDefault() {}, currentTarget: form }) };
}

function text(element) {
  if (Array.isArray(element)) return element.map(text).join(" ");
  if (element && typeof element === "object") return text(element.props?.children);
  return typeof element === "string" ? element : "";
}

test("client success resets only after explicit provider acceptance", async () => {
  const c = client(async () => Response.json({ ok: true }));
  await c.submit();
  assert.equal(c.form.resets, 1);
  assert.match(text(c.render()), /accepted for sending/);
  assert.doesNotMatch(text(c.render()), /delivered to your inbox/);
});

for (const [label, fetchResult] of [
  ["provider rejection", async () => Response.json({ ok: false }, { status: 502 })],
  ["network exception", async () => { throw new Error("offline"); }],
  ["false success response", async () => Response.json({ ok: false })],
]) test(`client retains values and exposes fallback on ${label}`, async () => {
  const c = client(fetchResult);
  await c.submit();
  assert.equal(c.form.resets, 0);
  assert.equal(c.form.values.message, "Part details");
  assert.match(text(c.render()), /Contact us on WhatsApp/);
  assert.doesNotMatch(text(c.render()), /accepted for sending/);
  assert.equal(c.render().props["aria-busy"], false);
});

test("client focuses the first invalid field without attempting a send", async () => {
  let calls = 0;
  const c = client(async () => { calls++; }, { name: "", phone: "", message: "" });
  await c.submit();
  assert.equal(calls, 0);
  assert.equal(c.form.focused, '[name="name"]');
  assert.match(text(c.render()), /Name is required/);
});

test("pending client submission blocks duplicate sends", async () => {
  let calls = 0;
  let finish;
  const c = client(() => { calls++; return new Promise((resolve) => { finish = resolve; }); });
  const pending = c.submit();
  assert.equal(c.render().props["aria-busy"], true);
  await c.submit();
  assert.equal(calls, 1);
  finish(Response.json({ ok: true }));
  await pending;
  assert.equal(c.form.resets, 1);
});
