import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { FaStar, FaQuoteRight } from "react-icons/fa";
import Heading from "../../Common/Heading"; 
import SubHeading from "../../Common/SubHeading";

const TestimonialSlider = () => {
  
  const testimonials = [
    {
      id: 1,
      name: "Rohan Das",
      role: "SDE at Google",
      review: "The ATS templates are actually effective. I got shortlisted instantly after using ResumePilot.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Product Manager",
      review: "The UI is so intuitive! I built my resume in 10 minutes. The AI suggestions were spot on.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "Data Analyst",
      review: "Highly recommended for freshers. It guides you step by step. Worth every penny.",
      image: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
      id: 4,
      name: "Sara Khan",
      role: "UX Designer",
      review: "Finally a resume builder that understands design aesthetics. Beautiful typography.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <Heading text={"Loved by Professionals"} />
            <div className="mt-4">
              <SubHeading text={"See what our users have to say about their journey."} />
            </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-16" // Pagination ke liye space
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto pt-4 pl-2 pr-2"> 
             
              
              <div className="group relative h-full">
                
             
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-[2px]"></div>

                <div className="relative h-full bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-none transition-all duration-300 flex flex-col">
                  
                 
                  <div className="mb-6 flex justify-between items-start">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
                    </div>
                    <FaQuoteRight className="text-3xl text-slate-100 group-hover:text-blue-50 transition-colors" />
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                    "{item.review}"
                  </p>

                 
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{item.name}</h4>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper Pagination Styling Override */}
      <style>{`
        .swiper-pagination-bullet {
          background: #CBD5E1;
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #2563EB !important;
          width: 24px;
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;