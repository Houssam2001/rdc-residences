import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { cleanApartmentName, createSlug } from "@/lib/utils";
import ApartmentDetail from "@/components/ApartmentDetail";

// Define a few composition templates to assign deterministically
const COMPOSITION_TEMPLATES = [
  [
    { zone: "Séjour & Salle à Manger", desc: "Espace ouvert baigné de lumière naturelle grâce aux baies vitrées du sol au plafond. Conçu pour la convivialité et le confort quotidien.", markerPosition: { top: "35%", left: "45%" } },
    { zone: "Cuisine Équipée", desc: "Cuisine européenne entièrement intégrée avec comptoirs en pierre naturelle, électroménagers haut de gamme et îlot central fonctionnel.", markerPosition: { top: "55%", left: "65%" } },
    { zone: "Suite Parentale", desc: "Chambre principale avec dressing intégré et salle de bain privative. Terrasse accessible directement depuis la suite.", markerPosition: { top: "25%", left: "60%" } },
    { zone: "Terrasse Privée", desc: "Espace extérieur généreux offrant une vue panoramique sur le paysage environnant. Idéal pour les moments de détente.", markerPosition: { top: "65%", left: "35%" } },
  ],
  [
    { zone: "Grand Salon", desc: "Un grand salon lumineux avec cheminée contemporaine et vue sur les jardins.", markerPosition: { top: "40%", left: "30%" } },
    { zone: "Cuisine Ouverte", desc: "Espace culinaire moderne avec bar américain, parfait pour recevoir.", markerPosition: { top: "60%", left: "50%" } },
    { zone: "Espace Bureau", desc: "Un espace de travail dédié avec vue imprenable pour une concentration maximale.", markerPosition: { top: "30%", left: "70%" } },
    { zone: "Chambre d'Amis", desc: "Chambre supplémentaire avec salle d'eau indépendante pour vos invités.", markerPosition: { top: "70%", left: "20%" } },
  ],
  [
    { zone: "Réception", desc: "Un hall d'entrée impressionnant qui mène directement aux pièces de vie principales.", markerPosition: { top: "50%", left: "40%" } },
    { zone: "Suite Master", desc: "Chambre luxueuse occupant toute une aile, incluant dressing sur mesure et salle de bain spa.", markerPosition: { top: "20%", left: "55%" } },
    { zone: "Cuisine d'Été", desc: "Espace extérieur aménagé pour préparer des repas en plein air lors des journées ensoleillées.", markerPosition: { top: "75%", left: "65%" } },
    { zone: "Solarium", desc: "Terrasse exposée sud pour profiter du soleil tout au long de la journée.", markerPosition: { top: "35%", left: "80%" } },
  ],
  [
    { zone: "Loft Living", desc: "Vaste espace décloisonné intégrant salon, salle à manger et bibliothèque.", markerPosition: { top: "45%", left: "35%" } },
    { zone: "Chambre Double", desc: "Deux grandes chambres avec balcons privés et rangements intégrés.", markerPosition: { top: "25%", left: "45%" } },
    { zone: "Cuisine Design", desc: "Cuisine minimaliste avec équipements encastrés invisibles et finitions mates.", markerPosition: { top: "65%", left: "55%" } },
    { zone: "Jardin d'Hiver", desc: "Espace vitré climatisé permettant de profiter de la vue nature en toute saison.", markerPosition: { top: "55%", left: "25%" } },
  ]
];

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
  const bwDir = path.join(process.cwd(), "public/bw-apartments-transparent");
  let foundApartment = null;

  try {
    if (fs.existsSync(apartmentsDir)) {
      const files = fs.readdirSync(apartmentsDir).filter(f => f.endsWith(".png"));
      
      // Get all bw images for gallery matching
      const bwFiles = fs.existsSync(bwDir)
        ? fs.readdirSync(bwDir).filter(f => f.endsWith(".png"))
        : [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const cleanName = cleanApartmentName(file);
        const fileSlug = createSlug(cleanName);
        if (fileSlug === slug) {
          // Find matching bw image (same filename) or any bw image sharing the same number prefix
          const numberPrefix = file.match(/^(\d+)/)?.[1];
          const bwMatch = bwFiles.find(bf => bf === file)
            || (numberPrefix ? bwFiles.find(bf => bf.startsWith(numberPrefix)) : null);

          // Also find other color images with the same number prefix for gallery
          const relatedColorImages = numberPrefix
            ? files.filter(f => f.startsWith(numberPrefix) && f !== file)
            : [];

          foundApartment = {
            id: i.toString(),
            name: cleanName,
            rawName: file.replace(".png", ""),
            imagePath: file,
            slug: fileSlug,
            bwImagePath: bwMatch || null,
            galleryImages: [
              file,
              ...(bwMatch ? [bwMatch] : []),
              ...relatedColorImages,
            ],
            composition: COMPOSITION_TEMPLATES[i % COMPOSITION_TEMPLATES.length]
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
