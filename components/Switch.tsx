type Props = {
  options: [string, string];
  state: boolean;
    setState: (state: boolean) => void;
};

export default function Switch({state, setState, options: [option1, option2]}: Props){
    return(
        <div
            className={`h-24 text-3xl flex flex-row justify-between items-center bg-white text-black rounded-full p-2 w-full ${state && "flex-row-reverse" }`}
            onClick={() => setState(!state)}
          >
            {state ? option1 : option2}
            <span className="w-20 h-20 bg-black rounded-full"></span>
          </div>
    )
}