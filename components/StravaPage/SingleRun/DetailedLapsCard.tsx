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
  <div
    className={`fixed z-20 flex flex-col items-center justify-start p-2 ${
      laps.length < 6 ? "overflow-y-auto" : "overflow-y-scroll"
    } sm:p-8 inset-2 lg:inset-x-32 lg:inset-y-16 md:inset-8 bg-wisteria-700 rounded-3xl scrollbar-m-y-4 scrollbar-light-gray`}
  >
    <button
      className="fixed flex flex-col justify-between w-12 h-10 px-1 py-2 text-white rounded-full nav-button open lg:top-20 lg:left-36 md:top-12 md:left-12 top-4 right-4"
      onClick={close}
    >
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
    </button>

    <div className="flex flex-col w-full gap-6 grow h-fit justify-evenly">
      {laps.map((lap, i) => (
        <div
          key={i}
          className="grid w-full grid-cols-3 sm:grid-cols-5 place-items-center"
        >
          <h3 className="row-span-2 text-lg font-bold sm:text-xl sm:row-span-1">
            {label} {i + 1}
          </h3>
          {/* <div className="grid grid-cols-4 grow place-items-center"> */}
          <LapStatsCard name="Distance" des={lap.distance} />
          <LapStatsCard
            name="Pace"
            des={outTime((lap.moving_time / lap.distance) * 1609.34)}
          />
          <LapStatsCard name="Moving Time" des={outTime(lap.moving_time)} />
          <LapStatsCard name="Elapsed Time" des={outTime(lap.elapsed_time)} />
          {/* </div> */}
        </div>
      ))}
    </div>
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
