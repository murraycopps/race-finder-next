import { outTime } from "@/scripts";
import { Split, Lap } from "@/scripts/singleRunTypes";

const DetailedLapsCard = ({
  laps,
  label,
  close,
}: {
  laps: Split[] | Lap[];
  label: string;
  close: () => void;
}) => (
  <div className="fixed z-20 flex flex-col items-center gap-4 p-8 overflow-y-auto justify-evenly inset-x-64 inset-y-16 bg-wisteria-700 rounded-3xl">
    <button
      className="absolute flex flex-col justify-between w-12 h-10 px-1 py-2 text-white rounded-full nav-button open top-4 left-4"
      onClick={close}
    >
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
    </button>

    {laps.map((lap, i) => (
      <div key={i} className="grid w-full grid-cols-5 place-items-center">
        <h3 className="text-xl font-bold">
          {label} {i + 1}
        </h3>
        {/* <div className="grid grid-cols-4 grow place-items-center"> */}
        <LapStatsCard name="Distance" des={lap.distance} />
        <LapStatsCard
          name="Pace"
          des={outTime((lap.moving_time / lap.distance) * 1609.34)}
        />
        <LapStatsCard name="MovingTime" des={outTime(lap.moving_time)} />
        <LapStatsCard name="ElapsedTime" des={outTime(lap.elapsed_time)} />
        {/* </div> */}
      </div>
    ))}
  </div>
);


const LapStatsCard = ({
    name,
    des,
  }: {
    name: string;
    des: string | number;
  }) => (
    <div className="flex flex-col items-center justify-center w-full gap-2 border-l-2 border-white">
      <h1 className="font-bold text-md">{name}</h1>
      <p className="text-lg">{des}</p>
    </div>
  );

  
  export default DetailedLapsCard;