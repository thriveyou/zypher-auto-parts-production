# Editing Google customer reviews

The static homepage section is `/#reviews`, after Zypher Bikes and before the final parts-platform CTA. It displays manually selected customer reviews posted on Google.

Edit **`src/data/reviews.ts`**:

- Replace one of the three objects in the `reviews` array with the customer's exact `name`, `rating` (1–5), full `text`, and direct Google review `url`.
- Preserve wording, spelling, punctuation, and spacing. For multiline text, use a template literal or `\n` inside the string. Reviews over 500 characters are visually limited to eight lines with a "Read full review on Google" link; the complete original text stays in the data and markup. Shorter reviews display in full. Line breaks are preserved.
- Change **`allReviewsUrl`** in the same file to the supplied Zypher Imports Google Maps/reviews page URL. The View All button stays hidden while this value is empty.
- Keep three selected genuine reviews. Do not add dates, an overall rating, review counts, or invented testimonials.

Presentation lives in **`src/components/GoogleReviews.tsx`**. The grid displays one card per row on phones, two columns on tablets, and three columns on larger screens. Stars have accessible rating labels. All Google links open in a new tab with `noopener noreferrer`, an external-link icon, and a screen-reader indication.

After changing the data, run `npm run lint` and `npm run build`, check desktop and 320/375/390px layouts, and open each review link and the View All link to verify their destinations. Rebuild/redeploy the website using its existing deployment process to publish changes.

There is no Places API, Google JavaScript SDK, runtime review request, API key, new environment variable, or review/aggregate-rating structured data.
