import { NavLink, useNavigate } from "react-router-dom";
import { IMG_CONSTANTS } from "../../Constants/Assets";
import { AsyncDropdown } from "../../Shared Components/SharedComponets";
import "./Navbar.scss";
import useAuth from "../../Contexts/AuthContext";

export const Navbar = () => {
  const {user} = useAuth();
  const naviagate = useNavigate();

  const data = [
    { label: "Men", value: "a" },
    { label: "Women", value: "b" },
    { label: "Mobile Cover", value: "c" },
    { label: "Laptops", value: "d" },
  ];

  return (
    <nav>
      <div className="left-nav">
        <div className="logo" onClick={() => naviagate("/home")}>
          <img src={IMG_CONSTANTS.LOGO3} alt="logo" />
        </div>
        <div className="tabs">
          <div className="tab">Men</div>
          <div className="tab">Women</div>
          <div className="tab">Mobile Cover</div>
        </div>
      </div>
      <div className="right-nav">
        <div className="search">
          <AsyncDropdown data={data} />
        </div>
        <div className="actions">
          {!user.id ? <NavLink to={"/login"}>Login</NavLink> :
          <NavLink to={"/myAccount"}><img src={IMG_CONSTANTS.PERSON} alt="" /></NavLink>}
          <NavLink to={"/"}>
            <img src={IMG_CONSTANTS.WISHLIST} alt="" />
          </NavLink>
          <NavLink to={"/cart"}>
            <img src={IMG_CONSTANTS.CART} alt="" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
