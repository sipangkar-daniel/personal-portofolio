import React from "react";
import { InfiniteMovingCards } from "../components/ui/InfiniteMovingCards";
import { testimonialsData } from "../constants/portfolioData";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 px-4 md:px-12 max-w-7xl mx-auto w-full border-t border-slate-900 bg-slate-950/20">
      <div className="text-center mb-12">
        <span className="text-blue-500 font-bold uppercase tracking-wider text-xs md:text-sm">
          Client Feedback
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
          Recommendations & Testimonials
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          Read recommendations and feedback from peers, tech leads, and product owners who partnered on backend microservices migrations.
        </p>
      </div>

      <div className="w-full flex justify-center mt-8">
        {/* Dynamic moving slider card loop */}
        <InfiniteMovingCards
          items={testimonialsData}
          direction="left"
          speed="normal"
          className="w-full"
        />
      </div>
    </section>
  );
};
