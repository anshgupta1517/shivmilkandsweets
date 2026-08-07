import React, { useState, useEffect } from 'react';
import { 
  X, 
  Truck, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [eta, setEta] = useState(order.driver?.etaMinutes || 20);

  // Live countdown timer for order delivery
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-serif font-extrabold text-xl text-amber-100">
                Live Delivery Tracking
              </h2>
              <p className="text-xs text-amber-300/80">
                Order ID: <span className="font-mono font-bold text-amber-400">{order.id}</span>
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

        {/* Live Status Card */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-950 p-4 rounded-2xl border border-amber-700/60 flex items-center justify-between">
          <div className="space-y-1">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Out For Delivery
            </span>
            <div className="text-xl font-serif font-extrabold text-amber-100">
              Arriving in ~{eta} Minutes
            </div>
            <div className="text-xs text-amber-300/80 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Slot: {order.deliverySlot}</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold">
            {eta}m
          </div>
        </div>

        {/* Driver Details */}
        {order.driver && (
          <div className="bg-amber-900/30 p-4 rounded-2xl border border-amber-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center font-bold text-amber-200">
                RS
              </div>
              <div>
                <div className="font-bold text-amber-100">{order.driver.name}</div>
                <div className="text-amber-400/80">Vehicle: {order.driver.vehicleNumber}</div>
              </div>
            </div>

            <a
              href={`tel:${order.driver.phone}`}
              className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-bold border border-amber-700/50 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Partner</span>
            </a>
          </div>
        )}

        {/* Interactive Simulated Map */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-amber-800 bg-amber-900/40 flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center mx-auto shadow-xl animate-bounce">
              <Navigation className="w-5 h-5 text-amber-950" />
            </div>
            <div className="text-xs font-bold text-amber-200">
              Partner is 1.8 km away on Main Connaught Road
            </div>
            <div className="text-[10px] text-amber-400/80">
              Live GPS Syncing Active
            </div>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="space-y-2 border-t border-amber-800/60 pt-4 text-xs">
          <div className="font-bold text-amber-200">Items in this Delivery:</div>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-amber-900/20 p-2.5 rounded-xl border border-amber-800/40">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.productName} className="w-8 h-8 object-cover rounded-md" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-semibold text-amber-100">{item.productName}</div>
                    <div className="text-[10px] text-amber-400/80">{item.quantity} x {item.unit}</div>
                  </div>
                </div>
                <div className="font-extrabold text-amber-300">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
