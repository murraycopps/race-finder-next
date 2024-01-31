import { outTime } from "@/scripts";

const Graph = ({
  name,
  nums,
  onClick,
}: {
  name: string;
  nums: { moving_time: number }[];
  onClick: () => void;
}) => {
  const numbers = nums.map((num) => num.moving_time);
  const max = Math.max(...numbers);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 md:p-8">
      <h2 className="text-4xl font-bold">{name}</h2>

      <div
        className={`items-end justify-center ${
          numbers.length > 12 ? "hidden" : "flex"
        } w-full h-64 gap-1 pt-4 sm:flex`}
      >
        {numbers.map((num, i) => (
          <div
            key={i}
            className="flex items-end justify-center flex-1 text-xl bg-lavender-700"
            style={{
              height: ` calc(${(num / max) * 100}% + 1rem)`,
            }}
          >
            <p className={numbers.length > 7 ? "text-sm" : ""}>
              {outTime(num)}
            </p>
          </div>
        ))}
      </div>

      {/* for mobile: mobile cannot display more then 12 items across so if there are more then 12 items put them in two rows */}
      {numbers.length > 12 && (
        <>
          <div
            className={`items-end justify-center  w-full h-64 gap-1 pt-4 flex`}
          >
            {numbers.splice(0, Math.floor(numbers.length / 2) - 1).map((num, i) => (
              <div
                key={i}
                className="flex items-end justify-center flex-1 text-xl bg-lavender-700"
                style={{
                  height: ` calc(${(num / max) * 100}% + 1rem)`,
                }}
              >
                <p className={numbers.length > 7 ? "text-sm" : ""}>
                  {outTime(num)}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`items-end justify-center w-full h-64 gap-1 pt-4 flex`}
          >
            {numbers.splice(Math.floor(numbers.length / 2) - 1).map((num, i) => (
              <div
                key={i}
                className="flex items-end justify-center flex-1 text-xl bg-lavender-700"
                style={{
                  height: ` calc(${(num / max) * 100}% + 1rem)`,
                }}
              >
                <p className={numbers.length > 7 ? "text-sm" : ""}>
                  {outTime(num)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        className="px-4 py-2 text-white rounded-full bg-lavender-600 hover:bg-lavender-700"
        onClick={onClick}
      >
        View Detailed
      </button>
    </div>
  );
};

export default Graph;
