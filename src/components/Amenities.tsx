import { motion } from 'motion/react';

const amenities = [
  {
    title: "The Grand Clubhouse",
    desc: "A sprawling 50,000 sq.ft. sanctuary of leisure, featuring a temperature-controlled pool, private theatre, and fine-dining spaces.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
  },
  {
    title: "Sky Lounge & Deck",
    desc: "Elevate your evenings at the 49th-level observatory deck, offering panoramic views of the Hyderabad skyline.",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Wellness Sanctuary",
    desc: "State-of-the-art fitness center, yoga pavilion, and a full-service spa designed for holistic rejuvenation.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Private Courtyards",
    desc: "Immaculately landscaped gardens and serene water features that provide a tranquil escape from the urban rush.",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2072&auto=format&fit=crop"
  }
];

export function Amenities() {
  return (
    <section className="py-24 md:py-40 bg-warm-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-gold font-serif italic text-xl">02</span>
              <div className="h-[1px] w-12 bg-stone"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-medium text-muted">Signature Lifestyle</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight"
            >
              Curated for the <br />
              <span className="italic text-gold">Connoisseurs of Life</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted font-light max-w-md"
          >
            Experience hospitality-grade amenities that blur the line between a luxury resort and your daily residence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {amenities.map((amenity, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <img 
                  src={amenity.img} 
                  alt={amenity.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Hover Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white uppercase tracking-widest text-xs font-medium flex items-center gap-2">
                    Explore <div className="w-6 h-[1px] bg-white"></div>
                  </span>
                </div>
              </div>
              
              <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">{amenity.title}</h3>
              <p className="text-muted font-light text-sm leading-relaxed max-w-md">{amenity.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
