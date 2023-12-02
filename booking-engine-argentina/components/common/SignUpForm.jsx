import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/hero/authSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const initialState = {
  email : "",
  name : "",
  phonenumber : "",
  password : "",
};
const SignUpForm = () => {
  debugger;
  const [registerData, setregisterData] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, name, phonenumber, password } = registerData;
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    debugger;
    console.log(error);
    error && toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    debugger;
    if (email && password && name && phonenumber) {
      try {
        await dispatch(registerUser({ registerData,router,toast }));
        
        } catch (error) {
          console.error('Login error:', error);
        }
    }
  };
  const onInputChange = (e) => {
    debugger;
    let { name, value } = e.target;
    setregisterData({ ...registerData, [name]: value });
  };

  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Already have an account yet?{" "}
          <Link href="/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" required id="name" name="name" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">First Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" required id="phonenumber" name="phonenumber" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Last Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" required id="email" name="email" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" required id="password" name="password" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" required />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            Email me exclusive Agoda promotions. I can opt out later as stated
            in the Privacy Policy.
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="button"
          onClick={()=>handleSubmit()}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default SignUpForm;
