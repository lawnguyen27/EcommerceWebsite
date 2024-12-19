import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import AuthOptions from "../../components/auth/AuthOptions";
import { FormElement, Input } from "../../styles/form";
import PasswordInput from "../../components/auth/PasswordInput";
import { Link,useNavigate} from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import React, { useState } from "react";
import axios from "axios"; // Axios for API requests
const SignInScreenWrapper = styled.section`
  .form-separator {
    margin: 32px 0;
    column-gap: 18px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 24px 0;
    }

    .separator-text {
      border-radius: 50%;
      min-width: 36px;
      height: 36px;
      background-color: ${defaultTheme.color_purple};
      position: relative;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: ${defaultTheme.color_platinum};
    }
  }

  .form-elem-text {
    margin-top: -16px;
    display: block;
  }
`;

const SignInScreen = () => {
    // State to manage form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // To handle any error message
    const navigate = useNavigate(); // To navigate to another page on successful login
    const handleLogin = async (event) => {
      event.preventDefault(); // Prevent form from reloading the page
      console.log(email,password)
      try {
        const response = await axios.post("http://localhost:5077/api/User/Login", {
          email,
          password,
        });
        const { token } = response.data;

        // Save token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        if (response.status === 200) {
          // Login success, redirect to another page (e.g., dashboard)
          navigate("/Home"); // Replace "/dashboard" with the actual route
        } else {
          setError("Không hợp lệ");
        }
      } catch (error) {
        // Handle error case
        setError("Đăng nhập thất bại. Vui lòng kiểm tra email và mặt khẩu");
        console.error("Login error:", error);
      }
    };
  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={staticImages.form_img1} className="object-fit-cover" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Đăng nhập</h3>
              </FormTitle>
              <AuthOptions />
              <div className="form-separator flex items-center justify-center">
                <span className="separator-line"></span>
                <span className="separator-text inline-flex items-center justify-center text-white">
                  Hoặc
                </span>
                <span className="separator-line"></span>
              </div>

              <form onSubmit={handleLogin}>
                <FormElement>
                  <label htmlFor="email" className="form-elem-label">
                   Email
                  </label>
                  <Input
                       type="email"
                       placeholder="Nhập email"
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} // Update email state
                       className="form-elem-control"
                       required
                  />
                </FormElement>
                <FormElement>
                  <label htmlFor="password" className="form-elem-label">
                    Mật khẩu
                  </label>
                  <Input
                       type="password"
                       placeholder="Nhập mật khẩu"
                       name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)} // Update pass state
                       className="form-elem-control"
                       required
                  />
                </FormElement>
        
                <Link
                  to="/reset"
                  className="form-elem-text text-end font-medium"
                >
                  Quên mật khẩu
                </Link>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Đăng nhập
                </BaseButtonBlack>
              </form>
              <p className="flex flex-wrap account-rel-text">
                Không có tài khoản
                <Link to="/sign_up" className="font-medium">
                  Đăng ký
                </Link>
                `
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
};

export default SignInScreen;
