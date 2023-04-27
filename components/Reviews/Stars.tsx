export default function Stars({
  number,
  total = 5,
}: {
  number: number;
  total?: number;
}) {
  return (
    <span>
      <span className="text-yellow-500">
        {Array.from({ length: number }, (_, i) => "★")}
      </span>
      <span className="text-gray-200">
        {/* {Array.from({ length: total - number }, (_, i) => "☆")} */}
        {Array.from({ length: total - number }, (_, i) => "★")}
      </span>
    </span>
  );
}
