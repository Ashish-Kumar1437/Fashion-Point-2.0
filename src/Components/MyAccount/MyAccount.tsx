import { NavLink } from "react-router-dom";
import { ANIMATION_CONSTANTS, IMG_CONSTANTS } from "../../Constants/Assets";
import "./MyAccount.scss";
import React from "react";
import Lottie from "lottie-react";

export const MyAccount = () => {
  return (
    <div className="account-wrapper">
      <div className="heading">My Account</div>

      <div className="accountTabs">
        {MyAccountTabs.map((tab, i) => (
          <React.Fragment key={tab.heading}>
            <NavLink to={tab.to} className="tab" key={tab.heading}>
              <div className="heading">
                {tab.heading}{" "}
                <img src={IMG_CONSTANTS.GREATER_THAN} alt="greaterthan" />
              </div>
              <div className="desc">{tab.desc}</div>
            </NavLink>
            {i < MyAccountTabs.length - 1 && <div className="line"></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="backtoshoping">
        <div className="left">
          <p>Buy something to get personalised recommendations.</p>
          <NavLink to={"/home"}>Continue Shopping</NavLink>
        </div>
        <div className="right">
          <Lottie animationData={ANIMATION_CONSTANTS.ADD_TO_CART} loop={true} />
        </div>
      </div>
    </div>
  );
};

const MyAccountTabs = [
  {
    heading: "My Orders",
    desc: "View,modify and track orders",
    to: "/",
  },
  {
    heading: "My Wishlist",
    desc: "View and modify wishlist",
    to: "/",
  },
  {
    heading: "My Payments",
    desc: "View and modify payment methods",
    to: "/",
  },
  {
    heading: "My Addresses",
    desc: "Edit, add or remove addresses",
    to: "address",
  },
  {
    heading: "My Profile",
    desc: "Edit personal info, change password",
    to: "profile",
  },
];
