import Image from "next/image";

import icon1 from "@/assets/icon1.png";
import icon2 from "@/assets/icon2.png";
import icon3 from "@/assets/icon3.png";

export default function Features() {
  return (
    <section className="w-full bg-white py-10 sm:py-12">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 xl:px-0
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          divide-y sm:divide-y-0 md:divide-x
          divide-gray-200
        "
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4">
          <Image
            src={icon1}
            alt="Genuine Parts"
            width={50}
            height={50}
            className="w-10 h-10 md:w-11 md:h-11 xl:w-[50px] xl:h-[50px]"
            priority
          />
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-base md:text-base xl:text-lg">
              Genuine Japanese Parts
            </h3>
            <p className="mt-1 text-sm md:text-sm xl:text-base text-gray-600">
              Directly sourced from Japan&apos;s auctions, suppliers, and dealers.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4">
          <Image
            src={icon2}
            alt="Fast Shipping"
            width={50}
            height={50}
            className="w-10 h-10 md:w-11 md:h-11 xl:w-[50px] xl:h-[50px]"
          />
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-base md:text-base xl:text-lg">
              Fast Shipping
            </h3>
            <p className="mt-1 text-sm md:text-sm xl:text-base text-gray-600">
              From Japan to Sri Lanka in as little as 10–14 days.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4">
          <Image
            src={icon3}
            alt="Affordable Pricing"
            width={50}
            height={50}
            className="w-10 h-10 md:w-11 md:h-11 xl:w-[50px] xl:h-[50px]"
          />
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-base md:text-base xl:text-lg">
              Affordable Pricing
            </h3>
            <p className="mt-1 text-sm md:text-sm xl:text-base text-gray-600">
              No middlemen. Pay only for what you order.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
