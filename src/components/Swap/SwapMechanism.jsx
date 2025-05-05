import React, { useState, useEffect } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionData } from "../../features/selectionSlice";
import { bcs, fromHex, toHex } from "@mysten/bcs";
import {
  ArrowRightLeft,
  ChevronDown,
  ChevronRight,
  LoaderIcon,
  Lock,
  LockIcon,
} from "lucide-react";
import {
  useSuiClient,
  useSignTransaction,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import {
  setAddress,
  setAllCoins,
  setLoading,
} from "../../features/walletSlice";
import { data } from "react-router-dom";
//0x00ef1818fa75fb49604794fdf1df9c830238f574023b7fac0fdede2154866163
function SwapMechanism() {
  const suiClient = useSuiClient();
  const [expandIndex, setExpandIndex] = useState(null);
  const currentUser = useCurrentAccount();
  const [expandData, setExpandData] = useState([]);
  const { mutateAsync: signTransaction } = useSignTransaction();
  // const { signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const address = useSelector((state) => state.wallet.address);
  const isLoading = useSelector((state) => state.wallet.isLoading);
  const userCoins = useSelector((state) => state.wallet.userCoins);
  const dispatch = useDispatch();
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [calculatePrice, setCalculatedPrice] = useState(0);
  const swap = useSelector((state) => state.swap);

  // console.log("toName", toName, "toObjectId", toObjectId);
  const [isTo, setIsTo] = useState("none");

  const PACKAGE_ID =
    "0x10d64c839d0707119181c72f12f1efb07eb0b5d26f830bb6030edbffaaa0b2f2";
  // const PACKAGE_ID =
  //   "0x23380184f8201aea58e571dd11913f7dbebd39a5b291bf2f0bdae60df4323a67"; working
  const MODULE_NAME = "custom_token";
  const POOL_OBJECT_ID =
    "0xf44f8dba33f00be73dd792c75f460f040995d6a13d91125558e17fca8c0fa7e6";
  // const POOL_OBJECT_ID =
  //   "0xca1531cc4b36c0f8a7427986c627f9f080176a799842d8900494f7fbd79e0c1d"; working

  const [isTokenSelection, setIsTokenSelection] = useState(false);

  const fetchData = async () => {
    if (!currentUser?.address) {
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
      result_array.push({ ...res, coinType, address: currentUser.address });

      console.log(result_array);
    }
    dispatch(setAllCoins({ userCoins: result_array }));

    dispatch(setLoading());
  };

  const onSwapValues = () => {
    dispatch(
      setTransactionData({
        fromName: swap.toName,
        toName: swap.fromName,
        fromDecimal: swap.toDecimal,
        toDecimal: swap.fromDecimal,
      })
    );
  };

  const onSwap = async () => {
    if (swap.fromName === swap.toName || !swap.fromAmount) {
      console.log("Invalid swap parameters.");
      setToAmount(0);
      return;
    }
    setLoading();
    const fromDecimalsBI = BigInt(swap.fromDecimal);
    const amountBI = BigInt(fromAmount);
    const scaledAmount = amountBI * 10n ** fromDecimalsBI;
    let fn = `${swap.fromName.toLowerCase()}_to_${swap.toName.toLowerCase()}_swap`;
    console.log(fn);
    console.log("coinId at the time of swap", swap.fromObjectId);

    let { data } = await suiClient.getObject({ id: swap.fromObjectId });
    // console.log(object);
    try {
      const tx = new Transaction();
      tx.moveCall({
        package: PACKAGE_ID,
        module: MODULE_NAME,
        function: fn,
        arguments: [
          tx.object(POOL_OBJECT_ID),
          tx.objectRef({
            ...data,
          }),

          tx.pure.u64(scaledAmount),
        ],
      });

      tx.setSender(currentUser?.address);
      const { bytes, signature, reportTransactionEffects } =
        await signTransaction({
          transaction: tx,
          chain: "sui:testnet",
        });

      const executeResult = await suiClient.executeTransactionBlock({
        // senderAddress: address,
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
        },
      });

      fetchData();
      setLoading();
    } catch (e) {
      console.error("Swap failed:", e);
    }
  };

  const fetchPrice = async (value) => {
    try {
      if (!value) return;
      if (
        swap.toName === swap.fromName ||
        value < 1 ||
        swap.toName == "Select Token" ||
        swap.fromName == "Select Token" ||
        !swap.fromObjectId
      ) {
        setToAmount(value);
        return;
      }
      let fn = `${swap.fromName.toLowerCase()}_to_${swap.toName.toLowerCase()}_price`;
      console.log(fn);
      const fromDecimalsBI = BigInt(swap.fromDecimal);
      const toDecimalsBI = BigInt(swap.toDecimal);
      const amountBI = BigInt(value);

      // scale your input into u64 base units
      const scaledAmount = amountBI * 10n ** fromDecimalsBI;

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::${fn}`,
        arguments: [tx.pure.u64(scaledAmount)],
        typeArguments: [],
      });

      const res = await suiClient.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: currentUser.address,
      });

      console.log(res);
      const rawRet = res.results?.[0].returnValues?.[0][0];

      // bytesToBigIntLE(rawRet);
      console.log(rawRet);
      const u8 = new Uint8Array(rawRet);
      const view = new DataView(u8.buffer);

      // 3) Read a 64‑bit unsigned little‑endian integer
      const asBigInt = view.getBigUint64(0, true);
      setToAmount(Number(asBigInt));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("ADDRESS FROM SWAP MECHANISM ", address);
  }, [address]);

  useEffect(() => {
    fetchPrice(fromAmount);
  }, [swap.fromObjectId, swap.toObjectId, fromAmount]);
  return (
    <>
      {isTokenSelection ? (
        <div
          className="absolute left-0 top-0 w-full h-[200%] bg-[#202124] cursor-pointer opacity-25 flex justify-around items-center z-1"
          onClick={() => {
            setIsTokenSelection((prev) => !prev);
            setExpandIndex(null);
          }}
        ></div>
      ) : null}

      {isTokenSelection ? (
        <div
          className="w-lg h-[80%] overflow-y-scroll fixed
       bg-white
         flex flex-col gap-4 left-1/2 top-1/2 p-5 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl "
        >
          <div className="w-full flex flex-col items-center justify-center shadow-xl rounded-xl py-2 sticky right-5 top-0">
            <h1 className="text-center mb-4 gap-9">select or add your token</h1>
            <div className="flex gap-5 mx-auto items-center justify-around">
              <input
                type="string"
                className="bg-gray-200 w-auto h-14 px-4 rounded-4xl text-[15px]"
                placeholder="0x000000000000000000000000000000000000"
                // onChange={(e) => setSearchField(e.target.value)}
              />
              <button
                // onClick={() => searchCoin("")}
                className="w-40 h-14 border bg-white text-black px-4 rounded-2xl text-[15px] font-bold cursor-pointer hover:text-white hover:bg-black"
              >
                Add coin
              </button>
            </div>
            <p className="mx-auto text-gray-400">_____________________</p>
          </div>

          {userCoins.map((token, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={async () => {
                    if (isTo == "from") {
                      console.log(token);
                      const { data } = await suiClient.getCoins({
                        owner: token.address,
                        coinType: token.coinType,
                      });

                      setExpandData([...data]);
                      setExpandIndex((prev) => {
                        if (prev == index) return null;
                        if (prev == null) return index;
                        if (prev != null && prev != index) return index;
                      });

                      dispatch(
                        setTransactionData({
                          fromName: token.symbol,
                          fromDecimal: token.decimals,
                        })
                      );

                      return;
                    } else if (isTo == "to") {
                      dispatch(
                        setTransactionData({
                          toName: token.symbol,
                          toDecimal: token.decimals,
                        })
                      );
                      setIsTokenSelection(false);
                    }
                  }}
                  className=" group w-full flex flex-col  items-center  border   justify-between rounded-4xl text-2xl px-4 py-4  hover:border-blue-500 hover:border-3 text-gray-800 cursor-pointer shadow-shadow-[0px_0px_0px_0px_rgb(0,0,0)] hover:shadow-[3px_3px_0px_0px_rgb(50,40,10)] transition-all"
                >
                  <div className="w-full flex items-center gap-5   justify-between transition-all">
                    <h1 className="font-bold">{token.symbol}</h1>
                    {isTo === "from" && <ChevronDown />}
                  </div>
                  {/* this is my code B */}
                  {isTo === "from" && expandIndex == index && (
                    <div className="flex flex-col h-46   gap-3 w-full mt-5 overflow-y-auto  bg-gradient-to-br from-white to-blue-50 rounded-xl transition-all p-3">
                      {expandData && expandData.length > 0
                        ? expandData.map((coin, index) => (
                            <div
                              onClick={() => {
                                console.log(coin.coinObjectId);
                                setIsTokenSelection(false);
                                dispatch(
                                  setTransactionData({
                                    fromObjectId: coin.coinObjectId,
                                    fromBalance:
                                      coin.balance / 10 ** swap.fromDecimal,
                                  })
                                );
                                fetchPrice(swap.fromAmount);
                              }}
                              id={index}
                              className="flex justify-between rounded-2xl items-center px-4 py-4  bg-white text-gray-700 border hover:bg-black hover:text-white  transition-all "
                            >
                              <div className="flex flex-col justify-center">
                                <p className="text-[12px] font-bold">
                                  Coin_Object
                                </p>
                                <span className="font-light text-sm truncate">
                                  {coin.coinObjectId.slice(0, 5) +
                                    "..." +
                                    coin.coinObjectId.slice(-5)}
                                </span>
                              </div>

                              <div className="flex flex-col justify-center">
                                <p className="text-[12px] font-bold text-right">
                                  Coin_Balance
                                </p>
                                <span className="font-light text-sm">
                                  {(
                                    coin.balance /
                                    10 ** token.decimals
                                  ).toFixed(0)}
                                </span>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  )}
                  {/* this is end of code B */}
                </div>
              </>
            );
          })}
        </div>
      ) : null}

      <div className="mb-[50px]">
        <div
          className="lg:w-xm mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4 
      flex flex-col items-center"
        >
          <h3 className="text-gray-600 text-center self-start pl-4 cursor-none">
            make your trade
          </h3>
          <div className=" w-sm flex flex-col  gap-2 bg-gray-100 rounded-2xl px-5 py-5">
            <p className="text-sm cursor-none">you pay</p>
            <div className="flex items-center h-14 ">
              {!isLoading ? (
                <div
                  className="flex gap-2 font-medium hover:bg-gray-200 py-4 rounded-2xl cursor-pointer items-center transition-colors p-3"
                  onClick={() => {
                    setIsTokenSelection((prev) => !prev);
                    setIsTo("from");
                  }}
                >
                  <h1>{swap.fromName}</h1>
                  <ChevronRight />
                </div>
              ) : (
                <div className="flex gap-2 font-medium hover:bg-gray-200 py-4 rounded-2xl cursor-pointer items-center transition-colors p-3">
                  <LockIcon
                    size={40}
                    className="cursor-not-allowed animate-bounce "
                  />
                </div>
              )}

              <input
                value={swap.fromAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setTransactionData({ fromAmount: value }));
                  setFromAmount(value);
                  fetchPrice(value);
                }}
                className="w-full text-right font-light  outline-none border-none text-3xl pb-2 relative"
                type="number"
                placeholder="enter amount"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-between font-light ">
              <p>balance</p>
              <p>
                {swap.fromBalance} {swap.fromName}
              </p>
            </div>
          </div>
          <ArrowRightLeft
            onClick={() => {
              onSwapValues();
            }}
            size={30}
            className="rotate-90 cursor-pointer rounded-2xl hover:text-blue-600"
          />
          <div className=" w-sm flex flex-col  gap-2 bg-gray-100 rounded-2xl px-5 py-5">
            <p className="text-sm cursor-none">You receive</p>
            <div className="flex items-center h-14 ">
              {!isLoading ? (
                <div
                  onClick={() => {
                    setIsTokenSelection((prev) => !prev);
                    setIsTo("to");
                  }}
                  className="flex gap-2 font-medium hover:bg-gray-200 items-center py-4 rounded-2xl cursor-pointer transition-colors p-3"
                >
                  <h1>{swap.toName}</h1>
                  <ChevronRight />
                </div>
              ) : (
                <div className="flex gap-2 font-medium hover:bg-gray-200 py-4 rounded-2xl cursor-pointer items-center transition-colors p-3">
                  <LockIcon
                    size={40}
                    className="cursor-not-allowed animate-bounce"
                  />
                </div>
              )}
              <input
                className="w-full text-right font-light text-gray-500  outline-none border-none text-3xl pb-2"
                placeholder="calculating..."
                disabled
                type="number"
                value={toAmount}
                onChange={(e) => {
                  setToAmount(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-between font-light ">
              {/* <p>balance</p>
              <p>
                {toBalance} {toName}
              </p> */}
            </div>
          </div>
          <button
            onClick={() => {
              console.log("onswap");
              onSwap();
            }}
            className="bg-white border hover:bg-black hover:text-white w-[200px] text-black  font-medium px-5 py-2 rounded-2xl cursor-pointer transition-all"
          >
            {isLoading ? (
              <LoaderIcon className="mx-auto animate-spin" />
            ) : (
              "Swap"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default SwapMechanism;
