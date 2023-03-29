import { Quote } from "@/scripts/types";
import { useEffect, useState } from "react";
import { quotes } from "@/scripts/quotes";

export default function QuotesCard() {
  const [quote, setQuote] = useState<Quote>({ name: "", quote: "" , img: ""});
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8 p-4 rounded-3xl bg-faded-purple-600">
      <img className="object-cover w-32 h-32 rounded-full" src={quote.img} alt=""/>
      <p className="text-xl font-bold quote ">{quote.quote}</p>
      <p className="text-lg font-bold">-{quote.name}</p>
    </div>
  );
}
