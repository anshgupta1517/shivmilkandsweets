import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Flame,
  Star
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenSubscriptions: () => void;
  onOpenPincodeModal: () => void;
  onOpenAIChat: () => void;
  currentPincode: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenSubscriptions,
  onOpenPincodeModal,
  onOpenAIChat,
  currentPincode
}) => {
  const [liveOrdersCount, setLiveOrdersCount] = useState(1482);
  const [activeSlide, setActiveSlide] = useState(0);

  // Live order counter ticker for real-time engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOrdersCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const heroBanners = [
    {
      title: "Pure Organic A2 Milk & Vedic Bilona Ghee",
      subtitle: "Milked freshly at 4:00 AM, delivered to your doorstep by 7:00 AM. 100% Raw, Unprocessed & Lab Tested.",
      badge: "Pure Organic Farm Fresh",
      buttonText: "Subscribe Daily Milk",
      bgGradient: "from-amber-950 via-amber-900 to-amber-950",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Handcrafted Royal Sweets in 100% Pure Desi Ghee",
      subtitle: "Goa Cashew Kaju Katli, Alwar Milk Cake, Soft Gulab Jamun & Bengali Chhena Rasgulla made with love since 1999.",
      badge: "Silver Vark & Pure Mawa",
      buttonText: "Explore Mithai Collection",
      bgGradient: "from-amber-900 via-amber-950 to-amber-900",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Melt-in-Mouth Soft Malai Paneer & Kulhad Curd",
      subtitle: "Made fresh every single morning without preservatives or chemicals. High protein, rich texture, unmatched taste.",
      badge: "Fresh Morning Batch",
      buttonText: "Order Fresh Paneer",
      bgGradient: "from-amber-950 via-stone-900 to-amber-950",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="relative bg-[#FDF5E6] text-[#121212] overflow-hidden border-b border-[#800000]/10">
      
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-24 right-12 w-32 h-32 border-2 border-[#D4AF37]/10 rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-20 left-12 w-64 h-64 border border-[#800000]/5 rounded-full opacity-20 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Heritage Badge */}
            <div className="inline-flex items-center gap-2 py-1 px-3.5 border border-[#800000]/30 rounded-full bg-white/50">
              <span className="w-2 h-2 rounded-full bg-[#800000]"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000]">Est. 1999 • Delhi's Finest Heritage</span>
            </div>

            {/* Live Trust Tickers */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#800000]/10 text-[#800000] border border-[#800000]/20">
                <Flame className="w-3.5 h-3.5 text-[#800000] animate-pulse" />
                <span>{liveOrdersCount.toLocaleString()} Deliveries Today</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#121212] border border-[#D4AF37]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>FSSAI Certified Pure</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-[#800000] border border-[#800000]/20">
                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span>4.9 / 5 Rating</span>
              </span>
            </div>

            {/* Editorial Serif Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black italic leading-[0.92] tracking-tighter text-[#121212]">
                The Gold <br/> 
                Standard of <br/>
                <span className="text-[#800000] not-italic">Pure Dairy.</span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#121212]/75 max-w-xl font-sans pt-2">
                {heroBanners[activeSlide].subtitle}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenSubscriptions}
                className="px-8 py-4 bg-[#800000] text-[#FDF5E6] font-bold uppercase tracking-widest text-xs rounded-sm shadow-xl shadow-[#800000]/20 hover:bg-[#600000] transition flex items-center gap-2"
              >
                <span>{heroBanners[activeSlide].buttonText}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={onExploreProducts}
                className="px-8 py-4 border border-[#800000] text-[#800000] font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition flex items-center gap-2"
              >
                <span>Explore Sweets</span>
                <ChevronRight className="w-4 h-4 text-[#800000]" />
              </button>

              <button
                onClick={onOpenAIChat}
                className="px-4 py-3 border border-[#D4AF37] text-[#121212] font-bold uppercase tracking-widest text-xs rounded-sm bg-white/70 hover:bg-white transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>AI Sommelier</span>
              </button>
            </div>

            {/* Floating Quick Info Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#800000]/10 max-w-lg">
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4AF37]">100%</p>
                <p className="text-[10px] uppercase font-black text-[#121212]/60 tracking-widest">Natural & Raw</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4AF37]">2hr</p>
                <p className="text-[10px] uppercase font-black text-[#121212]/60 tracking-widest">Farm-to-Home</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4AF37]">A2+</p>
                <p className="text-[10px] uppercase font-black text-[#121212]/60 tracking-widest">Desi Cow Breed</p>
              </div>
            </div>

            {/* Pincode Checker Bar */}
            <div className="pt-2 max-w-lg">
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#800000]/15 shadow-xs">
                <input
                  type="text"
                  placeholder="Verify 6-digit Pincode (e.g. 110001)"
                  defaultValue={currentPincode}
                  className="bg-transparent px-3 py-1 text-xs text-[#121212] placeholder-[#121212]/40 focus:outline-none flex-1 font-mono"
                />
                <button
                  onClick={onOpenPincodeModal}
                  className="bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] font-bold uppercase tracking-widest px-4 py-2 rounded-md text-[10px] transition"
                >
                  Verify Slot
                </button>
              </div>
            </div>

            {/* Banner Dots indicator */}
            <div className="flex items-center gap-2 pt-2">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-8 bg-[#800000]' : 'w-2 bg-[#800000]/20'}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Editorial Product Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#800000]/10 shadow-xl flex flex-col gap-6 relative">
              <div className="flex items-baseline justify-between border-b border-[#121212]/10 pb-4">
                <h3 className="font-serif text-2xl italic font-bold text-[#121212]">Featured Delights</h3>
                <button onClick={onExploreProducts} className="text-[10px] font-bold uppercase underline tracking-widest text-[#800000]">
                  View Catalog
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Product Tile 1 */}
                <div 
                  onClick={onExploreProducts}
                  className="group relative bg-[#FDF5E6] p-5 rounded-xl border border-[#800000]/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#800000]/40 transition"
                >
                   <div className="w-24 h-24 bg-white rounded-full mb-3 shadow-inner flex items-center justify-center border border-[#D4AF37]/30 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=300" alt="A2 Milk" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <h4 className="font-bold uppercase text-xs tracking-tighter text-[#121212]">A2 Desi Cow Milk</h4>
                   <p className="text-[11px] text-[#800000] font-black mt-1">₹76.00 / Litre</p>
                   <span className="mt-2 text-[9px] uppercase font-bold tracking-widest text-[#121212]/60 border-b border-[#121212]/20 pb-0.5">Quick Add</span>
                </div>
                
                {/* Product Tile 2 */}
                <div 
                  onClick={onExploreProducts}
                  className="group relative bg-[#800000] p-5 rounded-xl flex flex-col items-center justify-center text-center text-[#FDF5E6] cursor-pointer shadow-lg hover:bg-[#600000] transition"
                >
                   <div className="w-24 h-24 bg-[#FDF5E6]/10 rounded-full mb-3 flex items-center justify-center border border-[#D4AF37]/50 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=300" alt="Kaju Katli" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <h4 className="font-bold uppercase text-xs tracking-tighter text-[#FDF5E6]">Goa Kaju Katli</h4>
                   <p className="text-[11px] text-[#D4AF37] font-black mt-1">₹520.00 / Box</p>
                   <span className="mt-2 text-[9px] uppercase font-bold tracking-widest text-[#D4AF37] border-b border-[#D4AF37]/40 pb-0.5">Gift This</span>
                </div>

                {/* Product Tile 3 */}
                <div 
                  onClick={onExploreProducts}
                  className="bg-white p-4 rounded-xl border border-dashed border-[#D4AF37]/40 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FDF5E6]/50 transition"
                >
                   <div className="w-16 h-16 bg-[#FDF5E6] rounded-full mb-2 flex items-center justify-center text-2xl border border-[#D4AF37]/20">🍶</div>
                   <h4 className="font-bold uppercase text-[11px] tracking-tighter text-[#121212]">Vedic Bilona Ghee</h4>
                   <p className="text-[10px] text-[#800000] font-bold mt-0.5">Liquid Gold</p>
                </div>

                {/* Product Tile 4 */}
                <div 
                  onClick={onExploreProducts}
                  className="bg-white p-4 rounded-xl border border-dashed border-[#D4AF37]/40 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FDF5E6]/50 transition"
                >
                   <div className="w-16 h-16 bg-[#FDF5E6] rounded-full mb-2 flex items-center justify-center text-2xl border border-[#D4AF37]/20">🧀</div>
                   <h4 className="font-bold uppercase text-[11px] tracking-tighter text-[#121212]">Soft Malai Paneer</h4>
                   <p className="text-[10px] text-[#800000] font-bold mt-0.5">Fresh Daily</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Editorial Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#800000]/10 text-xs">
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#800000]/10 shadow-xs">
            <Truck className="w-6 h-6 text-[#800000] shrink-0" />
            <div>
              <div className="font-bold uppercase text-[11px] text-[#121212]">Same Day Fresh Delivery</div>
              <div className="text-[10px] text-[#121212]/60">Cold chain insulated vans</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#800000]/10 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#800000] shrink-0" />
            <div>
              <div className="font-bold uppercase text-[11px] text-[#121212]">Zero Preservatives</div>
              <div className="text-[10px] text-[#121212]/60">Pure natural fresh ingredients</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#800000]/10 shadow-xs">
            <Award className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold uppercase text-[11px] text-[#121212]">Vedic Bilona Method</div>
              <div className="text-[10px] text-[#121212]/60">Granular & aromatic ghee</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#800000]/10 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-[#800000] shrink-0" />
            <div>
              <div className="font-bold uppercase text-[11px] text-[#121212]">Trusted Since 1999</div>
              <div className="text-[10px] text-[#121212]/60">Over 100,000+ Happy Families</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
