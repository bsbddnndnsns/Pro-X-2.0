import React, { useState } from 'react';
import { Check, Crown, Zap, Shield, Star, Play, X, Loader2, CheckCircle2, CreditCard, Wallet } from 'lucide-react';

export const Subscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for trying out our tools.',
      features: [
        '5 AI Image Generations / day',
        'Standard Speed',
        '720p YouTube Downloads',
        'Basic Support',
        'Ads Supported'
      ],
      current: true,
      color: 'slate'
    },
    {
      name: 'Pro X',
      price: '₹49',
      period: '/ month',
      description: 'Unlock premium features for the price of a chai.',
      features: [
        'Unlimited AI Image Generations',
        'Fast "Flash" Processing',
        '4K YouTube Downloads',
        'Priority Support',
        'No Ads',
        'Exclusive "Pro" Badge'
      ],
      popular: true,
      color: 'indigo'
    },
    {
      name: 'Agency',
      price: '₹149',
      period: '/ month',
      description: 'Ultimate power for professional creators.',
      features: [
        'Everything in Pro X',
        'API Access',
        'Batch Processing',
        'Dedicated Account Manager',
        'Commercial License',
        'Early Access to New Features'
      ],
      color: 'purple'
    }
  ];

  const handleUpgrade = (plan: any) => {
    if (plan.price === 'Free') return;
    setSelectedPlan(plan);
    setPaymentStatus('idle');
  };

  const processPayment = () => {
    setPaymentStatus('processing');
    // Simulate API call to Google Play Billing
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2500);
  };

  const closePayment = () => {
    setSelectedPlan(null);
    setPaymentStatus('idle');
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Payment Modal Overlay */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-indigo-900/20">
              <div className="flex items-center gap-2 text-white font-bold">
                 <div className="bg-indigo-500 p-1.5 rounded-lg">
                    <Crown size={16} fill="currentColor" />
                 </div>
                 {paymentStatus === 'success' ? 'Order Complete' : 'Complete Purchase'}
              </div>
              <button 
                onClick={closePayment} 
                className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                disabled={paymentStatus === 'processing'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {paymentStatus === 'success' ? (
                <div className="text-center py-6 animate-in zoom-in-50 duration-300">
                  <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Subscription Active!</h4>
                  <p className="text-slate-400 mb-8">
                    You have successfully subscribed to <span className="text-indigo-400 font-bold">{selectedPlan.name}</span>. 
                    <br/>Your Google Play Balance has been charged.
                  </p>
                  <button onClick={closePayment} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                    Start Creating
                  </button>
                </div>
              ) : paymentStatus === 'processing' ? (
                <div className="text-center py-12">
                  <div className="relative w-16 h-16 mx-auto mb-6">
                     <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={20} className="text-indigo-400 fill-indigo-400" />
                     </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Processing Payment...</h4>
                  <p className="text-slate-400 text-sm">Connecting to Google Play Store...</p>
                </div>
              ) : (
                <div className="space-y-6">
                   {/* Order Summary */}
                   <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Plan</div>
                        <div className="text-white font-bold text-lg">{selectedPlan.name} Subscription</div>
                      </div>
                      <div className="text-right">
                         <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Total</div>
                         <div className="text-indigo-400 font-bold text-xl">{selectedPlan.price}</div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Payment Method</label>
                      
                      {/* Google Play Option (Selected) */}
                      <button 
                        onClick={processPayment}
                        className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-green-500/50 bg-green-900/10 hover:bg-green-900/20 transition-all group relative overflow-hidden"
                      >
                         <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                {/* Simulated Google Play Colors */}
                                <div className="relative w-6 h-6">
                                    <Play className="text-slate-900 fill-slate-900" size={24} />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white flex items-center gap-2">
                                    Google Play Balance
                                    <span className="bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0.5 rounded border border-green-500/20">LINKED</span>
                                </div>
                                <div className="text-sm text-slate-400">₹450.00 Available</div>
                            </div>
                         </div>
                         <div className="relative z-10 w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center bg-green-500">
                             <Check size={14} className="text-black stroke-[3px]" />
                         </div>
                      </button>

                      {/* Other Methods (Disabled) */}
                      <div className="opacity-40 space-y-2 pointer-events-none grayscale">
                         <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                            <Wallet className="text-slate-400" />
                            <span className="text-slate-300 font-medium">UPI / NetBanking</span>
                         </div>
                         <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                            <CreditCard className="text-slate-400" />
                            <span className="text-slate-300 font-medium">Credit or Debit Card</span>
                         </div>
                      </div>
                   </div>

                   <button 
                    onClick={processPayment}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 transition-all transform active:scale-[0.98]"
                   >
                     Tap to Buy
                   </button>
                   
                   <p className="text-[10px] text-center text-slate-500">
                      By continuing, you agree to the Google Play Terms of Service. <br/>
                      Subscription auto-renews monthly. Cancel anytime.
                   </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent inline-flex items-center gap-3">
          <Crown className="text-amber-400" size={40} />
          Upgrade your Workflow
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Unlock the full potential of Gemini 2.5 Flash models with our pocket-friendly premium plans. 
          Higher limits, faster speeds, and exclusive features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`
              relative glass-panel rounded-3xl p-8 flex flex-col transition-all duration-300
              ${plan.popular ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-105 z-10' : 'hover:border-white/20 hover:bg-white/5'}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Star size={12} fill="currentColor" /> BEST VALUE
              </div>
            )}

            <div className="mb-8">
              <h3 className={`text-xl font-bold text-${plan.color === 'indigo' ? 'indigo-400' : 'slate-200'}`}>
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                {plan.price !== 'Free' && <span className="text-slate-500 ml-1">{plan.period}</span>}
              </div>
              <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${plan.popular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-400'}`}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(plan)}
              className={`
                w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                ${plan.current 
                  ? 'bg-white/5 text-slate-500 cursor-default border border-white/5' 
                  : plan.popular 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }
              `}
            >
              {plan.current ? 'Current Plan' : (
                  <>
                    {plan.popular && <Zap size={18} />}
                    Upgrade Now
                  </>
              )}
            </button>
            
            {plan.name === 'Agency' && (
                <div className="mt-4 text-center">
                    <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
                        <Shield size={10} /> 30-day money-back guarantee
                    </span>
                </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 glass-panel rounded-2xl p-8 border border-white/10">
        <h3 className="text-xl font-bold text-slate-200 mb-6">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-semibold text-slate-300 mb-2">Can I cancel anytime?</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Yes, you can cancel your subscription at any time via the Google Play Subscriptions menu.</p>
            </div>
            <div>
                <h4 className="font-semibold text-slate-300 mb-2">How do I pay?</h4>
                <p className="text-slate-500 text-sm leading-relaxed">We natively support <span className="text-white font-bold">Google Play Balance</span>. You can also use UPI or Cards linked to your Play Store account.</p>
            </div>
            <div>
                <h4 className="font-semibold text-slate-300 mb-2">What happens to my data?</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Your data is secure in the Pro X Cloud. If you downgrade, you'll retain history but lose access to premium tools.</p>
            </div>
            <div>
                <h4 className="font-semibold text-slate-300 mb-2">Do you offer refunds?</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Refunds are handled directly by Google Play according to their standard refund policy.</p>
            </div>
        </div>
      </div>
    </div>
  );
};