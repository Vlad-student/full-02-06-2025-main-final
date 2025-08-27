import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../store/authSlice';
import { loginValidateSchema } from '../../validation/user.validate';
import styles from './authForm.module.scss';

const LoginForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(loginUserThunk(values))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={loginValidateSchema}
    >
      {() => (
        <Form className={styles.form}>
          {error && error.includes('401') && <p>Invalid data</p>}
          <h2>Sign in:</h2>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />
          <button type="submit" className={styles['btn-submit']}>Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
