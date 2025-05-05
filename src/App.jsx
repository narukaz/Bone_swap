import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Swap from "./components/Swap/Swap";
import Liquidity from "./components/Liquidity/Liquidity";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex bg-gray-100 flex-col gap-8 w-full">
        <Header />
        <Routes>
          <Route index element={<Swap />} />
          <Route index path="/swap" element={<Swap />} />
          <Route path="/liquidity" element={<Liquidity />} />
        </Routes>
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
