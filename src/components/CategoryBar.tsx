import React from 'react';
import { 
  Milk, 
  Flame, 
  Sparkles, 
  Gift, 
  Calendar, 
  UtensilsCrossed, 
  Layers
} from 'lucide-react';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSubscriptions: () => void;
  onOpenBulkOrder: () => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSubscriptions,
  onOpenBulkOrder
}) => {
  const categories = [
    { id: 'all', label: 'All Pure Essentials', icon: Layers },
    { id: 'milk', label: 'Fresh A2 & Buffalo Milk', icon: Milk },
    { id: 'ghee', label: 'Desi Bilona Ghee', icon: Flame },
    { id: 'paneer', label: 'Fresh Malai Paneer', icon: UtensilsCrossed },
    { id: 'curd-lassi', label: 'Kulhad Curd & Lassi', icon: Sparkles },
    { id: 'sweets', label: 'Royal Mithai & Sweets', icon: Sparkles },
    { id: 'festival-hampers', label: 'Gift Hampers & Boxes', icon: Gift },
  ];

  return (
    <div className="bg-white/90 border-b border-[#800000]/10 sticky top-[80px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#800000] text-[#FDF5E6] shadow-md shadow-[#800000]/20 scale-102'
                      : 'bg-white text-[#121212]/80 hover:bg-[#FDF5E6] hover:text-[#800000] border border-[#800000]/15'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#800000]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Shortcuts */}
          <div className="hidden lg:flex items-center gap-3 min-w-max border-l border-[#800000]/15 pl-4">
            <button
              onClick={onOpenSubscriptions}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#800000] hover:text-[#600000] transition bg-white px-3.5 py-1.5 rounded-full border border-[#800000]/20 shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#800000]" />
              <span>Daily Milk Subscriptions</span>
            </button>

            <button
              onClick={onOpenBulkOrder}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#800000] hover:text-[#600000] transition bg-white px-3.5 py-1.5 rounded-full border border-[#800000]/20 shadow-2xs"
            >
              <Gift className="w-3.5 h-3.5 text-[#800000]" />
              <span>Bulk Gifting</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
