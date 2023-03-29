import { Quote } from "@/scripts/types";
import { useEffect, useState } from "react";
import { quotes } from "@/scripts/quotes";

export default function QuotesCard() {
  const [quote, setQuote] = useState<Quote>({ name: "", quote: "" , img: ""});
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between w-96 h-full gap-8 p-4 rounded-3xl bg-faded-purple-600 pt-16 mt-20">
        <div className="absolute flex rounded-full w-40 h-40 -top-20 bg-faded-purple-600 quote-image">
            <img className=" object-cover w-32 h-32 border-amber-900 rounded-full m-auto" src={quote.img} alt=""/>
        </div>

      <p className="text-xl font-bold quote z-10">{quote.quote}</p>
      <p className="text-lg font-bold">-{quote.name}</p>
    </div>
  );
}
