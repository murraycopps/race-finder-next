import { useEffect, useRef, useState } from "react";
import { Route } from "@/components/PageWrapper/types";
import Link from "next/link";

export default function Dropdown({
  route,
  close,
}: {
  route: Route;
  close: () => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        ulRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !ulRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {route.children ? (
        <>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="relative block w-full p-4 text-3xl text-center text-white hover:bg-gray-700"
            ref={buttonRef}
          >
            {route.name}
            <span
              className={`absolute h-4 w-4 top-1/2 transition-all-150 -translate-y-1/2 right-8 bg-white plus-icon ${
                open ? "open" : "closed"
              }`}
            ></span>
          </button>
          {open && (
            <ul
              ref={ulRef}
              className="flex flex-col items-center w-full animation-open-rect"
            >
              <span className="block w-3/4 h-0 my-1 border-t border-gray-400"></span>
              <Link
                href={route.route}
                className="block w-full p-4 text-2xl text-center text-white hover:bg-gray-700"
              >
                {" "}
                All {route.name}
              </Link>
              {route.children.map((child, i) => (
                <>
                  {child.children ? (
                    <Dropdown key={i} route={child} close={() => {}} />
                  ) : (
                    <Link
                      href={route.route + child.route}
                      key={i}
                      className="block w-full p-4 text-2xl text-center text-white hover:bg-gray-700"
                    >
                      <li onClick={close}>{child.name}</li>
                    </Link>
                  )}
                </>
              ))}
              {/* white line */}
              <span className="block w-3/4 h-0 my-1 border-t border-gray-400"></span>
            </ul>
          )}
        </>
      ) : (
        <Link
          href={route.route}
          className="block w-full p-4 text-3xl text-center text-white hover:bg-gray-700"
        >
          {route.name}
        </Link>
      )}
    </>
  );
}
