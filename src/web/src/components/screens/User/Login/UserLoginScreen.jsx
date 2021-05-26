import React, { useState, useContext, useRef, useEffect } from "react";
import { Button, Icon, Message, Segment } from "semantic-ui-react";

import "./UserLoginScreen.scss";

import AuthContext from "../../../contexts/AuthContext";
import { login } from "../../../../services";
import {
  validateRequiredFields,
  validateEmail,
} from "../../../../helpers/formValidation";

export const UserLoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: [],
    isSubmitting: false,
  });

  const authContext = useContext(AuthContext);

  const emailInput = useRef();

  useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, []);

  const validateForm = () => {
    const errors = [
      ...validateEmail(formData.email),
      ...validateRequiredFields({
        password: formData.password,
      }),
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

    if (errors?.length === 0) {
      setFormData({ ...formData, isSubmitting: true });

      const { data, message, token } = await login(
        formData.email,
        formData.password
      );

      if (data && token) {
        setFormData({ ...formData, isSubmitting: false });
        authContext.setData(data, token);
      } else {
        setFormData({
          ...formData,
          errors: [message ?? "Failed to login"],
          isSubmitting: false,
        });
      }
    } else {
      setFormData({ ...formData, errors });
    }
  };

  return (
    <Segment
      basic
      loading={formData.isSubmitting}
      className="vis-app-login-screen"
    >
      <Message attached header="Login" />
      <form className="form ui attached fluid segment" onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <div className="ui input">
            <input
              placeholder="email"
              type="text"
              name="email"
              ref={emailInput}
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
        <Button type="submit" color="violet">
          Login
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
        <a href="/register">
          <b>Register here</b>
        </a>
        &nbsp;if you don't have an account.
      </Message>
    </Segment>
  );
};
