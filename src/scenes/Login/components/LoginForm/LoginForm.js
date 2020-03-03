import React from 'react';
import { Formik, Form } from 'formik';
import s from './LoginForm.module.scss';
import Input from '../../../../component/Form/Input/Input';
import Submit from '../../../../component/Form/Input/Submit/Submit';
 

 

function LoginForm({ onSubmit }) {
    const formikProps = {
        initialValues: {
            email: '',
            password: '',             
        },     
        onSubmit,
    };
 
    return (
      <div className="loginForm">
        <Formik {...formikProps}>        
          <Form className={s.form}>
            <Input name="email" label="Email" />             
            <Input name="password" label="Password" />             
            <Submit text="Login" /> 
            {/* <button type="submit">Send</button> */}
          </Form>
        </Formik>
      </div>
    );
}

export default LoginForm;