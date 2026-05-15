import { motion } from 'motion/react';

const DESIGNS = [
  {
    id: 1,
    title: "Independence Day",
    category: "Streetwear",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Land of the Free",
    category: "Vintage",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Moon Child",
    category: "Minimal",
    imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Bloom Where You Are",
    category: "Streetwear",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Sorry I'm Late",
    category: "Typography",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Summer Never Stops",
    category: "Vintage",
    imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    title: "Escape the Ordinary",
    category: "Graphic",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    title: "Urban Legend",
    category: "Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-primary font-sora font-semibold text-sm uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-metropolis font-bold tracking-tight">
            Latest Designs
          </h2>
        </div>
        <p className="text-on-surface-variant max-w-md text-sm leading-relaxed">
          A showcase of custom streetwear and graphic design projects. Each piece is crafted with attention to detail and cultural resonance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DESIGNS.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container-low border border-white/5">
              <img 
                src={design.imageUrl} 
                alt={design.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">{design.category}</span>
                <h3 className="text-white font-bold text-lg">{design.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <motion.a
          href="/portfolio"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all"
        >
          View Full Portfolio
        </motion.a>
      </div>
    </section>
  );
}
