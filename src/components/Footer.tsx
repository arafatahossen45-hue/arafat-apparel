import { motion } from 'motion/react';
import { BrandedIcons } from './SocialIcons';
import { CONTACT_INFO, getWhatsAppUrl } from '../constants';

export default function Footer() {
  const socials = [
    { name: 'WhatsApp', icon: <BrandedIcons.WhatsApp />, url: getWhatsAppUrl("Hi Arafat Apparel!") },
    { name: 'Telegram', icon: <BrandedIcons.Telegram />, url: CONTACT_INFO.telegram },
    { name: 'Instagram', icon: <BrandedIcons.Instagram />, url: CONTACT_INFO.instagram },
    { name: 'Facebook', icon: <BrandedIcons.Facebook />, url: CONTACT_INFO.facebook },
    { name: 'Behance', icon: <BrandedIcons.Behance />, url: CONTACT_INFO.behance },
    { name: 'Fiverr', icon: <BrandedIcons.Fiverr />, url: CONTACT_INFO.fiverr },
    { name: 'Twitter', icon: <BrandedIcons.X />, url: CONTACT_INFO.twitter },
  ];

  return (
    <footer className="px-6 py-12 border-t border-white/5 bg-surface-container-low/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-xl font-metropolis font-bold mb-2">Arafat Apparel</h2>
          <p className="text-sm text-on-surface-variant">
            © 2024 Arafat Apparel. Bespoke Craftsmanship.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-white/5"
              title={social.name}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {social.icon}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
