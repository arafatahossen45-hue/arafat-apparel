import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Download, Eye, Heart, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

const FONTS = [
  // Sans Serif / Athletic
  {
    id: 1,
    name: 'Bebas Neue',
    category: 'Athletic',
    weight: 'Heavy',
    badge: 'Popular',
    preview: 'STREETWEAR',
    description: 'Classic condensed display font',
    fontFamily: 'Bebas Neue',
    styles: 1,
  },
  {
    id: 15,
    name: 'Wanted M54',
    category: 'Athletic',
    weight: 'Standard',
    badge: 'Teamwear',
    preview: 'VARSITY PRIDE',
    description: 'Classic collegiate athletic typeface',
    fontFamily: 'Bungee', // Similar blocky vibe
    styles: 1,
  },
  {
    id: 2,
    name: 'Fredoka One',
    category: 'Sans Serif',
    weight: 'Rounded',
    badge: 'Playful',
    preview: 'Arafat Apparel',
    description: 'Friendly rounded sans-serif',
    fontFamily: 'Fredoka One',
    styles: 1,
  },
  {
    id: 3,
    name: 'Baloo Tammudu',
    category: 'Sans Serif',
    weight: 'Bold',
    badge: 'Unique',
    preview: 'GRAPHIC DESIGN',
    description: 'Characterful geometric display sans',
    fontFamily: 'Baloo Tammudu 2',
    styles: 5,
  },
  {
    id: 4,
    name: 'Montserrat',
    category: 'Sans Serif',
    weight: 'Modern',
    badge: 'Essential',
    preview: 'Premium Quality',
    description: 'Clean geometric powerhouse',
    fontFamily: 'Montserrat',
    styles: 18,
    isLarge: true,
  },

  // Scripts from PDF
  {
    id: 5,
    name: 'Amarillo',
    category: 'Script',
    weight: 'Handwritten',
    badge: 'Signature',
    preview: 'Limited Edition',
    description: 'Flowing cursive signature style',
    fontFamily: 'Pacifico',
    styles: 1,
  },
  {
    id: 6,
    name: 'Gardenia',
    category: 'Script',
    weight: 'Calligraphy',
    badge: 'Elegant',
    preview: 'Spring Collection',
    description: 'Soft and sophisticated script',
    fontFamily: 'Satisfy',
    styles: 1,
  },
  {
    id: 7,
    name: 'Haiskey',
    category: 'Script',
    weight: 'Brush',
    badge: 'Vintage',
    preview: 'The Designer',
    description: 'Raw textured brush script',
    fontFamily: 'Dancing Script',
    styles: 4,
  },
  {
    id: 8,
    name: 'Hello Kamilla',
    category: 'Script',
    weight: 'Chalk',
    badge: 'Casual',
    preview: 'Urban Vibes',
    description: 'Playful casual monoline script',
    fontFamily: 'Yellowtail',
    styles: 1,
  },
  {
    id: 9,
    name: 'Melisha',
    category: 'Script',
    weight: 'Fluid',
    badge: 'Artistic',
    preview: 'Arafat Signature',
    description: 'Fluid and organic script curves',
    fontFamily: 'Arizonia',
    styles: 1,
  },

  // Display / Decorative
  {
    id: 10,
    name: 'Keep On Truckin',
    category: 'Display',
    weight: 'Psychedelic',
    badge: 'Retro',
    preview: 'RETRO 70s',
    description: 'Bold bubble-style display font',
    fontFamily: 'Bungee', // Placeholder for similar vibe
    styles: 1,
  },
  {
    id: 11,
    name: 'Monoton',
    category: 'Display',
    weight: 'Multi-line',
    badge: 'Tech',
    preview: 'DIGITAL AGE',
    description: 'Parallel line retro-future aesthetic',
    fontFamily: 'Monoton',
    styles: 1,
  },
  {
    id: 12,
    name: 'Permanent Marker',
    category: 'Display',
    weight: 'Rugged',
    badge: 'Street',
    preview: 'STREET ART',
    description: 'Authentic permanent marker look',
    fontFamily: 'Permanent Marker',
    styles: 1,
  },

  // Serif
  {
    id: 13,
    name: 'Bernard MT',
    category: 'Serif',
    weight: 'Condensed',
    badge: 'Classic',
    preview: 'ESTABLISHED',
    description: 'Traditional heavy-weight serif',
    fontFamily: 'Playfair Display', // Placeholder
    styles: 6,
  },
  {
    id: 14,
    name: 'Garmani',
    category: 'Serif',
    weight: 'Old Style',
    badge: 'Luxury',
    preview: 'Premium Wear',
    description: 'High-contrast luxury serif',
    fontFamily: 'Playfair Display',
    styles: 9,
  },
  {
    id: 16,
    name: 'Military Grade',
    category: 'Stencil',
    weight: 'Bold',
    badge: 'New',
    preview: 'TACTICAL',
    description: 'Clean industrial stencil style',
    fontFamily: 'Stardos Stencil',
    styles: 1,
  },
  {
    id: 17,
    name: 'Urban Strike',
    category: 'Stencil',
    weight: 'Heavy',
    badge: 'Hot',
    preview: 'STREET ATTACK',
    description: 'Bold urban display stencil',
    fontFamily: 'Big Shoulders Stencil Text',
    styles: 1,
  },
  {
    id: 18,
    name: 'Midnight Horror',
    category: 'Display',
    weight: 'Textured',
    badge: 'Artistic',
    preview: 'SPOOKY VIBE',
    description: 'Textured horror-style display',
    fontFamily: 'Creepster',
    styles: 1,
  },
  {
    id: 19,
    name: 'Vintage Royal',
    category: 'Serif',
    weight: 'Old English',
    badge: 'Heritage',
    preview: 'Arafat apparel',
    description: 'Traditional Old English blackletter',
    fontFamily: 'UnifrakturMaguntia',
    styles: 1,
  },
  {
    id: 20,
    name: 'Summer Love',
    category: 'Script',
    weight: 'Bold',
    badge: 'Popular',
    preview: 'Beach Vibes',
    description: 'Friendly bold script for leisure',
    fontFamily: 'Lobster',
    styles: 1,
  },
  {
    id: 21,
    name: 'Retro Modern',
    category: 'Display',
    weight: 'Geometric',
    badge: 'Tech',
    preview: 'FUTURE VISION',
    description: 'Geometric 90s retro-future style',
    fontFamily: 'Righteous',
    styles: 1,
  },
];

const CATEGORIES = ['All Fonts', 'Display', 'Sans Serif', 'Script', 'Serif', 'Athletic', 'Stencil'];

export default function FontGallery() {
  const [activeCategory, setActiveCategory] = useState('All Fonts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFonts = FONTS.filter(font => {
    const matchesCategory = activeCategory === 'All Fonts' || font.category === activeCategory;
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search fonts..."
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
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredFonts.map((font) => (
            <motion.div
              key={font.id}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={cn(
                "glass-card p-6 flex flex-col group",
                font.isLarge && "lg:col-span-2"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-metropolis font-bold text-xl">{font.name}</h3>
                  <p className="text-[10px] font-sora font-semibold text-on-surface-variant uppercase tracking-widest mt-1">
                    {font.category} • {font.weight}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-semibold text-on-surface-variant">
                    {font.badge}
                  </span>
                  {font.styles > 1 && (
                    <span className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-semibold text-on-surface-variant">
                      {font.styles} Styles
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center py-12 bg-surface-container-lowest/50 rounded-lg mb-6 group-hover:bg-surface-container-lowest transition-colors">
                <span 
                  style={{ fontFamily: font.fontFamily }} 
                  className={cn(
                    "text-center px-4",
                    font.isLarge ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
                  )}
                >
                  {font.preview}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-on-surface-variant italic">{font.description}</p>
                <div className="flex items-center gap-3">
                  {font.isLarge ? (
                    <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                      <Eye className="w-3 h-3" />
                      Preview Styles
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                       {font.name === 'Anton' ? (
                         <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                           <Heart className="w-4 h-4 text-on-surface-variant" />
                         </button>
                       ) : font.name === 'Poppins' ? (
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <Share2 className="w-4 h-4 text-on-surface-variant" />
                        </button>
                       ) : (
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <Download className="w-4 h-4 text-on-surface-variant" />
                        </button>
                       )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
