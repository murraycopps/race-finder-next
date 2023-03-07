import { type } from "os";
import { useState } from "react";

type itemObject = {
  name?: string;
  value: number | string;
};

type item = itemObject | string | number;

type DropdownProps = {
  items: item[];
  value?: string | number;
  placeholder?: string;
  setValue: (value: string | number) => void;
};

export default function Dropdown({
  items,
  value,
  setValue,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const displayedValue = () => {
    if (value) {
      const item = items.find((item) => {
        if (typeof item !== "object") {
          return item === value;
        } else {
          return item.value === value;
        }
      });
      if (item) {
        if (typeof item !== "object") {
          return item;
        } else {
          return item.name || item.value;
        }
      }
    }
    return placeholder;
  };
  return (
    <div
      className={`relative flex flex-col items-center w-full${
        open ? "pb-4 " : ""
      }`}
    >
      <button
        className={`relative w-full bg-gray-50 text-black rounded-full h-16 ${open && "rounded-b-none"} p-2`}
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        <>
          {displayedValue()}
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
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </>
      </button>
      <div
        className={`absolute z-50 flex-col items-center ${
          open ? "flex" : "hidden"
        } w-full px-4 bg-gray-500 top-full`}
      >
        {items.map((item, index) => (
          <button
            className="w-full px-4 py-1 hover:bg-gray-600 rounded-md"
            key={index}
            onClick={() => {
              if (typeof item !== "object") {
                setValue(item);
              } else {
                setValue(item.value);
              }
            }}
          >
            {typeof item !== "object"
              ? item
              : item.name || item.value}
          </button>
        ))}
      </div>
    </div>
  );
}
