import React from "react";
import tokens from "../../data/tokens.json";
function Liquidity() {
  return (
    <div className="lg:h-lvw flex flex-col gap-4 items-center">
      <h1 className="font-semibold text-7xl">
        Add <spa className="font-thin line-throug italic">liquidity</spa> and
        get rewarded
      </h1>
      <h3 className="font-semibold text-4xl text-center leading-relaxed">
        🚀 Add liquidity, boost the chaos. <br /> 📈 Let your tokens work
        overtime. 🧪
      </h3>

      <div className="flex flex-wrap justify-center gap-8 mt-5  ">
        {tokens.map((token, index) => (
          <div
            className="grid w-sm gap-5 h-auto bg-gray-100 border shadow-xl p-4  rounded-2xl "
            key={index}
          >
            <h3 className="font-bold text-2xl">{token.name}</h3>
            <p>--</p>
            <div class="w-full mx-auto rounded-lg ">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="font-bold text-gray-700">Total Stake</span>
                  <span class="font-light text-gray-500">$5,000</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-gray-700">Total Users</span>
                  <span class="font-light text-gray-500">50</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-gray-700">Your Stake</span>
                  <span class="font-light text-gray-500">$200</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-gray-700">Pending Rewards</span>
                  <span class="font-light text-gray-500">$25</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-bold text-gray-700">Total Pool Value</span>
                  <span class="font-light text-gray-500">$50,000</span>
                </div>
              </div>
            </div>

            <button
              className="hover:bg-black  hover:text-white border  hover:border-white
                  bg-white text-black
                cursor-pointer
                font-medium p-3 text-2xl rounded-2xl transition-all"
            >
              Add Liquidity
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Liquidity;
