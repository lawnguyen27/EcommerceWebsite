import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input } from "../../styles/form";
import { BaseLinkGreen } from "../../styles/button";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios for API call

const AccountScreenWrapper = styled.main`
  .address-list {
    padding-bottom: 16px;
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }
`;

const breadcrumbItems = [
  {
    label: "Cửa hàng",
    link: "/Home",
  },
  { label: "Tài khoản", link: "/account" },
];

const AccountScreen = () => {
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
    <AccountScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />
            <h4 className="title-sm">Thông tin tài khoản</h4>
            <form>
              <div className="form-wrapper">
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Họ tên
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.name}
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Địa chỉ email
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="email"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.email}
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Số điện thoại
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.phoneNumber  }
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Mật khẩu
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="password"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.password}
                      readOnly
                    />
                    {/* <button type="button" className="form-control-change-btn">
                      Change
                    </button> */}
                  </div>
                </FormElement>
              </div>
            </form>
            <div>
              <h4 className="title-sm">Địa chỉ</h4>
              <div className="address-list grid">
                <div className="address-item grid">
                  <p className="text-outerspace text-lg font-semibold address-title">
                    {account.name}
                  </p>
                  <p className="text-gray text-base font-medium address-description">
                    {account.address}                  
                  </p>
                  <ul className="address-tags flex flex-wrap">
                    <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                      Nhà
                    </li>
                    <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                      Địa chỉ mặc định
                    </li>
                  </ul>
                </div>
              </div>
              <BaseLinkGreen to="/changeProfile">Chỉnh sửa thông tin</BaseLinkGreen>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
