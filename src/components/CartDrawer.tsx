import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Gift, 
  Tag, 
  Check, 
  Wallet, 
  ShieldCheck,
  Truck
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedCoupon: string, walletUsed: number, isGiftWrap: boolean) => void;
  walletBalance: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  walletBalance
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [useWallet, setUseWallet] = useState(false);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const giftWrapFee = isGiftWrap ? 50 : 0;
  
  const walletDeduction = useWallet ? Math.min(walletBalance, subtotal) : 0;
  const totalAmount = Math.max(0, subtotal - couponDiscount - walletDeduction + deliveryFee + giftWrapFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'PURE100') {
      if (subtotal < 300) {
        setCouponError('Minimum order ₹300 required for PURE100 coupon.');
        return;
      }
      setCouponDiscount(100);
      setAppliedCoupon('PURE100');
    } else if (code === 'FESTIVE15') {
      const disc = Math.round(subtotal * 0.15);
      setCouponDiscount(disc);
      setAppliedCoupon('FESTIVE15');
    } else {
      setCouponError('Invalid coupon code. Try PURE100 or FESTIVE15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-amber-950 text-amber-50 border-l border-amber-800/80 shadow-2xl flex flex-col justify-between relative">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-900 to-amber-950 border-b border-amber-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-800/80 rounded-xl border border-amber-700/50">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="font-serif font-extrabold text-lg text-amber-100">
                  Your Pure Fresh Bag
                </h2>
                <p className="text-xs text-amber-300/80">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-amber-300 hover:text-white hover:bg-amber-900 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-16 h-16 text-amber-600/40 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-amber-200">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-amber-400/80 max-w-xs mx-auto">
                  Add fresh A2 Cow Milk, Bilona Desi Ghee, Soft Paneer, or Royal Kaju Katli to experience pure dairy excellence!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-extrabold px-6 py-2.5 rounded-full transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-amber-900/30 border border-amber-800/60 p-3 rounded-2xl flex items-center gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-amber-700/50 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-serif font-bold text-xs text-amber-100 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-amber-400/80">
                      ₹{item.product.price} / {item.product.unit}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-amber-950 border border-amber-800 rounded-lg px-2 py-0.5 text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                          }
                          className="text-amber-300 font-bold px-1"
                        >
                          -
                        </button>
                        <span className="font-bold text-amber-100 px-2 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-amber-300 font-bold px-1"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-amber-300">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-amber-400/60 hover:text-red-400 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="space-y-3 pt-2">
                
                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter Promo Code (PURE100)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-amber-950 border border-amber-800 rounded-xl pl-8 pr-3 py-2 text-xs text-amber-100 uppercase placeholder-amber-400/50 focus:outline-none"
                      />
                      <Tag className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="bg-amber-800 hover:bg-amber-700 text-amber-200 text-xs font-bold px-4 py-2 rounded-xl transition border border-amber-700/50"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Coupon '{appliedCoupon}' applied! Saved ₹{couponDiscount}
                    </div>
                  )}
                  {couponError && (
                    <div className="text-[11px] text-red-400">{couponError}</div>
                  )}
                </form>

                {/* Wallet Balance Toggle */}
                {walletBalance > 0 && (
                  <label className="flex items-center justify-between p-3 bg-amber-900/40 border border-amber-800/80 rounded-2xl cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-xs font-bold text-amber-200">Use Shiv Wallet</div>
                        <div className="text-[10px] text-amber-400/80">Available balance: ₹{walletBalance}</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={useWallet}
                      onChange={(e) => setUseWallet(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                  </label>
                )}

                {/* Gift Wrap Toggle */}
                <label className="flex items-center justify-between p-3 bg-amber-900/40 border border-amber-800/80 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-amber-200">Royal Velvet Gift Packaging</div>
                      <div className="text-[10px] text-amber-400/80">Gold foil ribbon & message card (+₹50)</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                </label>

              </div>
            )}

          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-amber-900/40 border-t border-amber-800/80 space-y-3">
              
              <div className="space-y-1.5 text-xs text-amber-200/90">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-amber-100">₹{subtotal}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount:</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                {walletDeduction > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Wallet Applied:</span>
                    <span>-₹{walletDeduction}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                {isGiftWrap && (
                  <div className="flex justify-between">
                    <span>Gift Wrapping:</span>
                    <span>₹50</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-extrabold text-amber-300 pt-2 border-t border-amber-800/60">
                  <span>Grand Total:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onProceedToCheckout(appliedCoupon, walletDeduction, isGiftWrap);
                }}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-extrabold py-3.5 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-950" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
