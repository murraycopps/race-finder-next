import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import NavbarDropdown from "./NavbarDropdown";
import { Route } from "./types";
import LoginData from "@/scripts/LoginData";
import { useRouter } from "next/router";

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
        route: "/pacing",
        name: "Pacing",
      },
      {
        route: "/vdot",
        name: "VDOT",
      },
      {
        route: "/unusual",
        name: "Unusual",
      },
      // {
      //     route: "/relay",
      //     name: "Relay"
      // }
    ],
  },
];

const NavbarContent = forwardRef<HTMLDivElement, { open: boolean }>(
  function NavbarContent(props, ref) {
    const [loggedIn, setLoggedIn] = useState(false);

    const router = useRouter();
    const route = router.route.replace("[pid]", router.query.pid as string);

    useEffect(() => {
      const checkIfLoggedIn = async () => {
        await LoginData.getStorage();
        setLoggedIn(LoginData.isLoggedIn());
      };
      checkIfLoggedIn();
    }, []);

    return (
      <nav
        className={`lg:w-1/4 md:w-1/3 sm:w-1/2 w-screen z-100 fixed top-0 left-0 bottom-0 nav-bar-content bg-base-700 transition-all-300 pt-14 ${
          props.open ? "circle-clip-visible" : "circle-clip-hidden"
        }`}
        ref={ref}
      >
        <Link
          href="/home"
          className="block w-full p-4 text-3xl text-center text-white hover:bg-faded-base-500 transition-all-150"
        >
          Home
        </Link>
        {routes.map((route, index) => (
          <NavbarDropdown key={index} route={route} close={() => {}} />
        ))}

        <Link
          href="/strava"
          className="block w-full p-4 text-3xl text-center text-white hover:bg-faded-base-500 transition-all-150"
        >
          Strava
        </Link>
        {loggedIn && (
          <div className="absolute w-full bottom-10">
            <button
              onClick={() => {
                LoginData.Logout();
                if (route.includes("strava")) {
                  router.push("/home");
                } else {
                  router.reload();
                }
              }}
              className="block w-3/4 h-10 px-6 mx-auto text-lg place-items-center rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    );
  }
);

export default NavbarContent;
