import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Building, 
  Check, 
  Truck, 
  FileText
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
  appliedCoupon: string;
  walletUsed: number;
  isGiftWrap: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cartItems,
  onClose,
  onOrderPlaced,
  appliedCoupon,
  walletUsed,
  isGiftWrap
}) => {
  const [step, setStep] = useState<'address' | 'slot' | 'payment' | 'confirmation'>('address');
  
  // Form State
  const [name, setName] = useState('Ansh Gupta');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [street, setStreet] = useState('House No. 42, Green Park Avenue, Main Road');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState('110001');

  const [deliverySlot, setDeliverySlot] = useState('Morning 6:00 AM - 8:00 AM');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'wallet'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [otp, setOtp] = useState('4289');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = appliedCoupon === 'PURE100' ? 100 : appliedCoupon === 'FESTIVE15' ? Math.round(subtotal * 0.15) : 0;
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const giftWrapFee = isGiftWrap ? 50 : 0;
  const totalAmount = Math.max(0, subtotal - discount - walletUsed + deliveryFee + giftWrapFee);

  const handleConfirmOrder = () => {
    const newOrder: Order = {
      id: `SHIV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        unit: item.product.unit,
        image: item.product.image
      })),
      totalAmount,
      discount,
      deliveryFee,
      status: 'confirmed',
      deliverySlot,
      address: {
        name,
        phone,
        street,
        city,
        pincode
      },
      paymentMethod,
      driver: {
        name: 'Ramesh Sharma (Shiv Dairy Express Partner)',
        phone: '+91 98112 34567',
        vehicleNumber: 'DL 01 AB 4289',
        etaMinutes: 25
      }
    };

    onOrderPlaced(newOrder);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-serif font-extrabold text-xl text-amber-100">
                Secure Express Checkout
              </h2>
              <p className="text-xs text-amber-300/80">
                100% Insulated Cold Chain Delivery Guarantee
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

        {/* Checkout Steps Tracker */}
        {step !== 'confirmation' && (
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-amber-900 pb-4">
            <div className={`p-2 rounded-xl transition ${step === 'address' ? 'bg-amber-500 text-amber-950' : 'bg-amber-900/40 text-amber-300'}`}>
              1. Delivery Address
            </div>
            <div className={`p-2 rounded-xl transition ${step === 'slot' ? 'bg-amber-500 text-amber-950' : 'bg-amber-900/40 text-amber-300'}`}>
              2. Delivery Slot
            </div>
            <div className={`p-2 rounded-xl transition ${step === 'payment' ? 'bg-amber-500 text-amber-950' : 'bg-amber-900/40 text-amber-300'}`}>
              3. Payment & OTP
            </div>
          </div>
        )}

        {/* STEP 1: Address */}
        {step === 'address' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Enter Delivery Location Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-amber-300 mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-amber-300 mb-1">Street Address / House No. / Landmark</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">6-Digit Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-amber-900/50 border border-amber-800 rounded-xl px-3 py-2 text-amber-100"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('slot')}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-extrabold py-3 rounded-2xl text-xs transition"
            >
              Continue to Choose Delivery Slot →
            </button>
          </div>
        )}

        {/* STEP 2: Delivery Slot */}
        {step === 'slot' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Select Morning or Evening Slot</span>
            </h3>

            <div className="space-y-2">
              {[
                { slot: 'Morning 6:00 AM - 8:00 AM', desc: 'Fresh morning milking batch delivered directly' },
                { slot: 'Afternoon 12:00 PM - 2:00 PM', desc: 'Ideal for lunch paneer & curd preparation' },
                { slot: 'Evening 6:00 PM - 8:00 PM', desc: 'Fresh evening sweet & milk delivery' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setDeliverySlot(item.slot)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    deliverySlot === item.slot
                      ? 'bg-amber-900 border-amber-400 text-amber-100 shadow-md'
                      : 'bg-amber-950 border-amber-800 text-amber-300/80 hover:border-amber-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{item.slot}</div>
                    <div className="text-[11px] text-amber-400/80">{item.desc}</div>
                  </div>
                  {deliverySlot === item.slot && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('address')}
                className="w-1/3 bg-amber-900 hover:bg-amber-800 text-amber-200 py-3 rounded-2xl text-xs font-bold transition"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep('payment')}
                className="w-2/3 bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-extrabold py-3 rounded-2xl text-xs transition"
              >
                Proceed to Payment (₹{totalAmount}) →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment & Confirmation */}
        {step === 'payment' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Choose Payment Method</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'upi', label: 'Instant UPI (Google Pay / PhonePe)', icon: Smartphone },
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'cod', label: 'Cash on Delivery', icon: Building },
                { id: 'wallet', label: 'Shiv Dairy Wallet', icon: ShieldCheck }
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-3 rounded-2xl border font-bold text-left transition flex items-center gap-2 ${
                      paymentMethod === method.id
                        ? 'bg-amber-500 text-amber-950 border-amber-400'
                        : 'bg-amber-900/40 text-amber-200 border-amber-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'upi' && (
              <div className="p-3 bg-amber-900/30 border border-amber-800 rounded-2xl flex items-center justify-around text-xs">
                {['gpay', 'phonepe', 'paytm'].map((app) => (
                  <button
                    key={app}
                    onClick={() => setUpiApp(app as any)}
                    className={`px-3 py-1.5 rounded-xl uppercase font-bold border transition ${
                      upiApp === app ? 'bg-amber-400 text-amber-950 border-amber-300' : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            )}

            {/* Simulated OTP verification */}
            <div className="bg-amber-900/30 p-3 rounded-2xl border border-amber-800/60 text-xs space-y-1">
              <div className="font-bold text-amber-200">Enter Verification OTP sent to {phone}:</div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                className="w-full bg-amber-950 border border-amber-800 rounded-xl px-3 py-2 text-amber-100 font-mono tracking-widest text-center text-base"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('slot')}
                className="w-1/3 bg-amber-900 hover:bg-amber-800 text-amber-200 py-3 rounded-2xl text-xs font-bold transition"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirmOrder}
                className="w-2/3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-amber-950 font-extrabold py-3 rounded-2xl text-xs transition shadow-lg shadow-emerald-900/50"
              >
                Confirm & Pay ₹{totalAmount}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Order Confirmation Success */}
        {step === 'confirmation' && (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-extrabold text-amber-100">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-amber-300/80 mt-1">
                Your fresh milk and dairy items are scheduled for {deliverySlot}.
              </p>
            </div>

            <div className="bg-amber-900/40 p-4 rounded-2xl border border-amber-800/60 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between font-bold text-amber-200">
                <span>Order Reference:</span>
                <span className="text-amber-400">SHIV-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival:</span>
                <span className="text-emerald-400 font-bold">25 - 30 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span>{street}, {city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-extrabold px-8 py-3 rounded-2xl text-xs shadow-xl transition"
            >
              Track Live Order Status
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
