import React, { useState } from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form, FormFeedback, Button } from "reactstrap";
import { useFormik } from "formik";
import formBg from './assets/images/formBg.png';
import "./assets/styleguide";
import Header from "./pages/layout/Header";
import * as Yup from "yup";

function Details(props) {

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validation = useFormik({
    
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
  
    initialValues: {
      email: email || "",
      name: name || "",
      username: username || ""
    },

    validationSchema: Yup.object({
        email: Yup.string().required(
          "Please Enter Email"
        ).matches(phoneRegExp, 'Email is not valid'),
        name: Yup.string().required(
          "Please Enter Name"
        ).matches(phoneRegExp, 'Name is not valid'),
        username: Yup.string().required(
          "Please Enter UserName"
        ).matches(phoneRegExp, 'Username is not valid'),
    }),
    
    onSubmit: (values) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, username: values.username})
    };

    fetch('https://xwpo-c4qw-zxn1.m2.xano.io/api:FJSLfV81/auth/request-otp', requestOptions)
      .then(response => response.json())
        .then(response => {
          if(response.authToken.token != "") {
            localStorage.setItem('authtoken', response.authToken.token)
            history.push('/validate-otp');
          } else {
            console.log('Something went wrong');
          } 
        })
        },
    });
  
  return (
    <div className="container-center-horizontal">
      <form className="w1-a3-enter-otp screen" name="form1" action="form1" method="post">
      
      <Header/>

      <div className="OverlapGroup4 detailsForm" style={{ backgroundImage: `url(${formBg})` }}>
          <div className="OverlapGroup6">
            <div className="InputBox">

              <div className="HeaderText1">
                <h1 className="Title1">Personal Details</h1>
                <div className="FillText"><>enter your details to <br />proceed furthur.</></div>
              </div>

              <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit();  return false; }}>

                  <div className="Group">
                      <input className="inputfield" name="email"  placeholder="Email"  type="email"  autoComplete="off" 
                      onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.email || ""}
                          invalid={ validation.touched.email && validation.errors.email ? true : false } />
                  </div>

                  <div className="Group">
                      <input className="inputfield" name="name"  placeholder="Name"  type="text"  autoComplete="off" 
                      onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.name || ""}
                      invalid={ validation.touched.name && validation.errors.name ? true : false } />
                  </div>

                  <div className="Group">
                      <input className="inputfield" name="username"  placeholder="User Name"  type="text"  autoComplete="off" 
                      onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.username || ""}
                      invalid={ validation.touched.username && validation.errors.username ? true : false } />
                  </div>

                  <div className="btn-wrap text-center">
                      <Button color="primary" type="submit" className="submit-button otpButton" size="lg">Continue</Button>
                  </div>

                </Form>

            </div>
          </div>
      </div>
      
    
      </form>
    </div>
  );
}


export default Details;
