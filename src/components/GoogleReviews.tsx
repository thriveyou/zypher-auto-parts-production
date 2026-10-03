import { FaRegStar, FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { allReviewsUrl, reviews } from "@/data/reviews";

export default function GoogleReviews() {
  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-8 bg-white py-14 md:py-20"
    >
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] text-zypher-red">
            WHAT OUR CUSTOMERS SAY
          </p>
          <h2
            id="reviews-heading"
            className="mt-3 text-3xl font-bold leading-tight text-slate-950 md:text-5xl"
          >
            Customer <span className="text-zypher-red">Reviews</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
            See what our customers say about Zypher Imports on Google.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.url}
              className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-shadow hover:shadow-md md:p-6"
            >
              <p className="text-xs font-semibold text-slate-600">Google Review</p>
              <h3 className="mt-3 text-lg font-bold text-slate-950 [overflow-wrap:anywhere]">
                {review.name}
              </h3>
              <span
                role="img"
                aria-label={`${review.rating} out of 5 stars`}
                className="mt-3 flex w-fit gap-1 text-amber-700"
              >
                {Array.from({ length: 5 }, (_, index) => {
                  const Star = index < review.rating ? FaStar : FaRegStar;
                  return <Star key={index} aria-hidden="true" className="h-4 w-4" />;
                })}
              </span>
              <blockquote
                className={`mb-6 mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700 [overflow-wrap:anywhere] ${review.text.length > 500 ? "line-clamp-8" : ""}`}
              >
                {review.text}
              </blockquote>
              {review.text.length > 500 && (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm font-semibold text-zypher-red underline underline-offset-4 hover:text-[#7E010E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red"
                >
                  Read full review on Google
                  <span className="sr-only"> (opens in a new tab)</span>
                  <FiExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
              )}
              <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm font-semibold text-zypher-red underline decoration-zypher-red/40 underline-offset-4 transition-colors hover:text-[#7E010E] hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red"
              >
                View on Google
                <span className="sr-only">: review by {review.name} (opens in a new tab)</span>
                <FiExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </li>
          ))}
        </ul>

        {allReviewsUrl && (
          <div className="mt-8 flex justify-center">
            <a
              href={allReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-zypher-red px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#7E010E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red"
            >
              View All Reviews on Google
              <span className="sr-only"> (opens in a new tab)</span>
              <FiExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
