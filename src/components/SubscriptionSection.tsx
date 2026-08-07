import React, { useState } from 'react';
import { 
  Calendar, 
  Check, 
  Clock, 
  Sparkles, 
  Milk, 
  PauseCircle, 
  PlayCircle, 
  Palmtree, 
  ShieldCheck, 
  Plus, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Product, SubscriptionPlan } from '../types';

interface SubscriptionSectionProps {
  products: Product[];
  activeSubscriptions: SubscriptionPlan[];
  onCreateSubscription: (plan: Omit<SubscriptionPlan, 'id'>) => void;
  onPauseSubscription: (id: string) => void;
  onResumeSubscription: (id: string) => void;
  onClose?: () => void;
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  products,
  activeSubscriptions,
  onCreateSubscription,
  onPauseSubscription,
  onResumeSubscription,
  onClose
}) => {
  // Filter subscription-eligible items (A2 Milk, Buffalo Milk, Bilona Ghee, Paneer, Curd, Lassi)
  const eligibleProducts = products.filter(p => p.isSubscriptionEligible);

  const [selectedProductId, setSelectedProductId] = useState<string>(eligibleProducts[0]?.id || '');
  const [frequency, setFrequency] = useState<'daily' | 'alternate' | 'weekly' | 'custom'>('daily');
  const [customDays, setCustomDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [quantity, setQuantity] = useState(1);
  const [slot, setSlot] = useState<'morning' | 'evening'>('morning');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedProduct = eligibleProducts.find(p => p.id === selectedProductId) || eligibleProducts[0];

  const handleToggleCustomDay = (day: string) => {
    if (customDays.includes(day)) {
      if (customDays.length > 1) {
        setCustomDays(customDays.filter(d => d !== day));
      }
    } else {
      setCustomDays([...customDays, day]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    onCreateSubscription({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      frequency,
      customDays: frequency === 'custom' ? customDays : undefined,
      quantity,
      unit: selectedProduct.unit,
      pricePerUnit: Math.round(selectedProduct.price * 0.9), // 10% subscription discount
      slot,
      startDate,
      status: 'active',
      address: 'House No. 42, Green Park Avenue, New Delhi (PIN: 110001)'
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  const calculateMonthlyEstimate = () => {
    if (!selectedProduct) return 0;
    const discountedPrice = Math.round(selectedProduct.price * 0.9);
    let daysPerMonth = 30;
    if (frequency === 'alternate') daysPerMonth = 15;
    if (frequency === 'weekly') daysPerMonth = 4;
    if (frequency === 'custom') daysPerMonth = customDays.length * 4;
    return discountedPrice * quantity * daysPerMonth;
  };

  return (
    <div className="bg-white text-[#121212] p-6 sm:p-8 rounded-3xl border border-[#800000]/10 shadow-2xl space-y-8 max-w-5xl mx-auto my-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#800000]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#800000] font-serif text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Shiv Daily Morning Freshness Plan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black italic text-[#121212] mt-1 tracking-tight">
            Automated Dairy Subscription
          </h2>
          <p className="text-xs sm:text-sm text-[#121212]/70 mt-1">
            Get 100% Raw A2 Milk, Soft Paneer & Curd delivered to your door every morning by 7:00 AM. Pause anytime during vacations with zero cancellation fees!
          </p>
        </div>

        <div className="bg-[#FDF5E6] border border-[#800000]/20 p-3.5 rounded-2xl text-xs flex items-center gap-3 shadow-xs">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" />
          <div>
            <div className="font-bold text-[#800000] uppercase tracking-wider text-[11px]">Subscribe & Save 10%</div>
            <div className="text-[#121212]/60">Guaranteed early morning slot</div>
          </div>
        </div>
      </div>

      {/* Active Subscriptions List if exists */}
      {activeSubscriptions.length > 0 && (
        <div className="space-y-3 bg-[#FDF5E6] p-4 rounded-2xl border border-[#800000]/10">
          <h3 className="font-serif font-bold text-[#121212] text-sm flex items-center gap-2">
            <Milk className="w-4 h-4 text-[#800000]" />
            <span>Your Active Subscriptions ({activeSubscriptions.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeSubscriptions.map((sub) => (
              <div 
                key={sub.id} 
                className="bg-white border border-[#800000]/15 rounded-xl p-3 flex items-center justify-between text-xs shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={sub.productImage} alt={sub.productName} className="w-10 h-10 object-cover rounded-lg border border-[#800000]/10" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-bold text-[#121212]">{sub.productName}</div>
                    <div className="text-[#800000] font-medium text-[11px]">
                      {sub.quantity} {sub.unit} • {sub.frequency.toUpperCase()} • ₹{sub.pricePerUnit}/day
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {sub.status === 'active' ? (
                    <button
                      onClick={() => onPauseSubscription(sub.id)}
                      className="p-1.5 bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] rounded-lg text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition"
                      title="Pause for Vacation"
                    >
                      <PauseCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Pause</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onResumeSubscription(sub.id)}
                      className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition"
                      title="Resume Plan"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-white" />
                      <span>Resume</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscription Configurator Form */}
      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FDF5E6]/60 p-6 rounded-3xl border border-[#800000]/10">
        
        {/* Left Column - Product & Frequency */}
        <div className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">
              1. Select Dairy Product
            </label>
            <div className="grid grid-cols-2 gap-2">
              {eligibleProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center gap-2.5 ${
                    selectedProductId === p.id
                      ? 'bg-[#800000] border-[#800000] text-[#FDF5E6] shadow-md'
                      : 'bg-white border-[#800000]/15 text-[#121212] hover:border-[#800000]/40'
                  }`}
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-md" referrerPolicy="no-referrer" />
                  <div className="overflow-hidden">
                    <div className="font-bold text-xs truncate">{p.name}</div>
                    <div className={`text-[10px] font-bold ${selectedProductId === p.id ? 'text-[#D4AF37]' : 'text-[#800000]'}`}>
                      ₹{Math.round(p.price * 0.9)} / {p.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">
              2. Delivery Frequency
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'daily', label: 'Every Day' },
                { id: 'alternate', label: 'Alternate Days' },
                { id: 'weekly', label: 'Once a Week' },
                { id: 'custom', label: 'Custom Days' }
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setFrequency(item.id as any)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition text-center ${
                    frequency === item.id
                      ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                      : 'bg-white text-[#121212] border-[#800000]/15 hover:bg-[#FDF5E6]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {frequency === 'custom' && (
              <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#800000]/10">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => handleToggleCustomDay(day)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition ${
                      customDays.includes(day)
                        ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                        : 'bg-white text-[#121212]/60 border-[#800000]/10'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Slot, Quantity & Confirmation */}
        <div className="space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Quantity and Slot */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">
                  Daily Quantity
                </label>
                <div className="flex items-center bg-white border border-[#800000]/20 rounded-xl px-3 py-2 text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#800000] px-2 font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-[#121212]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#800000] px-2 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSlot('morning')}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition ${
                      slot === 'morning'
                        ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                        : 'bg-white text-[#121212] border-[#800000]/20'
                    }`}
                  >
                    6:00 - 8:00 AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlot('evening')}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition ${
                      slot === 'evening'
                        ? 'bg-[#800000] text-[#FDF5E6] border-[#800000]'
                        : 'bg-white text-[#121212] border-[#800000]/20'
                    }`}
                  >
                    6:00 - 8:00 PM
                  </button>
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold text-[#800000] uppercase tracking-widest mb-1">
                Subscription Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-[#800000]/20 rounded-xl px-3 py-2 text-xs text-[#121212]"
              />
            </div>

            {/* Price Estimation */}
            <div className="bg-white border border-[#800000]/15 p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-xs">
              <div>
                <div className="text-[#121212]/60 font-bold uppercase tracking-widest text-[10px]">Estimated Monthly Cost:</div>
                <div className="text-xl font-black text-[#800000]">
                  ₹{calculateMonthlyEstimate().toLocaleString()} / month
                </div>
              </div>
              <div className="text-right text-[10px] text-[#800000] font-bold uppercase tracking-wider">
                10% Off Included • Pay Daily
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition flex items-center justify-center gap-2 shadow-xl ${
              isSuccess
                ? 'bg-emerald-700 text-white'
                : 'bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] active:scale-98'
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>Subscription Activated Successfully!</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <span>Activate Daily Subscription Plan</span>
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};
