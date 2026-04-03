import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const plans = [
  {
    id: '3bhk',
    name: '3 BHK Luxury',
    size: '2,450 Sq.Ft.',
    desc: 'Perfectly proportioned spaces with expansive living areas and a dedicated home office.',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2053&auto=format&fit=crop' // Placeholder for floor plan
  },
  {
    id: '4bhk',
    name: '4 BHK Premium',
    size: '3,800 Sq.Ft.',
    desc: 'Grandeur redefined. Features a private foyer, dual master suites, and a sweeping wrap-around balcony.',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'penthouse',
    name: 'Sky Penthouse',
    size: '6,200 Sq.Ft.',
    desc: 'The pinnacle of Tellapur. Double-height ceilings, private plunge pool, and unhindered 360° views.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  }
];

export function FloorPlans() {
  const [activePlan, setActivePlan] = useState(plans[0].id);

  const currentPlan = plans.find(p => p.id === activePlan);

  return (
    <section className="py-24 md:py-40 bg-warm-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-stone"></div>
            <span className="uppercase tracking-[0.2em] text-xs font-medium text-muted">Blueprints</span>
            <div className="h-[1px] w-8 bg-stone"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight"
          >
            Spatial <span className="italic text-gold">Elegance</span>
          </motion.h2>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActivePlan(plan.id)}
              className={`px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 border ${
                activePlan === plan.id 
                  ? 'border-charcoal bg-charcoal text-white' 
                  : 'border-stone text-charcoal hover:border-gold'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* Plan Display */}
        <div className="glass-panel p-4 md:p-12 rounded-2xl max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            >
              <div className="md:col-span-5 space-y-6">
                <h3 className="font-serif text-3xl text-charcoal">{currentPlan?.name}</h3>
                <div className="inline-block px-4 py-2 bg-stone/30 text-charcoal font-mono text-sm">
                  {currentPlan?.size}
                </div>
                <p className="text-muted font-light leading-relaxed">
                  {currentPlan?.desc}
                </p>
                <button className="mt-8 group flex items-center gap-4 text-charcoal hover:text-gold transition-colors">
                  <span className="uppercase tracking-widest text-xs font-medium">Download Floor Plan</span>
                  <div className="w-8 h-[1px] bg-charcoal group-hover:bg-gold group-hover:w-12 transition-all duration-300"></div>
                </button>
              </div>
              
              <div className="md:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-stone/30">
                {/* Abstract representation of a floor plan since we don't have real blueprint images */}
                <div className="aspect-[4/3] relative overflow-hidden group cursor-crosshair">
                  <img 
                    src={currentPlan?.img} 
                    alt={currentPlan?.name} 
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-charcoal/10 m-4"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 text-xs uppercase tracking-widest text-charcoal shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to Enlarge
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
