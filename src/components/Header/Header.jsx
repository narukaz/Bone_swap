import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllCoins, setLoading } from "../../features/walletSlice.js";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClient,
} from "@mysten/dapp-kit";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const addressObject = useCurrentAccount();
  const suiClient = useSuiClient();
  const POOL_OBJECT_ID =
    "0xf44f8dba33f00be73dd792c75f460f040995d6a13d91125558e17fca8c0fa7e6";

  // Fetch coin data when wallet address changes
  useEffect(() => {
    const fetchData = async () => {
      if (!addressObject?.address) return;
      dispatch(setLoading());
      const poolObj = await suiClient.getObject({
        id: POOL_OBJECT_ID,
        options: { showContent: true, showType: true, showDisplay: true },
      });
      const { fields } = poolObj.data.content;
      delete fields.id;
      const result = await Promise.all(
        Object.values(fields).map(async (entry) => {
          const m = entry.type.match(/^0x2::coin::Coin<(.+)>$/);
          if (!m) throw new Error("Unexpected coin type: " + entry.type);
          const coinType = m[1];
          const metadata = await suiClient.getCoinMetadata({ coinType });
          return { ...metadata, coinType, address: addressObject.address };
        })
      );
      dispatch(setAllCoins({ userCoins: result }));
      dispatch(setLoading());
    };
    fetchData();
  }, [addressObject?.address, dispatch, suiClient]);

  // Determine which page is active based on URL
  const isSwap = location.pathname.includes("swap");
  const isLiquidity = location.pathname.includes("liquidity");

  const btnClass = (active) =>
    `px-5 py-1 rounded-2xl cursor-pointer transition-all hover:bg-gray-800 hover:text-white border ${
      active ? "lg:text-white lg:bg-gray-800" : "lg:text-black lg:bg-white"
    }`;

  return (
    <div className="lg:h-20 h-16 w-full bg-gradient-to-r from-white/70 via-white/50 to-blue-100/40 backdrop-blur-md shadow-md border-b border-white/20 rounded-b-2xl px-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">SwapMonkey</h1>

      <div className="flex lg:gap-5 font-medium p-2 px-3 border rounded-3xl justify-center items-center">
        <div className={btnClass(isSwap)} onClick={() => navigate("/swap")}>
          Swap
        </div>
        <span className="font-bold text-gray-400 text-xl select-none">|</span>
        <div
          className={btnClass(isLiquidity)}
          onClick={() => navigate("/liquidity")}
        >
          Liquidity
        </div>
      </div>

      <ConnectButton />
    </div>
  );
}

export default Header;
