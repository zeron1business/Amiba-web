export interface ProductVariant {
  name: string;
  composition: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  composition: string;
  packSize: string;
  moq: string;
  storageConditions: string;
  shelfLife: string;
  certifications: string[];
  image: string;
  variants?: ProductVariant[];
  relatedSlugs: string[];
}

export const categories = [
  "All",
  "Gastrointestinal",
  "Cardiovascular",
  "Vitamins & Supplements",
  "Respiratory & Allergy",
  "Gout & Hyperuricemia",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  {
    slug: "ramiba-dsr",
    name: "RAMIBA DSR",
    category: "Gastrointestinal",
    shortDescription:
      "Advanced gastro-resistant rabeprazole and sustained-release domperidone formulation for effective GERD management.",
    longDescription:
      "RAMIBA DSR is formulated with Rabeprazole 20mg (EC) and Domperidone 30mg (SR) to provide comprehensive relief from Gastroesophageal Reflux Disease (GERD) and related acid-peptic disorders. The enteric-coated rabeprazole offers potent acid suppression, while sustained-release domperidone ensures prolonged prokinetic action, making it an excellent choice for institutional formularies.",
    composition: "Rabeprazole 20 mg (EC) + Domperidone 30 mg (SR) Capsule",
    packSize: "10 x 10 capsules (Alu-Alu blister pack)",
    moq: "50 boxes",
    storageConditions: "Store below 25°C in a dry place, protected from direct sunlight",
    shelfLife: "24 months from date of manufacture",
    certifications: ["GMP", "WHO-GMP"],
    image: "/images/products/Ramiba-DSR.jpg",
    relatedSlugs: ["prazmo-d"],
  },
  {
    slug: "prazmo-d",
    name: "PRAZMO-D",
    category: "Gastrointestinal",
    shortDescription:
      "Powerful proton pump inhibitor combined with a prokinetic agent for acid reflux and peptic ulcers.",
    longDescription:
      "PRAZMO-D combines Esomeprazole 40mg (EC) and Domperidone 30mg (Sustained Release) to address severe acidity, heartburn, and peptic ulcers. Esomeprazole provides superior and sustained acid inhibition compared to older PPIs, making PRAZMO-D highly effective for erosive esophagitis and refractory GERD cases.",
    composition: "Esomeprazole 40 mg (EC) + Domperidone 30 mg (Sustained Release) Capsules",
    packSize: "10 x 10 capsules (Alu-Alu blister pack)",
    moq: "50 boxes",
    storageConditions: "Store in a cool and dry place, away from moisture",
    shelfLife: "24 months from date of manufacture",
    certifications: ["GMP", "WHO-GMP", "CDSCO Approved"],
    image: "/images/products/Prazmo-D.jpg",
    relatedSlugs: ["ramiba-dsr"],
  },
  {
    slug: "mb-gold",
    name: "MB-GOLD Tablets",
    category: "Vitamins & Supplements",
    shortDescription:
      "Comprehensive multivitamin and multimineral formula for nerve health and nutritional deficiencies.",
    longDescription:
      "MB-GOLD is a premium nutritional supplement packed with Mecobalamin 1500 mcg, Alpha Lipoic Acid 100mg, Benfotiamine 150 mg, Folic Acid 1.5 mg, Chromium Polynicotinate 200 mcg, Inositol 100 mg, Pyridoxine HCl 3 mg, Vitamin D3 1000 IU, and Calcium Carbonate 500 mg. It is specifically designed to support nerve regeneration, combat diabetic neuropathy, and provide essential micronutrients.",
    composition: "Mecobalamin 1500mcg, Alpha Lipoic Acid 100mg, Benfotiamine 150mg, Folic Acid 1.5mg, Chromium 200mcg, Inositol 100mg, Pyridoxine 3mg, Vit D3 1000IU, Calcium 500mg",
    packSize: "10 x 10 tablets",
    moq: "100 boxes",
    storageConditions: "Store below 25°C in a dry place, protected from light",
    shelfLife: "18 months from date of manufacture",
    certifications: ["GMP", "FSSAI Compliant"],
    image: "/images/products/MB-Gold.png",
    relatedSlugs: ["ami-folic"],
  },
  {
    slug: "ibator",
    name: "Ibator 10/20/40",
    category: "Cardiovascular",
    shortDescription:
      "Statin medication for lowering cholesterol levels and cardiovascular risk management.",
    longDescription:
      "Ibator (available in 10mg, 20mg, and 40mg strengths) contains Atorvastatin, a highly effective statin used for the treatment of dyslipidemia and the prevention of cardiovascular events. It significantly lowers LDL cholesterol and triglycerides while modestly increasing HDL cholesterol.",
    composition: "Atorvastatin 10 mg / 20 mg / 40 mg Tablets",
    packSize: "10 x 10 tablets (strip pack)",
    moq: "100 boxes",
    storageConditions: "Store below 30°C in a dry place, protected from light",
    shelfLife: "36 months from date of manufacture",
    certifications: ["GMP", "WHO-GMP", "CDSCO Approved"],
    image: "/images/products/ibator10.png",
    variants: [
      {
        name: "Ibator 10",
        composition: "Atorvastatin Tablets I.P. 10 mg",
        image: "/images/products/ibator10.png",
      },
      {
        name: "Ibator 20",
        composition: "Atorvastatin Tablets I.P. 20 mg",
        image: "/images/products/ibator20.png",
      },
      {
        name: "Ibator 40",
        composition: "Atorvastatin Tablets I.P. 40 mg",
        image: "/images/products/Ibator40.png",
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "amitriba-lc",
    name: "AMITRIBA-LC",
    category: "Respiratory & Allergy",
    shortDescription:
      "Dual-action relief for allergic rhinitis and asthma symptoms.",
    longDescription:
      "AMITRIBA-LC tablets combine Montelukast Sodium 10mg and Levocetirizine 5mg. This synergistic combination provides powerful relief from seasonal and perennial allergic rhinitis, as well as prophylactic treatment for asthma. Montelukast acts as a leukotriene receptor antagonist while Levocetirizine offers non-sedating antihistamine effects.",
    composition: "Montelukast Sodium 10 mg + Levocetirizine 5 mg Tablets",
    packSize: "10 x 10 tablets (Alu-Alu blister pack)",
    moq: "50 boxes",
    storageConditions: "Store below 25°C in a dry place, protected from moisture",
    shelfLife: "24 months from date of manufacture",
    certifications: ["GMP", "WHO-GMP"],
    image: "/images/products/Amitriba-lc.png",
    relatedSlugs: ["ambimont-m"],
  },
  {
    slug: "ami-folic",
    name: "Ami-Folic",
    category: "Vitamins & Supplements",
    shortDescription:
      "Essential nerve-nourishing and neuroprotective dietary supplement.",
    longDescription:
      "Ami-Folic tablets provide a targeted dose of Methylcobalamin 1500 mcg, Alpha Lipoic Acid 100 mg, Pyridoxine 3 mg, and Folic Acid 3 mg. It is expertly formulated to treat peripheral neuropathy, support cognitive function, and maintain healthy red blood cell production.",
    composition: "Methylcobalamin 1500 mcg + Alpha Lipoic Acid 100 mg + Pyridoxine 3 mg + Folic Acid 3 mg Tablets",
    packSize: "10 x 10 tablets",
    moq: "100 boxes",
    storageConditions: "Store below 25°C in a dry place, protected from light",
    shelfLife: "18 months from date of manufacture",
    certifications: ["GMP"],
    image: "/images/products/Amifolic.jpg",
    relatedSlugs: ["mb-gold"],
  },
  {
    slug: "ambimont-m",
    name: "AMBIMONT-M",
    category: "Respiratory & Allergy",
    shortDescription:
      "Advanced combination therapy for comprehensive allergy and asthma care.",
    longDescription:
      "AMBIMONT-M offers a next-generation antihistamine-leukotriene combination with Bilastine 20 mg and Montelukast 10 mg. Bilastine provides highly selective, non-sedating H1 receptor antagonism, making this formulation ideal for patients requiring potent allergy symptom control without daytime drowsiness.",
    composition: "Bilastine 20 mg + Montelukast 10 mg TABLETS",
    packSize: "10 x 10 tablets (Alu-Alu blister pack)",
    moq: "50 boxes",
    storageConditions: "Store below 30°C in a dry place, protected from moisture",
    shelfLife: "24 months from date of manufacture",
    certifications: ["GMP", "WHO-GMP", "CDSCO Approved"],
    image: "/images/products/Ambimont-m.jpeg",
    relatedSlugs: ["amitriba-lc"],
  },
  {
    slug: "ambifeb-40",
    name: "Ambifeb 40",
    category: "Gout & Hyperuricemia",
    shortDescription:
      "Effective uric acid lowering therapy for the chronic management of hyperuricemia.",
    longDescription:
      "Ambifeb 40 contains Febuxostat 40mg, a potent, non-purine selective inhibitor of xanthine oxidase. It is highly effective in reducing serum uric acid levels in patients with gout and hyperuricemia, offering a safer alternative for patients with mild-to-moderate renal impairment compared to traditional therapies.",
    composition: "Febuxostat 40 mg Tablets",
    packSize: "10 x 10 tablets (strip pack)",
    moq: "50 boxes",
    storageConditions: "Store below 25°C in a dry place, protected from light",
    shelfLife: "24 months from date of manufacture",
    certifications: ["GMP", "WHO-GMP"],
    image: "/images/products/Amifeb-40.png",
    relatedSlugs: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
