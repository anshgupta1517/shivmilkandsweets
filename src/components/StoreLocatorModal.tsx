import React, { useState } from 'react';
import { 
  X, 
  Store, 
  MapPin, 
  PhoneCall, 
  Clock, 
  Navigation, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { StoreLocation } from '../types';

interface StoreLocatorModalProps {
  stores: StoreLocation[];
  onClose: () => void;
  onSelectStorePin: (pincode: string) => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  stores,
  onClose,
  onSelectStorePin
}) => {
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredStores = selectedCity === 'all'
    ? stores
    : stores.filter(s => s.city.toLowerCase().includes(selectedCity.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-800 rounded-xl border border-amber-700">
              <Store className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="font-serif font-extrabold text-xl text-amber-100">
                Shiv Milk & Sweets Store Locator
              </h2>
              <p className="text-xs text-amber-300/80">
                Visit our experience centers & tasting lounges across Delhi NCR
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

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['all', 'New Delhi', 'Noida', 'Gurugram'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition border ${
                selectedCity === city
                  ? 'bg-amber-500 text-amber-950 border-amber-400'
                  : 'bg-amber-900/40 text-amber-300 border-amber-800 hover:bg-amber-900'
              }`}
            >
              {city === 'all' ? 'All Experience Stores' : city}
            </button>
          ))}
        </div>

        {/* Stores List */}
        <div className="space-y-4">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-amber-900/30 border border-amber-800/80 rounded-2xl p-4 space-y-3 hover:border-amber-600/60 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/60 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-amber-100">
                    {store.name}
                  </h3>
                  <div className="text-xs text-amber-300/80 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{store.address} (PIN: {store.pincode})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectStorePin(store.pincode);
                      onClose();
                    }}
                    className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-700/50 transition"
                  >
                    Set Delivery PIN
                  </button>

                  <a
                    href={store.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Map Directions</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-200/90">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Timings: {store.timings}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Contact: {store.phone}</span>
                </div>
              </div>

              {/* Features Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {store.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                  >
                    • {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
