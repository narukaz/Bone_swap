import React from "react";
import SwapMechanism from "./SwapMechanism";

function Swap() {
  return (
    <div className="lg:h-lvw flex flex-col gap-4 items-center">
      <h1 className="font-bold text-7xl">Crazy swap</h1>
      <h3 className="font-semibold text-4xl text-center">
        💥 Swap like a maniac. 💸 Trade like it’s 3025. <br />
        🌀 Unleash the madness.
      </h3>
      <p className="text-gray-300">-------------------------------</p>

      <div className="flex lg:w-xl gap-4 px-1 py-3 bg-white justify-around items-center font-normal border rounded-3xl">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">52,345,123+</h1>
          <h3 className="font-light">transactions</h3>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-xl">1000+</h1>
          <h3 className="font-light">tokens</h3>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-xl">19,734+</h1>
          <h3 className="font-light">users</h3>
        </div>
      </div>
      <p className="text-gray-300">---------------------------</p>
      {/* actual swap mechanism */}
      <SwapMechanism />
      <p className="text-gray-300 text-center">
        -------------------------------
      </p>
      <p className="text-center">
        <span className="font-bold">Why Crazy Swap? </span> Because crypto
        should be crazy simple. Say goodbye to centralized exchanges, <br />
        long wait times, and endless logins. <br /> Crazy Swap puts the power of
        DeFi in your hands — fast, fun, and frictionless.
      </p>

      <p className="text-center text-gray-500 px-5">
        Crazy Swap is a decentralized token swapping platform built to make your
        crypto experience seamless, fast, and wild — in a good way. Whether
        you're trading major tokens like ETH, USDT, or diving into the world of
        meme coins and low-caps, we've got your back with instant, trustless
        swaps. No sign-ups, no middlemen — just pure DeFi power at your
        fingertips. With our sleek interface and lightning-fast routing,
        swapping feels less like a transaction and more like a magic trick.
        Backed by cutting-edge smart contracts, Crazy Swap ensures your assets
        stay in your wallet, where they belong. We prioritize speed, security,
        and simplicity — because DeFi doesn't have to be complicated. Jump in,
        swap smart, and ride the crazy wave of crypto with us.
      </p>
    </div>
  );
}

export default Swap;
