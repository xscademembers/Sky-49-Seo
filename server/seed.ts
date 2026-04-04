import { GalleryImage } from './models/Gallery';

const defaultImages = [
  {
    src: '/2000-x-1333-1024x682.png',
    aspect: 'aspect-[4/5]',
    title: 'The Facade',
    desc: 'Iconic architecture that redefines the Tellapur skyline.',
    category: 'main',
    order: 0,
  },
  {
    src: '/3-1024x682.png',
    aspect: 'aspect-[16/9]',
    title: 'Living Spaces',
    desc: 'Expansive, sunlit interiors designed for modern luxury.',
    category: 'main',
    order: 1,
  },
  {
    src: '/5-1024x682.png',
    aspect: 'aspect-square',
    title: 'Master Suite',
    desc: 'A private sanctuary of comfort and elegance.',
    category: 'main',
    order: 2,
  },
  {
    src: '/4-1024x682.png',
    aspect: 'aspect-[3/4]',
    title: 'Bath Elegance',
    desc: 'Spa-inspired bathrooms with premium fixtures.',
    category: 'main',
    order: 3,
  },
  {
    src: '/3-1-1024x682.png',
    aspect: 'aspect-[16/10]',
    title: 'Landscaped Arrival',
    desc: 'A curated approach to the everyday arrival experience.',
    category: 'extra',
    order: 4,
  },
  {
    src: '/12%20(1).png',
    aspect: 'aspect-[16/10]',
    title: 'Resort-Style Living',
    desc: 'Outdoor leisure crafted for year-round enjoyment.',
    category: 'extra',
    order: 5,
  },
];

export async function seedGallery() {
  const count = await GalleryImage.countDocuments();
  if (count === 0) {
    await GalleryImage.insertMany(defaultImages);
    console.log('Seeded gallery with default images');
  }
}
