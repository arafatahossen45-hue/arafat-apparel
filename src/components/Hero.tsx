import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-primary font-sora font-semibold text-sm uppercase tracking-[0.3em] mb-4 block">Official Portfolio</span>
            <h1 className="text-6xl md:text-8xl font-metropolis font-bold tracking-tight mb-8 leading-tight">
              Arafat <br />
              <span className="text-outline">Apparel</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-xl mb-12">
              Bespoke T-shirt and streetwear concepts crafted with technical precision and creative soul. 
              Engineering visual identities for the next generation of fashion brands.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#portfolio" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:premium-glow transition-all">
                View Gallery
              </a>
              <a href="#contact" className="bg-white/5 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10">
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full" />
            <div className="glass-card aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 border border-white/10 p-2">
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000" 
                alt="Arafat Hossen - Streetwear Designer" 
                className="w-full h-full object-cover rounded-[2.5rem]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
