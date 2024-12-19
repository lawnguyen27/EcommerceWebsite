import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Title from "../common/Title";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios for API call
const NavMenuWrapper = styled.nav`
  margin-top: 32px;
  
  .nav-menu-list {
    row-gap: 8px;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  }

  .nav-menu-item {
    border-radius: 4px;

    @media (max-width: ${breakpoints.sm}) {
      flex: 1 1 0;
    }
  }

  .nav-menu-link {
    padding-left: 36px;
    width: 100%;
    height: 40px;
    column-gap: 12px;
    border: 1px solid transparent;

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }

    .nav-link-text {
      color: ${defaultTheme.color_gray};
    }

    &.active {
      border-left: 2px solid ${defaultTheme.color_gray};
      background-color: ${defaultTheme.color_whitesmoke};

      @media (max-width: ${breakpoints.md}) {
        border-bottom: 2px solid ${defaultTheme.color_gray};
        border-left: 0;
        background-color: transparent;
      }
    }

    @media (max-width: ${breakpoints.md}) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
      padding-left: 8px;
      padding-right: 8px;
      column-gap: 8px;
    }
  }
`;

const UserMenu = () => {
  const location = useLocation();
 
    const [account, setAccount] = useState({
      name: "",
      email: "",
      password:"",
      phoneNumber: "",
      address: "",
    });
  
    useEffect(() => {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token"); // Retrieve the JWT token
  
  
      if (email &&token) {
        // Make API call to fetch account details based on the email
        axios
        .get(`http://localhost:5077/api/User/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        })
        .then((response) => {
    
          setAccount(response.data); // Assuming the API returns the account details
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching account details", error);
          });
      }
    }, []);
  
  return (
    <div>
      <Title titleText={"Xin chào "+account.name} />
      <p className="text-base font-light italic">Chào mừng bạn với phần thông tin tài khoản.</p>

      <NavMenuWrapper>
        <ul className="nav-menu-list grid">
          <li className="nav-menu-item">
            <Link
              to="/order"
              className={`nav-menu-link flex items-center ${
                location.pathname === "/order" ||
                location.pathname === "/order_detail"
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_orders.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Đơn hàng của tôi
              </span>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link
              to="/wishlist"
              className={`nav-menu-link flex items-center ${
                location.pathname === "/wishlist" ||
                location.pathname === "/empty_wishlist"
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_heart.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Yêu thích
              </span>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link
              to="/account"
              className={`nav-menu-link flex items-center ${
                location.pathname === "/account" ||
                location.pathname === "/account/add"
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_user.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Tài khoản của tôi
              </span>              
            </Link>
            </li>
            <li className="nav-menu-item">

            <Link
              to="/changeProfile"
              className={`nav-menu-link flex items-center ${
                location.pathname === "/changeProfile" ||
                location.pathname === "/changeProfile"
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_user.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Chỉnh sửa thông tin
              </span>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/" className={`nav-menu-link flex items-center`}>
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_sign_out.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Đăng xuất
              </span>
            </Link>
          </li>
        </ul>
      </NavMenuWrapper>
    </div>
  );
};
export default UserMenu;
