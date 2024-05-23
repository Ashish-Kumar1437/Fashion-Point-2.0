import { Navbar, Footer, HomePage, Login } from "../../Components/Components";
import { Routes, Route } from "react-router-dom";
import { Account } from "../Layouts";

export const Landing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myAccount/*" element={<Account />} />
        <Route path="/*" element={<div>Not Found</div>} />
      </Routes>
      <Footer />
    </>
  );
};
