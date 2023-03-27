import { forwardRef } from "react";
import Link from "next/link";
import NavbarDropdown from "./NavbarDropdown";
import { Route } from "./types";

const routes: Route[] = [
  {
    route: "/reviews",
    name: "Reviews",
    children: [
      {
        route: "/shoes",
        name: "Shoes",
      },
      {
        route: "/clothes",
        name: "Clothes",
      },
      {
        route: "/other",
        name: "Other",
      },
    ],
  },
  {
    route: "/tools",
    name: "Tools",
    children: [
        {
            route:  "/pacing",
            name: "Pacing"
        },
        {
            route: "/vdot",
            name: "VDOT"
        },
        {
            route: "/unusual",
            name: "Unusual"
        },
        // {
        //     route: "/relay",
        //     name: "Relay"
        // }
    ]
  },
];

const NavbarContent = forwardRef<HTMLDivElement, { open: boolean }>(
  function NavbarContent(props, ref) {
    return (
      <nav
        className={`lg:w-1/4 md:w-1/3 sm:w-1/2 w-screen z-100 fixed top-0 left-0 bottom-0 nav-bar-content bg-base-700 transition-all-300 pt-14 ${
          props.open ? "circle-clip-visible" : "circle-clip-hidden"
        }`}
        ref={ref}
      >
        <Link href='/home' className="block w-full p-4 text-3xl text-center text-white hover:bg-gray-700">
            Home
        </Link>
        {routes.map((route, index) => (
          <NavbarDropdown key={index} route={route} close={() => {}} />
        ))}

        <Link
          href="/strava"
          className="block w-full p-4 text-3xl text-center text-white hover:bg-gray-700"
        >
          Strava
        </Link>
      </nav>
    );
  }
);

export default NavbarContent;
