import type { MediaSource } from "@/lib/content";
import { imageSrcSet, imageUrl } from "@/lib/media";
export function Photo({ source, alt, className, sizes = "100vw", priority = false }: { source: MediaSource; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  // Native responsive images let the media CDN optimize once, without a second image proxy.
  return <img src={imageUrl(source)} srcSet={imageSrcSet(source)} sizes={sizes} alt={alt} width={1600} height={1100} className={className} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}
