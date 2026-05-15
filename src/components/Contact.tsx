import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { BrandedIcons } from './SocialIcons';
import { CONTACT_INFO, getWhatsAppUrl } from '../constants';

export default function Contact() {
  const whatsappUrl = getWhatsAppUrl("Hello Arafat Apparel, I want to order a custom T-shirt design.");

  const channels = [
    { name: 'WhatsApp', icon: <BrandedIcons.WhatsApp />, url: whatsappUrl, color: 'text-[#25D366]', bgColor: 'bg-[#25D366]/10' },
    { name: 'Instagram', icon: <BrandedIcons.Instagram />, url: CONTACT_INFO.instagram, color: 'text-[#E4405F]', bgColor: 'bg-[#E4405F]/10' },
    { name: 'Behance', icon: <BrandedIcons.Behance />, url: CONTACT_INFO.behance, color: 'text-[#0057ff]', bgColor: 'bg-[#0057ff]/10' },
    { name: 'Facebook', icon: <BrandedIcons.Facebook />, url: CONTACT_INFO.facebook, color: 'text-[#1877F2]', bgColor: 'bg-[#1877F2]/10' },
    { name: 'Fiverr', icon: <BrandedIcons.Fiverr />, url: CONTACT_INFO.fiverr, color: 'text-[#1DBF73]', bgColor: 'bg-[#1DBF73]/10' },
    { name: 'Twitter', icon: <BrandedIcons.X />, url: CONTACT_INFO.twitter, color: 'text-[#000000]', bgColor: 'bg-white/10' },
    { name: 'Telegram', icon: <BrandedIcons.Telegram />, url: CONTACT_INFO.telegram, color: 'text-[#24A1DE]', bgColor: 'bg-[#24A1DE]/10' },
    { name: 'Gmail', icon: <BrandedIcons.Gmail />, url: `mailto:${CONTACT_INFO.email}`, color: 'text-[#EA4335]', bgColor: 'bg-[#EA4335]/10' },
  ];

  function BriefcaseIcon() {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  }

  return (
    <section id="contact" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="glass-card p-12 lg:p-24 rounded-[3rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full -ml-32 -mb-32" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-metropolis font-bold mb-6">Let's Create Together</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-12">
            Ready to elevate your brand with premium apparel design? Get in touch for custom projects, 
            commissions, or just to say hi.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-primary/20 hover:premium-glow transition-all"
            >
              <div className="w-6 h-6"><BrandedIcons.WhatsApp /></div>
              WhatsApp Message
            </motion.a>
            <motion.a
              href={`mailto:${CONTACT_INFO.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all"
            >
              <Send className="w-6 h-6" />
              Email Design Request
            </motion.a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {channels.map((channel) => (
              <motion.a
                key={channel.name}
                href={channel.url}
                target="_blank"
                whileHover={{ y: -5 }}
                className={cn("transition-all flex flex-col items-center gap-2 group")}
              >
                <div className={cn(
                  "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                  channel.bgColor,
                  channel.color
                )}>
                    {channel.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-white transition-colors">
                  {channel.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating WhatsApp for mobile */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl md:hidden"
      >
        <BrandedIcons.WhatsApp />
      </motion.a>
    </section>
  );
}
