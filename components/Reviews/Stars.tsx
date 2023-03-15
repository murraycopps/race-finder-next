export default function Stars({
  number,
  total,
}: {
  number: number;
  total: number;
}) {
  // const stars = [];
  // for (let i = 0; i < total; i++) {
  //     stars.push(i < number ? "★" : "☆" );
  // }
  // return <span className="text-yellow-500">{stars}</span>
  // make the full stars yellow and the empty stars black
  return (
    <>
      <span className="text-yellow-500">
        {Array.from({ length: number }, (_, i) => "★")}
      </span>
      <span className="">
        {Array.from({ length: total - number }, (_, i) => "☆")}
      </span>
    </>
  );
}
