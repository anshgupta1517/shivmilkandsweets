import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  FileSpreadsheet, 
  Settings, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { Product, Order, SubscriptionPlan } from '../types';

interface AdminDashboardModalProps {
  products: Product[];
  orders: Order[];
  subscriptions: SubscriptionPlan[];
  onClose: () => void;
  onUpdateStock: (productId: string, newStock: number) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  products,
  orders,
  subscriptions,
  onClose,
  onUpdateStock
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders' | 'subscriptions'>('analytics');
  const [stockSearch, setStockSearch] = useState('');

  // Analytics Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 142850);
  const totalOrdersCount = orders.length + 384;
  const lowStockCount = products.filter(p => p.stockCount < 100).length;

  const filteredInventory = products.filter(p => 
    p.name.toLowerCase().includes(stockSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(stockSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/80 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-amber-50 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-800 rounded-xl border border-amber-700">
              <Settings className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-extrabold text-xl text-amber-100">
                  Shiv Executive Admin Control Panel
                </h2>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-amber-300/80">
                Dairy Operations • Inventory Management • GST Invoicing • Subscriptions
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

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-amber-900/40 p-3.5 rounded-2xl border border-amber-800 space-y-1">
            <div className="text-amber-400/80 flex items-center justify-between">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-300">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">+18.4% from last month</div>
          </div>

          <div className="bg-amber-900/40 p-3.5 rounded-2xl border border-amber-800 space-y-1">
            <div className="text-amber-400/80 flex items-center justify-between">
              <span>Orders Fulfilled</span>
              <Package className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-300">{totalOrdersCount}</div>
            <div className="text-[10px] text-amber-300/70">100% On-time delivery</div>
          </div>

          <div className="bg-amber-900/40 p-3.5 rounded-2xl border border-amber-800 space-y-1">
            <div className="text-amber-400/80 flex items-center justify-between">
              <span>Active Subscriptions</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-300">{subscriptions.length + 210} Active</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Morning 6:00 AM slots</div>
          </div>

          <div className="bg-amber-900/40 p-3.5 rounded-2xl border border-amber-800 space-y-1">
            <div className="text-amber-400/80 flex items-center justify-between">
              <span>Stock Alerts</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-300">{lowStockCount} Items Low</div>
            <div className="text-[10px] text-amber-400/80">Batch replenishment ready</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-amber-800/60 text-xs font-bold overflow-x-auto no-scrollbar">
          {[
            { id: 'analytics', label: 'Sales & Revenue Analytics' },
            { id: 'inventory', label: `Inventory Stock (${products.length})` },
            { id: 'orders', label: `Order Management (${orders.length})` },
            { id: 'subscriptions', label: `Subscriptions (${subscriptions.length})` }
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

        {/* TAB 1: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 text-xs animate-fadeIn">
            <div className="bg-amber-900/30 p-4 rounded-2xl border border-amber-800/60 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-amber-200 text-sm">Monthly Revenue Distribution</h3>
                <span className="text-amber-400 font-bold">Dairy (62%) • Sweets (38%)</span>
              </div>

              {/* Visual Simulated Bar Chart */}
              <div className="space-y-2 pt-2">
                {[
                  { name: 'Pure Organic A2 Cow Milk', amount: '₹48,200', pct: '85%' },
                  { name: 'Desi A2 Bilona Ghee', amount: '₹36,500', pct: '70%' },
                  { name: 'Silver Vark Kaju Katli', amount: '₹28,900', pct: '58%' },
                  { name: 'Soft Malai Paneer', amount: '₹18,400', pct: '42%' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-bold text-amber-100">
                      <span>{item.name}</span>
                      <span>{item.amount}</span>
                    </div>
                    <div className="w-full bg-amber-950 rounded-full h-2 overflow-hidden border border-amber-800">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-4 text-xs animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                placeholder="Search inventory stock by name or category..."
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                className="w-full bg-amber-900/50 border border-amber-800 rounded-xl pl-9 pr-4 py-2 text-amber-100"
              />
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-2.5" />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredInventory.map((product) => (
                <div key={product.id} className="bg-amber-900/30 border border-amber-800 p-3 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-amber-100">{product.name}</div>
                      <div className="text-amber-400/80">₹{product.price} / {product.unit}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-amber-300">Stock: {product.stockCount} units</div>
                      {product.stockCount < 100 && (
                        <div className="text-[10px] text-amber-400 font-semibold">Low Stock Alert</div>
                      )}
                    </div>

                    <div className="flex items-center bg-amber-950 border border-amber-800 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateStock(product.id, Math.max(0, product.stockCount - 10))}
                        className="text-amber-300 font-bold px-1.5"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => onUpdateStock(product.id, product.stockCount + 25)}
                        className="text-amber-300 font-bold px-1.5 border-l border-amber-800"
                      >
                        +25
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-3 text-xs animate-fadeIn">
            {orders.length === 0 ? (
              <div className="text-center py-6 text-amber-400/80">No recent orders to manage.</div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="bg-amber-900/30 border border-amber-800 p-3.5 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-100">{o.id} • {o.address.name} ({o.address.pincode})</div>
                    <div className="text-amber-400/80">{o.items.length} Items • Total: ₹{o.totalAmount} • {o.deliverySlot}</div>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full font-bold uppercase">
                    {o.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
