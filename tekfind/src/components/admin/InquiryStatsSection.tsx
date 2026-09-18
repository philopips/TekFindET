import React, { useState } from 'react';
import {
  MessageSquare,
  Calendar,
  Store,
  Smartphone,
  ExternalLink,
  Clock,
  TrendingUp,
  RefreshCw,
  Send,
  Hash,
  ShoppingBag
} from 'lucide-react';
import { Inquiry, Product } from '../../types';
import { InquiryStats } from '../../services/inquiryService';

interface InquiryStatsSectionProps {
  inquiries: Inquiry[];
  stats: InquiryStats;
  loading: boolean;
  products: Product[];
}

export const InquiryStatsSection: React.FC<InquiryStatsSectionProps> = ({
  inquiries,
  stats,
  loading,
  products
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'recent'>('summary');

  // Format relative time helper
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return 'Recently';
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="inquiry-tracking-section" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-950 bg-yellow-100 border border-yellow-300 px-2.5 py-0.5 rounded-md inline-flex mb-1 shadow-2xs">
            <Send className="w-3.5 h-3.5 text-yellow-600" />
            <span>Customer Intent & Lead Intelligence</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Telegram Inquiry Tracking & Analytics
          </h2>
          <p className="text-xs text-slate-500">
            Recorded when shoppers click "Contact to Buy". Conversations remain private inside Telegram.
          </p>
        </div>

        {/* View Toggle */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold self-start sm:self-auto border border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-yellow-400 text-slate-950 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Insights & Rankings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recent')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'recent'
                ? 'bg-yellow-400 text-slate-950 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recent Inquiries ({inquiries.length})
          </button>
        </div>
      </div>

      {/* Top 2 Primary Inquiry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-yellow-600" />
              <span>Total Inquiries</span>
            </span>
            <span className="text-[10px] font-black text-slate-950 bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded-full">
              All Time
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {stats.total}
          </p>
          <span className="text-[11px] text-slate-400">
            Recorded "Contact to Buy" clicks
          </span>
        </div>

        {/* Inquiries Today */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-yellow-500" />
              <span>Inquiries Today</span>
            </span>
            <span className="text-[10px] font-black text-slate-950 bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span>Live Today</span>
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            {stats.todayCount}
          </p>
          <span className="text-[11px] text-slate-400">
            Inquiries received since midnight
          </span>
        </div>

        {/* Most Popular Category */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Top Contacted Item</span>
          </span>
          <p className="text-sm font-extrabold text-slate-900 mt-2 truncate" title={stats.mostContactedProducts[0]?.productName || 'None yet'}>
            {stats.mostContactedProducts[0]?.productName || 'No inquiries yet'}
          </p>
          <span className="text-[11px] text-indigo-600 font-semibold">
            {stats.mostContactedProducts[0] ? `${stats.mostContactedProducts[0].count} buyer inquiries` : 'Awaiting shoppers'}
          </span>
        </div>

        {/* Top Shop */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-amber-600" />
            <span>Top Lead Recipient</span>
          </span>
          <p className="text-sm font-extrabold text-slate-900 mt-2 truncate" title={stats.mostContactedShops[0]?.shopName || 'None yet'}>
            {stats.mostContactedShops[0]?.shopName || 'No inquiries yet'}
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">
            {stats.mostContactedShops[0] ? `${stats.mostContactedShops[0].count} direct store leads` : 'Awaiting shoppers'}
          </span>
        </div>
      </div>

      {activeTab === 'summary' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Most Contacted Products */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-yellow-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Most Contacted Products
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                Top 5 Listings
              </span>
            </div>

            {stats.mostContactedProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No inquiries recorded yet. When users click "Contact to Buy", they will appear here.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.mostContactedProducts.map((item, idx) => {
                  const percentage = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                  return (
                    <div
                      key={item.productId || `prod-rank-${idx}`}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate" title={item.productName}>
                              {item.productName}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">
                              {item.shopName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 text-xs font-black text-slate-950 bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded-md shadow-2xs">
                            {item.count} {item.count === 1 ? 'inquiry' : 'inquiries'}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-medium mt-0.5">
                            {percentage}% of leads
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-yellow-400 h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Most Contacted Shops */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-yellow-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Most Contacted Shops
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                Merchant Leads Breakdown
              </span>
            </div>

            {stats.mostContactedShops.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No shop leads recorded yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.mostContactedShops.map((shop, idx) => {
                  const percentage = stats.total > 0 ? Math.round((shop.count / stats.total) * 100) : 0;
                  return (
                    <div
                      key={shop.shopName}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-yellow-400 text-[10px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {shop.shopName}
                            </p>
                            <span className="text-[10px] text-slate-500">
                              Addis Ababa Verified Retailer
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {shop.count} {shop.count === 1 ? 'lead' : 'leads'}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-medium mt-0.5">
                            {percentage}% share
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Recent Inquiries Activity Table */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Inquiry Feed ({inquiries.length} Events)
            </h3>
            <span className="text-[11px] text-slate-400">
              Firestore Collection: <code className="font-mono text-slate-900 font-bold bg-yellow-100 border border-yellow-200 px-1.5 py-0.5 rounded-md">inquiries</code>
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No inquiries logged yet.
            </div>
          ) : (
            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider sticky top-0">
                    <th className="py-2.5 px-4">Product Name</th>
                    <th className="py-2.5 px-4">Listing ID</th>
                    <th className="py-2.5 px-4">Shop</th>
                    <th className="py-2.5 px-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {inquiries.slice(0, 50).map((inq) => (
                    <tr key={inq.id || `${inq.listingId}-${inq.timestamp}`} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-slate-900 max-w-[200px] truncate">
                        {inq.productName}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500">
                        {inq.listingId}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {inq.shopName}
                      </td>
                      <td className="py-2.5 px-4 text-right text-[11px] text-slate-400 whitespace-nowrap">
                        {formatTime(inq.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
