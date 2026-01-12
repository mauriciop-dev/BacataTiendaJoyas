
import React from 'react';
import { Product } from './types';

export const BRAND_NAME = "Bacata Gold";
export const CURRENCY_SYMBOL = "$";

export const BRAND_LOGO = (
  <svg className="size-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
  </svg>
);

export const UCP_MANIFEST_URL = "/.well-known/ucp";

export const MOCK_PRODUCTS: Product[] = [
  // ANILLOS
  {
    id: "a1",
    category: "anillos",
    name: "Anillo Luz de Muzo",
    description: "Esmeralda central de corte excepcional montada en oro de 18k.",
    price: 3500,
    currency: "USD",
    material: "Oro 18k Amarillo",
    gem_type: "Esmeralda Natural",
    carats: "2.5ct",
    origin: "Muzo, Colombia",
    certificate_id: "BG-99281",
    stock: 5,
    image_urls: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "a2",
    category: "anillos",
    name: "Solitario Imperial",
    description: "Diamante certificado en montura de oro blanco.",
    price: 5200,
    currency: "USD",
    material: "Oro 18k Blanco",
    gem_type: "Diamante",
    carats: "1.0ct",
    origin: "Sudáfrica",
    certificate_id: "BG-88210",
    stock: 2,
    image_urls: ["https://images.unsplash.com/photo-1603561591411-071c4f703932?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "a3",
    category: "anillos",
    name: "Alianza Eterna",
    description: "Banda texturizada de oro rosa con incrustaciones de esmeraldas pequeñas.",
    price: 1200,
    currency: "USD",
    material: "Oro 18k Rosa",
    gem_type: "Esmeralda",
    carats: "0.5ct",
    origin: "Colombia",
    certificate_id: "BG-77321",
    stock: 10,
    image_urls: ["https://images.unsplash.com/photo-1598560912005-5976593dc35b?auto=format&fit=crop&q=80&w=800"]
  },
  // COLLARES
  {
    id: "c1",
    category: "collares",
    name: "Collar Gota de Esmeralda",
    description: "Un colgante minimalista con una esmeralda tallada en forma de pera.",
    price: 1850,
    currency: "USD",
    material: "Oro 18k",
    gem_type: "Esmeralda",
    carats: "1.2ct",
    origin: "Chivor, Colombia",
    certificate_id: "BG-11223",
    stock: 3,
    image_urls: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "c2",
    category: "collares",
    name: "Gargantilla Real",
    description: "Incrustaciones de esmeraldas y diamantes en cadena de oro fino.",
    price: 8900,
    currency: "USD",
    material: "Oro 18k Amarillo",
    gem_type: "Esmeralda/Diamante",
    carats: "4.5ct total",
    origin: "Muzo",
    certificate_id: "BG-22334",
    stock: 1,
    image_urls: ["https://images.unsplash.com/photo-1615655096345-61a54750068d?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "c3",
    category: "collares",
    name: "Pendant Minimalista",
    description: "Cadena delgada con dije de esmeralda redonda.",
    price: 950,
    currency: "USD",
    material: "Oro 14k",
    gem_type: "Esmeralda",
    carats: "0.8ct",
    origin: "Chivor",
    certificate_id: "BG-33445",
    stock: 8,
    image_urls: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"]
  },
  // ORO
  {
    id: "o1",
    category: "oro",
    name: "Lingote de Oro Puro 24k",
    description: "Oro de inversión de máxima pureza (999.9), certificado por Bacata Gold.",
    price: 2450,
    currency: "USD",
    material: "Oro 24k",
    gem_type: "Ninguna",
    carats: "50g",
    origin: "Antioquia, Colombia",
    certificate_id: "BG-G1001",
    stock: 15,
    image_urls: ["https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "o2",
    category: "oro",
    name: "Lámina de Oro Laminado",
    description: "Lámina técnica de alta calidad para orfebrería profesional.",
    price: 450,
    currency: "USD",
    material: "Oro Laminado 14k",
    gem_type: "Ninguna",
    carats: "10g",
    origin: "Colombia",
    certificate_id: "BG-G1002",
    stock: 25,
    image_urls: ["https://images.unsplash.com/photo-1551301012-70133c94f572?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: "o3",
    category: "oro",
    name: "Gránulos de Oro Fino",
    description: "Gránulos ideales para fundición y creación de piezas personalizadas.",
    price: 1100,
    currency: "USD",
    material: "Oro 22k",
    gem_type: "Ninguna",
    carats: "20g",
    origin: "Colombia",
    certificate_id: "BG-G1003",
    stock: 30,
    image_urls: ["https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800"]
  }
];
