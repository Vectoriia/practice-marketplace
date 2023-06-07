import React from 'react';
import '../App.css';
import '../index';
import {Link} from 'react-router-dom';
import { StyledTextField } from '../components/StyledTextField';
import {StyledButton} from '../components/StyledButton';
import loginImage from "../images/pexels-karolina-grabowska-4466208 копія 1.png";
import { Formik, Form, useFormik  } from 'formik';
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

  return (
    <div className="grid grid-cols-2 gap-4">
      <img className="" src={loginImage}  alt="background"/>
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">
          Just a few quick steps to create your account
        </p>
          <StyledTextField
            placeholder="First Name"
            onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
            value={formik.values.firstName}
            type ="default"
          />
          {formik.errors.firstName && formik.touched.firstName ? (
          <div>{formik.errors.firstName}</div>
          ) : null}
          <StyledTextField
            placeholder="Last Name"
            onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
            value={formik.values.lastName}
            type ="default"
          />
          {formik.errors.lastName && formik.touched.lastName ? (
          <div>{formik.errors.lastName}</div>
          ) : null}
          <StyledTextField
            placeholder="Email"
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            value={formik.values.email}
            type ="default"
          />
          {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
          ) : null}
          <StyledTextField
            placeholder="Password"
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            value={formik.values.password}
            type ="password"
          />
          {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
          <StyledTextField
            placeholder="Confirm password"
            onChange={(e) => formik.setFieldValue('passwordConfirm', e.target.value)}
            value={formik.values.passwordConfirm}
            type ="password"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}
          <StyledButton text='Next' type = "submit" handleClick={formik.handleSubmit}/>
          <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            Back to {' '}
            <Link to="/" className="font-medium text-green-600 hover:text-green-500">
                Login
            </Link>
          </p>
      </div>
    </div>
  );
}