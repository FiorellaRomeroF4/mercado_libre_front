import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { ItemsList } from "./pages/List";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/items" element={<ItemsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
