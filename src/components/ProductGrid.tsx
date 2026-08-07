import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  searchQuery: string;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  onSubscribe: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
  onSubscribe,
  onToggleWishlist,
  wishlistIds
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterSubscription, setFilterSubscription] = useState(false);
  const [filterBestSeller, setFilterBestSeller] = useState(false);

  // Filter products by category, search query, and tags
  let filtered = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || (p.hindiName && p.hindiName.toLowerCase().includes(q));
      const matchTag = p.tags.some(t => t.toLowerCase().includes(q));
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchTag && !matchCategory) return false;
    }
    if (filterOrganic && !p.isOrganic) return false;
    if (filterSubscription && !p.isSubscriptionEligible) return false;
    if (filterBestSeller && !p.isBestSeller) return false;

    return true;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // default popular
  });

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'milk': return 'Fresh Organic A2 & Buffalo Milk';
      case 'ghee': return 'Vedic A2 Bilona Desi Ghee';
      case 'paneer': return 'Handcrafted Soft Malai Paneer';
      case 'curd-lassi': return 'Probiotic Kulhad Curd & Lassi';
      case 'sweets': return 'Royal Indian Sweets & Mithai';
      case 'festival-hampers': return 'Luxury Gift Boxes & Festive Hampers';
      default: return 'Explore Pure Dairy & Fresh Sweets Collection';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#800000]/10">
        
        <div>
          <div className="flex items-center gap-2 text-[#800000] font-serif text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Shiv Pure Dairy & Sweets Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black italic text-[#121212] mt-1 tracking-tight">
            {getCategoryTitle()}
          </h2>
          <p className="text-xs text-[#121212]/60 mt-1">
            Showing {filtered.length} items crafted with 100% purity guarantees
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Quick Filter Badges */}
          <button
            onClick={() => setFilterBestSeller(!filterBestSeller)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition ${
              filterBestSeller
                ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                : 'bg-white text-[#121212] border-[#800000]/20 hover:bg-[#FDF5E6]'
            }`}
          >
            Best Sellers
          </button>

          <button
            onClick={() => setFilterOrganic(!filterOrganic)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition ${
              filterOrganic
                ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                : 'bg-white text-[#121212] border-[#800000]/20 hover:bg-[#FDF5E6]'
            }`}
          >
            100% Organic
          </button>

          <button
            onClick={() => setFilterSubscription(!filterSubscription)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition ${
              filterSubscription
                ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                : 'bg-white text-[#121212] border-[#800000]/20 hover:bg-[#FDF5E6]'
            }`}
          >
            Daily Subscriptions
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-[#800000]/20 rounded-full px-3.5 py-1.5 text-xs text-[#121212]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#800000]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#121212] focus:outline-none cursor-pointer font-bold uppercase text-[10px] tracking-wider"
            >
              <option value="popular" className="bg-white">Most Popular</option>
              <option value="rating" className="bg-white">Highest Rated</option>
              <option value="price-low" className="bg-white">Price: Low to High</option>
              <option value="price-high" className="bg-white">Price: High to Low</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid Display */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#800000]/10 rounded-3xl p-8 max-w-md mx-auto space-y-3 shadow-md">
          <SlidersHorizontal className="w-12 h-12 text-[#800000] mx-auto opacity-60" />
          <h3 className="text-lg font-serif font-bold text-[#121212]">No matching products found</h3>
          <p className="text-xs text-[#121212]/60">
            Try clearing filters or search for something like "A2 Milk", "Paneer", "Kaju Katli" or "Ghee".
          </p>
          <button
            onClick={() => {
              setFilterOrganic(false);
              setFilterSubscription(false);
              setFilterBestSeller(false);
            }}
            className="mt-2 bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onSubscribe={onSubscribe}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      )}

    </section>
  );
};
