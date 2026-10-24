import type { MediaSource } from "./content";
function publicId(id: string) { return id.split("/").map(encodeURIComponent).join("/"); }
function cloudName(cloud?: string) {
  const name = cloud || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!name) throw new Error("Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME before adding Cloudinary assets.");
  return encodeURIComponent(name);
}
export function imageUrl(source: MediaSource, width = 1200) {
  if (source.provider === "unsplash") return `https://images.unsplash.com/${encodeURIComponent(source.id)}?auto=format&fit=max&w=${width}&q=80`;
  return `https://res.cloudinary.com/${cloudName(source.cloud)}/image/upload/f_auto/q_auto/c_limit,w_${width}/${publicId(source.id)}`;
}
export function imageSrcSet(source: MediaSource) {
  return [480, 768, 1024, 1440, 1920].map(width => `${imageUrl(source, width)} ${width}w`).join(", ");
}
export function videoUrl(video: { id: string; cloud?: string }) {
  return `https://res.cloudinary.com/${cloudName(video.cloud)}/video/upload/f_mp4/q_auto/c_limit,w_1920/${publicId(video.id)}.mp4`;
}
