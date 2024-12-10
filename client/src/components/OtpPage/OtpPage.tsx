import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // To get the userId from the URL
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` instead of `useHistory`



const OtpPage = () => {
    const navigate = useNavigate(); // useNavigate to handle navigation
    const { userId } = useParams(); // Extracting userId from the URL

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOTPValid, setIsOTPValid] = useState(true);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus on next input when the current one is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const otpCode = otp.join(""); // Join OTP array into a string
      console.log('Sending OTP for userId:', userId, 'OTP:', otpCode);  // Debugging line
      const response = await axios.post("http://localhost:3000/api/authentication/verify-otp", {
        userId,
        otp: otpCode,
      });
      alert(response.data.message); // Show success message
      setIsOTPValid(true); // Reset OTP validation state
      navigate('/login')  
      } catch (error) {
        console.error('Invalid OTP. Please try again.'); // Show error message
        setIsOTPValid(false); // Set OTP invalid state
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>
        <p className="text-center text-gray-500 mb-6">Please enter the 6-digit OTP sent to your phone.</p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

       
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verify OTP
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>Didn't receive an OTP? <a href="#" className="text-blue-500 hover:underline">Resend</a></p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
