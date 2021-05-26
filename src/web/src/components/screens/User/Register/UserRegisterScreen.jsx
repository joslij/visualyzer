import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Icon, Message, Segment } from "semantic-ui-react";

import "./UserRegisterScreen.scss";

import AuthContext from "../../../contexts/AuthContext";
import { register } from "../../../../services";
import {
  validateRequiredFields,
  validateEmail,
} from "../../../../helpers/formValidation";

export const UserRegisterScreen = () => {
  const initialFormValue = {
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    errors: [],
    isSubmitting: false,
  };
  const [formData, setFormData] = useState(initialFormValue);

  const authContext = useContext(AuthContext);

  const firstNameInput = useRef(null);

  useEffect(() => {
    firstNameInput.current.focus();
  }, []);

  const validateForm = () => {
    const { firstName, lastName, displayName, password } = formData;
    const errors = [
      ...validateRequiredFields({
        firstName,
        lastName,
        displayName,
        password,
      }),
      ...validateEmail(formData.email),
    ];

    return errors;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setFormData({ ...formData, errors });
    } else {
      setFormData({ ...formData, isSubmitting: true });
      const { data, message, token } = await register(formData);
      if (data && token) {
        setFormData(initialFormValue);
        authContext.setData(data, token);
      } else {
        setFormData({
          ...formData,
          isSubmitting: false,
          errors: [message ?? "Failed to register user"],
        });
      }
    }
  };

  const registerForm = () => {
    return (
      <Segment
        basic
        loading={formData.isSubmitting}
        className="vis-app-register-screen"
      >
        <Message attached header="Register" />
        <form
          className="ui form attached fluid segment"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label>First Name</label>
            <div className="ui input">
              <input
                placeholder="First name"
                type="text"
                name="firstName"
                ref={firstNameInput}
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label>Last Name</label>
            <div className="ui input">
              <input
                placeholder="Last name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label>Display Name</label>
            <div className="ui input">
              <input
                placeholder="Display name"
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className="ui input">
              <input
                placeholder="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui input">
              <input
                placeholder="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" color="teal">
            Register
          </Button>
          <Message
            visible={formData.errors.length > 0}
            error
            header="Error"
            list={formData.errors}
          />
        </form>
        <Message attached="bottom" info>
          <Icon name="help circle" />
          <a href="/login">
            <b>Login here</b>
          </a>
          &nbsp;if you already have an account.
        </Message>
      </Segment>
    );
  };

  const loggedInMessage = () => {
    return <Segment>You are already in!</Segment>;
  };

  return (
    <>
      {authContext.user && loggedInMessage()}
      {!authContext.user && registerForm()}
    </>
  );
};
