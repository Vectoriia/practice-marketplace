import React from 'react';
import '../App.css';
import '../index';
import {Link} from 'react-router-dom';
import { StyledTextField } from '../components/StyledTextField';
import {StyledButton} from '../components/StyledButton';
import { ImageButton } from '../components/ImageButton';
import loginImage from "../images/pexels-karolina-grabowska-4466208 копія 1.png";
import cross from "../images/Vector.png";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('No password provided.'),
});
interface InitialValues{
  email: string;
  password: string;
} 
export default function LoginPage() {
    const postDataFetch = (values:InitialValues)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
          email: values.email,
          password: values.password
        })
      };
      fetch('https://linkup-academy.herokuapp.com/api/v1/identity/signin', requestOptions)
      .then(res => res.json())
      .then(res => {console.log(res);})
      .catch(err => console.log(err));
  }
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: postDataFetch,
    validationSchema: LoginSchema,
    validateOnChange: true,
  });
  
  const navigate = useNavigate();

  return (
    <div className="max-w-max mx-auto overflow-hidden md:max-w-full flex py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-3/5">
        <img className="h-52 w-52 md:w-full md:h-full" src={loginImage}  alt="background"/>
      </div>
      <div className="flex flex-col items-center md:w-2/5">
        <div className="flex flex-col h-full justify-center md:w-[373px]">
          <h2 className="mt-6 text-left text-3xl font-almarai text-gray-700 font-bold">
            Welcome!
          </h2>
          <p className="mt-[8px] text-left text-sm font-almarai text-gray-400 mt-5">
            Enter information below for login
          </p>
          <StyledTextField
            className = "mt-[34px]"
            placeholder="Email"
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            value={formik.values.email}
            type ="default"
          />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
          <StyledTextField
            className = "mt-[15px]"
            placeholder="Password"
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            value={formik.values.password}
            type ="password"
          />
          {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
          <StyledButton text='Login' type = "submit" handleClick={formik.handleSubmit} className='md:h-14' marginTop='34px'/>
        </div>
        <div className='flex flex-col'>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            New user? {' '}
            <Link to="/signup" style={{color:'#3BBEB6'}} className="font-medium text-green-600 hover:text-green-500">
                Sign up
            </Link>
          </p>
        </div>
      </div>
      <ImageButton handleClick={()=>{
        console.log('window closed');
        navigate('/home-page');
      }} alt='cross' src={cross} className='absolute top-[40px] right-[40px] h-[12px] w-[12px]'/>
    </div>
  );
}