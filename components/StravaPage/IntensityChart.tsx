import { Run } from "@/scripts/stravaTypes";
import { vdotTable } from "@/scripts/vdot-table";
import { useEffect, useState } from "react";
import LineGraph from "./LineGraph";

const calculateVDOT = (time: number, distance: number): number => {
  if (distance > 0 && time > 0) {
    const milePace = (time * 1609) / distance;
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

const calculateDays = (activities: Run[]) => {
  const days = [] as Date[];
  // fill with the days of the past 2 weeks
  for (let i = 0; i < 14; i++) {
    days.push(new Date(new Date().setDate(new Date().getDate() - i)));
  }
  // uses the days of the week to calculate the average intensity for each day
  const dayIntensities = days.map((day: Date) => {
    const dayActivities = activities.filter((activity: Run) => {
      const activityDate = new Date(activity.start_date);
      return (
        activityDate.getDate() === day.getDate() &&
        activityDate.getMonth() === day.getMonth() &&
        activityDate.getFullYear() === day.getFullYear()
      );
    });
    if (!dayActivities.length) return 0;
    const dayIntensity = dayActivities.reduce((prev: number, curr: Run) => {
      const vdot = calculateVDOT(curr.moving_time, curr.distance);
      return vdot > prev ? vdot : prev;
    }, 0);
    const averageIntensity = dayActivities.reduce((prev: number, curr: Run) => {
      return prev + calculateVDOT(curr.moving_time, curr.distance);
    }, 0);
    return (dayIntensity + averageIntensity / 4) / (dayActivities.length / 2);
  });
  dayIntensities.reverse();
  return dayIntensities;
};

const calculateHeartIntensities = (activities: Run[]) => {
  const days = [] as Date[];
  // fill with the days of the past 2 weeks
  for (let i = 0; i < 14; i++) {
    days.push(new Date(new Date().setDate(new Date().getDate() - i)));
  }
  // uses the days of the week to calculate the average intensity for each day by averaging the max and average heart rate
  const dayIntensities = days.map((day: Date) => {
    const dayActivities = activities.filter((activity: Run) => {
      const activityDate = new Date(activity.start_date);
      return (
        activityDate.getDate() === day.getDate() &&
        activityDate.getMonth() === day.getMonth() &&
        activityDate.getFullYear() === day.getFullYear()
      );
    });
    if (!dayActivities.length) return 0;

    const dayIntensity = dayActivities.reduce((prev: number, curr: Run) => {
      return prev + curr.average_heartrate + curr.max_heartrate;
    }, 0);
    return dayIntensity / (dayActivities.length * 2);
  });
  dayIntensities.reverse();
  return dayIntensities;
};

export default function IntensityChart({ activities }: { activities: Run[] }) {
  const [weeklyActivities, setWeeklyActivities] = useState<Run[]>([]);
  const [daysVdot, setDaysVdot] = useState<number[]>([]);
  const [daysHeartRate, setDaysHeartRate] = useState<number[]>([]);
  const [showHR, setShowHR] = useState(false);

  useEffect(() => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 14);
    const recentActivities = activities.filter(
      (activity: Run) => new Date(activity.start_date) > lastWeek
    );
    setWeeklyActivities(recentActivities);
  }, [activities]);

  useEffect(() => {
    setDaysVdot(calculateDays(weeklyActivities));
    setDaysHeartRate(calculateHeartIntensities(weeklyActivities));
  }, [weeklyActivities]);

  return (
    <div className="flex flex-col w-full gap-4 grow flex-center">
      {/* <h1 className="text-2xl font-bold text-center">
        Intensity using {showHR ? "HR" : "VDOT"}
      </h1> */}
      <div className="grid grid-cols-2 px-8 place-items-center">
        <h1 className="text-2xl font-bold text-center">
          Intensity using {showHR ? "HR" : "VDOT"}
        </h1>
        <button
          className="px-12 py-2 text-xl rounded-xl bg-wisteria-600 hover:bg-faded-lavender-600 "
          onClick={() => setShowHR(!showHR)}
        >
          Toggle
        </button>
      </div>
      <div className="grid w-full max-h-32 place-items-center">
        <LineGraph
          data={(showHR ? daysHeartRate : daysVdot).map(
            (day) =>
              (day /
                (showHR ? daysHeartRate : daysVdot).reduce(
                  (prev: number, curr: number) => (curr > prev ? curr : prev)
                )) *
              100
          )}
          labels={daysVdot.map((day, index) =>
            new Date(new Date().setDate(new Date().getDate() - (13 - index)))
              .getDate()
              .toString()
          )}
        />
      </div>
      {/* <button onClick={() => setShowHR(!showHR)}>Toggle</button> */}
    </div>
  );
}
