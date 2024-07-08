import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderCheckbox from './gender';
import UseSignup from '../../hooks/useSignup.js';
const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmpassword: '',
    gender: ''
  });
  const {loading,signup} = UseSignup();
  const handleChange = (event) => {
	event.preventDefault();
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      gender,
    }));
  };
  const handleSubmit = async (event) => {
	event.preventDefault();
	await signup(inputs);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              name='fullname'
              placeholder='Enter Details'
              className='w-full input input-bordered h-10'
              value={inputs.fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter Details'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              name='confirmpassword'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <GenderCheckbox 
            selectedGender={inputs.gender}
            onCheckBoxChange={handleGenderChange}
          />

          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
				{
					loading? <span className='loading loading-spinner'></span>:"Sign Up"
				}
			</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
