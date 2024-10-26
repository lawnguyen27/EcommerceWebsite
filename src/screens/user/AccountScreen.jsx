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
    label: "Home",
    link: "/Home",
  },
  { label: "Account", link: "/account" },
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
            <h4 className="title-sm">Contact Details</h4>
            <form>
              <div className="form-wrapper">
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Your Name
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.name}
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Email Address
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="email"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.email}
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Phone Number
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.phoneNumber  }
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Password
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="password"
                      className="form-elem-control text-outerspace font-semibold"
                      value={account.password}
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      Change
                    </button>
                  </div>
                </FormElement>
              </div>
            </form>
            <div>
              <h4 className="title-sm">My Contact Addresss</h4>
              <BaseLinkGreen to="/account/add">Add Address</BaseLinkGreen>
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
                      Home
                    </li>
                    <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                      Default billing address
                    </li>
                  </ul>
                  <div className="address-btns flex">
                    <Link
                      to="/"
                      className="text-base text-outerspace font-semibold"
                    >
                      Remove
                    </Link>
                    <div className="btn-separator"></div>
                    <Link
                      to="/"
                      className="text-base text-outerspace font-semibold"
                    >
                      Edit
                    </Link>
                  </div>
                </div>

                <div className="address-item grid">
                  <p className="text-outerspace text-lg font-semibold address-title">
                    Richard Doe
                  </p>
                  <p className="text-gray text-base font-medium address-description">
                    1/4 Watson Street Flat, East Coastal Road, Ohio City
                  </p>
                  <ul className="address-tags flex flex-wrap">
                    <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                      Home
                    </li>
                    <li className="text-gray text-base font-medium inline-flex items-center justify-center">
                      Default billing address
                    </li>
                  </ul>
                  <div className="address-btns flex">
                    <Link
                      to="/"
                      className="text-base text-outerspace font-semibold"
                    >
                      Remove
                    </Link>
                    <div className="btn-separator"></div>
                    <Link
                      to="/"
                      className="text-base text-outerspace font-semibold"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
