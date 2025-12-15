import React, { useState } from 'react';
import { FaCheck, FaRocket, FaGem, FaCrown } from "react-icons/fa";

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      credits: 50,
      price: 5,
      icon: <FaRocket className="text-2xl" />,
      features: ['5 Resume Templates', 'Basic Analytics', 'PDF Export', 'Standard Support'],
    },
    {
      id: 'pro',
      name: 'Professional',
      credits: 150,
      price: 10,
      icon: <FaGem className="text-2xl" />,
      features: ['15 Resumes', 'AI Smart Suggestions', 'Priority Email Support', 'Live Preview Mode', 'Cover Letter Builder'],
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Business',
      credits: 300,
      price: 14.99,
      icon: <FaCrown className="text-2xl" />,
      features: ['30 Resumes', 'Advanced AI Writer', '24/7 Priority Support', 'Deep Analytics', 'LinkedIn Optimization'],
    },
  ];

  const handlePayment = (plan) => {
    alert(`Processing payment of ₹${plan.price} for ${plan.name} plan...`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Choose the perfect credit pack for your career needs. No hidden fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`
                  relative rounded-2xl transition-all duration-300 cursor-pointer flex flex-col
                  ${isSelected 
                    ? 'bg-white shadow-2xl shadow-blue-900/10 ring-2 ring-blue-600 scale-105 z-10' 
                    : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg'}
                `}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`font-bold text-lg ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                        {plan.name}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">Perfect for individuals</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isSelected ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-slate-600'}`}>
                      {plan.icon}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-slate-900">₹{plan.price}</span>
                      <span className="ml-2 text-slate-500 font-medium">/ one-time</span>
                    </div>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700">
                      {plan.credits} Credits
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 my-4"></div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheck className={`mt-1 text-sm ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayment(plan);
                    }}
                    className={`
                      w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200
                      ${isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                        : 'bg-slate-900 text-white hover:bg-slate-800'}
                    `}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t border-slate-200 pt-8">
            <div className='flex flex-col items-center'>
                <h4 className='font-bold text-slate-900'>Secure Payment</h4>
                <p className='text-sm text-slate-500'>256-bit SSL Encryption</p>
            </div>
            <div className='flex flex-col items-center'>
                <h4 className='font-bold text-slate-900'>Instant Access</h4>
                <p className='text-sm text-slate-500'>Credits added immediately</p>
            </div>
            <div className='flex flex-col items-center'>
                <h4 className='font-bold text-slate-900'>Support</h4>
                <p className='text-sm text-slate-500'>24/7 Assistance available</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;