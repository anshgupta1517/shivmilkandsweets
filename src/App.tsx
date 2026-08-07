import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { SubscriptionSection } from './components/SubscriptionSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AIChefAssistantModal } from './components/AIChefAssistantModal';
import { UserAccountModal } from './components/UserAccountModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { BulkOrderModal } from './components/BulkOrderModal';
import { PincodeCheckerModal } from './components/PincodeCheckerModal';
import { RecipesSection } from './components/RecipesSection';
import { Footer } from './components/Footer';

import { 
  INITIAL_PRODUCTS, 
  MOCK_STORES, 
  MOCK_RECIPES, 
  INITIAL_USER, 
  INITIAL_SUBSCRIPTIONS, 
  INITIAL_ORDERS 
} from './data/mockData';
import { Product, CartItem, Order, SubscriptionPlan, UserProfile } from './types';

export function App() {
  // Master State
  const [pincode, setPincode] = useState('110001');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 },
    { product: INITIAL_PRODUCTS[2], quantity: 1 }
  ]);
  const [activeSubscriptions, setActiveSubscriptions] = useState<SubscriptionPlan[]>(INITIAL_SUBSCRIPTIONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Modal Visibility Controls
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [activeOrderForTracking, setActiveOrderForTracking] = useState<Order | null>(INITIAL_ORDERS[0] || null);
  const [isAIChefOpen, setIsAIChefOpen] = useState(false);
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isBulkOrderOpen, setIsBulkOrderOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  // Checkout Params
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [walletUsed, setWalletUsed] = useState(0);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Subscription Operations
  const handleCreateSubscription = (newPlan: Omit<SubscriptionPlan, 'id'>) => {
    const created: SubscriptionPlan = {
      ...newPlan,
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setActiveSubscriptions((prev) => [created, ...prev]);
  };

  const handlePauseSubscription = (id: string) => {
    setActiveSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'paused' } : sub))
    );
  };

  const handleResumeSubscription = (id: string) => {
    setActiveSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'active' } : sub))
    );
  };

  // Order Placement
  const handleProceedToCheckout = (coupon: string, walletAmount: number, giftWrap: boolean) => {
    setAppliedCoupon(coupon);
    setWalletUsed(walletAmount);
    setIsGiftWrap(giftWrap);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderForTracking(newOrder);
    setCartItems([]);
    if (walletUsed > 0) {
      setUser((prev) => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - walletUsed),
        rewardPoints: prev.rewardPoints + Math.round(newOrder.totalAmount * 0.1)
      }));
    }
  };

  // Reorder
  const handleReorder = (pastOrder: Order) => {
    pastOrder.items.forEach((item) => {
      const foundProduct = products.find((p) => p.name === item.productName);
      if (foundProduct) {
        handleAddToCart(foundProduct, item.quantity);
      }
    });
    setIsUserAccountOpen(false);
    setIsCartOpen(true);
  };

  // Admin Stock Update
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockCount: newStock } : p))
    );
  };

  // Total cart items count
  const cartBadgeCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDF5E6] text-[#121212] font-sans selection:bg-[#800000] selection:text-[#FDF5E6]">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        pincode={pincode}
        cartCount={cartBadgeCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIChef={() => setIsAIChefOpen(true)}
        onOpenUserAccount={() => setIsUserAccountOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenBulkOrder={() => setIsBulkOrderOpen(true)}
        onOpenPincodeModal={() => setIsPincodeModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Layout */}
      <main className="space-y-8 pb-16">
        
        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById('catalog-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSubscribeClick={() => {
            const el = document.getElementById('subscription-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBulkOrder={() => setIsBulkOrderOpen(true)}
        />

        {/* Sticky Category Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Catalog Section */}
        <div id="catalog-grid" className="scroll-mt-24">
          <ProductGrid
            products={products}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSubscribe={(p) => setQuickViewProduct(p)}
          />
        </div>

        {/* Subscription Configurator Section */}
        <div id="subscription-section" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <SubscriptionSection
            products={products}
            activeSubscriptions={activeSubscriptions}
            onCreateSubscription={handleCreateSubscription}
            onPauseSubscription={handlePauseSubscription}
            onResumeSubscription={handleResumeSubscription}
          />
        </div>

        {/* Recipes & Culinary Magic */}
        <div id="recipes">
          <RecipesSection
            recipes={MOCK_RECIPES}
            onSelectProduct={(productId) => {
              const prod = products.find((p) => p.id === productId);
              if (prod) setQuickViewProduct(prod);
            }}
          />
        </div>

      </main>

      {/* Footer */}
      <Footer
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenBulkOrder={() => setIsBulkOrderOpen(true)}
        onOpenSubscriptions={() => {
          const el = document.getElementById('subscription-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MODALS & DRAWERS */}

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(product, qty) => {
            handleAddToCart(product, qty);
          }}
          onSubscribe={(product) => {
            setQuickViewProduct(null);
            const el = document.getElementById('subscription-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        walletBalance={user.walletBalance}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          cartItems={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={handleOrderPlaced}
          appliedCoupon={appliedCoupon}
          walletUsed={walletUsed}
          isGiftWrap={isGiftWrap}
        />
      )}

      {/* Order Live Tracking Modal */}
      {isOrderTrackerOpen && (
        <OrderTrackerModal
          order={activeOrderForTracking}
          onClose={() => setIsOrderTrackerOpen(false)}
        />
      )}

      {/* Gemini AI Culinary Assistant Modal */}
      {isAIChefOpen && (
        <AIChefAssistantModal
          onClose={() => setIsAIChefOpen(false)}
        />
      )}

      {/* User Account & Subscription Manager Modal */}
      {isUserAccountOpen && (
        <UserAccountModal
          user={user}
          orders={orders}
          subscriptions={activeSubscriptions}
          onClose={() => setIsUserAccountOpen(false)}
          onReorder={handleReorder}
          onPauseSubscription={handlePauseSubscription}
          onResumeSubscription={handleResumeSubscription}
          onOpenStoreLocator={() => {
            setIsUserAccountOpen(false);
            setIsStoreLocatorOpen(true);
          }}
        />
      )}

      {/* Admin Executive Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboardModal
          products={products}
          orders={orders}
          subscriptions={activeSubscriptions}
          onClose={() => setIsAdminOpen(false)}
          onUpdateStock={handleUpdateStock}
        />
      )}

      {/* Store Locator Modal */}
      {isStoreLocatorOpen && (
        <StoreLocatorModal
          stores={MOCK_STORES}
          onClose={() => setIsStoreLocatorOpen(false)}
          onSelectStorePin={(pin) => setPincode(pin)}
        />
      )}

      {/* Bulk Order & Catering Modal */}
      {isBulkOrderOpen && (
        <BulkOrderModal
          onClose={() => setIsBulkOrderOpen(false)}
        />
      )}

      {/* Pincode Coverage Checker Modal */}
      {isPincodeModalOpen && (
        <PincodeCheckerModal
          currentPincode={pincode}
          onSetPincode={(pin) => setPincode(pin)}
          onClose={() => setIsPincodeModalOpen(false)}
        />
      )}

    </div>
  );
}

export default App;
