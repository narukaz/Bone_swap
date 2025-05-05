import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAddress,
  setAllCoins,
  setLoading,
} from "../../features/walletSlice.js";

import {
  ConnectButton,
  useCurrentAccount,
  useSuiClient,
} from "@mysten/dapp-kit";

// registerSlushWallet("CrazySwap");
function Header() {
  const [selectedPage, setSelectedPage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressObject = useCurrentAccount();
  const suiClient = useSuiClient();
  const POOL_OBJECT_ID =
    "0xf44f8dba33f00be73dd792c75f460f040995d6a13d91125558e17fca8c0fa7e6";

  useEffect(() => {
    const fetchData = async () => {
      if (!addressObject?.address) {
        return;
      }

      let poolObj = await suiClient.getObject({
        id: POOL_OBJECT_ID,
        options: { showContent: true, showType: true, showDisplay: true },
      });
      console.log(poolObj);
      dispatch(setLoading());
      const { fields } = poolObj.data.content;
      delete fields.id;

      let coin_array = Object.values(fields);
      let result_array = [];
      for (let i = 0; i < coin_array.length; i++) {
        let fullType = coin_array[i].type;
        let m = fullType.match(/^0x2::coin::Coin<(.+)>$/);

        if (!m) throw new Error("Unexpected coin type format: " + fullType);
        let coinType = m[1];

        let res = await suiClient.getCoinMetadata({
          coinType,
        });
        result_array.push({ ...res, coinType, address: addressObject.address });

        console.log(result_array);
      }
      dispatch(setAllCoins({ userCoins: result_array }));

      dispatch(setLoading());
    };
    // console.log(pool_coins);

    //     console.log("Wallet connected. Address:", addressObject.address);
    //     const { data } = await suiClient.getAllCoins({
    //       owner: addressObject.address,
    //     });
    //     dispatch(setLoading());

    //     for (let i = 0; i < data.length; i++) {
    //       data[i].metadata = await suiClient.getCoinMetadata({
    //         coinType: data[i].coinType,
    //       });
    //       data[i].metadata.symbol = data[i].metadata.symbol.toLowerCase();

    //       data[i].balance = data[i].balance
    //         ? (data[i].balance / 10 ** data[i].metadata.decimals).toFixed(2)
    //         : 0;

    //       console.log(data[i]);
    //     }

    //     dispatch(
    //       setAllCoins({
    //         userCoins: data,
    //       })
    //     );

    //     dispatch(setAddress({ address: addressObject.address }));
    //   }

    //   dispatch(setLoading());
    // };

    fetchData();
  }, [addressObject?.address]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("swap")) {
      setSelectedPage("swap");
    } else {
      setSelectedPage("liquidity");
    }
  }, [window.location.pathname]);

  return (
    <div className="lg:h-20 h-16 w-full bg-gradient-to-r from-white/70 via-white/50 to-blue-100/40 backdrop-blur-md shadow-md border-b border-white/20 rounded-b-2xl px-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">SwapMonkey</h1>
      <div className="lg:w-auto flex lg:gap-5 font-medium p-2 px-3  border-1 rounded-3xl justify-center items-center">
        <button
          className={` hover:bg-gray-800 hover:text-white px-5 py-1 rounded-2xl ${
            selectedPage == "swap"
              ? "lg:text-white lg:bg-gray-800 border "
              : "lg:text-black lg:bg-white border"
          } cursor-pointer transition-all`}
          onClick={() => navigate("/swap")}
        >
          Swap
        </button>
        <h1 className="font-bold text-gray-400 text-xl">|</h1>
        <button
          onClick={() => navigate("/liquidity")}
          className={` hover:bg-gray-800 hover:text-white px-5 py-1 rounded-2xl ${
            selectedPage == "liquidity"
              ? "lg:text-white lg:bg-gray-800 border "
              : "lg:text-black lg:bg-white border"
          } cursor-pointer transition-all`}
        >
          Liquidity
        </button>
      </div>

      {/* {!connected ? (
        <button
          className="bg-white text-gray-800  font-medium py-2 px-4 
        rounded-xl shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_rgba(60,64,67,0.15)]
        hover:shadow-[0_2px_4px_rgba(60,64,67,0.3),0_6px_10px_rgba(60,64,67,0.15)]
          transition-shadow
        border-1
      cursor-pointer"
          onClick={handleConnect}
        >
          Connect Wallet
        </button> // If not connected, show Connect button
      ) : (
        <div>
          <p>Connected: {account.address}</p>
          <button
            className="bg-white text-gray-800  font-medium py-2 px-4 
        rounded-xl shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_rgba(60,64,67,0.15)]
        hover:shadow-[0_2px_4px_rgba(60,64,67,0.3),0_6px_10px_rgba(60,64,67,0.15)]
          transition-shadow
        border-1
      cursor-pointer"
            onClick={handleDisconnect}
          >
            Disconnect Wallet
          </button>{" "}
          // If connected, show Disconnect button
        </div>
      )} */}
      <ConnectButton />
      {/* {!connected ? (
        <ConnectButton /> // Will handle the wallet connection automatically
      ) : (
        <div>
          <p>Connected: {account?.address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )} */}

      {/* {account ? (
        <ConnectButton connectText={`Connected: ${account.address}`} />
      ) : (
        <ConnectButton
          className="bg-white text-gray-800  font-medium py-2 px-4 
        rounded-xl shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_rgba(60,64,67,0.15)]
        hover:shadow-[0_2px_4px_rgba(60,64,67,0.3),0_6px_10px_rgba(60,64,67,0.15)]
          transition-shadow
        border-1
      cursor-pointer"
          connectText={`Connect wallet`}
        />
      )} */}
    </div>
  );
}

export default Header;
