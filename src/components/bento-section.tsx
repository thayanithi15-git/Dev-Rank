import AiCodeReviews from "./bento/ai-code-reviews"
import RealtimeCodingPreviews from "./bento/real-time-previews"
import OneClickIntegrationsIllustration from "./bento/one-click-integrations-illustration"
import MCPConnectivityIllustration from "./bento/mcp-connectivity-illustration" // Updated import
import EasyDeployment from "./bento/easy-deployment"
import ParallelCodingAgents from "./bento/parallel-agents" // Updated import

const BentoCard = ({ title, description, Component }) => (
  <div className="overflow-hidden rounded-2xl border border-black/10 flex flex-col justify-start items-start relative shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300">
    {/* Background with blur effect */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "rgba(231, 236, 235, 0.08)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    {/* Additional subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
      <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
        <p className="self-stretch text-foreground text-lg font-normal leading-7">
          {title} <br />
          <span className="text-muted-foreground">{description}</span>
        </p>
      </div>
    </div>
    <div className="self-stretch h-72 relative -mt-0.5 z-10">
      <Component />
    </div>
  </div>
)

export function BentoSection() {
  const cards = [
    {
      title: "AI-powered skill analysis",
      description: "Advanced algorithms analyze coding patterns and project complexity for accurate rankings.",
      Component: AiCodeReviews,
    },
    {
      title: "Real-time developer tracking",
      description: "Monitor developer progress across platforms with live updates and insights.",
      Component: RealtimeCodingPreviews,
    },
    {
      title: "Multi-platform integration",
      description: "Connect GitHub, LeetCode, Stack Overflow, and 15+ platforms instantly.",
      Component: OneClickIntegrationsIllustration,
    },
    {
      title: "Smart recruiter matching",
      description: "AI matches developers with recruiters based on skills, experience, and preferences.",
      Component: MCPConnectivityIllustration,
    },
    {
      title: "Dynamic ranking system",
      description: "Comprehensive scoring algorithm that evaluates code quality, consistency, and impact.",
      Component: ParallelCodingAgents,
    },
    {
      title: "Developer profile builder",
      description: "Automatically generate professional profiles from your coding activity and achievements.",
      Component: EasyDeployment,
    },
  ]

  return (
    <section className="w-full border px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-10 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              AI-Powered Developer Intelligence
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Advanced algorithms analyze developer skills, track progress across platforms, and connect top talent 
              with recruiters through intelligent matching and comprehensive ranking systems.
            </p>
          </div>
        </div>
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
