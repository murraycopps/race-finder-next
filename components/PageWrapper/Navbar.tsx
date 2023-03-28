import { useEffect, useRef, useState } from "react";
import NavbarContent from "./NavbarContent";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contentRef]);

  return (
    <>
      <button
        className={`fixed z-110 flex flex-col justify-between w-12 h-10 px-1 py-2 rounded-lg left-4 top-4 nav-button ${
          open ? "open" : ""
        }`}
        onClick={() => setOpen(!open)}
        ref={buttonRef}
      >
        <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
        <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
        <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      </button>
      <NavbarContent open={open} ref={contentRef} />
      {/* <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-base-700 transition-all-300 ${
          open ? "opacity-70" : "opacity-0"
        }`}
      /> */}
    </>
  );
}
