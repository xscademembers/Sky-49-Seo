import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, Check } from 'lucide-react';

function HeroForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setStatus('loading');
    try {
      const [firstName, ...rest] = name.trim().split(' ');
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(' ') || '',
          email: '',
          phone,
          interest: 'EOI',
          message: 'Submitted via Hero EOI form',
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setName('');
      setPhone('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="font-serif text-xl text-charcoal">Thank You!</h3>
        <p className="mt-1 text-sm text-muted">We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="font-serif text-2xl mb-2 text-charcoal">Request a EOI</h3>
      <p className="text-sm text-muted mb-6">Enter before the address appreciates.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white/50 border border-stone/50 px-4 py-3 rounded-none focus:outline-none focus:border-gold transition-colors font-light text-sm"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-white/50 border border-stone/50 px-4 py-3 rounded-none focus:outline-none focus:border-gold transition-colors font-light text-sm"
          />
        </div>
        {status === 'error' && (
          <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-charcoal text-white px-6 py-4 flex items-center justify-between group hover:bg-gold transition-colors duration-500 disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <span className="tracking-wide text-xs font-medium">Submitting...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span className="tracking-wide text-xs font-medium">Register EOI Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image/Video with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img 
          src="/2000-x-1333-1024x682.png" 
          alt="SKY49 Luxury Residence" 
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white/40 via-warm-white/20 to-warm-white/90 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-white/10"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center mt-16 md:mt-0">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 flex items-center gap-3 md:gap-4"
          >
            <div className="h-px w-8 shrink-0 bg-gold md:w-12" aria-hidden />
            <span className="inline-block bg-gold/45 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal sm:px-7 sm:text-xs md:px-8 md:text-[13px]">
              THE SKY49 TELLAPUR
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-charcoal mb-8 text-balance"
          >
            Hyderabad’s Most <br className="hidden md:block" />
            <span className="italic text-gold">Elegant</span> Skyline
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12 text-charcoal"
          >
            <span className="bg-[#efe8d4]/95 px-1.5 py-0.5 box-decoration-clone [-webkit-box-decoration-break:clone]">
              Ultra-luxury 3 & 4 BHK residences at Tellapur, crafted for prestige living, legacy wealth, and timeless appreciation.
            </span>
          </motion.p>
        </div>
      </div>

      {/* Floating Glass Lead Form */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-0 right-0 md:bottom-12 md:right-12 w-full md:w-[400px] glass-panel p-8 md:rounded-2xl z-20"
      >
        <HeroForm />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-6 md:left-12 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60 rotate-90 origin-left translate-x-2">Scroll</span>
        <div className="w-[1px] h-16 bg-charcoal/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
