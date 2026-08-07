import React, { useState } from 'react';
import { 
  Star, 
  Eye, 
  Plus, 
  Check, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  onSubscribe: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onSubscribe,
  onToggleWishlist,
  isWishlisted
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-white border border-[#800000]/10 hover:border-[#800000]/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-[#800000]/10 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#FDF5E6] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges Over Image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-[#800000] text-[#FDF5E6] text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Best Seller
            </span>
          )}
          {product.isFreshToday && (
            <span className="bg-[#D4AF37] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Fresh Morning
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-white/90 text-[#800000] border border-[#800000]/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md">
              100% Organic A2
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition z-10 ${
            isWishlisted
              ? 'bg-[#800000] text-[#FDF5E6]'
              : 'bg-white/80 text-[#800000] hover:text-[#600000] hover:bg-white border border-[#800000]/10'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2.5 right-2.5 bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] p-2 rounded-full border border-[#D4AF37]/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg flex items-center gap-1 px-3 text-[10px] font-bold uppercase tracking-widest"
        >
          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Quick View</span>
        </button>

      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between text-xs text-[#D4AF37] mb-1">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-bold text-[#121212]">{product.rating}</span>
              <span className="text-[#121212]/50">({product.reviewsCount})</span>
            </div>
            <span className="text-[11px] text-[#121212]/60 font-bold uppercase tracking-wider">
              {product.unit}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-base text-[#121212] hover:text-[#800000] cursor-pointer line-clamp-1 transition"
          >
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs text-[#800000] font-sans font-medium">{product.hindiName}</p>
          )}

          <p className="text-xs text-[#121212]/60 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Pricing & Subscription Info */}
        <div className="space-y-2 pt-2 border-t border-[#800000]/10">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-[#800000]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#121212]/40 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            
            {product.isSubscriptionEligible && (
              <button
                onClick={() => onSubscribe(product)}
                className="text-[10px] font-bold uppercase tracking-wider text-[#800000] hover:text-[#600000] bg-[#FDF5E6] hover:bg-white px-2.5 py-1 rounded-full border border-[#800000]/20 flex items-center gap-1 transition"
              >
                <Calendar className="w-3 h-3 text-[#800000]" />
                <span>Daily Plan</span>
              </button>
            )}
          </div>

          {/* Quantity and Add to Cart Row */}
          <div className="flex items-center gap-2">
            
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#FDF5E6] border border-[#800000]/20 rounded-lg px-2 py-1 text-xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-[#800000] hover:text-[#600000] px-1 font-bold"
              >
                -
              </button>
              <span className="font-bold text-[#121212] px-2 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-[#800000] hover:text-[#600000] px-1 font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex-1 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-md ${
                !product.inStock
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
