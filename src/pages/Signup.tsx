import React from 'react';
import '../App.css';
import '../index';
import {Link} from 'react-router-dom';
import { StyledTextField } from '../components/StyledTextField';
import {StyledButton} from '../components/StyledButton';
import { ImageButton } from '../components/ImageButton';
import signupImage from "../images/pexels-karolina-grabowska-4466208 копія 2.png";
import cross from "../images/Vector.png";
import {useFormik  } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password can only contain Latin letters.')
    .required('No password provided.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], "Passwords don't match.")
    .required('No confirmation provided.'),
});
interface InitialValues{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
} 
export default function SignupPage() {
  const postDataFetch = (values:InitialValues)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        })
      };
      fetch('https://linkup-academy.herokuapp.com/api/v1/identity/signup', requestOptions)
      .then(res => res.json())
      .then(res => {console.log(res);})
      .catch(err => console.log(err));
  }
  const formik = useFormik<InitialValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: postDataFetch,
    validationSchema: SignupSchema,
    validateOnChange: true,
  });

  const navigate = useNavigate();

  return (
    <div className="max-w-max mx-auto overflow-hidden md:max-w-full flex py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-2/5">
        <img className="h-52 w-auto md:h-full" src={signupImage}  alt="background"/>
      </div>
      <div className="flex flex-col items-center md:w-3/5">
        <div className="flex flex-col h-full justify-center md:w-[495px]">
          <h2 className="mt-6 text-left text-3xl font-almarai text-gray-700 font-bold">
              Sign Up
          </h2>
          <p className="mt-[8px] text-left text-sm font-almarai text-gray-400 mt-5">
            Just a few quick steps to create your account
          </p>
          <div className='flex flex-row justify-between mt-[34px]'>
            <StyledTextField
              placeholder="First Name"
              className = "md:w-[240px]"
              onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
              value={formik.values.firstName}
              type ="default"
            />
            <StyledTextField
              placeholder="Last Name"
              className = "md:w-[240px]"
              onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
              value={formik.values.lastName}
              type ="default"
            />
          </div>
            {formik.errors.firstName && formik.touched.firstName ? (
            <div>{formik.errors.firstName}</div>
            ) : null}
            {formik.errors.lastName && formik.touched.lastName ? (
            <div>{formik.errors.lastName}</div>
            ) : null}
          <StyledTextField
            className = "mt-[15px]"
            placeholder="Email"
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            value={formik.values.email}
            type ="default"
          />
          {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
          ) : null}
          <StyledTextField
            className = "mt-[15px]"
            placeholder="Password"
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            value={formik.values.password}
            type ="password"
          />
          {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
          <StyledTextField
            className = "mt-[15px]"
            placeholder="Confirm password"
            onChange={(e) => formik.setFieldValue('passwordConfirm', e.target.value)}
            value={formik.values.passwordConfirm}
            type ="password"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}
          <StyledButton text='Next' type = "submit" handleClick={formik.handleSubmit} className='md:h-14' marginTop='34px'/>
        </div>
        <div className='flex flex-col'>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Back to {' '}
            <Link to="/signin" style={{color:'#3BBEB6'}} className="font-medium text-green-600 hover:text-green-500">
                Login
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