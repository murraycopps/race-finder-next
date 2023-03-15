import {useEffect, useRef, useState} from "react";
import {Route} from "@/components/PageWrapper/types";
import Link from "next/link";

export default function Dropdown({
                                     route,
                                     close
                                 }: { route: Route; close: () => void }) {
    const [open, setOpen] = useState(false);


    return (<>
        {route.children ? (
            <></>
        ) : (
            <Link href={route.route}>
                {route.name}
            </Link>
        )}
s

    </>)
}
