import { createContext, useContext, useState, useEffect } from "react";
import HttpService from "../Services/HttpService";

const AddressContext = createContext({
  addresses : [],
  setAddresses : () => {},
  getAddressById: (id:number) => {},
  setCount : () => {}
});

export const useAddressContext: any = () => useContext(AddressContext);

export const AddressProvider = ({ children }: any) => {
  const [addresses, setAddresses]:any = useState([]);
  const [count,setCount]:any = useState(0);

  useEffect(() => {
    HttpService.fetchAddresses().then((res) => {
      setAddresses(res.data);
    });
  }, [count]);

  const getAddressById = (id:number) => {
    if(id == 0){
      return {id:0}
    }
    return addresses.find((address:any) => address.id == id);
  }

  return (
    <AddressContext.Provider value={{addresses, setAddresses,getAddressById,setCount}}>
      {children}
    </AddressContext.Provider>
  );
};
