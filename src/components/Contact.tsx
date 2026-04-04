import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section
      className="relative overflow-hidden bg-stone/10 py-12 md:py-20 scroll-mt-24"
      id="contact"
    >
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Inquire</span>
            </div>

            <h2 className="mb-8 font-serif text-4xl leading-tight text-charcoal md:text-5xl lg:text-6xl">
              Register Your <br />
              <span className="italic text-gold">Interest</span>
            </h2>

            <p className="mb-12 max-w-md text-lg font-light leading-relaxed text-muted">
              Connect with our private client advisory team to schedule a bespoke tour of THE SKY49 or request
              detailed floor plans and pricing.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone bg-white shadow-sm">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-muted">Direct Line</p>
                  <a
                    href="tel:+918790066990"
                    className="text-lg font-medium text-charcoal transition-colors hover:text-gold"
                  >
                    +91 8790066990
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone bg-white shadow-sm">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-muted">Email Advisory</p>
                  <a
                    href="mailto:sales@thesky49.com"
                    className="text-lg font-medium text-charcoal transition-colors hover:text-gold"
                  >
                    sales@thesky49.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-[2rem] border border-stone/30 bg-white p-8 shadow-2xl md:p-12"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-stone/50 blur-3xl" />

            <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted">First Name</label>
                  <input
                    type="text"
                    className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Last Name</label>
                  <input
                    type="text"
                    className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Email Address</label>
                  <input
                    type="email"
                    className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                    placeholder="+91 8790066990"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-widest text-muted">Interested In</label>
                <select
                  className="w-full cursor-pointer appearance-none border-b border-stone bg-transparent pb-3 text-charcoal focus:border-gold focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Residence Type
                  </option>
                  <option value="3bhk">3 BHK Luxury</option>
                  <option value="4bhk">4 BHK Premium</option>
                  <option value="penthouse">Sky Penthouse</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-widest text-muted">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full resize-none border-b border-stone bg-transparent pb-3 text-charcoal placeholder:text-stone/40 focus:border-gold focus:outline-none"
                  placeholder="How can we assist you?"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="downloadBrochure"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-stone transition-colors checked:border-gold checked:bg-gold"
                  />
                  <svg
                    className="pointer-events-none absolute left-1 top-1 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4.5 8.5L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <label htmlFor="downloadBrochure" className="cursor-pointer select-none text-sm text-charcoal">
                  I would like to receive the digital brochure
                </label>
              </div>

              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-charcoal px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-gold"
              >
                Submit Inquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
