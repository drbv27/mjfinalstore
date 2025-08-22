"use client";
import { useCounterStore } from "@/store/counter-store";

const Counter = () => {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <div className="border p-4 rounded-lg text-center shadow-md">
      <h3 className="text-2xl font-bold">{count}</h3>
      <div>
        <button
          onClick={increment}
          className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-300"
        >
          +
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white p-2 rounded-sm hover:bg-gray-300"
        >
          reset
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-300"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
