import { forwardRef } from "react";

const NavbarContent = forwardRef<HTMLDivElement, { open: boolean }>(
  (props, ref) => (
    <nav
      className={`lg:w-1/4 md:w-1/3 sm:w-1/2 w-screen z-100 fixed top-0 left-0 bottom-0 nav-bar-content bg-dark transition-all-300 ${
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
