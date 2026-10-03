export type GoogleReview = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  url: string;
};

// Manually selected reviews from the three supplied Google review links.
// Replace a review here using its exact customer wording and direct review URL.
export const reviews: GoogleReview[] = [
  {
    name: "Adeesha Ovitigala",
    rating: 5,
    text: "Great service. They helped me import some hard to find parts from Japan. Mr. Isuru communicated very well throughout the whole process and kept me updated. The parts arrived quickly within just 10 days. Very happy with the service and highly recommended..",
    url: "https://share.google/tQlBalPG9ueanvtO2",
  },
  {
    name: "Senith Perera",
    rating: 5,
    text: "Highly recommend and fast delivery",
    url: "https://share.google/TiITZE0H55nAPlASm",
  },
  {
    name: "Gehan Aravinda",
    rating: 5,
    text: "Got Many orders from here,,  delievered to sri lanka in very few dayz.. Can recommended for any other trusty",
    url: "https://share.google/EGW4ffrYUWzgcJLmZ",
  },
];

// Change the View All button's destination here using the supplied business reviews URL.
export const allReviewsUrl = "https://www.google.com/search?q=zypher+imports&oq=zyp&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg8MgYIARBFGDsyBggCEEUYOTIGCAMQRRg9MgYIBBBFGEEyBggFEEUYPNIBCDE0MDVqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8&sei=xTrBauMW65Wx4w_8ssGwDA#lrd=0x2da522c18f8dd1b7:0x77e08b1dc0d1fbdf,1,,,,";
