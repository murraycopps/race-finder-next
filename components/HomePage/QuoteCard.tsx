import { Quote } from "@/scripts/types";
import { useEffect, useState } from "react";
import { quotes } from "@/scripts/quotes";

export default function QuotesCard() {
  const [quote, setQuote] = useState<Quote>({ name: "", quote: "", img: "" });
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between w-full max-w-lg gap-8 p-4 pt-20 mt-20 h-fit rounded-3xl bg-wisteria-600">
      <div className="absolute flex w-40 h-40 rounded-full text-wisteria-600 -top-20 bg-wisteria-600 quote-image">
        <img
          className="object-cover w-32 h-32 m-auto rounded-full border-amber-900"
          src={quote.img}
          alt=""
        />
      </div>

      <p className="z-10 text-xl font-bold quote">{quote.quote}</p>
      <p className="text-lg font-bold">-{quote.name}</p>
    </div>
  );
}
