import { Athlete, Shoe } from "@/scripts/stravaTypes";
import { useState, useEffect, useRef } from "react";

const CollapsibleShoeList = ({ data }: { data: Athlete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center text-white w-fit">
      <button
        onClick={() => setOpen(!open)}
        className="w-64 px-8 py-2 text-3xl font-bold rounded-full bg-ronchi-600 hover:bg-ronchi-700"
      >
        {open ? "Close Shoes" : "Open Shoes"}
      </button>
      {/* <div className="flex flex-col items-center justify-center gap-4"> */}
        {open &&
          data.shoes.map((shoe: Shoe, i) => (
            <div
              className="flex flex-row items-center justify-between w-full gap-8 text-lg font-bold"
              key={i}
            >
              <p className="text-left">{shoe.name.replace(shoe.nickname || "", "")}</p>
              <p className="text-right">{shoe.converted_distance} Mi</p>
            </div>
          ))}
      {/* </div> */}
    </div>
  );
};

export default CollapsibleShoeList;
