import IntensityCard from "@/components/IntensityCard";
import PageWrapper from "@/components/PageWrapper";
import ToolLink from "@/components/ToolLink";

export default function Tools() {
  return (
    <PageWrapper
      page="Tools"
      className="flex flex-col items-center min-h-screen gap-8 p-4 font-sans text-white justify-evenly"
    >
      <h1 className="w-full py-2 text-6xl text-center slanted bg-ronchi-600">Tools</h1>
      {/* <p className="w-3/4 text-2xl text-center">
        Our website offers a range of online tools for runners, including time
        conversion tools for track and cross-country, aiding progress tracking
        and performance comparison for runners of all levels. Try them out now
        and achieve your goals like a pro!
      </p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        <ToolLink
          href="/tools/pacing"
          name="Pacing"
          description="Calculate your running pace for any distance and plan your training effectively."
        />
        <ToolLink
          href="/tools/vdot"
          name="Equivalent Races"
          description="Estimate race performance using VDOT score to calculate equivalent times."
        />
        <ToolLink
          href="/tools/unusual"
          name="Unusual Distances"
          description="Calculate your running pace for non-standard distances."
        />
        <ToolLink
          href="/tools/relay"
          name="Relay Calculator"
          description="Calculate your team's time for a relay by adding any number of times together."
        />
        <ToolLink
          href="/tools/scoring"
          name="Scoring"
          description="Calculate your score for a track or cross country meet."
        />
        <ToolLink
          href="/tools/convert"
          name="Convert"
          description="Convert between different units of measurement."
        />
        <ToolLink
          href="/tools/hill"
          name="Hill Calculator"
          description="Calculate your running pace on hills using change in elevation."
        />
      </div> */}
      <div className="grid w-full grid-cols-2 gap-8 place-items-center">
        <div className="flex flex-col items-center w-full h-full gap-4 justify-evenly">
          
        <ToolLink
          href="/tools/pacing"
          name="Pacing"
          description="Calculate pace and splits."
        />
        <ToolLink
          href="/tools/vdot"
          name="Equivalent Races"
          description="Use a Vdot table to see time."
        />
        <ToolLink
          href="/tools/unusual"
          name="Unusual Distances"
          description="Calculate unusual pace and spits."
        />
        <ToolLink
          href="/tools/relay"
          name="Relay Calculator"
          description="Add times together."
        />
        <ToolLink
          href="/tools/scoring"
          name="Scoring"
          description="Calculate meet scores."
        />
        <ToolLink
          href="/tools/convert"
          name="Convert"
          description="Convert units of measurement."
        />
        <ToolLink
          href="/tools/hill"
          name="Hill Calculator"
          description="Calculate your running pace on hills."
        />
          
        </div>
        <IntensityCard /> 
      </div>
    </PageWrapper>
  );
}
