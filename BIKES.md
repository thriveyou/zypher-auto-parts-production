# Editing Zypher Bikes

The homepage section is `/#zypher-bikes`, between the parts showcase and final parts-platform CTA. It uses the existing Japan WhatsApp contact in `src/lib/seo.ts`.

## One bike list

Edit **`src/data/bikes.ts`**, in the **`bikes` array**:

- Name: change `make` and `model`. Keep `make: ""` when not supplied.
- Year: change `year`, or use `null` to hide it.
- Engine capacity: edit `engineCapacity` only when supplied. The name, year and capacity share one heading line.
- Optional text: edit `description` and `status`, or leave them empty.
- Replace a photo: put its file in **`src/assets/bikes/`**, update the import at the top of the data file, and update the corresponding `photos` entry and its `alt` description.
- Add a bike: import its photo, duplicate an object in `bikes`, and give it a unique `id`. Enter only verified details.
- Add multiple photos: import each file and add `{ image: importedPhoto, alt: "Accurate photo description" }` entries to that bike's `photos` array. The first photo is the cover. Each bike needs at least one photo. Thumbnail buttons appear automatically.
- Remove a bike: remove its object from `bikes`.

Example (replace the placeholders with real information before publishing):

```ts
import newBikePhoto from "@/assets/bikes/your-photo.webp";

// Add inside the bikes array:
{
  id: "unique-bike-id",
  make: "", // Supplied make only
  model: "Supplied model",
  year: null,
  description: "",
  status: "Imported from Japan",
  photos: [
    { image: newBikePhoto, alt: "Describe this motorcycle and its view" },
  ],
},
```

## Photos

Click a main bike photo to open its larger view. Use Previous/Next or the arrow keys to view that bike's photos. Close with the close button, Escape, or the backdrop. Keyboard focus returns to the clicked image.

The four provided originals are copied unchanged into `src/assets/bikes/`. PCX has the front and rear photographs; Honda CRF250L has the uncovered and covered photographs. No additional model details were inferred.

Prefer **1200 × 1600 px (3:4 portrait)** for new photographs when available. The supplied 960 × 1280 photos are sufficient; do not upscale smaller originals. Other aspect ratios work: the gallery contains the entire photo without cutting off bike features.

For future photo exports, **WebP** is a practical default. AVIF is optional when a carefully checked export gives a useful size reduction. Keep original files separately. The current original PNG/JPEG assets are imported through Next.js Image, which generates responsive optimized versions (WebP with the current default configuration), uses intrinsic dimensions and blur placeholders, and lazy-loads below-fold images. No manual conversion is needed for the supplied files.

The gallery scrolls horizontally on small phones, with snap points, a swipe hint and keyboard focus. Tablet shows two bike columns; desktop places the enquiry panel beside the two-column gallery. Photos are displayed in compact 256–288px-high frames without cropping. The Honda CRF250L appears first, with its covered photo as the cover. Adding bikes automatically expands the gallery. Photo selectors are keyboard-operable buttons; no autoplay or carousel dependency is used. The existing global reduced-motion styles also apply to this section.
