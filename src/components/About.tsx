import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-sora font-semibold text-sm uppercase tracking-[0.3em] mb-4 block">The Visionary</span>
          <h2 className="text-4xl md:text-5xl font-metropolis font-bold mb-8">Crafting Identities Through Apparel</h2>
          
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            <p>
              I am <strong>Arafat Hossen</strong>, a professional T-shirt designer and the creative force behind <strong>Arafat Apparel</strong>. 
              Based in Bangladesh, I specialize in high-end streetwear and premium typography designs that resonate with global audiences.
            </p>
            <p>
              With over 5 years of dedicated experience in the apparel industry, I've helped hundreds of brands find their unique voice 
              through bold, minimalist, and technically precise designs. My work isn't just about graphics; it's about building a movement.
            </p>
          </div>

          <div className="mt-12 p-8 border border-white/10 rounded-3xl bg-white/5 text-left">
            <h3 className="text-xl font-bold mb-4 text-white">My Mission</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              To bridge the gap between art and apparel. I strive to create designs that are not only visually stunning but also 
              culturally relevant, ensuring each piece tells a story that wears as well as it looks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 text-left">
            <div>
              <h4 className="text-primary font-bold mb-2">Global Reach</h4>
              <p className="text-sm text-on-surface-variant">Working with clients from New York to Tokyo, bringing a global perspective to local brands.</p>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-2">Signature Style</h4>
              <p className="text-sm text-on-surface-variant">Specializing in "Dark Luxury" and "Street Minimalism" aesthetics.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
