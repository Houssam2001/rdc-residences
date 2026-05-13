import fs from "fs";
import path from "path";
import InteractiveDirectory from "@/components/InteractiveDirectory";
import { cleanApartmentName, createSlug, ApartmentData } from "@/lib/utils";

export default function ApartmentsDirectoryPage() {
  const apartmentsDir = path.join(process.cwd(), "public/apartments");
  let apartments: ApartmentData[] = [];

  try {
    if (fs.existsSync(apartmentsDir)) {
      const files = fs.readdirSync(apartmentsDir).filter(f => f.endsWith(".png"));
      apartments = files.map((file, index) => {
        const cleanName = cleanApartmentName(file);
        return {
          id: index.toString(),
          name: cleanName,
          rawName: file.replace(".png", ""),
          imagePath: file,
          slug: createSlug(cleanName)
        };
      });
    }
  } catch (error) {
    console.error("Failed to read apartments:", error);
  }

  // Fallback if empty
  if (apartments.length === 0) {
    apartments = [
      { id: "0", name: "Default View", rawName: "hero-1", imagePath: "hero-1.jpeg", slug: "default-view" }
    ];
  }

  return <InteractiveDirectory apartments={apartments} />;
}
