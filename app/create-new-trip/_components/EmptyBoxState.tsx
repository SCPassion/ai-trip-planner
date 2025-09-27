import React from "react";
import { suggestions } from "@/app/_components/Hero";

function EmptyBoxState({
  onSelectOption,
}: {
  onSelectOption: (option: string) => void;
}) {
  return (
    <div>
      <div className="mt-7">
        <h2 className="text-center text-3xl font-bold">
          Start planning new <strong className="text-primary">trip</strong>{" "}
          using AI
        </h2>
        <p className="text-center text-lg text-gray-500 mt-5">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, trip
          planner - all in seconds
        </p>
      </div>

      <div className="flex gap-5 flex-col">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(suggestion.title)}
            className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary hover:shadow"
          >
            {suggestion.icon}
            <h2 className="text-lg">{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
