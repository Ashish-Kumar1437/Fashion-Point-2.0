import { NavLink, useNavigate } from "react-router-dom"
import { IMG_CONSTANTS } from "../../Constants/Assets"
import "./MyAddresses.scss"
import { useAddressContext } from "../../Contexts/AddressContext"
import HttpService from "../../Services/HttpService"
import toast from "react-hot-toast"

export const MyAddresses = () => {

    const {addresses,setCount} = useAddressContext()
    const navigate = useNavigate();

    const removeAddress = (id:number) => {
        HttpService.deleteAddress(id)
        .then((res:any) => {
            if(res.status === 200){
                toast.success(res.data);
                setCount((prev:number) => ++prev);
            }
        }).catch(()=> toast.error("Error deleting address"))
    }


  return (
    <div className="addresses-wrapper">
    <NavLink to="/myAccount">
      <img src={IMG_CONSTANTS.LESS_THAN} alt="Back" /> Back to My Account
    </NavLink>
    <div className="heading">My Address</div>

    <div className="addresses">

        {
            addresses.map((address:any) =>         
                <div className="address" key={address.id}>
                    <div className="heading">
                        <span className="name">{address.receiverName}</span>
                        <span className="type">{address.addressType}</span>
                    </div>
                    <div className="locality">{address.address}, {address.city}</div>
                    <div className="state">{address.state}, {address.pincode}</div>
                    <div className="contact">Contact Number: {address.reciverPhoneNo}</div>

                    <div className="action">
                        <button onClick={() => navigate(`${address.id}`)}>Edit</button>
                        <hr />
                        <button onClick={()=> removeAddress(address.id)}>Remove</button>
                    </div>
                </div>
            )
        }

        <div className="newAddress" onClick={() => navigate('0')}>
            <img src={IMG_CONSTANTS.ADD} alt="" />
            <span>ADD NEW ADDRESS</span>
        </div>
    

    </div>
  </div>
  )
}
