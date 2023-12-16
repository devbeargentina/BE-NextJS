import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/hero/authSlice';
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const initialState = {
  confirmPassword: "",
  password: "",
  userId : "",
  token : ""
};
const ResetPassword = () => {
  
  const [loginRQ, setloginRQ] = useState(initialState);
  const [validation, setValidation] = useState({
    confirmPassword: true,
    password: true,
  });
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { username, password } = loginRQ;
  const dispatch = useDispatch();
  const router = useRouter();

  const queryParams = useSearchParams();
  const userId = queryParams.get('userId');
  const token = queryParams.get('token');  
  if(userId && token){    
    setloginRQ({ ...loginRQ, [userId]: userId, [token]: token  });
  }
  const validationRules = {
    confirmPassword: true,
    password: true,
  };
  useEffect(() => {
    
    console.log(error);
    error && toast.error(error);
  }, [error]);

  const validateInput = () => {
    const newValidation = {
      password: !validationRules.password || !!password,
      confirmPassword: !validationRules.confirmPassword || !!confirmPassword,
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };
  const handleSubmit = async (e) => {
    if (validateInput() && userId && token) {
      try {
        await dispatch(resetPassword({ loginRQ,toast,router }));
        
        } catch (error) {
          console.error('Login error:', error);
        }
    }
  };
  const onInputChange = (e) => {
    
    let { name, value } = e.target;
    setloginRQ({ ...loginRQ, [name]: value });
  };

  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Reset Password</h1>
      </div>
      <div className="col-12">
        <div className={`form-input ${validationRules.password && !validation.password ? 'error' : ''}`}>
          <input type="password" id="password" name="password" required  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      
      <div className="col-12">
        <div className={`form-input ${validationRules.confirmPassword && !validation.confirmPassword ? 'error' : ''}`}>
          <input type="text" required id="confirmPassword" name="confirmPassword"  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          onClick={() => handleSubmit()}
        >
          Submit <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ResetPassword;
