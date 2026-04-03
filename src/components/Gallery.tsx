import { motion } from 'motion/react';

const images = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
    title: "The Facade"
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    aspect: "aspect-[16/9]",
    title: "Living Spaces"
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    aspect: "aspect-square",
    title: "Master Suite"
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
    title: "Bath Elegance"
  }
];

export function Gallery() {
  return (
    <section className="py-24 md:py-40 bg-charcoal text-warm-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-gold font-serif italic text-xl">04</span>
              <div className="h-[1px] w-12 bg-stone/30"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-stone/60">Gallery</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              A Visual <br />
              <span className="italic text-gold">Symphony</span>
            </motion.h2>
          </div>
        </div>

        {/* Editorial Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group overflow-hidden"
            >
              <div className={`${images[0].aspect} overflow-hidden`}>
                <img src={images[0].src} alt={images[0].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-charcoal to-transparent w-full">
                <p className="font-serif text-xl">{images[0].title}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group overflow-hidden md:ml-12"
            >
              <div className={`${images[2].aspect} overflow-hidden`}>
                <img src={images[2].src} alt={images[2].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-charcoal to-transparent w-full">
                <p className="font-serif text-xl">{images[2].title}</p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7 space-y-12">
             <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group overflow-hidden"
            >
              <div className={`${images[1].aspect} overflow-hidden`}>
                <img src={images[1].src} alt={images[1].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-charcoal to-transparent w-full">
                <p className="font-serif text-xl">{images[1].title}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group overflow-hidden md:mr-24"
            >
              <div className={`${images[3].aspect} overflow-hidden`}>
                <img src={images[3].src} alt={images[3].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-charcoal to-transparent w-full">
                <p className="font-serif text-xl">{images[3].title}</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
