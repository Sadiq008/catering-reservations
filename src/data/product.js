import gourmetteImage from "../assets/images/gourmet.avif";
import buffetImage from "../assets/images/deluxe.png";
import dessertsImage from "../assets/images/desserts.avif";

export const products = [
  {
    id: 1,
    name: "Gourmet Platter",
    price: 99.99,
    image: gourmetteImage,
    description:
      "Our Gourmet Platter is a feast for the senses. It features an exquisite selection of artisanal cheeses, cured meats, fresh fruits, and gourmet crackers. Perfect for sophisticated gatherings or as an impressive appetizer spread.",
    serves: "10-12 people",
    ingredients:
      "Aged cheddar, brie, prosciutto, salami, grapes, strawberries, figs, almonds, walnuts, artisanal crackers",
  },
  {
    id: 2,
    name: "Deluxe Buffet",
    price: 199.99,
    image: buffetImage,
    description:
      "Our Deluxe Buffet offers a wide array of hot and cold dishes to satisfy every palate. From savory entrees to fresh salads and decadent desserts, this buffet is perfect for large events and celebrations.",
    serves: "20-25 people",
    ingredients:
      "Roast beef, grilled chicken, vegetarian lasagna, mixed green salad, roasted vegetables, assorted dinner rolls, chocolate mousse",
  },
  {
    id: 3,
    name: "Elegant Desserts",
    price: 79.99,
    image: dessertsImage,
    description:
      "Indulge in our Elegant Desserts platter, featuring a delightful assortment of miniature pastries and sweets. These bite-sized treats are perfect for adding a touch of luxury to any event.",
    serves: "15-20 people",
    ingredients:
      "Mini chocolate éclairs, fruit tarts, macarons, cheesecake bites, chocolate-dipped strawberries, petit fours",
  },
];
