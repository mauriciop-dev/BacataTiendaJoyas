
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: 'anillos' | 'collares' | 'oro';
  material: string;
  gem_type: string;
  carats: string;
  origin: string;
  certificate_id: string;
  stock: number;
  image_urls: string[];
}

export interface Profile {
  id: string;
  full_name: string;
  role: 'admin' | 'customer';
}

// Universal Commerce Protocol (UCP) v1.0 Types
export interface UCPManifest {
  version: string;
  name: string;
  description: string;
  capabilities: {
    type: string;
    endpoint: string;
    description: string;
  }[];
  auth: {
    type: string;
    flow: string;
  };
}

export enum UCPCapabilityType {
  PRODUCT_DISCOVERY = 'PRODUCT_DISCOVERY',
  CHECKOUT = 'CHECKOUT',
  ORDER_TRACKING = 'ORDER_TRACKING'
}
