import { vdotTable } from "@/scripts/vdot-table";
import { useEffect, useState } from "react";

const calculateVDOT = (time: number, distance: number): number => {
  if (distance > 0 && time > 0) {
    const milePace = (time * 1609) / distance;
    console.log(milePace);
    if (distance) {
      const distanceTable = vdotTable.TIMES["DISTANCE_MILE"];
      const distanceArray = Object.entries(distanceTable);
      const closestTime = distanceArray.reduce((prev, curr) => {
        return Math.abs(curr[1] - milePace) < Math.abs(prev[1] - milePace)
          ? curr
          : prev;
      });
      const closestVdot = parseInt(closestTime[0]);
      const percentDiff = closestTime[1] / milePace;
      const preciseVdot = closestVdot * percentDiff;
      const calculateMultiply = (x: number) => {
        const res =
          distance > 1609
            ? 0.97 + 0.0117 * Math.log1p(x)
            : 0.9 + 0.0025 * Math.log1p(x);
        return res > 1.15 ? 1.15 : res < 0.85 ? 0.85 : res;
      };
      return preciseVdot * calculateMultiply(distance);
    }
  }
  return 0;
};

const calculateDays = (activities: any) => {
  const days = [] as Date[];
  // fill with the days of the past 2 weeks
  for (let i = 0; i < 14; i++) {
    days.push(new Date(new Date().setDate(new Date().getDate() - i)));
  }
  console.log("days", days);
  // uses the days of the week to calculate the average intensity for each day
  const dayIntensities = days.map((day: Date) => {
    console.log("day", day);
    const dayActivities = activities.filter((activity: any) => {
      const activityDate = new Date(activity.start_date);
      return (
        activityDate.getDate() === day.getDate() &&
        activityDate.getMonth() === day.getMonth() &&
        activityDate.getFullYear() === day.getFullYear()
      );
    });
    console.log("dayActivities", dayActivities);
    if (!dayActivities.length) return 0;
    // const dayIntensity = dayActivities.reduce((prev: number, curr: any) => {
    //   return prev + calculateVDOT(curr.moving_time, curr.distance);
    // }, 0);
    // console.log("dayIntensity", dayIntensity);
    // find the max intensity of the day and return that plus the average
    const dayIntensity = dayActivities.reduce((prev: number, curr: any) => {
      const vdot = calculateVDOT(curr.moving_time, curr.distance);
      return vdot > prev ? vdot : prev;
    }, 0);
    const averageIntensity = dayActivities.reduce((prev: number, curr: any) => {
      return prev + calculateVDOT(curr.moving_time, curr.distance);
    }, 0);
    return (dayIntensity + averageIntensity / 4) / (dayActivities.length / 2);
  });
  return dayIntensities;
};

export default function IntensityChart({ activities }: { activities: any }) {
  const [weeklyActivities, setWeeklyActivities] = useState([] as any);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 14);
    const recentActivities = activities.filter(
      (activity: any) => new Date(activity.start_date) > lastWeek
    );
    setWeeklyActivities(recentActivities);

    console.log(recentActivities);
  }, [activities]);

  useEffect(() => {
    setDays(calculateDays(weeklyActivities));
  }, [weeklyActivities]);

  return (
    <div className="flex flex-row items-end justify-end gap-1 pt-2 grow">
      {
        // days.map((day: number, index: number) => {
        //   return (
        //     <p key={index}>{day}</p>
        //   );
        // })
        // normalize between 0 and 100 first
        days.map((day: number, index: number) => {
          return (
            <div
              key={index}
              style={{
                height: `calc(${
                  (day /
                    days.reduce((prev: number, curr: number) =>
                      curr > prev ? curr : prev
                    )) *
                  100
                }% + 0.5rem)`,
              }}
              className="w-20 bg-red-500"
            ></div>
          );
        })
      }
    </div>
  );
}
