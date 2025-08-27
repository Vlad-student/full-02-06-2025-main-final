import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registerValidateSchema } from '../../validation/user.validate';
import { registerUserThunk } from '../../store/authSlice';
import styles from './authForm.module.scss';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(registerUserThunk(values))
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={registerValidateSchema}
    >
      {() => {
        return (
          <Form  className={styles.form}>
            {error && error.includes('409') && <p>Email already exists</p>}
            <h2>Sign up</h2>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" />
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" />
            <button type="submit" className={styles['btn-submit']}>Register</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
