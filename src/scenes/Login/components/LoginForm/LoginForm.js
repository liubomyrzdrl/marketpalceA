import React, { useRef, useEffect,useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import t from 'prop-types';
import Input from '../../../../component/Form/Input/Input';
import Submit from '../../../../component/Form/Input/Submit/Submit';
import s from './LoginForm.module.scss';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
});

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
        
        <Formik 
          {...formikProps} 
          validationSchema={LoginSchema}        
        >  
          
          { ({ errors }) => (
            <Form className={s.form}>
 
              <Input name="email" label="Email"    /> 
              <Input name="password" label="Password" />               
             
              <Submit text="Login" errors={errors} /> 
              {/* <button type="submit">Send</button> */}
         
            </Form>
         )}    
        </Formik>
      </div>
    );
}

LoginForm.propTypes = {
  onSubmit: t.func,
};

export default LoginForm;