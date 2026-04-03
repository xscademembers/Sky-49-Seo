import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-warm-white pt-24 pb-12 border-t border-stone">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl text-charcoal mb-6">THE SKY49</h2>
            <p className="text-muted font-light max-w-sm mb-8">
              Ultra-luxury residences in Tellapur, Hyderabad. A legacy investment for the discerning few.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-stone flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-colors">
                <span className="sr-only">Instagram</span>
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-stone flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-colors">
                <span className="sr-only">LinkedIn</span>
                IN
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-medium mb-6">Residences</h4>
            <ul className="space-y-4 text-sm font-light text-muted">
              <li><a href="#" className="hover:text-gold transition-colors">3 BHK Luxury</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">4 BHK Premium</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Sky Penthouses</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Floor Plans</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-medium mb-6">Experience</h4>
            <ul className="space-y-4 text-sm font-light text-muted">
              <li><a href="#" className="hover:text-gold transition-colors">Amenities</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Location</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">The Vision</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-charcoal font-medium mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-muted">
              <li>Tellapur Road, Hyderabad, Telangana 500019</li>
              <li><a href="mailto:sales@thesky49.com" className="hover:text-gold transition-colors">sales@thesky49.com</a></li>
              <li><a href="tel:+919876543210" className="hover:text-gold transition-colors">+91 98765 43210</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone text-xs text-muted font-light">
          <p>&copy; {new Date().getFullYear()} THE SKY49. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-charcoal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-charcoal transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-charcoal transition-colors">RERA Details</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
