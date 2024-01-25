import {  useState } from "react";
import Image from "next/image";
import IntensityChart from "@/components/StravaPage/IntensityChart";
import { Athlete, Run, Stats } from "@/scripts/stravaTypes";
import CollapsibleShoeList from "./CollapsibleShoeList";
import StatsDisplay from "./StatsDisplay";

export default function ProfileCard({
  data,
  stats,
  activities,
}: {
  data: Athlete;
  stats: Stats;
  activities: Run[];
}) {

  return (
    <div className="z-10 flex flex-col w-full grid-cols-2 gap-8 p-8 pt-16 sm:pt-8 lg:gap-0 lg:grid place-items-center bg-faded-base-500">
      <div className="flex flex-row items-center justify-center gap-8">
        <Image
          src={data.profile}
          className="object-cover w-32 h-32 rounded-full sm:w-36 sm:h-36"
          alt="Profile Picture"
          width={192}
          height={192}
          priority
        />
        <div className="flex flex-col gap-2 sm:gap-4">
          <h1 className="w-full text-3xl font-bold text-center sm:text-4xl">
            {data.firstname} {data.lastname}
          </h1>
          <div className="flex flex-row gap-4 text-center justify-evenly sm:gap-8">
            <div>
              Followers:
              <p className="text-2xl font-bold">{data.follower_count}</p>
            </div>
            <div>
              Friends:
              <p className="text-2xl font-bold">{data.friend_count}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full h-full lg:grid place-items-center">
        <IntensityChart activities={activities} />
      </div>
      <div className="flex flex-col items-center w-full gap-8 lg:hidden">
        <CollapsibleShoeList data={data} />
        <StatsDisplay stats={stats} />
      </div>
    </div>
  );
}
