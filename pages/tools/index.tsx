import IntensityCard from "@/components/IntensityCard";
import PageWrapper from "@/components/PageWrapper";
import ToolLink from "@/components/ToolLink";

export default function Tools() {
  return (
    <PageWrapper
      page="Tools"
      className="flex flex-col items-center min-h-screen gap-4 p-4 font-sans text-white sm:gap-8 justify-evenly"
    >
      <h1 className="w-full py-2 text-6xl text-center slanted bg-ronchi-600">
        Tools
      </h1>
      <div className="grid w-full gap-8 sm:grid-cols-2 place-items-center">
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
