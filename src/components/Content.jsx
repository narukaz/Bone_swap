import React from "react";

function Content() {
  return (
    <section className="py-12 bg-gray-50 select-none rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Why Crazy Swap?
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Say goodbye to centralized exchanges, long wait times, and endless
          logins. Crazy Swap puts the power of DeFi in your hands—fast, fun, and
          frictionless.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <article className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow select-none">
            <i data-lucide="zap" className="w-12 h-12 text-indigo-500 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Instant Swaps
            </h3>
            <p className="text-gray-600 text-sm">
              Lightning-fast routing for seamless token exchanges—no more
              waiting around.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow select-none">
            <i
              data-lucide="shield-check"
              className="w-12 h-12 text-indigo-500 mb-4"
            ></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Trustless & Secure
            </h3>
            <p className="text-gray-600 text-sm">
              Trade directly from your wallet; assets never leave your custody.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow select-none">
            <i
              data-lucide="magic-wand"
              className="w-12 h-12 text-indigo-500 mb-4"
            ></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              No Sign‑ups Needed
            </h3>
            <p className="text-gray-600 text-sm">
              Just connect your wallet and swap—DeFi magic at your fingertips.
            </p>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow select-none">
            <i
              data-lucide="globe"
              className="w-12 h-12 text-indigo-500 mb-4"
            ></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Universal Tokens
            </h3>
            <p className="text-gray-600 text-sm">
              Swap everything from ETH & USDT to meme coins and low‑caps.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Content;
