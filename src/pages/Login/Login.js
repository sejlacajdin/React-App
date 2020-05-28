import React, { useState } from "react";
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
    });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let statusOfLogin = true;
      await axios
        .post(
          "https://cors-anywhere.herokuapp.com/https://test.autoversand.com/api/token/",
          {
            username: values.email,
            password: values.password,
          }
        )
        .then((res) => {
          //setState({ jwtToken: `jwt ${res.data.token}` });
          props.tokenReducer({ token: `jwt ${res.data.token}` });
          auth.login(`jwt ${res.data.token}`, () => {
            props.history.push("/dashboard");
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
