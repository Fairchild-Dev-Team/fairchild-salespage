import { testimonialVideos } from "@/lib/sales-content"

export function TestimonialVideos() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {testimonialVideos.map((video) => (
        <figure
          key={video.vimeoId}
          className="overflow-hidden rounded-[1.5rem] border border-[#E8D5E6] bg-[#1A0A2E]"
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0`}
              title={`${video.name} — FairChild mentee story`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <figcaption className="space-y-1 bg-[#FEF5FE] px-5 py-4">
            <p className="font-heading text-lg font-semibold text-[#631760]">
              {video.name}
            </p>
            <p className="text-sm text-[#525866]">{video.role}</p>
            <p className="text-sm leading-relaxed text-[#0E121B]">{video.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
