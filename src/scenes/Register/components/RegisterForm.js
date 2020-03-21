import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../../component/Form/Input/Input';
import Submit from '../../../component/Form/Input/Submit/Submit';
import t from 'prop-types';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
   passwordConfirm: Yup.string()    
   .oneOf([Yup.ref('password'), null], 'Passwords must match')
   .required('Required'),
});

function RegisterForm({ onSubmit }) {
    const formikProps = {
        initialValues: {
            email: '',
            fullName: '',
            password: '',
            passwordConfirm: '',
        },
        onSubmit,
    };
    return (
      <div>
        <Formik 
          {...formikProps}
          validationSchema={RegisterSchema}     
        >
          {({ errors }) =>(
            <Form>
              <Input name="email" label="Email" />
              <Input name="fullName" label="Full Name" />
              <Input name="password" label="Password" />
              <Input name="passwordConfirm" label="Password Confirm" />
              <Submit text="Register" errors={errors} /> 
            </Form>
          )}
        </Formik>
      </div>
    );
}
RegisterForm.propTypes = {
  onSubmit: t.func,
};

export default RegisterForm;