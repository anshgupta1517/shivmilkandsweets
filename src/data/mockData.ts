import { Product, StoreLocation, Recipe, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-milk-a2',
    name: 'Pure Organic A2 Cow Milk',
    hindiName: 'शुद्ध ए2 गाय का दूध',
    category: 'milk',
    price: 85,
    originalPrice: 95,
    unit: '1 Litre',
    rating: 4.9,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800',
    description: 'Farm-fresh A2 Gir Cow Milk delivered within 3 hours of morning milking. Unpasteurized, non-homogenized, 100% natural cream and richness.',
    nutrition: {
      calories: '68 kcal / 100ml',
      protein: '3.4g',
      fat: '4.2g',
      carbs: '4.8g',
      calcium: '120mg'
    },
    ingredients: ['100% Raw A2 Cow Milk'],
    shelfLife: '2 Days (Refrigerated below 4°C)',
    storage: 'Store in refrigerator at 2°C - 4°C. Boil before consumption.',
    isSubscriptionEligible: true,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: true,
    tags: ['A2 Milk', 'Daily Essential', 'Organic', 'Gir Cow'],
    inStock: true,
    stockCount: 120
  },
  {
    id: 'prod-milk-buffalo',
    name: 'Royal Full Cream Buffalo Milk',
    hindiName: 'गाढ़ा भैंस का दूध',
    category: 'milk',
    price: 78,
    originalPrice: 85,
    unit: '1 Litre',
    rating: 4.8,
    reviewsCount: 980,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800',
    description: 'Thick, creamy, high-fat buffalo milk sourced directly from local dairy pastures. Perfect for making rich tea, thick curd, and homemade sweets.',
    nutrition: {
      calories: '97 kcal / 100ml',
      protein: '4.1g',
      fat: '6.5g',
      carbs: '5.2g',
      calcium: '170mg'
    },
    ingredients: ['100% Pure Fresh Buffalo Milk'],
    shelfLife: '2 Days (Refrigerated)',
    storage: 'Keep chilled below 4°C.',
    isSubscriptionEligible: true,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: true,
    tags: ['High Fat', 'Creamy', 'Fresh'],
    inStock: true,
    stockCount: 150
  },
  {
    id: 'prod-ghee-bilona',
    name: 'Traditional Desi A2 Bilona Ghee',
    hindiName: 'पारंपरिक देशी बीलोना घी',
    category: 'ghee',
    price: 1450,
    originalPrice: 1650,
    unit: '1 kg Jar',
    rating: 5.0,
    reviewsCount: 2310,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=800',
    description: 'Handcrafted using ancient Vedic Bilona method (churning curd made from A2 cow milk). Granular texture, rich aroma, and incomparable purity.',
    nutrition: {
      calories: '898 kcal / 100g',
      protein: '0g',
      fat: '99.8g',
      carbs: '0g',
      calcium: '5mg'
    },
    ingredients: ['Pure Clarified Butter from A2 Cow Milk Curd'],
    shelfLife: '12 Months',
    storage: 'Store in a cool, dry place. Keep container tightly closed.',
    isSubscriptionEligible: true,
    isBestSeller: true,
    isFreshToday: false,
    isOrganic: true,
    tags: ['Bilona Method', 'Vedic Ghee', 'Immunity Booster', 'A2 Cow'],
    inStock: true,
    stockCount: 85
  },
  {
    id: 'prod-paneer-fresh',
    name: 'Handcrafted Soft Malai Paneer',
    hindiName: 'ताज़ा मलाई पनीर',
    category: 'paneer',
    price: 120,
    originalPrice: 140,
    unit: '250g Block',
    rating: 4.9,
    reviewsCount: 1850,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800',
    description: 'Melt-in-mouth cottage cheese made fresh every morning without any preservatives. Extremely soft, moist, and high in pure protein.',
    nutrition: {
      calories: '265 kcal / 100g',
      protein: '18.3g',
      fat: '20.8g',
      carbs: '1.2g',
      calcium: '208mg'
    },
    ingredients: ['Fresh Cow Milk', 'Citric Acid (Lemon juice)'],
    shelfLife: '4 Days (Refrigerated in clean water)',
    storage: 'Keep submerged in fresh cold water inside refrigerator.',
    isSubscriptionEligible: true,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: true,
    tags: ['High Protein', 'Freshly Made', 'No Preservatives'],
    inStock: true,
    stockCount: 200
  },
  {
    id: 'prod-sweets-kaju-katli',
    name: 'Silver Vark Kaju Katli',
    hindiName: 'शाही काजू कतली',
    category: 'sweets',
    price: 490,
    originalPrice: 550,
    unit: '500g Box',
    rating: 4.9,
    reviewsCount: 3120,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    description: 'Our flagship signature sweet! Made with 100% premium Goa cashew nuts, pure Desi Ghee, and real silver leaf. Diamond cut to perfection.',
    nutrition: {
      calories: '445 kcal / 100g',
      protein: '11.5g',
      fat: '22.0g',
      carbs: '52.0g'
    },
    ingredients: ['Premium Cashews (70%)', 'Pure Sugar', 'Desi Ghee', 'Silver Vark'],
    shelfLife: '15 Days at room temperature',
    storage: 'Store in airtight container away from direct sunlight.',
    isSubscriptionEligible: false,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: false,
    tags: ['Signature Sweet', 'Goa Cashews', 'Pure Desi Ghee', 'Gift Special'],
    inStock: true,
    stockCount: 350
  },
  {
    id: 'prod-sweets-milk-cake',
    name: 'Alwar Special Desi Ghee Milk Cake',
    hindiName: 'अलवर का मलाई मिल्क केक',
    category: 'sweets',
    price: 360,
    originalPrice: 400,
    unit: '500g Box',
    rating: 4.8,
    reviewsCount: 1290,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    description: 'Slow-cooked milk solid caramel sweet infused with cardamom and fried in pure Desi Ghee. Rich dual-tone golden color with grainy moist texture.',
    nutrition: {
      calories: '410 kcal / 100g',
      protein: '9.8g',
      fat: '19.5g',
      carbs: '49.0g'
    },
    ingredients: ['Full Cream Milk', 'Sugar', 'Pure Desi Ghee', 'Green Cardamom'],
    shelfLife: '10 Days',
    storage: 'Store in cool dry environment.',
    isSubscriptionEligible: false,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: false,
    tags: ['Slow Cooked', 'Traditional', 'Rich Milk'],
    inStock: true,
    stockCount: 180
  },
  {
    id: 'prod-curd-lassi',
    name: 'Kulhad Matka Organic Curd (Dahi)',
    hindiName: 'कुल्हड़ मटका मीठा दही',
    category: 'curd-lassi',
    price: 65,
    originalPrice: 75,
    unit: '500g Clay Pot',
    rating: 4.9,
    reviewsCount: 1620,
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&q=80&w=800',
    description: 'Set naturally in unglazed terracotta clay pots. Thick, creamy, non-acidic curd packed with healthy gut probiotic bacteria.',
    nutrition: {
      calories: '60 kcal / 100g',
      protein: '3.8g',
      fat: '3.5g',
      carbs: '4.0g'
    },
    ingredients: ['Pure Cow Milk', 'Lactic Culture'],
    shelfLife: '3 Days (Refrigerated)',
    storage: 'Refrigerate at 2°C - 4°C.',
    isSubscriptionEligible: true,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: true,
    tags: ['Probiotic', 'Clay Pot', 'Gut Health'],
    inStock: true,
    stockCount: 140
  },
  {
    id: 'prod-lassi-malai',
    name: 'Royal Kesari Kulhad Lassi',
    hindiName: 'रॉयल केरी कुल्हड़ लस्सी',
    category: 'curd-lassi',
    price: 60,
    originalPrice: 70,
    unit: '350ml Bottle',
    rating: 4.9,
    reviewsCount: 2100,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800',
    description: 'Thick churned yogurt drink topped with a heavy slab of fresh malai, saffron strands, pistachios, and a drop of rose water.',
    nutrition: {
      calories: '180 kcal / 100ml',
      protein: '4.5g',
      fat: '6.0g',
      carbs: '22.0g'
    },
    ingredients: ['Fresh Curd', 'Sugar', 'Cream', 'Kesar (Saffron)', 'Pistachio'],
    shelfLife: '2 Days (Refrigerated)',
    storage: 'Serve chilled. Shake well before opening.',
    isSubscriptionEligible: true,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: false,
    tags: ['Saffron', 'Malai Top', 'Chilled Drink'],
    inStock: true,
    stockCount: 160
  },
  {
    id: 'prod-sweets-gulab-jamun',
    name: 'Desi Ghee Royal Shahi Gulab Jamun',
    hindiName: 'देशी घी गुलाब जामुन',
    category: 'sweets',
    price: 320,
    originalPrice: 380,
    unit: '500g Container (approx 10 pcs)',
    rating: 4.9,
    reviewsCount: 2450,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800',
    description: 'Soft Khoya dumplings fried to deep golden brown in 100% Desi Ghee and soaked in rose-cardamom saffron sugar syrup.',
    nutrition: {
      calories: '320 kcal / 100g',
      protein: '6.2g',
      fat: '14.0g',
      carbs: '48.0g'
    },
    ingredients: ['Pure Mawa (Khoya)', 'Desi Ghee', 'Sugar', 'Rose Water', 'Cardamom', 'Pistachios'],
    shelfLife: '7 Days',
    storage: 'Reheat slightly before serving for maximum softness.',
    isSubscriptionEligible: false,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: false,
    tags: ['Pure Ghee', 'Warm Sweet', 'Festival Special'],
    inStock: true,
    stockCount: 220
  },
  {
    id: 'prod-sweets-rasgulla',
    name: 'Sponge Bengali Chhena Rasgulla',
    hindiName: 'स्पंज बंगाली छेना रसगुल्ला',
    category: 'sweets',
    price: 280,
    originalPrice: 320,
    unit: '500g Tin',
    rating: 4.8,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
    description: 'Feather-light spongy balls crafted from fresh cow milk cottage cheese, boiled in light aromatic sugar syrup.',
    nutrition: {
      calories: '186 kcal / 100g',
      protein: '4.8g',
      fat: '1.2g',
      carbs: '38.0g'
    },
    ingredients: ['Fresh Cow Milk Chhena', 'Sugar', 'Rose Extract'],
    shelfLife: '12 Days',
    storage: 'Serve chilled.',
    isSubscriptionEligible: false,
    isBestSeller: false,
    isFreshToday: true,
    isOrganic: false,
    tags: ['Bengali Sweet', 'Low Fat', 'Chilled'],
    inStock: true,
    stockCount: 130
  },
  {
    id: 'prod-hampers-royal-box',
    name: 'Shiv Signature Festival Gift Hamper',
    hindiName: 'शिव रॉयल उत्सव गिफ्ट बॉक्स',
    category: 'festival-hampers',
    price: 1850,
    originalPrice: 2200,
    unit: '1.2 kg Luxury Box',
    rating: 5.0,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    description: 'A regal collection featuring 250g Kaju Katli, 250g Pista Burfi, 250g Anjeer Dry Fruit Roll, 250g Mathura Peda, and a jar of A2 Desi Ghee.',
    nutrition: {
      calories: '450 kcal / 100g avg',
      protein: '10g',
      fat: '20g',
      carbs: '50g'
    },
    ingredients: ['Assorted Premium Nuts', 'Pure Mawa', 'Silver Leaf', 'Desi Ghee'],
    shelfLife: '20 Days',
    storage: 'Keep in velvet gift packaging in cool room.',
    isSubscriptionEligible: false,
    isBestSeller: true,
    isFreshToday: true,
    isOrganic: true,
    tags: ['Luxury Box', 'Gifting', 'Diwali Special', 'Corporate Gift'],
    inStock: true,
    stockCount: 90
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Ansh Gupta',
  phone: '+91 98765 43210',
  email: 'ansh.gupta@shivmilk.com',
  walletBalance: 450,
  rewardPoints: 1250,
  tier: 'Gold Member',
  addresses: [
    {
      id: 'addr-1',
      title: 'Home',
      address: 'House No. 42, Green Park Avenue, Main Road',
      pincode: '110001',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Office',
      address: 'Tower B, 7th Floor, Cyber City Phase II',
      pincode: '122002',
      isDefault: false
    }
  ]
};

export const MOCK_STORES: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'Shiv Flagship Store - Connaught Place',
    address: 'Block C, Inner Circle, Connaught Place, New Delhi',
    city: 'New Delhi',
    pincode: '110001',
    phone: '+91 11 2345 6789',
    timings: '6:00 AM - 11:00 PM (All 7 Days)',
    googleMapUrl: 'https://maps.google.com/?q=Connaught+Place+Delhi',
    distanceKm: 1.2,
    features: ['Fresh Milk Counter', 'Live Jalebi & Rabri', 'Tasting Lounge', 'Drive-Thru Pickups']
  },
  {
    id: 'store-2',
    name: 'Shiv Dairy Hub - Sector 18 Noida',
    address: 'Near Atta Market Metro Station, Sector 18, Noida',
    city: 'Noida',
    pincode: '201301',
    phone: '+91 120 456 7890',
    timings: '6:00 AM - 10:30 PM',
    googleMapUrl: 'https://maps.google.com/?q=Sector+18+Noida',
    distanceKm: 3.8,
    features: ['Cold Chain Storage', 'Bulk Gift Booking', 'Daily Milk Subscription Counter']
  },
  {
    id: 'store-3',
    name: 'Shiv Sweets & Pure Ghee - DLF Cyber Hub',
    address: 'Ground Floor, DLF Cyber City, Sector 24, Gurugram',
    city: 'Gurugram',
    pincode: '122002',
    phone: '+91 124 987 6543',
    timings: '7:00 AM - 11:30 PM',
    googleMapUrl: 'https://maps.google.com/?q=Cyber+Hub+Gurugram',
    distanceKm: 5.4,
    features: ['Corporate Gift Desk', 'Valet Parking', 'Express 15-Min Delivery Hub']
  }
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Authentic Royal Shahi Paneer in Creamy White Gravy',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    difficulty: 'Easy',
    ingredients: [
      '250g Shiv Soft Malai Paneer (cubed)',
      '2 tbsp Shiv Desi Bilona Ghee',
      '1/2 cup Shiv Royal Full Cream Milk',
      '15 Cashew nuts soaked in warm water',
      '1 tsp Green cardamom powder & saffron strands',
      'Fresh cream, ginger-garlic paste, and mild spices'
    ],
    steps: [
      'Blend soaked cashews with 2 tbsp Shiv milk into a silky velvety paste.',
      'Heat Shiv Desi Ghee in a wok, saute whole spices until fragrant.',
      'Add cashew paste and cook on low flame until ghee separates.',
      'Pour in Shiv Full Cream Milk and simmer gracefully.',
      'Gently add Shiv Malai Paneer cubes and simmer for 4 minutes.',
      'Garnish with saffron milk, silvered almonds, and serve hot with Naan!'
    ],
    mainProductUsed: 'prod-paneer-fresh'
  },
  {
    id: 'recipe-2',
    title: 'Festive Kesari Malai Rasmalai at Home',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 6,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
    difficulty: 'Medium',
    ingredients: [
      '1 Litre Shiv Organic A2 Cow Milk',
      '1/2 cup Sugar',
      '10-12 strands Kashmiri Saffron',
      '1/4 cup chopped Pistachios and Almonds',
      '1 tbsp Lemon juice for curdling'
    ],
    steps: [
      'Boil Shiv A2 Milk and curdle with lemon juice to get fresh soft Chhena.',
      'Knead Chhena smoothly for 8 minutes and roll into flattened discs.',
      'Simmer milk with saffron, sugar, and cardamom till reduced by half into Rabri.',
      'Boil Chhena discs in light sugar syrup for 10 minutes until spongy.',
      'Soak discs in saffron Rabri for 3 hours and serve chilled!'
    ],
    mainProductUsed: 'prod-milk-a2'
  }
];

export const VALID_PINCODES: Record<string, { city: string; area: string; estimatedDelivery: string }> = {
  '110001': { city: 'New Delhi', area: 'Connaught Place / Central Delhi', estimatedDelivery: 'Express 30 Mins' },
  '110016': { city: 'New Delhi', area: 'Hauz Khas / Green Park', estimatedDelivery: 'Morning 6 AM Slot' },
  '201301': { city: 'Noida', area: 'Sector 18 / Atta Market', estimatedDelivery: 'Express 45 Mins' },
  '122002': { city: 'Gurugram', area: 'DLF Phase II / Cyber City', estimatedDelivery: 'Express 30 Mins' },
  '110024': { city: 'New Delhi', area: 'Lajpat Nagar / Defence Colony', estimatedDelivery: 'Express 40 Mins' },
  '201307': { city: 'Noida', area: 'Sector 62 / Electronic City', estimatedDelivery: 'Morning 6 AM Slot' },
  '160017': { city: 'Chandigarh', area: 'Sector 17 Plaza', estimatedDelivery: 'Next Morning 6 AM' }
};

export const INITIAL_USER: UserProfile = MOCK_USER;

export const INITIAL_SUBSCRIPTIONS: any[] = [
  {
    id: 'SUB-8921',
    productId: 'prod-milk-a2',
    productName: 'Pure Organic A2 Cow Milk',
    productImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800',
    frequency: 'daily',
    quantity: 2,
    unit: '1 Litre',
    pricePerUnit: 76,
    slot: 'morning',
    startDate: '2025-01-01',
    status: 'active',
    address: 'House No. 42, Green Park Avenue, New Delhi (110001)'
  },
  {
    id: 'SUB-8922',
    productId: 'prod-paneer-fresh',
    productName: 'Soft Fresh Malai Paneer',
    productImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    frequency: 'alternate',
    quantity: 1,
    unit: '250g Pack',
    pricePerUnit: 112,
    slot: 'morning',
    startDate: '2025-01-05',
    status: 'active',
    address: 'House No. 42, Green Park Avenue, New Delhi (110001)'
  }
];

export const INITIAL_ORDERS: any[] = [
  {
    id: 'SHIV-948210',
    date: '06 Aug 2025',
    items: [
      {
        productName: 'Goa Cashew Kaju Katli (Silver Vark)',
        quantity: 1,
        price: 520,
        unit: '500g Box',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800'
      },
      {
        productName: 'Vedic A2 Gir Cow Bilona Desi Ghee',
        quantity: 1,
        price: 1150,
        unit: '1 Litre Glass Jar',
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800'
      }
    ],
    totalAmount: 1670,
    discount: 0,
    deliveryFee: 0,
    status: 'confirmed',
    deliverySlot: 'Morning 6:00 AM - 8:00 AM',
    address: {
      name: 'Ansh Gupta',
      phone: '+91 98765 43210',
      street: 'House No. 42, Green Park Avenue, Main Road',
      city: 'New Delhi',
      pincode: '110001'
    },
    paymentMethod: 'upi',
    driver: {
      name: 'Ramesh Sharma',
      phone: '+91 98112 34567',
      vehicleNumber: 'DL 01 AB 4289',
      etaMinutes: 20
    }
  }
];

