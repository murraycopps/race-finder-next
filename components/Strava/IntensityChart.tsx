import {useEffect, useState} from "react";

export default function IntensityChart({ activities }: { activities: any }) {
  const [weeklyActivities, setWeeklyActivities] = useState([] as any);

  useEffect(() => {
  //  start_date: "2023-03-28T19:16:15Z" fill weeklyActivities with all activities from the last 7 days
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const filteredActivities = activities.filter((activity: any) => new Date(activity.start_date) > lastWeek);
    setWeeklyActivities(filteredActivities);




  }, [activities]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      balls
    </div>
  )
}