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

    // register clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="relative flex flex-col items-center w-full text-black"
      ref={dropdownRef}
    >
      <button
        className={`relative w-full text-3xl bg-gray-50 text-left pl-8 p-4 ${
          open
            ? "rounded-b-none dropdown-rounded"
            : "rounded-full transition-delayed"
        }`}
        onClick={() => {
          setOpen(!open)
        }}
        // onBlur={() => setOpen(false)}
      >
        <>
          {displayedValue(value)}
          <span className="absolute right-0 h-full p-2 overflow-hidden rounded-full -translate-y-1/2 top-1/2 aspect-square">
            <svg
              className={`w-full h-full transition-all-300 ${
                open ? "rotate-180" : "transition-delayed"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </>
      </button>
      <div
        className={`absolute z-50 border-gray-500 text-white bg-gray-500 flex text-3xl flex-col max-h-96 overflow-y-auto items-center transition-all-300 ${
          open ? "rect-clip-visible" : "rect-clip-hidden-top"
        } w-full px-4  top-full rounded-b-2xl pb-2 scrollbar-gray-800 border-2 scrollbar-m-b-2`}
      >
        {items.map((item, index) => (
          <button
            className="w-full px-4 py-1 rounded-md transition-all-300 hover:bg-gray-600"
            key={index}
            onClick={() => {
              if (typeof item !== "object") {
                setValue(item);
              } else {
                setValue(item.value);
              }
              setOpen(false);
            }}
          >
            {typeof item !== "object" ? item : item.name || item.value}
          </button>
        ))}
      </div>
    </div>
  );
}
