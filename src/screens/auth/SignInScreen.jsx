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
  
        if (response.status === 200) {
          // Login success, redirect to another page (e.g., dashboard)
          navigate("/"); // Replace "/dashboard" with the actual route
        } else {
          setError("Invalid login credentials");
        }
      } catch (error) {
        // Handle error case
        setError("Login failed. Please check your credentials and try again.");
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
                <h3>Sign In</h3>
              </FormTitle>
              <AuthOptions />
              <div className="form-separator flex items-center justify-center">
                <span className="separator-line"></span>
                <span className="separator-text inline-flex items-center justify-center text-white">
                  OR
                </span>
                <span className="separator-line"></span>
              </div>

              <form onSubmit={handleLogin}>
                <FormElement>
                  <label htmlFor="email" className="form-elem-label">
                    User name or email address
                  </label>
                  <Input
                       type="email"
                       placeholder="Enter your email"
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} // Update email state
                       className="form-elem-control"
                       required
                  />
                </FormElement>
                <FormElement>
                  <label htmlFor="password" className="form-elem-label">
                    Password
                  </label>
                  <Input
                       type="password"
                       placeholder="Enter your password"
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
                  Forgot your password?
                </Link>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Sign In
                </BaseButtonBlack>
              </form>
              <p className="flex flex-wrap account-rel-text">
                Don&apos;t have a account?
                <Link to="/sign_up" className="font-medium">
                  Sign Up
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
