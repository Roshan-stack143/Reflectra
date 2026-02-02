
export enum Screen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  PROFILE_SETUP = 'PROFILE_SETUP',
  HOME = 'HOME',
  SMART_MIRROR = 'SMART_MIRROR',
  CLOTH_SELECTION = 'CLOTH_SELECTION',
  AI_INTELLIGENCE = 'AI_INTELLIGENCE',
  SUSTAINABILITY = 'SUSTAINABILITY',
  THANK_YOU = 'THANK_YOU'
}

export interface UserProfile {
  name: string;
  gender: string;
  height: string;
  weight: string;
  style: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: 'Shirt' | 'Pant' | 'T-shirt';
  color: string;
  size: 'S' | 'M' | 'L' | 'XL';
  image: string;
  material: string;
  comfort: number; // 0-100
  lifeSpan: string;
  wearScore: number; // 0-100
  recycleTip: string;
  impact: {
    waterSaved: number;
    carbonReduced: number;
  };
}

export const CLOTHING_DATABASE: ClothingItem[] = [
  {
    id: '1',
    name: 'Midnight Silk Tee',
    category: 'T-shirt',
    color: 'Purple',
    size: 'M',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    material: 'Organic Silk Blend',
    comfort: 92,
    lifeSpan: '3-4 Years',
    wearScore: 88,
    recycleTip: 'Donate to high-end vintage stores after 3 years.',
    impact: { waterSaved: 120, carbonReduced: 4.5 }
  },
  {
    id: '2',
    name: 'Eco-Denim Slims',
    category: 'Pant',
    color: 'Blue',
    size: 'L',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400',
    material: 'Recycled Cotton',
    comfort: 85,
    lifeSpan: '5+ Years',
    wearScore: 95,
    recycleTip: 'Completely biodegradable or can be shredded for insulation.',
    impact: { waterSaved: 2500, carbonReduced: 12.2 }
  },
  {
    id: '3',
    name: 'Cyber Linen Shirt',
    category: 'Shirt',
    color: 'White',
    size: 'L',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=400',
    material: 'Refined Flax Linen',
    comfort: 98,
    lifeSpan: '2 Years',
    wearScore: 75,
    recycleTip: 'Compostable material. Return to Reflectra Loop for soil enrichment.',
    impact: { waterSaved: 80, carbonReduced: 2.1 }
  }
];
