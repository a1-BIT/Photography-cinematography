// Edit this file to change the brand, biography, and portfolio. All work below is demo content.
export const site = {
  name: "MyView",
  tagline: "Photography & cinematography",
  description: "A considered eye. An honest story. Photography and films that find the extraordinary in the everyday.",
  about: "MyView is a space for stories told through light, movement, and the moments in between. From intimate celebrations to expressive campaigns, the approach is always the same: observe closely, feel deeply, and create with intention.",
  aboutNote: "The people. The places. The feeling of being there. That’s what stays with me — and what I want to leave with you.",
  // Add real URLs when ready, e.g. { label: 'Instagram', url: 'https://instagram.com/yourname' }.
  socials: [] as { label: string; url: string }[],
  demo: true,
};
export const categories = ["Weddings", "Fashion", "Events", "Commercial", "Films"] as const;
export type Category = typeof categories[number];
export type MediaSource = { provider: "unsplash"; id: string } | { provider: "cloudinary"; id: string; cloud?: string };
export type Work = {
  id: string; title: string; category: Category; kind: "photo" | "video";
  image: MediaSource; alt: string; year: string; shape: "landscape" | "portrait";
  video?: { id: string; cloud?: string }; duration?: string;
};
export const hero: MediaSource = { provider: "unsplash", id: "photo-1470252649378-9c29740c9fa8" };
export const portrait: MediaSource = { provider: "unsplash", id: "photo-1452587925148-ce544e77e70d" };
export const works: Work[] = [
  { id: "a-place-between", title: "A place between", category: "Films", kind: "video", image: { provider: "unsplash", id: "photo-1464822759023-fed622ff2c3b" }, alt: "Sunlight breaking across a dramatic mountain ridge", year: "2026", shape: "landscape", video: { id: "sea_turtle", cloud: "demo" }, duration: "Preview" },
  { id: "quiet-promises", title: "Quiet promises", category: "Weddings", kind: "photo", image: { provider: "unsplash", id: "photo-1519741497674-611481863552" }, alt: "A romantic wedding celebration beneath a canopy of lights", year: "2026", shape: "portrait" },
  { id: "in-her-element", title: "In her element", category: "Fashion", kind: "photo", image: { provider: "unsplash", id: "photo-1534528741775-53994a69daeb" }, alt: "Natural light portrait of a woman with wind-swept hair", year: "2026", shape: "portrait" },
  { id: "after-hours", title: "After hours", category: "Events", kind: "photo", image: { provider: "unsplash", id: "photo-1492684223066-81342ee5ff30" }, alt: "A crowd gathered beneath bright festival lights", year: "2025", shape: "landscape" },
  { id: "objects-of-intention", title: "Objects of intention", category: "Commercial", kind: "photo", image: { provider: "unsplash", id: "photo-1495474472287-4d71bcdd2085" }, alt: "Thoughtfully arranged coffee and warm natural textures", year: "2025", shape: "landscape" },
  { id: "the-long-way-home", title: "The long way home", category: "Films", kind: "video", image: { provider: "unsplash", id: "photo-1473448912268-2022ce9509d8" }, alt: "Soft light falling through a quiet green forest", year: "2025", shape: "landscape", video: { id: "sea_turtle", cloud: "demo" }, duration: "Preview" },
  { id: "together", title: "Together, always", category: "Weddings", kind: "photo", image: { provider: "unsplash", id: "photo-1511285560929-80b456fea0bc" }, alt: "A couple sharing a quiet moment on their wedding day", year: "2025", shape: "landscape" },
  { id: "soft-focus", title: "Soft focus", category: "Fashion", kind: "photo", image: { provider: "unsplash", id: "photo-1524504388940-b1c1722653e1" }, alt: "An outdoor fashion portrait in soft afternoon light", year: "2025", shape: "portrait" },
  { id: "in-good-company", title: "In good company", category: "Events", kind: "photo", image: { provider: "unsplash", id: "photo-1511795409834-ef04bbd61622" }, alt: "An elegant event table set for an evening gathering", year: "2025", shape: "landscape" },
  { id: "daily-rituals", title: "Daily rituals", category: "Commercial", kind: "photo", image: { provider: "unsplash", id: "photo-1441986300917-64674bd600d8" }, alt: "A considered retail interior with clean lines and natural light", year: "2025", shape: "landscape" },
];
