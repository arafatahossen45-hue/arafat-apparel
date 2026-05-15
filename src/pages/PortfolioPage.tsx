import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

interface Design {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

const CATEGORIES = ['All', 'Streetwear', 'Typography', 'Vintage', 'Minimal', 'Oversized'];

const INITIAL_DESIGNS: Design[] = [
  {
    id: 'static-1',
    title: "Independence Day",
    description: "Premium Fourth of July streetwear design featuring stars and stripes motif.",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    category: "Streetwear",
    tags: ["USA", "Holiday", "Red Blue"]
  },
  {
    id: 'static-2',
    title: "Land of the Free",
    description: "Classic American vintage style design with distressed textures.",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    category: "Vintage",
    tags: ["Freedom", "Stars", "Retro"]
  },
  {
    id: 'static-3',
    title: "Moon Child",
    description: "Minimalist cosmic illustration with whimsical elements.",
    imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800",
    category: "Minimal",
    tags: ["Celestial", "Night", "Art"]
  },
  {
    id: 'static-4',
    title: "Bloom Where You Are",
    description: "Floral empowerment design with custom hand-drawn elements.",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "Streetwear",
    tags: ["Flowers", "Growth", "Positive"]
  },
  {
    id: 'static-5',
    title: "Sorry I'm Late",
    description: "Bold typographic statement piece with urban aesthetic.",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    category: "Typography",
    tags: ["Statement", "Funny", "Text"]
  },
  {
    id: 'static-6',
    title: "Summer Never Stops",
    description: "Retro sunset vibes with multi-layered color palette.",
    imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
    category: "Vintage",
    tags: ["Summer", "Vibe", "Color"]
  },
  {
    id: 'static-7',
    title: "Escape the Ordinary",
    description: "Adventure themed design featuring sports car and sun silhouette.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    category: "Oversized",
    tags: ["Adventure", "Car", "Sun"]
  },
  {
    id: 'static-8',
    title: "Urban Legend",
    description: "Premium streetwear mock-up showcasing the signature 'Land of the Free' design.",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    category: "Streetwear",
    tags: ["Model", "Lifestyle", "Street"]
  },
  {
    id: 'static-9',
    title: "Cyberpunk Rebel",
    description: "Neon-soaked futuristic aesthetic for the modern urbanite.",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
    category: "Streetwear",
    tags: ["Neon", "Future", "Cyber"]
  }
];

export default function PortfolioPage() {
  const [designs, setDesigns] = useState<Design[]>(INITIAL_DESIGNS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchDesigns() {
      try {
        const q = query(collection(db, 'designs'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Design));
        setDesigns([...data, ...INITIAL_DESIGNS]);
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'designs');
      } finally {
        setLoading(false);
      }
    }
    fetchDesigns();
  }, []);

  const filteredDesigns = designs.filter(design => {
    const matchesCategory = activeCategory === 'All' || design.category === activeCategory;
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         design.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-metropolis font-bold mb-4">Design Portfolio</h1>
        <p className="text-on-surface-variant text-lg">Daily curated premium T-shirt designs and streetwear concepts.</p>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
      >
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search designs or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold transition-all",
                activeCategory === cat 
                  ? "bg-primary text-white" 
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card group"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={design.imageUrl} 
                    alt={design.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-sora font-semibold text-primary uppercase tracking-widest">
                      {design.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{design.title}</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">{design.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {!loading && filteredDesigns.length === 0 && (
        <div className="text-center py-24 glass-card rounded-2xl">
          <p className="text-on-surface-variant">No designs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
