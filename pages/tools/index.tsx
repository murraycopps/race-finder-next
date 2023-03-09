import PageWrapper from "@/components/PageWrapper";
import ToolLink from "@/components/ToolLink";

export default function Tools() {
  return (
    <PageWrapper
      page="Tools"
      className="flex flex-col items-center gap-8 p-4 font-sans text-white bg-gray-800"
    >
      <h1 className="text-5xl">Tools</h1>
      <p className="text-2xl">
        A collection of tools to help you with your running.
      </p>
      <div className="grid grid-cols-4 gap-4">
        <ToolLink href="/tools/pacing" name="Pacing" description="Calculate your pace for a given distance." />
        <ToolLink href="/tools/vdot" name="Equivalent Races" description="Calculate your VDOT score and equivalent times." />
        <ToolLink href="/tools/unusual" name="Unusual Distances" description="Calculate your pace for unusual distances." />
        <ToolLink href="/tools/relay" name="Relay Calculator" description="Calculate your team's time for a relay." />
        <ToolLink href="/tools/scoring" name="Scoring" description="Calculate your score for a track or cross country meet." />
        <ToolLink href="/tools/speed" name="Speed" description="Convert between speed and pace." />
        <ToolLink href="/tools/hill" name="Hill Calculator" description="Calculate your pace on a hill." />
      </div>
    </PageWrapper>
  );
}
