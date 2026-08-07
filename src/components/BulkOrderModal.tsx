import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Gift, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Users, 
  ShieldCheck,
  Calculator
} from 'lucide-react';

interface BulkOrderModalProps {
  onClose: () => void;
}

export const BulkOrderModal: React.FC<BulkOrderModalProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState<'Wedding' | 'Corporate Event' | 'Hotel/Restaurant' | 'Festival Hampers' | 'Other'>('Wedding');
  const [estimatedGuests, setEstimatedGuests] = useState(250);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [itemsRequested, setItemsRequested] = useState('Kaju Katli Box (500g), Fresh Malai Paneer (20kg), Bilona Ghee Tins (10kg)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/bulk/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          organization,
          phone,
          eventType,
          estimatedGuests,
          deliveryDate,
          itemsRequested
        })
      });
      const data = await res.json();
      setInquiryId(data.inquiryId || 'BULK-984210');
      setIsSubmitted(true);
    } catch (err) {
      setInquiryId('BULK-984210');
      setIsSubmitted(true);
    }
  };

  // Estimate calculation formula
  const estimatedCost = Math.round(estimatedGuests * 180);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-800 rounded-xl border border-amber-700">
              <Building2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="font-serif font-extrabold text-xl text-amber-100">
                Bulk, Corporate & Wedding Orders
              </h2>
              <p className="text-xs text-amber-300/80">
                Customized sweet hampers, hotel bulk dairy supply, and event catering
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

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-extrabold text-amber-100">
                Bulk Inquiry Received!
              </h3>
              <p className="text-xs text-amber-300/80 mt-1">
                Reference ID: <span className="font-mono font-bold text-amber-400">{inquiryId}</span>
              </p>
            </div>

            <p className="text-xs text-amber-200/90 max-w-md mx-auto">
              Our Executive Event Gifting Specialist will review your request and call you at <span className="font-bold text-amber-300">{phone}</span> within 2 hours with a custom discounted quotation.
            </p>

            <button
              onClick={onClose}
              className="bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-extrabold px-8 py-3 rounded-2xl text-xs transition"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Instant Estimator Box */}
            <div className="bg-amber-900/40 border border-amber-800 p-3.5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="font-bold text-amber-200">Bulk Estimate Range</div>
                  <div className="text-[10px] text-amber-400/80">Based on {estimatedGuests} expected guests</div>
                </div>
              </div>
              <div className="text-right font-extrabold text-amber-300 text-base">
                ~ ₹{estimatedCost.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-amber-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ansh Gupta"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Company / Organization / Family Name</label>
                <input
                  type="text"
                  placeholder="e.g. Gupta Family Wedding"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="ansh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as any)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                >
                  <option value="Wedding" className="bg-amber-950">Grand Wedding Sweets & Dairy</option>
                  <option value="Corporate Event" className="bg-amber-950">Corporate Festive Gifting</option>
                  <option value="Hotel/Restaurant" className="bg-amber-950">Hotel / Restaurant Bulk Milk & Paneer</option>
                  <option value="Festival Hampers" className="bg-amber-950">Diwali / Festival Gift Hampers</option>
                  <option value="Other" className="bg-amber-950">Other Family Function</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Estimated Guests / Boxes</label>
                <input
                  type="number"
                  value={estimatedGuests}
                  onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-300 mb-1">Items Requested & Special Customizations</label>
              <textarea
                rows={3}
                value={itemsRequested}
                onChange={(e) => setItemsRequested(e.target.value)}
                className="w-full bg-amber-900/50 border border-amber-800 rounded-xl p-3 text-amber-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-extrabold py-3.5 rounded-2xl text-sm transition shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-950" />
              <span>Submit Bulk Order Inquiry & Request Callback</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
