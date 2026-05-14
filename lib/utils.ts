import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ApartmentData {
  id: string;
  name: string;
  rawName: string;
  imagePath: string;
  slug: string;
  colorImagePath?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanApartmentName(raw: string): string {
  let name = raw.replace(/\.png$/i, "");
  // Remove "ok", "OK", "Ok"
  name = name.replace(/\bok\b/ig, "");
  // Remove prefix numbers, dashes, underscores
  name = name.replace(/^[\d\s\-_]+/, "");
  
  if (name.trim() === "") {
    // If it was just "03 OK.png", extract the number
    const numMatch = raw.match(/^(\d+)/);
    return `Apartment ${numMatch ? numMatch[1] : "Unknown"}`;
  }

  // Convert to Title Case
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, " ");
}

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
