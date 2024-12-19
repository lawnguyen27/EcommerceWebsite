import styled from "styled-components";
import {
  CheckboxGroup,
  FormGridWrapper,
  FormTitle,
} from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import AuthOptions from "../../components/auth/AuthOptions";
import { FormElement, Input } from "../../styles/form";
import PasswordInput from "../../components/auth/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { useState } from "react";
import axios from "axios";
const SignUpScreenWrapper = styled.section`
  form {
    margin-top: 40px;
    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  }

  .text-space {
    margin: 0 4px;
  }
`;

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate to redirect after signup

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const signupData = {
      name,
      email,
      password,
      address,
      phone,
    };

    try {
      const response = await axios.post(
        "http://localhost:5077/api/User/Register", // Adjust API URL as necessary
        signupData
      );
      if (response.status === 200) {
        // Redirect to login or dashboard after successful signup
        navigate("/sign_in");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please check your information.");
    }
  };
  return (
    <SignUpScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.form_img2}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Đăng ký</h3>
                <p className="text-base">
                  
                </p>
              </FormTitle>
              <AuthOptions />
              {error && <p className="error-message">{error}</p>}

              <form onSubmit={handleSignUp}>
                <FormElement>
                  <label htmlFor="name" className="forme-elem-label">
                    Họ tên
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập họ tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-elem-control"
                  />
                
                </FormElement>
                <FormElement>
                  <label htmlFor="email" className="form-elem-label">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-elem-control"
                  />
                </FormElement>
                <FormElement>
                  <label htmlFor="Password" className="form-elem-label">
                    Mật khẩu
                  </label>
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-elem-control"
                  />
                </FormElement>
                <FormElement>
                  <label htmlFor="confirmPassword" className="form-elem-label">
                    Xác nhận mật khẩu
                  </label>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu
"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-elem-control"
                  />
                </FormElement>
                <FormElement>
                  <label htmlFor="address" className="form-elem-label">
                    Địa chỉ
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-elem-control"
                  />
                </FormElement>

                <FormElement>
                  <label htmlFor="phone" className="form-elem-label">
                    Số điện thoại
                  </label>
                  <Input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-elem-control"
                  />
                </FormElement>
                {/* <span className="form-elem-text font-medium">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </span> */}
                   {/* <span className="form-elem-error">
                    *Please enter valid email address.
                  </span> */}
                 {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}

                <CheckboxGroup>
                  <li className="flex items-center">
                    <input type="checkbox" />
                    <span className="text-sm">
                      Đồng ý với
                      <span className="text-space"></span>

                      <Link to="/" className="text-underline">
                       Điều khoản sử dụng
                      </Link>
                      <span className="text-space">và</span>
                      <Link to="/" className="text-underline">
                      Chính sách bảo mật                      
                      </Link>
                    </span>
                  </li>
                  {/* <li className="flex items-center">
                    <input type="checkbox" />
                    <span className="text-sm">
                      Subscribe to our monthly newsletter
                    </span>
                  </li> */}
                </CheckboxGroup>
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Đăng ký                
      </BaseButtonBlack>
              </form>
              <p className="flex flex-wrap account-rel-text">
                Đã có tài khoản
                <Link to="/sign_in" className="font-medium">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignUpScreenWrapper>
  );
};

export default SignUpScreen;
