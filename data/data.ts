// use this file for data that is used across the app, such as arrays of objects, constants, etc.
import { Company, FilterOption } from "../types/types";

// mock data for search company sidebar filters
export const industries: FilterOption[] = [
  { name: "Advertising", count: 43 },
  { name: "Business Service", count: 4 },
  { name: "Blockchain", count: 5 },
  { name: "Cloud", count: 15 },
  { name: "Consumer Tech", count: 5 },
  { name: "Education", count: 34 },
  { name: "Fintech", count: 45 },
  { name: "Gaming", count: 33 },
  { name: "Food & Beverage", count: 5 },
  { name: "Healthcare", count: 3 },
  { name: "Hosting", count: 5 },
  { name: "Media", count: 4 },
];
// mock data for search company sidebar filters
export const companySizes: FilterOption[] = [
  { name: "1-50", count: 25 },
  { name: "51-150", count: 57 },
  { name: "151-250", count: 45 },
  { name: "251-500", count: 4 },
  { name: "501-1000", count: 43 },
  { name: "1000+ above", count: 23 },
];

export const sortOptions = ["Most relevant", "Most recent"];

// Mock data for companies
export const companies: Company[] = [
  {
    id: 1,
    src: "/stripe.png",
    availableJobs: 12,
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 2,
    src: "/square.png",
    availableJobs: 8,
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 3,
    src: "/robinhood.png",
    availableJobs: 5,
    name: "Robinhood",
    description:
      "Robinhood is lowering barriers, removing fees, and providing greater access to financial information.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 4,
    src: "/revolut.png",
    availableJobs: 14,
    name: "Revolut",
    description:
      "When Revolut was founded in 2015, we had a vision to build a sustainable, digital alternative to traditional big banks.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 5,
    src: "/truebill.png",
    availableJobs: 3,
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 501,
  },
  {
    id: 6,
    src: "/coinbase.png",
    availableJobs: 21,
    name: "Coinbase",
    description:
      "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 7,
    src: "/kraken.png",
    availableJobs: 9,
    name: "Kraken",
    description:
      "Based in San Francisco, Kraken is the world's largest global bitcoin exchange in euro volume and liquidity.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 8,
    src: "/divvy.png",
    availableJobs: 4,
    name: "Divvy",
    description:
      "Divvy is a secure financial platform for businesses to manage payments and subscriptions.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 501,
  },
];
