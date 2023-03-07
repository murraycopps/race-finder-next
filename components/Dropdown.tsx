import { useState } from "react";

type items =
  | {
      name: string;
      value: number | string;
    }
  | string | number;
type DropdownProps = {
  items: items[];
  value: string | number;
  setValue: (value: string | number) => void;
};

export default function Dropdown({ items, value, setValue }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`relative flex flex-col items-center w-full ${
        open ? "pb-4 " : ""
      }`}
    >
      <button
        className="relative w-3/4"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        Shoes
        <span className="absolute right-0 h-full transform -translate-y-1/2 top-1/2 aspect-square">
          <svg
            className={`w-full h-full transition-transform transform ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`absolute z-50 flex-col items-center ${
          open ? "flex" : "hidden"
        } w-full gap-2 px-4 bg-gray-500 top-full`}
      >
        {items.map((item, index) => (
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            key={index}
            onClick={() => {
              if (typeof item === "string" || typeof item === "number") {
                setValue(item);
              } else {
                setValue(item.name);
              }
            }}
          >
            {typeof item === "string" || typeof item === "number" ? item : item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
