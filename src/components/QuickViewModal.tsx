import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Plus, 
  Minus, 
  Calendar, 
  ShieldCheck, 
  RotateCw, 
  Clock, 
  Check, 
  Share2, 
  Award,
  Truck
} from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSubscribe: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSubscribe
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'storage'>('details');
  const [is360Active, setIs360Active] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleRotate = () => {
    setIs360Active(true);
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-amber-900/80 hover:bg-amber-800 text-amber-200 p-2 rounded-full transition border border-amber-700/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column - Image & 360 View */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-amber-900/40 border border-amber-800/60 shadow-inner group">
              <img
                src={product.image}
                alt={product.name}
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* 360 Angle Badge */}
              <button
                onClick={handleRotate}
                className="absolute bottom-3 left-3 bg-amber-950/90 hover:bg-amber-900 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-700/50 backdrop-blur-md flex items-center gap-1.5 shadow-lg transition"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>360° Rotate Preview ({rotationAngle}°)</span>
              </button>

              {/* Purity Stamp */}
              <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Guaranteed Pure</span>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-amber-300/90 bg-amber-900/30 p-3 rounded-xl border border-amber-800/40">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Morning Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>No Added Preservatives</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Specs */}
          <div className="space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              
              <div className="flex items-center gap-2">
                <span className="bg-amber-800/60 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-amber-700/40">
                  {product.category.toUpperCase()}
                </span>
                <span className="text-amber-400 text-xs font-medium">
                  {product.unit}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-extrabold text-amber-100">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-sm text-amber-300/80 font-sans mt-0.5">{product.hindiName}</p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <div className="flex items-center gap-1 bg-amber-900/60 px-2 py-0.5 rounded-md border border-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                </div>
                <span>({product.reviewsCount} Verified Customer Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-extrabold text-amber-300">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-amber-400/50 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  Inclusive of All GST
                </span>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-amber-800/60 pt-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 pr-4 border-b-2 transition ${activeTab === 'details' ? 'border-amber-400 text-amber-300' : 'border-transparent text-amber-400/60 hover:text-amber-200'}`}
                >
                  Overview & Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-2 px-4 border-b-2 transition ${activeTab === 'nutrition' ? 'border-amber-400 text-amber-300' : 'border-transparent text-amber-400/60 hover:text-amber-200'}`}
                >
                  Nutrition Facts
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  className={`pb-2 pl-4 border-b-2 transition ${activeTab === 'storage' ? 'border-amber-400 text-amber-300' : 'border-transparent text-amber-400/60 hover:text-amber-200'}`}
                >
                  Shelf Life & Storage
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-amber-200/90 leading-relaxed min-h-[90px] pt-1">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <div className="pt-1">
                      <span className="font-bold text-amber-300">Ingredients: </span>
                      <span>{product.ingredients.join(', ')}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 gap-2 bg-amber-900/30 p-3 rounded-xl border border-amber-800/40">
                    <div>Calories: <span className="font-bold text-amber-300">{product.nutrition.calories}</span></div>
                    <div>Protein: <span className="font-bold text-amber-300">{product.nutrition.protein}</span></div>
                    <div>Fat: <span className="font-bold text-amber-300">{product.nutrition.fat}</span></div>
                    <div>Carbohydrates: <span className="font-bold text-amber-300">{product.nutrition.carbs}</span></div>
                    {product.nutrition.calcium && (
                      <div className="col-span-2">Calcium: <span className="font-bold text-amber-300">{product.nutrition.calcium}</span></div>
                    )}
                  </div>
                )}

                {activeTab === 'storage' && (
                  <div className="space-y-2 bg-amber-900/30 p-3 rounded-xl border border-amber-800/40">
                    <div>
                      <span className="font-bold text-amber-300">Shelf Life: </span>
                      <span>{product.shelfLife}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-300">Storage Instructions: </span>
                      <span>{product.storage}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-amber-800/60">
              
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-amber-900/60 border border-amber-800 rounded-xl px-3 py-2 text-sm font-bold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-amber-300 hover:text-white px-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-amber-100">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-amber-300 hover:text-white px-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition flex items-center justify-center gap-2 shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-900/50'
                      : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-amber-950" />
                      <span>Add to Shopping Bag (₹{product.price * quantity})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Subscription Option */}
              {product.isSubscriptionEligible && (
                <button
                  onClick={() => {
                    onClose();
                    onSubscribe(product);
                  }}
                  className="w-full bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700/60 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Setup Daily / Alternate Day Automatic Milk Plan & Save 10%</span>
                </button>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
