import React, { useState } from "react";

export default function TripDurationUI({
  onSelectedOption,
}: {
  onSelectedOption: (option: string) => void;
}) {
  const [days, setDays] = useState(3);

  const handleIncrement = () => {
    setDays((prev) => Math.min(prev + 1, 30)); // Max 30 days
  };

  const handleDecrement = () => {
    setDays((prev) => Math.max(prev - 1, 1)); // Min 1 day
  };

  const handleConfirm = () => {
    onSelectedOption(`${days} Days`);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mt-2">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        How many days do you want to travel?
      </h2>

      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-gray-600 hover:text-primary transition-all duration-200"
        >
          <span className="text-xl font-bold">−</span>
        </button>

        {/* Days Display */}
        <div className="bg-white rounded-xl px-8 py-4 border-2 border-gray-200 min-w-[120px] text-center">
          <span className="text-2xl font-bold text-gray-800">
            {days} {days === 1 ? "Day" : "Days"}
          </span>
        </div>

        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary/5 flex items-center justify-center text-gray-600 hover:text-primary transition-all duration-200"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-center">
        <button
          onClick={handleConfirm}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
