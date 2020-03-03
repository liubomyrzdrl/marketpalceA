import React from 'react';
import Input from '../../../component/Form/Input/Input';
import {Formik} from 'formik';
import Submit from '../../../component/Form/Input/Submit/Submit';

 

function RegisterForm({ onSubmit }) {
    const formikProps = {
        initialValues: {
            email: '',
            fullName: '',
            password: '',
            passwordAgain: '',
        },
        onSubmit,
    };
    return (
      <div>
        <Formik {...formikProps}>
          <form>
            <Input name="email" label="Email" />
            <Input name="fullName" label="Full Name" />
            <Input name="password" label="Password" />
            <Input name="passwordAgain" label="Password Again" />
            <Submit text="Register" /> 
          </form>
        </Formik>
      </div>
    );
}

export default RegisterForm;