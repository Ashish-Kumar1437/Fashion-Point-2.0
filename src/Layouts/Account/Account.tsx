import { Route, Routes } from "react-router-dom";
import {
  Address,
  MyAccount,
  MyAddresses,
  Profile,
} from "../../Components/Components";
import { AddressProvider } from "../../Contexts/AddressContext";

export const Account = () => {
  return (
    <Routes>
      <Route index element={<MyAccount />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/address/*" element={<AddressLayout />} loader />
    </Routes>
  );
};

const AddressLayout = () => {
  return (
    <AddressProvider>
      <Routes>
        <Route index element={<MyAddresses />} loader />
        <Route path="/:id" element={<Address />} />
      </Routes>
    </AddressProvider>
  );
};
