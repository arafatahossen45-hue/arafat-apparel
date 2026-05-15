import { motion } from 'motion/react';

export default function FeaturedSection() {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30" />
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000" 
            alt="Featured Design" 
            className="w-full aspect-square object-cover rounded-[2rem] border border-white/10 relative z-10"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 relative group"
        >
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" />
          <div className="relative z-10">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 rounded-full border border-tertiary text-tertiary text-[10px] font-sora font-semibold uppercase tracking-widest">
                Editor's Choice
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-metropolis font-bold tracking-tight mb-6">
              Vibrant Typography
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Exploring the intersection of bold messaging and experimental color paths. 
              This featured piece showcases our ability to blend social commentary 
              with high-end streetwear aesthetics.
            </p>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-primary/20 text-primary border border-primary/30 px-8 py-4 rounded-xl font-semibold hover:bg-primary/30 transition-all"
            >
              View Full Portfolio
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
