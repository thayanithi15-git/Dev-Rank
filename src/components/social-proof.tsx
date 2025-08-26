import Image from "next/image"

export function SocialProof() {
  return (
    <section className="self-stretch border-border py-16 flex flex-col justify-center items-center gap-6 overflow-hidden bg-background">
      <div className="text-center text-muted-foreground text-sm font-medium leading-tight">
        Trusted by fast-growing startups
      </div>
      
      {/* Logo Grid with Enhanced Styling */}
      <div className="self-stretch grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="group relative w-full max-w-[400px] h-auto transition-all duration-300 hover:scale-105"
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            
            <Image
              src={`/logos/logo0${i + 1}.svg`}
              alt={`Company Logo ${i + 1}`}
              width={400}
              height={120}
              className="relative z-10 w-full h-auto object-contain 
                         filter grayscale opacity-90 
                         transition-all duration-300 
                         group-hover:opacity-80 group-hover:grayscale-0
                         dark:brightness-90 dark:contrast-110"
            />
          </div>
        ))}
      </div>
      
      {/* Optional: Add a subtle separator */}
      <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent mt-8 opacity-30" />
    </section>
  )
}