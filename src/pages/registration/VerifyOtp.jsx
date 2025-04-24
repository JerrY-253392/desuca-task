import React, { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const onChange = (text) => {
    console.log("onChange:", text);
    setOtp(text);
  };

  const handleSubmit = () => {
    console.log("OTP submitted:", otp);
    setLoading(true);
    setError(null);

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/api/auth/user/verify-code`, {
        email,
        otp,
      })
      .then((response) => {
        console.log("otp", response.data);
        if (response.data.success) {
          toast.success(response.data.message || "OTP verified successfully!");
          navigate("/login", { state: { email } });
        } else {
          setError("Invalid OTP. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setError("Invalid OTP. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <p className="mb-4 text-gray-600">
        Please enter the OTP sent to your registered email or phone number.
      </p>
      <Input.OTP length={6} onChange={onChange} />
      <div className="mt-4 flex space-x-2">
        <button type="button" onClick={() => handleSubmit()} className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
          Verify
        </button>
        <button className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
