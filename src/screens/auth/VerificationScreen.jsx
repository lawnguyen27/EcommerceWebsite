import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { FormElement, Input } from "../../styles/form";
import { BaseButtonGreen } from "../../styles/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationScreenWrapper = styled.section``;

const VerificationScreen = () => {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve OTP from local storage
    const storedOtp = localStorage.getItem("otp");

    if (enteredOtp === storedOtp) {
      // OTP matches, navigate to reset password page
      navigate("/change_password");
    } else {
      // OTP doesn't match, show an error message
      setMessage("Incorrect OTP. Please try again.");
    }
  };
  return (
    <VerificationScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.form_img4}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Xác minh mã OTP</h3>
                <p>Chúng tôi đã gửi OTP về email của bạn. Vui lòng kiểm tra hộp thư.</p>
              </FormTitle>
  {/* Display message if OTP is incorrect */}
  {message && <p style={{ color: "red" }}className="error-message">{message}</p>}
              <form onSubmit={handleSubmit}>
                <FormElement>
                  <label htmlFor="otp" className="form-elem-label">
                    Mã xác minh gồm 6 chữ số
                  </label>
                  <Input
                   type="text"
                   placeholder="Nhập mã xác minh"
                   name="otp"
                   className="form-elem-control"
                   value={enteredOtp}
                   onChange={(e) => setEnteredOtp(e.target.value)}
                  />
                </FormElement>
                <BaseButtonGreen type="submit" className="form-submit-btn">
                  Gửi
                </BaseButtonGreen>
              </form>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </VerificationScreenWrapper>
  );
};

export default VerificationScreen;
