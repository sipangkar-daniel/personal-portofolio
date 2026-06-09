import React, { useState } from "react";
import { CheckCircle, Mail, MessageSquare } from "lucide-react";
import { AnimatedButton } from "../components/ui/AnimatedButton";
import { personalDescription, portfolioText } from "../constants/portfolioData";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const greetingLine = formData.name ? `I am *${formData.name}*, nice to meet you` : "";
    const messageLine = formData.message ? `I have a project idea about...\n\n${formData.message}` : "";

    const messageText = `Halo Daniel,

${greetingLine}

${messageLine}`.trim().replace(/\n{3,}/g, "\n\n");

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=6282272253799&text=${encodeURIComponent(messageText)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsSubmitting(true);
    
    // Simulate API connection send timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", message: "" });
      
      // Auto-clear success message after 4s
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-12 max-w-7xl mx-auto w-full border-t border-slate-900/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
        
        {/* Info Column (Left) */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
          <div>
            {portfolioText.contact.connectTag && (
              <span className="text-blue-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                {portfolioText.contact.connectTag}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
              {portfolioText.contact.title}
            </h2>
          </div>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {portfolioText.contact.description}
          </p>

          <div className="space-y-4 pt-4">
            {/* Direct Email Link */}
            <a
              href={`mailto:${personalDescription.socialLinks.email}`}
              className="flex items-center gap-4 group p-3 rounded-xl border border-slate-800/40 bg-slate-900/30 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{portfolioText.contact.emailDispatchLabel}</div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                  {personalDescription.socialLinks.email}
                </div>
              </div>
            </a>

            {/* Direct WhatsApp Link */}
            <a
              href={personalDescription.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group p-3 rounded-xl border border-slate-800/40 bg-slate-900/30 hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{portfolioText.contact.telephonyLabel}</div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                  {portfolioText.contact.telephonyValue}
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Minimalist Form Column (Right) */}
        <div className="lg:col-span-7">
          <div className="glass p-6 md:p-10 rounded-3xl border border-slate-800/80 shadow-xl relative overflow-hidden">
            {/* Form Background glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
              {portfolioText.contact.formTitle && (
                <h3 className="text-xl font-bold text-white tracking-wide border-b border-slate-800 pb-3">
                  {portfolioText.contact.formTitle}
                </h3>
              )}

              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-base font-bold text-slate-200">
                  {portfolioText.contact.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={portfolioText.contact.namePlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none placeholder:text-slate-600"
                />
              </div>



              {/* Message Input */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-base font-bold text-slate-200">
                  {portfolioText.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={portfolioText.contact.messagePlaceholder}
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Error messages display */}
              {errorMsg && (
                <div className="text-xs font-semibold text-red-500 bg-red-950/20 border border-red-500/20 px-4 py-2 rounded-lg">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Success message display */}
              {isSuccess && (
                <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>{portfolioText.contact.successMsg}</span>
                </div>
              )}

              {/* Submit button wrapper */}
              <div className="pt-2">
                <AnimatedButton
                  type="submit"
                  variant="moving-border"
                  disabled={isSubmitting || isSuccess}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {portfolioText.contact.transmittingText}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      {portfolioText.contact.sendBtn}
                    </span>
                  )}
                </AnimatedButton>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
