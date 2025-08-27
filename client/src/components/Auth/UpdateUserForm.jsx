import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateValidateSchema } from '../../validation/user.validate';
import { updateUserThunk } from '../../store/authSlice';

const UpdateUserForm = (props) => {
  const { setIsUpdate } = props;
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    console.log(values);
    const data = {};
    if (values.name) {
      data.name = values.name;
    }
    if (values.email) {
      data.email = values.email;
    }
    if (values.password) {
      data.password = values.password;
    }
    dispatch(updateUserThunk({ id: user._id, values: data }));
    setIsUpdate(false);
  };
  return (
    <Formik
      initialValues={{
        name: user?.name || '',
        email: user?.email || '',
        password: '',
      }}
      validationSchema={updateValidateSchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            {error && error.includes('409') && <p>Email already exists</p>}
            <h2>Update personal data</h2>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" />
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" />
            <button type="submit">Update</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateUserForm;
