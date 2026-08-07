import React, { useState } from 'react';
import { 
  X, 
  User, 
  Wallet, 
  Award, 
  Calendar, 
  Package, 
  MapPin, 
  RotateCcw, 
  Plus, 
  PauseCircle, 
  PlayCircle,
  FileText
} from 'lucide-react';
import { UserProfile, Order, SubscriptionPlan } from '../types';

interface UserAccountModalProps {
  user: UserProfile;
  orders: Order[];
  subscriptions: SubscriptionPlan[];
  onClose: () => void;
  onReorder: (order: Order) => void;
  onPauseSubscription: (id: string) => void;
  onResumeSubscription: (id: string) => void;
  onOpenStoreLocator: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  user,
  orders,
  subscriptions,
  onClose,
  onReorder,
  onPauseSubscription,
  onResumeSubscription,
  onOpenStoreLocator
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'subscriptions' | 'wallet' | 'addresses'>('dashboard');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-amber-950 font-extrabold flex items-center justify-center text-xl shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-extrabold text-xl text-amber-100">
                  {user.name}
                </h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-amber-300/80">
                {user.phone} • {user.email}
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

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-amber-900/40 p-3 rounded-2xl border border-amber-800 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-amber-400/80">Shiv Wallet</div>
              <div className="text-base font-extrabold text-amber-300">₹{user.walletBalance}</div>
            </div>
          </div>

          <div className="bg-amber-900/40 p-3 rounded-2xl border border-amber-800 flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-amber-400/80">Reward Points</div>
              <div className="text-base font-extrabold text-amber-300">{user.rewardPoints} Pts</div>
            </div>
          </div>

          <div className="bg-amber-900/40 p-3 rounded-2xl border border-amber-800 flex items-center gap-3 col-span-2 sm:col-span-1">
            <Calendar className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-amber-400/80">Active Milk Plans</div>
              <div className="text-base font-extrabold text-amber-300">{subscriptions.length} Active</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-amber-800/60 text-xs font-bold overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard Overview' },
            { id: 'orders', label: `My Orders (${orders.length})` },
            { id: 'subscriptions', label: `Daily Plans (${subscriptions.length})` },
            { id: 'addresses', label: 'Saved Addresses' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 border-b-2 whitespace-nowrap transition ${
                activeTab === tab.id ? 'border-amber-400 text-amber-300' : 'border-transparent text-amber-400/60 hover:text-amber-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 text-xs animate-fadeIn">
            <div className="bg-amber-900/30 p-4 rounded-2xl border border-amber-800/60 space-y-2">
              <h3 className="font-serif font-bold text-amber-200 text-sm">Recent Activity</h3>
              <p className="text-amber-300/80">
                You earned <span className="font-bold text-amber-300">50 Reward Points</span> on your last order! Redeem points on your next Kaju Katli or Bilona Ghee order.
              </p>
            </div>

            {orders.length > 0 && (
              <div className="space-y-2">
                <div className="font-bold text-amber-200">Latest Order:</div>
                <div className="bg-amber-950 border border-amber-800 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-100">{orders[0].id} • ₹{orders[0].totalAmount}</div>
                    <div className="text-amber-400/80">{orders[0].date} • {orders[0].deliverySlot}</div>
                  </div>
                  <button
                    onClick={() => onReorder(orders[0])}
                    className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-3 text-xs animate-fadeIn">
            {orders.length === 0 ? (
              <div className="text-center py-8 text-amber-400/80">No orders placed yet.</div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-amber-900/30 border border-amber-800 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between border-b border-amber-800/60 pb-2">
                    <div>
                      <span className="font-bold text-amber-100">{order.id}</span>
                      <span className="text-amber-400/80 ml-2">({order.date})</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-amber-200/90">
                        <span>{it.quantity} x {it.productName} ({it.unit})</span>
                        <span className="font-bold text-amber-300">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-800/40">
                    <div className="font-extrabold text-amber-300">Total: ₹{order.totalAmount}</div>
                    <button
                      onClick={() => onReorder(order)}
                      className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-3 py-1 rounded-xl font-bold flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                      <span>One-Click Reorder</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-3 text-xs animate-fadeIn">
            {subscriptions.length === 0 ? (
              <div className="text-center py-8 text-amber-400/80">No active daily milk subscriptions.</div>
            ) : (
              subscriptions.map((sub) => (
                <div key={sub.id} className="bg-amber-900/30 border border-amber-800 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={sub.productImage} alt={sub.productName} className="w-12 h-12 object-cover rounded-xl" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-amber-100">{sub.productName}</div>
                      <div className="text-amber-400/80">{sub.quantity} {sub.unit} • {sub.frequency.toUpperCase()} • {sub.slot} slot</div>
                      <div className="text-emerald-400 font-bold">₹{sub.pricePerUnit} / day (10% Off)</div>
                    </div>
                  </div>

                  {sub.status === 'active' ? (
                    <button
                      onClick={() => onPauseSubscription(sub.id)}
                      className="bg-amber-900 hover:bg-amber-800 text-amber-200 border border-amber-700/60 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition"
                    >
                      <PauseCircle className="w-4 h-4 text-amber-400" />
                      <span>Pause for Vacation</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onResumeSubscription(sub.id)}
                      className="bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition"
                    >
                      <PlayCircle className="w-4 h-4 text-emerald-400" />
                      <span>Resume Plan</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-3 text-xs animate-fadeIn">
            {user.addresses.map((addr) => (
              <div key={addr.id} className="bg-amber-900/30 border border-amber-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{addr.title}</span>
                    {addr.isDefault && <span className="bg-amber-500 text-amber-950 font-bold px-2 py-0.2 rounded text-[10px]">DEFAULT</span>}
                  </div>
                  <div className="text-amber-300/80 mt-1">{addr.address}</div>
                  <div className="text-amber-400/80">PIN: {addr.pincode}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
