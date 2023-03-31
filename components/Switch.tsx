type Props = {
  options: [string, string];
  state: boolean;
  setState: (state: boolean) => void;
};

export default function Switch({
  state,
  setState,
  options: [option1, option2],
}: Props) {
  return (
    <div
      className={`h-20 text-3xl flex flex-row justify-between items-center bg-white text-black rounded-full w-full ${
        state && "flex-row-reverse"
      } p-2`}
      onClick={() => setState(!state)}
    >
      <p className="px-4">{state ? option1 : option2}</p>
      <span className="bg-black rounded-full w-18 h-18"></span>
    </div>
  );
}
