import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { FormElement, Input } from "../../styles/form";
import { BaseButtonBlack } from "../../styles/button";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios"; // Add Axios for API calls

const ChangePwdScreenWrapper = styled.section``;

const ChangePasswordScreen = () => {
  const navigate = useNavigate(); // To navigate to another page on successful login
  const email = localStorage.getItem("resetEmail")
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(confirmpassword===password){
      try {
        // Send a request to the backend to initiate the reset password process
        const response = await axios.put("http://localhost:5077/api/User/Password", { email,password });
        
        if (response.status===200) {
          localStorage.clear("otp");
          localStorage.clear("resetEmail");
          navigate("/sign_in");
          
        }
      } catch (error) {
        console.error("Error sending password reset email:", error);
      }
    }else{
      setMessage("Confirm password does not match!")
    }
    
  };
  
  return (
    <ChangePwdScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.form_img5}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Create New Password</h3>
                <p>
                  Your new password mst be different from previous used
                  passwords.
                </p>
              </FormTitle>
              <form onSubmit={handleSubmit}>
                <FormElement>
                  <label htmlFor="Password" className="form-elem-label">
                    Password
                  </label>
                  <Input
                   type="password"
                   placeholder="Enter Password"
                   name="otp"
                   className="form-elem-control"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                  />
                </FormElement>
                <FormElement>
                  <label htmlFor="Password" className="form-elem-label">
                    Confirm New Password
                  </label>
                  <Input
                   type="password"
                   placeholder="Confirm Password"
                   name="otp"
                   className="form-elem-control"
                   value={confirmpassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormElement>
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Verify Code
                </BaseButtonBlack>
              </form>
                {/* Display message if OTP is incorrect */}
  {message && <p style={{ color: "red" }}className="error-message">{message}</p>}
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </ChangePwdScreenWrapper>
  );
};

export default ChangePasswordScreen;
