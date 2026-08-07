import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  Sparkles, 
  Bot, 
  Calendar, 
  Heart, 
  Store, 
  Building2, 
  ShieldCheck, 
  Menu, 
  X,
  PhoneCall
} from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  currentPincode: string;
  onOpenPincodeModal: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenAIChat: () => void;
  onOpenSubscriptions: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  onOpenStoreLocator: () => void;
  onOpenBulkOrder: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPincode,
  onOpenPincodeModal,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAIChat,
  onOpenSubscriptions,
  onOpenAccount,
  onOpenAdmin,
  onOpenStoreLocator,
  onOpenBulkOrder,
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredSearchProducts = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hindiName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md text-[#121212] border-b border-[#800000]/10 shadow-sm">
      {/* Top Bar - Brand Promise & Support */}
      <div className="bg-[#1A1A1A] text-[#FDF5E6]/80 text-xs px-4 py-1.5 border-b border-[#800000]/20 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium text-[#D4AF37]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> 100% Pure Organic Dairy & Vedic Bilona Ghee
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-[#FDF5E6]/90">Fresh Morning Milking Delivered by 7:00 AM</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenStoreLocator}
            className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Find Stores</span>
          </button>
          <a href="tel:+911123456789" className="hidden sm:flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>+91 11 2345 6789</span>
          </a>
          <button 
            onClick={onOpenAdmin}
            className="bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider transition"
          >
            Admin Panel
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-[#800000] flex items-center justify-center rounded-sm shadow-md">
            <span className="text-[#D4AF37] font-serif text-2xl font-bold italic">S</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-black tracking-tighter leading-none text-[#121212]">
              SHIV <span className="text-[#800000]">MILK</span>
            </h1>
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#800000]/80">
              Sweets & Dairy • Est. 1999
            </p>
          </div>
        </div>

        {/* Pincode Delivery Badge */}
        <button
          onClick={onOpenPincodeModal}
          className="hidden lg:flex items-center gap-2 bg-white hover:bg-[#FDF5E6] border border-[#800000]/20 rounded-full px-3.5 py-1.5 text-xs text-[#121212] transition shadow-xs"
        >
          <MapPin className="w-4 h-4 text-[#800000]" />
          <div className="text-left">
            <div className="text-[9px] text-[#800000] uppercase font-bold tracking-wider">Deliver to</div>
            <div className="font-bold text-[#121212]">{currentPincode ? `PIN: ${currentPincode}` : 'Select Pincode'}</div>
          </div>
        </button>

        {/* Search Bar with AI Quick Suggestions */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search A2 Milk, Desi Ghee, Kaju Katli, Paneer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-white border border-[#800000]/20 rounded-full pl-10 pr-10 py-2 text-sm text-[#121212] placeholder-[#121212]/50 focus:outline-none focus:ring-2 focus:ring-[#800000]/30 focus:border-[#800000] transition shadow-xs"
            />
            <Search className="w-4 h-4 text-[#800000] absolute left-3.5 top-2.5" />
            <button
              onClick={onOpenAIChat}
              title="Ask AI Sweet Advisor"
              className="absolute right-2 top-1.5 p-1 bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] rounded-full transition text-xs flex items-center gap-1 px-2.5"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Ask</span>
            </button>
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && filteredSearchProducts.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white border border-[#800000]/20 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 text-[11px] font-bold text-[#800000] uppercase tracking-wider bg-[#FDF5E6]">
                Matching Pure Products
              </div>
              {filteredSearchProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-[#FDF5E6] cursor-pointer transition border-b border-[#800000]/10 last:border-0"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-[#800000]/20" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#121212]">{p.name}</div>
                    <div className="text-xs text-[#800000] font-bold">₹{p.price} / {p.unit}</div>
                  </div>
                  <span className="text-[10px] bg-[#800000]/10 text-[#800000] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Chef Assistant Button */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] font-bold uppercase tracking-widest px-3.5 py-2 rounded-full text-xs shadow-md transition transform active:scale-95"
          >
            <Bot className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">AI Sommelier</span>
          </button>

          {/* Subscriptions */}
          <button
            onClick={onOpenSubscriptions}
            className="flex items-center gap-1.5 border border-[#800000]/20 hover:bg-white text-[#800000] font-bold uppercase tracking-wider px-3 py-2 rounded-full text-xs transition"
          >
            <Calendar className="w-4 h-4 text-[#800000]" />
            <span className="hidden md:inline">Daily Milk Plan</span>
          </button>

          {/* Bulk Orders */}
          <button
            onClick={onOpenBulkOrder}
            className="hidden xl:flex items-center gap-1.5 border border-[#800000]/20 hover:bg-white text-[#800000] font-bold uppercase tracking-wider px-3 py-2 rounded-full text-xs transition"
          >
            <Building2 className="w-4 h-4 text-[#800000]" />
            <span>Bulk Orders</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenAccount}
            className="relative p-2 text-[#800000] hover:text-[#600000] transition"
            title="Wishlist & Account"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b89428] text-white font-bold uppercase tracking-widest px-4 py-2 rounded-full text-xs shadow-md transition transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#800000] text-[#FDF5E6] font-extrabold text-[11px] px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <button
            onClick={onOpenAccount}
            className="p-2 text-[#800000] hover:text-[#600000] transition hidden sm:block"
            title="User Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#800000] hover:text-[#600000] transition md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDF5E6] border-b border-[#800000]/20 p-4 space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#800000]/20 rounded-full pl-9 pr-4 py-2 text-sm text-[#121212] placeholder-[#121212]/50"
            />
            <Search className="w-4 h-4 text-[#800000] absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { onOpenPincodeModal(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 bg-white rounded-lg text-[#121212] border border-[#800000]/20 font-bold uppercase text-[10px] tracking-wider"
            >
              <MapPin className="w-4 h-4 text-[#800000]" />
              <span>Pincode: {currentPincode || 'Select'}</span>
            </button>
            <button
              onClick={() => { onOpenSubscriptions(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 bg-white rounded-lg text-[#121212] border border-[#800000]/20 font-bold uppercase text-[10px] tracking-wider"
            >
              <Calendar className="w-4 h-4 text-[#800000]" />
              <span>Subscriptions</span>
            </button>
            <button
              onClick={() => { onOpenBulkOrder(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 bg-white rounded-lg text-[#121212] border border-[#800000]/20 font-bold uppercase text-[10px] tracking-wider"
            >
              <Building2 className="w-4 h-4 text-[#800000]" />
              <span>Bulk Orders</span>
            </button>
            <button
              onClick={() => { onOpenStoreLocator(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 bg-white rounded-lg text-[#121212] border border-[#800000]/20 font-bold uppercase text-[10px] tracking-wider"
            >
              <Store className="w-4 h-4 text-[#800000]" />
              <span>Store Locator</span>
            </button>
            <button
              onClick={() => { onOpenAccount(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2.5 bg-white rounded-lg text-[#121212] border border-[#800000]/20 font-bold uppercase text-[10px] tracking-wider col-span-2"
            >
              <User className="w-4 h-4 text-[#800000]" />
              <span>My Account & Orders</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
