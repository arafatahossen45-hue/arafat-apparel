import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import FontGallery from '../components/FontGallery';
import FeaturedSection from '../components/FeaturedSection';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-24 pb-24"
    >
      <Hero />
      <Portfolio />
      <FeaturedSection />
      <About />
      <Services />
      <FontGallery />
      <Contact />
    </motion.div>
  );
}
