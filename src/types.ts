export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: 'milk' | 'paneer' | 'ghee' | 'curd-lassi' | 'sweets' | 'festival-hampers';
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  nutrition: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    calcium?: string;
  };
  ingredients: string[];
  shelfLife: string;
  storage: string;
  isSubscriptionEligible: boolean;
  isBestSeller?: boolean;
  isFreshToday?: boolean;
  isOrganic?: boolean;
  tags: string[];
  inStock: boolean;
  stockCount: number;
}

export interface SubscriptionPlan {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  frequency: 'daily' | 'alternate' | 'weekly' | 'custom';
  customDays?: string[]; // e.g. ['Mon', 'Wed', 'Fri']
  quantity: number;
  unit: string;
  pricePerUnit: number;
  slot: 'morning' | 'evening';
  startDate: string;
  status: 'active' | 'paused' | 'vacation';
  vacationUntil?: string;
  address: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit?: string;
  isSubscriptionItem?: boolean;
  subscriptionFrequency?: 'daily' | 'alternate' | 'weekly';
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    unit: string;
    image: string;
  }[];
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  status: 'confirmed' | 'packing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliverySlot: string;
  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'card' | 'cod' | 'wallet';
  driver?: {
    name: string;
    phone: string;
    vehicleNumber: string;
    etaMinutes: number;
  };
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  addresses: {
    id: string;
    title: string;
    address: string;
    pincode: string;
    isDefault: boolean;
  }[];
  walletBalance: number;
  rewardPoints: number;
  tier: 'Gold Member' | 'Silver Member' | 'Platinum VIP';
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  timings: string;
  googleMapUrl: string;
  distanceKm: number;
  features: string[];
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  ingredients: string[];
  steps: string[];
  mainProductUsed: string;
}

export interface BulkInquiry {
  id?: string;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  eventType: 'Wedding' | 'Corporate Event' | 'Hotel/Restaurant' | 'Festival Hampers' | 'Other';
  estimatedGuests: number;
  deliveryDate: string;
  itemsRequested: string;
  specialInstructions?: string;
}
