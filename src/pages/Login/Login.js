import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import { setToken } from "../../redux/actions";
import auth from "../../auth";

import Header from "../../components/Header/Header";

import "./Login.css";


const Login=(props)=> {

   const [values,setValues] =useState({
      email: "",
      password: "",
      emailErrorMessage:'',
      passwordErrorMessage:''
    });
    let history=useHistory();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({...values, [name]: value, [name+'ErrorMessage']:'' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    let emailMessage='';
    let passwordMessage='';
    if(values.email===""){
      emailMessage="Input field is required.";
    isValid=false;
  }
    
    if(values.password==""){
      passwordMessage="Input field is required.";
    isValid=false;
  }else   if(values.password.length<6){
    passwordMessage="Password too short (minimum 6 characters).";
    isValid=false;
  }
  setValues({...values,emailErrorMessage:emailMessage, passwordErrorMessage:passwordMessage });   

    let statusOfLogin = true;

    if(isValid){
      await axios
        .post(
          "https://cors-anywhere.herokuapp.com/https://test.autoversand.com/api/token/",
          {
            username: values.email,
            password: values.password,
          }
        )
        .then((res) => {
          props.tokenReducer({ token: `jwt ${res.data.token}` });
          auth.login(`jwt ${res.data.token}`, () => {
            history.push("/dashboard");
          });
        })
        .catch((err) => {
          if (
            err.response.data.non_field_errors[0] ==
            "Unable to log in with provided credentials."
          ) {
            statusOfLogin = false;
          }
        });

      if (!statusOfLogin) {
       setValues({...values, password: "" });
      }
   };
    }

  useEffect(()=>{

      if(auth.isAuthenticated())
      history.push("/dashboard");
      else
      history.push("/login");
  },[]);
    return (
      <div
        className= "registration"
      >
        <Helmet>
          <title>Autoversand | Login</title>
        </Helmet>
        <div className="container">
            <Header/>
            <main className="loginRegisterContainer">
            <h2>Prijava</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <input
                      type="text"
                      value={values.email}
                      name="email"
                      onChange={e=>handleChange(e)}
                      placeholder="Email"
                      className="form-input"
                      spellCheck="false"
                    />
                    <label>{values.emailErrorMessage}</label>
                  </div>
                  <div className="row">
                    <input
                      type="password"
                      value={values.password}
                      name="password"
                      onChange={e=>handleChange(e)}
                      placeholder="Password"
                      className="form-input"
                      spellCheck="false"
                    />
                    <label>{values.passwordErrorMessage}</label>
                  </div>

                  <button type="submit" onClick={handleSubmit}>
                    Login
                  </button>
                </form>
            </main>

        </div>
      </div>
    );
  }

const mapStateToProps = (state) => ({
  tokenState: state.tokenReducer,
});

const mapDispatchToProps = (dispatch) => ({
  tokenReducer: (data) => dispatch(setToken(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
