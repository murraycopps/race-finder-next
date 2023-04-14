import { outTime } from "@/scripts";
import { DetailedRun, Comment } from "@/scripts/singleRunTypes";

const SegmentsCommentsCard = ({
    activity,
    comments,
    allEfforts,
    setAllEfforts,
    allSegments,
    setAllSegments,
  }: {
    activity: DetailedRun;
    comments: Comment[];
    allEfforts: boolean;
    setAllEfforts: (b: boolean) => void;
    allSegments: boolean;
    setAllSegments: (b: boolean) => void;
  }) => (
    <>
      {(activity.best_efforts.length > 0 ||
        activity.segment_efforts.length > 0 ||
        comments.length > 0) && (
        <div className="w-full grid grid-cols-2 gap-4 place-items-center">
          <div className="flex flex-col items-center justify-center w-full p-8 gap-4">
            {activity.best_efforts.length > 0 ? (
              <>
                <h2 className="my-4 text-4xl font-bold">Best Efforts</h2>
                {activity.best_efforts
                  .filter((effort) => effort.pr_rank !== null || allEfforts)
                  .sort((a, b) => (a.pr_rank || 100) - (b.pr_rank || 100))
  
                  .map((effort, i) => (
                    <p key={i} className="flex text-2xl place-items-center">
                      {effort.name} - {outTime(effort.moving_time)} -{" "}
                      {effort.pr_rank === 1 ? (
                        <span className="text-4xl">🥇</span>
                      ) : effort.pr_rank === 2 ? (
                        <span className="text-4xl">🥈</span>
                      ) : effort.pr_rank === 3 ? (
                        <span className="text-4xl">🥉</span>
                      ) : (
                        effort.pr_rank
                      )}
                    </p>
                  ))}
                <button
                  className="w-3/4 p-2 my-4 text-3xl text-white rounded-full bg-lavender-600 hover:bg-lavender-700"
                  onClick={() => setAllEfforts(!allEfforts)}
                >
                  Show {allEfforts ? "Prs" : "All"}
                </button>
              </>
            ) : (
              <h2 className="text-4xl font-bold">No Best Efforts</h2>
            )}
            {activity.segment_efforts.length > 0 ? (
              <>
                <h1 className="mt-8 mb-4 text-4xl font-bold">Segment Efforts</h1>
                {activity.segment_efforts
                  .filter((effort) => effort.pr_rank !== null || allSegments)
                  .sort((a, b) => (a.pr_rank || 100) - (b.pr_rank || 100))
                  .map((effort, i) => (
                    <p key={i} className="flex text-xl place-items-center">
                      {effort.name} - {outTime(effort.moving_time)} -{" "}
                      {Math.round(effort.distance)}m -{" "}
                      {effort.pr_rank === 1 ? (
                        <span className="text-4xl">🥇</span>
                      ) : effort.pr_rank === 2 ? (
                        <span className="text-4xl">🥈</span>
                      ) : effort.pr_rank === 3 ? (
                        <span className="text-4xl">🥉</span>
                      ) : (
                        effort.pr_rank
                      )}
                    </p>
                  ))}
                <button
                  className="w-3/4 p-2 m-4 text-3xl text-white rounded-full bg-lavender-600 hover:bg-lavender-700"
                  onClick={() => setAllSegments(!allSegments)}
                >
                  Show {allSegments ? "Prs" : "All"}
                </button>
              </>
            ) : (
              <h1 className="mt-8 mb-4 text-4xl font-bold">No Segment Efforts</h1>
            )}
          </div>
          <div className="flex flex-col items-center justify-center p-8 gap-4">
            <h1 className="text-4xl font-bold">
              {comments.length > 0 ? "Comments" : "No Comments"}
            </h1>
            {comments.map((comment, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-8 gap-4"
              >
                <p className="text-xl">{comment.text}</p>
                <p className="text-xl">
                  {comment.athlete.firstname} {comment.athlete.lastname}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );


export default SegmentsCommentsCard;