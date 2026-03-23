export type CategoryData = {
  name: string;
  slug: string;
  count: number;
  description: string;
  image: string;
};

export type ProductCardData = {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: string;
  subscriptionPrice?: string;
  stock: number;
  featured?: boolean;
  image: string;
  note: string;
};

export type BundleCardData = {
  slug: string;
  name: string;
  description: string;
  price: string;
  subscriptionPrice?: string;
  savings?: string;
  includes: string[];
  idealFor: string;
  image: string;
  cadence: string;
  featured?: boolean;
};

export const categories: CategoryData[] = [
  {
    name: "Pañales",
    slug: "panales",
    count: 3,
    description: "Absorcion, ajuste anatomico y referencias para uso diario o nocturno.",
    image:
      "https://images.unsplash.com/photo-1584839404210-750b45437aca?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Higiene",
    slug: "higiene",
    count: 2,
    description: "Rutinas suaves para limpieza, confort y cuidado frecuente de piel sensible.",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Proteccion",
    slug: "proteccion",
    count: 2,
    description: "Cremas barrera, guantes y esenciales para prevenir irritacion y friccion.",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Movilidad",
    slug: "movilidad",
    count: 1,
    description: "Apoyo complementario para traslados, postura y asistencia cotidiana.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products: ProductCardData[] = [
  {
    slug: "panal-respiraflex-m",
    name: "Pañal RespiraFlex M",
    category: "Pañales",
    description: "Alta absorcion, cintura suave y ajuste anatomico para rutinas estables de dia y noche.",
    price: "$18",
    subscriptionPrice: "$16",
    stock: 42,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1584839404210-750b45437aca?auto=format&fit=crop&w=1200&q=80",
    note: "Entrega programada disponible.",
  },
  {
    slug: "panal-respiraflex-g",
    name: "Pañal RespiraFlex G",
    category: "Pañales",
    description: "Talla grande con cintura elastica reforzada y canal de absorcion central.",
    price: "$20",
    subscriptionPrice: "$18",
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=1200&q=80",
    note: "Ideal para adultos mayores.",
  },
  {
    slug: "panal-nocturno-ultra-m",
    name: "Pañal Nocturno Ultra M",
    category: "Pañales",
    description: "Capacidad extendida para 12 horas de proteccion nocturna con nucleo super absorbente.",
    price: "$22",
    subscriptionPrice: "$19",
    stock: 28,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
    note: "Recomendado para noches completas.",
  },
  {
    slug: "toallas-humedas-suaves",
    name: "Toallas Humedas Suaves",
    category: "Higiene",
    description: "Paquete x80 sin alcohol para limpieza frecuente con textura blanda y formula calmante.",
    price: "$7",
    subscriptionPrice: "$6",
    stock: 65,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    note: "Ideal para reposicion semanal.",
  },
  {
    slug: "jabon-liquido-neutro",
    name: "Jabon Liquido Neutro 500ml",
    category: "Higiene",
    description: "Formula dermatologica sin fragancias agresivas para limpieza diaria de piel sensible.",
    price: "$9",
    subscriptionPrice: "$8",
    stock: 48,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    note: "Apto para uso frecuente.",
  },
  {
    slug: "crema-barrera-protectora",
    name: "Crema Barrera Protectora",
    category: "Proteccion",
    description: "Formula con oxido de zinc y aloe para proteger zonas sensibles de humedad y roce.",
    price: "$14",
    subscriptionPrice: "$13",
    stock: 24,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1200&q=80",
    note: "Muy solicitada para cuidado continuo.",
  },
  {
    slug: "guantes-nitrilo-cuidado",
    name: "Guantes Nitrilo Cuidado",
    category: "Proteccion",
    description: "Caja x100 para cambios, higiene y asistencia diaria con tacto comodo y resistencia estable.",
    price: "$11",
    stock: 31,
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    note: "Stock listo para pedidos empresariales.",
  },
  {
    slug: "cojin-postural-ergonomico",
    name: "Cojin Postural Ergonomico",
    category: "Movilidad",
    description: "Espuma viscoelastica con funda lavable para soporte lumbar y prevencion de ulceras por presion.",
    price: "$45",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    note: "Envio protegido incluido.",
  },
];

export const bundles: BundleCardData[] = [
  {
    slug: "kit-cuidado-esencial",
    name: "Kit Cuidado Esencial",
    description: "Lo basico para el dia a dia: cambio, limpieza y proteccion en un solo pedido. Menos decisiones, mas tranquilidad.",
    price: "$36",
    subscriptionPrice: "$33",
    savings: "Ahorra $3/mes",
    includes: ["Pañales RespiraFlex M", "Toallas humedas x80", "Crema barrera protectora"],
    idealFor: "Familias con rutina diaria",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
    cadence: "Envio mensual",
    featured: true,
  },
  {
    slug: "kit-nocturno-confort",
    name: "Kit Nocturno Confort",
    description: "Noches completas sin preocupaciones. Absorcion extendida, proteccion de cama y limpieza suave para descansar mejor.",
    price: "$42",
    subscriptionPrice: "$39",
    savings: "Ahorra $3/mes",
    includes: ["Pañales Nocturno Ultra M", "Protectores de cama", "Toallas humedas x80"],
    idealFor: "Cuidadores nocturnos",
    image:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=1200&q=80",
    cadence: "Envio mensual",
    featured: true,
  },
  {
    slug: "kit-higiene-completa",
    name: "Kit Higiene Completa",
    description: "Rutina de limpieza completa sin ingredientes agresivos. Pensado para pieles sensibles que necesitan cuidado frecuente.",
    price: "$28",
    subscriptionPrice: "$25",
    savings: "Ahorra $3/mes",
    includes: ["Toallas humedas x80", "Jabon liquido neutro 500ml", "Crema barrera protectora"],
    idealFor: "Pieles sensibles",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    cadence: "Envio cada 3 semanas",
  },
  {
    slug: "kit-institucional-basico",
    name: "Kit Institucional",
    description: "Volumen y variedad para centros de cuidado. Las referencias mas pedidas, listas para reponer sin hacer inventario cada vez.",
    price: "$85",
    subscriptionPrice: "$78",
    savings: "Ahorra $7/mes",
    includes: ["Pañales RespiraFlex G x2", "Guantes nitrilo x100", "Toallas humedas x80", "Jabon liquido neutro 500ml"],
    idealFor: "Centros e instituciones",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    cadence: "Envio quincenal",
  },
];

export const accountSnapshot = {
  name: "Maria Salcedo",
  email: "maria@example.com",
  addresses: [
    "Av. Principal de La Castellana, Caracas",
    "Casa de hija: El Hatillo, Caracas",
  ],
  orders: [
    { number: "JS-1042", status: "Pagado", total: "$42", date: "14 Mar 2026" },
    { number: "JS-1039", status: "Entregado", total: "$36", date: "28 Feb 2026" },
    { number: "JS-1029", status: "Entregado", total: "$33", date: "16 Feb 2026" },
    { number: "JS-1018", status: "Entregado", total: "$85", date: "02 Feb 2026" },
  ],
  subscriptions: [
    {
      name: "Kit Cuidado Esencial",
      status: "Activa",
      nextCharge: "02 Abr 2026",
      nextShipment: "03 Abr 2026",
    },
    {
      name: "Kit Higiene Completa",
      status: "Pausada",
      nextCharge: "Sin programar",
      nextShipment: "Sin programar",
    },
  ],
};

export const adminSnapshot = {
  metrics: [
    { label: "Ingresos del mes", value: "$6,820", detail: "+12% vs mes anterior" },
    { label: "Suscripciones activas", value: "84", detail: "7 en pausa" },
    { label: "Pedidos pendientes", value: "19", detail: "4 con observacion" },
    { label: "Alertas de stock", value: "6", detail: "2 bajo minimo" },
  ],
  customers: [
    { name: "Maria Salcedo", email: "maria@example.com", orders: 8, status: "Activa", note: "Prefiere entregas en la mañana" },
    { name: "Jose Medina", email: "jose@example.com", orders: 2, status: "Pago fallido", note: "Confirmar tarjeta antes del corte" },
    { name: "Carmen Lopez", email: "carmen@example.com", orders: 5, status: "Activa", note: "Cliente institucional, factura mensual" },
    { name: "Luis Torres", email: "luis@example.com", orders: 1, status: "Nueva", note: "Primera compra, kit esencial" },
  ],
  orders: [
    { number: "JS-1042", customer: "Maria Salcedo", type: "Compra unica", status: "Pagado", total: "$42" },
    { number: "JS-1043", customer: "Jose Medina", type: "Renovacion", status: "Pendiente", total: "$33" },
    { number: "JS-1044", customer: "Carmen Lopez", type: "Compra unica", status: "Pagado", total: "$85" },
    { number: "JS-1045", customer: "Luis Torres", type: "Compra unica", status: "Pendiente", total: "$36" },
  ],
  stock: [
    { sku: "PAN-M-001", name: "Pañal RespiraFlex M", available: 42, minimum: 15 },
    { sku: "PAN-G-002", name: "Pañal RespiraFlex G", available: 35, minimum: 15 },
    { sku: "CRE-BAR-003", name: "Crema Barrera Protectora", available: 24, minimum: 10 },
    { sku: "COJ-ERG-008", name: "Cojin Postural Ergonomico", available: 12, minimum: 8 },
  ],
  subscriptions: [
    { customer: "Maria Salcedo", bundle: "Kit Cuidado Esencial", status: "Activa", nextCharge: "02 Abr 2026", nextShipment: "03 Abr 2026" },
    { customer: "Carmen Lopez", bundle: "Kit Institucional Basico", status: "Activa", nextCharge: "28 Mar 2026", nextShipment: "29 Mar 2026" },
    { customer: "Jose Medina", bundle: "Kit Nocturno Confort", status: "Pago fallido", nextCharge: "Reintento pendiente", nextShipment: "Sin programar" },
  ],
};

export const adminSections = [
  { href: "/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Productos", icon: "Package" },
  { href: "/admin/categories", label: "Categorias", icon: "Tag" },
  { href: "/admin/bundles", label: "Paquetes", icon: "Boxes" },
  { href: "/admin/customers", label: "Clientes", icon: "Users" },
  { href: "/admin/orders", label: "Pedidos", icon: "ClipboardList" },
  { href: "/admin/subscriptions", label: "Suscripciones", icon: "CalendarClock" },
  { href: "/admin/inventory", label: "Inventario", icon: "Warehouse" },
] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getBundleBySlug(slug: string) {
  return bundles.find((bundle) => bundle.slug === slug);
}

export function getRelatedBundles(slug: string, limit = 3): BundleCardData[] {
  return bundles.filter((b) => b.slug !== slug).slice(0, limit);
}

export function getRelatedProducts(slug: string, limit = 4): ProductCardData[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== slug && p.category !== product.category))
    .slice(0, limit);
}
