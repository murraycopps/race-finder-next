import { useRef, useState } from "react";
import NavbarContent from "./NavbarContent";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <>
    <button
      className={`fixed z-50 flex flex-col justify-between w-12 h-10 px-1 py-2 rounded-lg right-4 top-4 nav-button ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
    </button>
    <NavbarContent open={open} ref={contentRef} />
    </>
    
  );
}
