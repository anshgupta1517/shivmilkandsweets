import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Heart, 
  Send,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  onOpenStoreLocator: () => void;
  onOpenBulkOrder: () => void;
  onOpenSubscriptions: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStoreLocator,
  onOpenBulkOrder,
  onOpenSubscriptions
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#121212] text-[#FDF5E6] border-t border-[#800000]/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Quality Certifications Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold text-[#FDF5E6]">FSSAI Certified</div>
              <div className="text-[11px] text-[#FDF5E6]/60">Lic No. 11119001000210</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold text-[#FDF5E6]">Vedic Bilona Method</div>
              <div className="text-[11px] text-[#FDF5E6]/60">Curd churned A2 Ghee</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold text-[#FDF5E6]">100% Organic Farms</div>
              <div className="text-[11px] text-[#FDF5E6]/60">Zero hormonal injections</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold text-[#FDF5E6]">Daily 7 AM Delivery</div>
              <div className="text-[11px] text-[#FDF5E6]/60">Insulated cold vans</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800000] text-[#FDF5E6] font-serif font-bold text-lg flex items-center justify-center border border-[#D4AF37]/40">
                शिव
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#FDF5E6] italic">
                  Shiv Milk & Sweets
                </h3>
                <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">
                  Taste & Purity Together Since 1999
                </p>
              </div>
            </div>

            <p className="text-[#FDF5E6]/70 leading-relaxed max-w-sm">
              Delhi NCR's premier luxury dairy and sweet house. Sourcing organic A2 Cow Milk, crafting Vedic Bilona Desi Ghee, and hand-making silver vark sweets with uncompromised purity.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Subscribe for Exclusive Festive Offers & Recipe Letters:
              </div>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-[#FDF5E6] placeholder-white/40 flex-1 focus:outline-none text-xs"
                />
                <button
                  type="submit"
                  className="bg-[#800000] hover:bg-[#600000] text-[#FDF5E6] font-bold uppercase tracking-widest text-[11px] px-4 py-2 rounded-xl transition"
                >
                  {subscribed ? 'Subscribed!' : 'Join'}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[#FDF5E6]/70">
              <li>
                <button onClick={onOpenSubscriptions} className="hover:text-[#D4AF37] transition">
                  Daily Milk Subscription Plans
                </button>
              </li>
              <li>
                <button onClick={onOpenBulkOrder} className="hover:text-[#D4AF37] transition">
                  Bulk Wedding & Corporate Orders
                </button>
              </li>
              <li>
                <button onClick={onOpenStoreLocator} className="hover:text-[#D4AF37] transition">
                  Find Nearest Shiv Store
                </button>
              </li>
              <li>
                <a href="#recipes" className="hover:text-[#D4AF37] transition">
                  Traditional Dairy Recipes
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-widest">
              Our Specialties
            </h4>
            <ul className="space-y-2 text-[#FDF5E6]/70">
              <li>Organic A2 Gir Cow Milk</li>
              <li>Vedic A2 Bilona Desi Ghee</li>
              <li>Goa Cashew Kaju Katli</li>
              <li>Soft Fresh Malai Paneer</li>
              <li>Kulhad Matka Organic Curd</li>
              <li>Royal Festive Gift Hampers</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-widest">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-[#FDF5E6]/70">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>care@shivmilk.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>6:00 AM - 11:00 PM (Daily)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Connaught Place, New Delhi</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FDF5E6]/50 gap-3">
          <div>
            © {new Date().getFullYear()} Shiv Milk & Sweets. All rights reserved. Taste & Purity Together Since 1999.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#D4AF37] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Refund Policy</span>
            <span>•</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
