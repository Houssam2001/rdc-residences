import fs from "fs";
import path from "path";
import ApartmentsGallery from "@/components/ApartmentsGallery";
import { cleanApartmentName, createSlug, ApartmentData } from "@/lib/utils";

export default function ApartmentsDirectoryPage() {
  const bwDir = path.join(process.cwd(), "public/bw-aparments");
  const colorDir = path.join(process.cwd(), "public/apartments");
  let apartments: ApartmentData[] = [];

  try {
    // Read BW images as the primary source
    if (fs.existsSync(bwDir)) {
      const bwFiles = fs.readdirSync(bwDir).filter(f => f.endsWith(".png"));
      
      // Also get color versions for hover reveal
      const colorFiles = fs.existsSync(colorDir)
        ? fs.readdirSync(colorDir).filter(f => f.endsWith(".png"))
        : [];

      apartments = bwFiles.map((file, index) => {
        const cleanName = cleanApartmentName(file);
        // Try to find a matching color version
        const colorMatch = colorFiles.find(cf => cf === file) || file;
        return {
          id: index.toString(),
          name: cleanName,
          rawName: file.replace(".png", ""),
          imagePath: file,
          slug: createSlug(cleanName),
          colorImagePath: colorMatch,
        };
      });
    }
  } catch (error) {
    console.error("Failed to read apartments:", error);
  }

  if (apartments.length === 0) {
    apartments = [
      { id: "0", name: "Default View", rawName: "hero-1", imagePath: "hero-1.jpeg", slug: "default-view" }
    ];
  }

  return <ApartmentsGallery apartments={apartments} />;
}
