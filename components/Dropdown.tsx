import { useEffect, useRef, useState } from "react";

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

  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayedValue = (value: string | number | undefined) => {
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

//   register clicks outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownRef]);
    
  return (
    <div
      className={`relative flex flex-col items-center w-full${
        open ? "pb-4" : ""
      }`}
        ref={dropdownRef}
    >
      <button
        className={`relative w-full bg-gray-50 text-black h-16 ${open ? "rounded-b-none rounded-t-8" : "rounded-full"} p-2`}
        onClick={() => setOpen(!open)}
      >
        <>
          {displayedValue(value)}
          <span className="absolute right-0 h-full p-2 transform -translate-y-1/2 top-1/2 aspect-square">
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
        className={`absolute z-50 flex-col items-center text-lg ${
          open ? "flex" : "hidden"
        } w-full px-4 bg-gray-500 top-full rounded-b-xl pb-2`}
      >
        {items.map((item, index) => (
          <button
            className="w-full px-4 py-1 rounded-md hover:bg-gray-600"
            key={index}
            onClick={() => {
                console.log(item);
              if (typeof item !== "object") {
                setValue(item);
              } else {
                setValue(item.value);
              }
                setOpen(false);
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
