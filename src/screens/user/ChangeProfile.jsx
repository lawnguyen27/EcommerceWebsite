import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input, Textarea } from "../../styles/form";
import { BaseButtonGreen, BaseButtonWhitesmoke } from "../../styles/button";
import { defaultTheme } from "../../styles/themes/default";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddressScreenWrapper = styled.main`
  .form-elem-control {
    padding-left: 16px;
    border: 1px solid ${defaultTheme.color_platinum};

    &:focus {
      border-color: ${defaultTheme.color_silver};
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Account", link: "/account" },
  { label: "Change Profile", link: "/changeProfile" },
];

const ChangeProfileScreen = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const [profile, setProfile] = useState({
    email:"",
    name: "",
    phone: "",
    country: "",
    streetAddress: "",
    city: "",
  });
  useEffect(() => {
    // Lấy email và token từ localStorage (nếu có)
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    // Gọi API để lấy dữ liệu người dùng
    if (email && token) {
      axios
        .get(`http://localhost:5077/api/User/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Ép kiểu dữ liệu thành object và gán vào state
          setProfile({
            name: response.data.name || "",
            phone: response.data.phoneNumber || "",
            country: "",
            streetAddress: response.data.address || "",
            city: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
    console.log(profile)
  }, []);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    profile.email = localStorage.getItem("email"); // Retrieve email from localStorage

    // Make an API call to update the profile
    axios
      .put(
        `http://localhost:5077/api/User/${profile.email}`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Profile updated successfully", response.data);
        navigate("/account")
      })
      .catch((error) => {
        console.error("Error updating profile", error);
      });
  };

  return (
    <AddressScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />
            <h4 className="title-sm">Add Address</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-wrapper">
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Name*
                  </label>
                  <Input
                    type="text"
                    name="name"
                    className="form-elem-control"
                    placeholder="First Name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </FormElement>
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Phone*
                  </label>
                  <Input
                     type="text"
                     name="phone"
                     className="form-elem-control"
                     placeholder="Phone Number"
                     value={profile.phone}
                     onChange={handleChange}
                  />
                </FormElement>
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Contry / Region
                  </label>
                  <Input
                     type="text"
                     name="country"
                     className="form-elem-control"
                     placeholder="Country/Region"
                     value={profile.country}
                     onChange={handleChange}
                  />
                </FormElement>
               
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Street Address*
                  </label>
                  <Input
                      type="text"
                      name="streetAddress"
                      className="form-elem-control"
                      placeholder="House number and street name"
                      value={profile.streetAddress}
                      onChange={handleChange}
                  />
                </FormElement>
               
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    City*
                  </label>
                  <Input
                    type="text"
                    name="city"
                    className="form-elem-control"
                    placeholder="Town / City"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </FormElement>
            
              
              </div>
              <FormElement className="form-check-elem flex items-center">
                <div className="form-elem-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark flex items-center justify-center">
                    <i className="bi bi-check-lg"></i>
                  </span>
                </div>
                <span>Set as default shipping address</span>
              </FormElement>
              <FormElement className="form-check-elem flex items-center">
                <div className="form-elem-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark flex items-center justify-center">
                    <i className="bi bi-check-lg"></i>
                  </span>
                </div>
                <span>Set as default billing address</span>
              </FormElement>
              <div className="form-btns flex">
                <BaseButtonGreen type="submit">Save</BaseButtonGreen>
                <BaseButtonWhitesmoke type="button">
                  Cancel
                </BaseButtonWhitesmoke>
              </div>
            </form>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AddressScreenWrapper>
  );
};

export default ChangeProfileScreen;
