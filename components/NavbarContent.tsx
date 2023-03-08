import { forwardRef } from "react";

const NavbarContent = forwardRef<HTMLDivElement, { open: boolean }>(
  (props, ref) => (
    <nav
      className={`w-1/3 fixed top-0 right-0 nav-bar-content bg-gray-900 transition-all-300 ${
        props.open ? "circle-clip-visible" : "circle-clip-hidden"
      }`}
      ref={ref}
    >
      <a
        href="/reviews"
        className="block w-full p-4 text-3xl text-center text-white hover:bg-gray-700"
      >
        Reviews
      </a>
      <a
        href="/tools"
        className="block w-full p-4 text-3xl text-center text-white hover:bg-gray-700"
      >
        Tools
      </a>
      <a
        href="/strava"
        className="block w-full p-4 text-3xl text-center text-white hover:bg-gray-700"
      >
        Strava
      </a>
    </nav>
  )
);

export default NavbarContent;
