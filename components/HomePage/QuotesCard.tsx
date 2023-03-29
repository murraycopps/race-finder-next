import { Quotes } from "@/scripts/types";
import { useEffect, useState } from "react";

export default function QuotesCard() {

const [quotes, setQuotes] = useState<Quotes>([]);
  useEffect(() => setQuotes(
      [quotes].sort(() => Math.random() - 0.5).slice(0, 1)
  ), []);

  
    return (
        <div className="flex flex-col items-center justify-between w-full h-full gap-8 p-4 rounded-3xl bg-faded-purple-600">
        <h3 className="text-2xl font-bold">{quotes.name}</h3>
        <blockquote className="text-xl font-bold">{quotes.quote}</blockquote>
        </div>
    );
    }