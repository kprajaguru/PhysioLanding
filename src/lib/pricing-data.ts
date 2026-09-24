import type { Currency } from "@/lib/currency";

export type PlanId = "free" | "starter" | "advance" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: Record<Currency, number | null>; // null = custom pricing
  priceSuffix: string;
  popular?: boolean;
  ctaLabel: string;
  highlightCaption: string;
  limits: string[]; // shown in the tinted spec box
  capabilities: string[]; // shown as the checked feature list
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Try PhysioApp risk-free for 10 days — no card, full access to the essentials.",
    price: { INR: 0, GBP: 0 },
    priceSuffix: "10-day trial",
    ctaLabel: "Start free trial",
    highlightCaption: "Try before you commit",
    limits: ["10-day trial", "1 staff member", "1 branch"],
    capabilities: ["10 WhatsApp reminders", "Core patient records", "Appointment scheduling"],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Everything a solo therapist needs to run appointments, billing and reminders.",
    price: { INR: 1099, GBP: 15 },
    priceSuffix: "per month",
    popular: true,
    ctaLabel: "Get started",
    highlightCaption: "Best for getting started",
    limits: ["Up to 100 patients", "Up to 2 branches"],
    capabilities: [
      "Billing & tax invoicing",
      "Email support",
      "WhatsApp reminders",
      "SVG body assessments",
    ],
  },
  {
    id: "advance",
    name: "Advance",
    tagline: "For clinics that have outgrown spreadsheets and need to move faster.",
    price: { INR: 3499, GBP: 45 },
    priceSuffix: "per month",
    ctaLabel: "Get started",
    highlightCaption: "Built to grow with you",
    limits: ["Unlimited patients", "Up to 5 branches"],
    capabilities: [
      "Exercise video library",
      "Priority support",
      "Referral reports",
      "CSV import & migration",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For chains standardizing operations across every branch, with dedicated support.",
    price: { INR: null, GBP: null },
    priceSuffix: "custom",
    ctaLabel: "Talk to sales",
    highlightCaption: "Tailored to your scale",
    limits: ["Unlimited patients", "Unlimited branches"],
    capabilities: [
      "Everything in Advance",
      "Multi-branch reporting",
      "SSO & audit logs",
      "Dedicated CSM",
    ],
  },
];

export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  label: string;
  values: Record<PlanId, ComparisonValue>;
}

export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}

export const COMPARISON: ComparisonGroup[] = [
  {
    title: "Clinic basics",
    rows: [
      {
        label: "Patients",
        values: {
          free: "Trial limits apply",
          starter: "Up to 100",
          advance: "Unlimited",
          enterprise: "Unlimited",
        },
      },
      {
        label: "Branches",
        values: { free: "1", starter: "Up to 2", advance: "Up to 5", enterprise: "Unlimited" },
      },
      {
        label: "Staff members",
        values: { free: "1", starter: true, advance: true, enterprise: true },
      },
      {
        label: "WhatsApp reminders",
        values: { free: "10 total", starter: true, advance: true, enterprise: true },
      },
      {
        label: "SVG body assessments",
        values: { free: true, starter: true, advance: true, enterprise: true },
      },
    ],
  },
  {
    title: "Billing & growth",
    rows: [
      {
        label: "Billing & tax invoicing (GST/VAT)",
        values: { free: false, starter: true, advance: true, enterprise: true },
      },
      {
        label: "Exercise video library",
        values: { free: false, starter: false, advance: true, enterprise: true },
      },
      {
        label: "Referral reports",
        values: { free: false, starter: true, advance: true, enterprise: true },
      },
      {
        label: "CSV import & migration",
        values: { free: false, starter: false, advance: true, enterprise: true },
      },
      {
        label: "Multi-branch reporting",
        values: { free: false, starter: false, advance: false, enterprise: true },
      },
    ],
  },
  {
    title: "Support & security",
    rows: [
      {
        label: "Support",
        values: {
          free: "Self-serve help center",
          starter: "Email",
          advance: "Priority",
          enterprise: "Dedicated CSM",
        },
      },
      {
        label: "SSO & audit logs",
        values: { free: false, starter: false, advance: false, enterprise: true },
      },
    ],
  },
];
