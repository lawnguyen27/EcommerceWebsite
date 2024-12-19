import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { FormElement, Input } from "../../styles/form";
import { BaseButtonBlack } from "../../styles/button";
import { Link ,useNavigate} from "react-router-dom";
import React, { useState } from "react";
import axios from "axios"; // Add Axios for API calls

const ResetScreenWrapper = styled.section``;

const ResetScreen = () => {
  const navigate = useNavigate(); // To navigate to another page on successful login

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to initiate the reset password process
      const response = await axios.post("http://localhost:5077/api/User/ForgetPassword", { email });
      
      if (response.status===200) {
        const otp = response.data;
        localStorage.setItem("otp",otp);
        localStorage.setItem("resetEmail",email);
        navigate("/verification");
        setMessage("Password reset link has been sent to your email.");
      } else {
        setMessage("There was an issue sending the reset link.");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng nhập lại");
      console.error("Error sending password reset email:", error);
    }
  };
  return (
    <ResetScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={staticImages.form_img3} className="object-fit-cover" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Đặt lại mật khẩu</h3>
                <p>
                  Nhập email đăng ký. 
                  Chúng tôi sẽ gửi mã OTP về email của bạn.
                </p>
                <p>Vui lòng kiểm tra.</p>
              </FormTitle>
              {message && <p style={{ color: "red" }}className="message-text">{message}</p>}

              <form onSubmit={handleSubmit}>
                <FormElement>
                  <label htmlFor="" className="form-elem-label">
                    Email
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập email"
                    name="email"
                    className="form-elem-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormElement>
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Gửi
                </BaseButtonBlack>
              </form>
              <p className="flex flex-wrap account-rel-text">
                <Link to="/sign_in" className="font-medium">
                  Trở về đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </ResetScreenWrapper>
  );
};

export default ResetScreen;
