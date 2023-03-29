import { Quote } from "@/scripts/types";
import { useEffect, useState } from "react";
import { quotes } from "@/scripts/quotes";

export default function QuotesCard() {
  const [quote, setQuote] = useState<Quote>({ name: "", quote: "" });
  useEffect(
    () => setQuote(quotes[Math.floor(Math.random() * quotes.length)]),
    []
  );

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8 p-4 rounded-3xl bg-faded-purple-600">
      <h3 className="text-2xl font-bold">{quote.name}</h3>
      <blockquote className="text-xl font-bold">{quote.quote}</blockquote>
    </div>
  );
}
