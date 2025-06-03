import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MoimMainPage from "./pages/MoimMainPage";
// import MoimDetailPage from "./pages/MoimDetailPage";
// import MoimCreatePage from "./pages/MoimCreatePage";
// import MoimEditPage from "./pages/MoimEditPage";
// import MoimJoinPage from "./pages/MoimJoinPage";
// import MoimLeavePage from "./pages/MoimLeavePage";
// import MoimDeletePage from "./pages/MoimDeletePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MoimMainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/moims" element={<MoimMainPage />} />
      {/* <Route path="/moim/:id" element={<MoimDetailPage />} />
      <Route path="/moim/create" element={<MoimCreatePage />} />
      <Route path="/moim/:id/edit" element={<MoimEditPage />} />
      <Route path="/moim/:id/join" element={<MoimJoinPage />} />
      <Route path="/moim/:id/leave" element={<MoimLeavePage />} />
      <Route path="/moim/:id/delete" element={<MoimDeletePage />} /> */}
    </Routes>
  </BrowserRouter>
);
