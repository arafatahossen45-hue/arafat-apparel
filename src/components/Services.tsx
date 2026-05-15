import { motion } from 'motion/react';
import { Shirt, Type, Palette, Layout, BadgeCheck, Printer } from 'lucide-react';
import { getWhatsAppUrl } from '../constants';

const SERVICES = [
  {
    icon: <Shirt className="w-8 h-8" />,
    title: "T-shirt Design",
    description: "Premium graphics tailored for high-end apparel and luxury streetwear brands."
  },
  {
    icon: <Type className="w-8 h-8" />,
    title: "Typography Design",
    description: "Custom lettering and font arrangements that define your brand's unique voice."
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Streetwear Graphics",
    description: "Bold, modern graphics that capture the essence of contemporary urban fashion."
  },
  {
    icon: <BadgeCheck className="w-8 h-8" />,
    title: "Custom Apparel Design",
    description: "End-to-end design concepts for hoodies, sweatpants, and luxury basics."
  },
  {
    icon: <Printer className="w-8 h-8" />,
    title: "Print-ready Artwork",
    description: "Production-ready files optimized for screen printing, DTG, and embroidery."
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Merch Design",
    description: "Scalable merchandise systems for creators, influencers, and corporate brands."
  }
];

export default function Services() {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-metropolis font-bold mb-4">Our Services</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          We bring creative vision to physical products with a focus on technical precision and premium aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 group hover:premium-glow transition-all"
          >
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform origin-left">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            <a 
              href={getWhatsAppUrl(`Hello, I'm interested in your ${service.title} service.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary uppercase tracking-widest hover:translate-x-2 transition-transform inline-flex items-center gap-2"
            >
              Learn More <span>→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
