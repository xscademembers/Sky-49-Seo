import { useState } from 'preact/hooks';

type Status = 'idle' | 'loading' | 'success' | 'error';

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export default function HeroEoiForm() {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim()) return;

    // Track lead-intent conversion on submit click.
    window.gtag_report_conversion?.();
    setStatus('loading');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: '',
          email: '',
          phone: phone.trim(),
          interest: 'eoi',
          message: 'Submitted from hero EOI form',
          wantsBrochure: false,
        }),
      });

      if (!res.ok) throw new Error('submit_failed');
      setStatus('success');
      setFirstName('');
      setPhone('');
      window.setTimeout(() => setStatus('idle'), 3500);
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 3500);
    }
  };

  return (
    <form class="mt-6 space-y-4" aria-label="Hero mini phone form" onSubmit={onSubmit}>
      <label class="sr-only" for="hero-eoi-name">Name</label>
      <input
        id="hero-eoi-name"
        name="firstName"
        type="text"
        value={firstName}
        onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
        required
        placeholder="Enter your name"
        class="w-full rounded-none border border-stone/50 bg-white/70 px-4 py-3 text-sm text-charcoal placeholder:text-muted focus:border-gold focus:outline-none"
        autocomplete="name"
      />

      <label class="sr-only" for="hero-eoi-phone">Phone Number</label>
      <input
        id="hero-eoi-phone"
        name="phone"
        type="tel"
        value={phone}
        onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
        required
        placeholder="Enter your phone number"
        class="w-full rounded-none border border-stone/50 bg-white/70 px-4 py-3 text-sm text-charcoal placeholder:text-muted focus:border-gold focus:outline-none"
        autocomplete="tel"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        class="inline-flex w-full items-center justify-center bg-charcoal px-6 py-4 text-sm font-semibold text-white transition hover:bg-gold hover:text-charcoal disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting...' : 'Register EOI Now'}
      </button>

      {status === 'success' ? <p class="text-xs text-green-700">Submitted. Our team will call you shortly.</p> : null}
      {status === 'error' ? <p class="text-xs text-red-600">Unable to submit right now. Please try again.</p> : null}
    </form>
  );
}
