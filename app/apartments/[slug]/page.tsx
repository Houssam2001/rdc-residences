import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { cleanApartmentName, createSlug } from "@/lib/utils";
import ApartmentDetail from "@/components/ApartmentDetail";

// This enables static generation for all the apartment slugs
export async function generateStaticParams() {
  const apartmentsDir = path.join(process.cwd(), "public/apartments");
  try {
    if (fs.existsSync(apartmentsDir)) {
      const files = fs.readdirSync(apartmentsDir).filter(f => f.endsWith(".png"));
      return files.map(file => {
        const cleanName = cleanApartmentName(file);
        return { slug: createSlug(cleanName) };
      });
    }
  } catch (error) {
    console.error("Failed to read apartments:", error);
  }
  return [];
}

export default async function ApartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const apartmentsDir = path.join(process.cwd(), "public/apartments");
  let foundApartment = null;

  try {
    if (fs.existsSync(apartmentsDir)) {
      const files = fs.readdirSync(apartmentsDir).filter(f => f.endsWith(".png"));
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const cleanName = cleanApartmentName(file);
        const fileSlug = createSlug(cleanName);
        if (fileSlug === slug) {
          foundApartment = {
            id: i.toString(),
            name: cleanName,
            rawName: file.replace(".png", ""),
            imagePath: file,
            slug: fileSlug
          };
          break;
        }
      }
    }
  } catch (error) {
    console.error("Failed to read apartments:", error);
  }

  if (!foundApartment) {
    notFound();
  }

  return <ApartmentDetail apartment={foundApartment} />;
}
