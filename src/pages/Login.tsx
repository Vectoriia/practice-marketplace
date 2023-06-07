import React from 'react';
import '../App.css';
import '../index';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { StyledTextField } from '../components/StyledTextField';
import {StyledButton} from '../components/StyledButton';
import loginImage from "../images/pexels-karolina-grabowska-4466208 копія 1.png";
import { Formik, Form, useFormik  } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]+/, 'Password can only contain Latin letters.')
    .required('No password provided.'),
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

  console.log(formik.values, formik.errors);

  return (
    <div className="grid grid-cols-2 gap-4">
      <img className="" src={loginImage}  alt="background"/>
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">
          Enter information below for login
        </p>
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
          <StyledButton text='Login' type = "submit" handleClick={formik.handleSubmit}/>
          <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            New user? {' '}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                Sign up
            </Link>
          </p>
      </div>
    </div>
  );
}