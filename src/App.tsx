import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Pricing } from './components/Pricing';
import { Amenities } from './components/Amenities';
import { Location } from './components/Location';
import { FloorPlans } from './components/FloorPlans';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';

export default function App() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <Story />
      <Pricing />
      <Amenities />
      <Location />
      <FloorPlans />
      <Gallery />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
