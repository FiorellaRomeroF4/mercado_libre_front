import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { ItemDetail } from "./pages/Detail";
import { ItemsList } from "./pages/List";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="items">
            <Route index element={<ItemsList />} />
            <Route path=":id" element={<ItemDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
