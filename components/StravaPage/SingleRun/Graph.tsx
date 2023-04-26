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
  
        <div className="flex items-end justify-center w-full h-64 gap-1 pt-4">
          {numbers.map((num, i) => (
            <div
              key={i}
              className="flex items-end justify-center flex-1 text-xl bg-lavender-700"
              style={{
                height: ` calc(${(num / max) * 100}% + 1rem)`,
              }}
            >
              <p className={numbers.length > 7 ? "text-sm" : ""}>{outTime(num)}</p>
            </div>
          ))}
        </div>
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