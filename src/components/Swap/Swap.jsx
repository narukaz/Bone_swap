import React from "react";
import SwapMechanism from "./SwapMechanism";
import Footer from "../footer/Footer";
import Content from "../Content";

function Swap() {
  return (
    <div className="lg:h-lvw flex flex-col gap-4 items-center">
      <h1 className="font-bold text-7xl select-none">Crazy swap</h1>
      <h3 className="font-semibold text-4xl text-center select-none">
        💥 Swap like a maniac. 💸 Trade like it’s 3025. <br />
        🌀 Unleash the madness.
      </h3>
      <p className="text-gray-300 select-none">
        -------------------------------
      </p>

      <div className="flex lg:w-xl gap-4 px-1 py-3 bg-white justify-around items-center font-normal border rounded-3xl">
        <div className="flex items-center gap-2">
          <h1 className="text-xl select-none">52,345,123+</h1>
          <h3 className="font-light select-none">transactions</h3>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-xl select-none">1000+</h1>
          <h3 className="font-light select-none">tokens</h3>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-xl select-none">19,734+</h1>
          <h3 className="font-light select-none">users</h3>
        </div>
      </div>
      <p className="text-gray-300 select-none">---------------------------</p>
      {/* actual swap mechanism */}
      <SwapMechanism />
      <p className="text-gray-300 text-center select-none">
        -------------------------------
      </p>
    </div>
  );
}

export default Swap;
