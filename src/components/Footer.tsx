import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import logo from "@/assets/Zypher.png";

export default function Footer() {
  return (
    <footer className="bg-[#4B0008] text-white py-8 md:py-10">
      <div
        className="
          mx-4 md:mx-8 xl:mx-auto
          px-4 md:px-8 xl:px-24
          max-w-8xl 
        "
      >
        <div
          className="
            flex flex-col md:flex-row items-center md:items-center justify-between
            gap-4 md:gap-6
          "
        >
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={logo}
              alt="Zypher Logo"
              width={120}
              height={40}
              className="h-auto w-[100px] md:w-[120px]"
              priority
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-xs md:text-sm opacity-90 hidden sm:inline">
              Follow Us:
            </span>
            <div className="flex gap-2.5 md:gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-[#551e23] p-2 md:p-2.5 hover:bg-[#6b2329] transition"
              >
                <FaFacebookF className="h-4 w-4 md:h-4 md:w-4" />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="rounded-full bg-[#551e23] p-2 md:p-2.5 hover:bg-[#6b2329] transition"
              >
                <FaXTwitter className="h-4 w-4 md:h-4 md:w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-[#551e23] p-2 md:p-2.5 hover:bg-[#6b2329] transition"
              >
                <FaInstagram className="h-4 w-4 md:h-4 md:w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="rounded-full bg-[#551e23] p-2 md:p-2.5 hover:bg-[#6b2329] transition"
              >
                <FaYoutube className="h-4 w-4 md:h-4 md:w-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
