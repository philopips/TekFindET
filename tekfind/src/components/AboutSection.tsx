import React from 'react';
import {
  ShieldCheck,
  Send,
  Store,
  CheckCircle2,
  DollarSign,
  Truck,
  HelpCircle,
  MapPin,
  HeartHandshake,
  BadgePercent,
  Sparkles,
  Award
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const faqs = [
    {
      question: 'Do I pay more by purchasing through TekFind?',
      answer:
        'No, absolutely not! The prices you see on TekFind are the exact same (or often discounted) retail prices offered in local Addis Ababa shops. TekFind earns a commission directly from the shop as a marketing and sales partner. You pay 0% extra.'
    },
    {
      question: 'How do I know the electronics are original and sealed?',
      answer:
        'We only list inventory from verified physical electronics retailers across Bole, Megenagna, Piassa, and Merkato. Every brand-new listing includes full manufacturer packaging and shop warranty cards. Crucially, you inspect the device in-person and check serial numbers before making any payment.'
    },
    {
      question: 'Can I have items delivered outside Addis Ababa (e.g. Hawassa, Adama, Bahir Dar)?',
      answer:
        'Yes! When you click "Contact to Buy", our Telegram concierge will coordinate secure dispatch via certified inter-city delivery services or bus terminals, complete with live tracking and shop receipt documentation.'
    },
    {
      question: 'What payment methods are accepted upon inspection?',
      answer:
        'You can pay using Telebirr, CBE Birr, Awash Birr, direct mobile banking transfer, or cash directly to the shop or courier after you have tested the gadget.'
    },
    {
      question: 'I own an electronics store in Addis Ababa. How can I list my stock?',
      answer:
        'Reach out to our Telegram concierge (@TekFindET). We visit your storefront to verify registration, inspect inventory quality, and photograph your electronics for listing at no upfront cost.'
    }
  ];

  return (
    <section id="about-section" className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-yellow-100/90 text-slate-950 font-black px-3 py-1 rounded-full text-xs mb-3 border border-yellow-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            <span>About TekFind Ethiopia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Ethiopia's Curated Electronics Network
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            TekFind bridges the gap between Addis Ababa’s trusted electronics retail stores and tech
            enthusiasts seeking authentic products at honest prices. Instead of dealing with untraceable
            classified posts or spending entire afternoons walking from mall to mall, browse real physical
            shop inventories from one simple, modern interface.
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-yellow-400/80 hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md space-y-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Verified Physical Storefronts
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every device on TekFind belongs to an established retail storefront in Bole Medhanialem,
              Megenagna, Piassa, or Merkato. No anonymous sellers, no vanished contacts.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-yellow-400/80 hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-950 text-yellow-400 flex items-center justify-center font-bold shadow-xs">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Dedicated Telegram Concierge
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tap "Contact to Buy" to instantly message our team. We confirm live shop inventory, verify
              lowest pricing, hold the device, and arrange seamless pickup or delivery.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-yellow-400/80 hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Test In-Person Before Paying
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never gamble with advance deposits. Power on your laptop, inspect camera sensors, verify Apple
              coverage, and pay only after you are 100% satisfied.
            </p>
          </div>
        </div>

        {/* How the Model Works (Transparent commission explanation) */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 text-yellow-300 font-bold px-2.5 py-1 rounded-md text-xs border border-yellow-400/30">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Transparent & Fair Model</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              How Does TekFind Make Money?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              TekFind is 100% free for buyers. We operate as a licensed digital showroom for Ethiopian
              retailers. When you purchase an item through our concierge link, the partner shop awards us a
              small promotional commission from their existing retail margin. You get verified products and
              honest prices, while shops get loyal customers.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-yellow-400">0 ETB</div>
              <div className="text-xs text-slate-400 mt-1">Extra Fee for Buyers</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400 mt-1">Authentic Devices</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">15+</div>
              <div className="text-xs text-slate-400 mt-1">Addis Tech Hubs</div>
            </div>
            <div>
              <div className="text-2xl font-black text-yellow-400">Instant</div>
              <div className="text-xs text-slate-400 mt-1">Telegram Support</div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6 pt-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to know about shopping on TekFind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5 hover:border-yellow-400/50 hover:bg-white transition-all duration-150"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
