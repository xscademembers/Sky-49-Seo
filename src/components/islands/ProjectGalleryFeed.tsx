import { useEffect, useState } from 'preact/hooks';

type Img = { src: string; alt: string };
type GalleryApiItem = {
  _id: string;
  src: string;
  title?: string;
  category?: string;
  order?: number;
};

export default function ProjectGalleryFeed({ fallbackImages }: { fallbackImages: Img[] }) {
  const [images, setImages] = useState<Img[]>(fallbackImages);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) return;
        const items = (await res.json()) as GalleryApiItem[];
        const main = items
          .filter((x) => (x.category || 'main') === 'main')
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .slice(0, 6)
          .map((x, i) => ({
            src: x.src,
            alt: x.title || `Sky49 gallery image ${i + 1}`,
          }));
        if (active && main.length > 0) setImages(main);
      } catch {
        // Keep fallback images when API is unavailable.
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      {images.map((img, i) => (
        <figure class="overflow-hidden bg-white/50">
          <img
            src={img.src}
            alt={img.alt}
            class="aspect-[16/10] w-full object-cover"
            loading={i < 3 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </figure>
      ))}
    </div>
  );
}
