
import React from 'react';

export const BRAND_NAME = "Bacata Gold";
export const CURRENCY_SYMBOL = "$";

export const BRAND_LOGO = (
  <svg className="size-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
  </svg>
);

export const UCP_MANIFEST_URL = "/.well-known/ucp";

export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Anillo de Esmeralda y Oro de 18k 'Luz de Muzo'",
    description: "Inspirado en la exuberante selva colombiana, este diseño artesanal presenta una esmeralda central de corte excepcional, montada en una banda de oro sólido de 18 quilates. Cada piedra es seleccionada por su color único y pureza 'vivid green'.",
    price: 3500,
    currency: "USD",
    material: "Oro 18k Amarillo",
    gem_type: "Esmeralda Natural",
    carats: "2.5ct",
    origin: "Muzo, Colombia",
    certificate_id: "BG-99281-2024",
    stock: 5,
    image_urls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1629131726692-1accd0c93cd0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "2",
    name: "Collar Gota de Esmeralda",
    description: "Un colgante minimalista con una esmeralda tallada en forma de pera.",
    price: 1850,
    currency: "USD",
    material: "Oro 18k",
    gem_type: "Esmeralda",
    carats: "1.2ct",
    origin: "Chivor, Colombia",
    certificate_id: "BG-11223-2024",
    stock: 2,
    image_urls: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
