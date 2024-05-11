import React, { Component } from "react";
import "../home/index.css";

class PasswordValidator extends Component {
  state = {
    password: "",
    isValid: false,
    validationMessages: [],
  };

  handleChange = (event) => {
    const password = event.target.value;
    this.setState({ password }, () => {
      this.validatePassword(password);
    });
  };

  validatePassword = (password) => {
    const validationMessages = [];

    if (password.length < 8) {
      validationMessages.push("Password must be at least 8 characters long.");
    }

    if (!/[a-z]/.test(password)) {
      validationMessages.push("Password must contain at least one lowercase alphabet.");
    }

    
    if (!/[A-Z]/.test(password)) {
      validationMessages.push("Password must contain at least one uppercase alphabet.");
    }

    
    if (!/\d/.test(password)) {
      validationMessages.push("Password must contain at least one number.");
    }

  
    if (!/[_@$]/.test(password)) {
      validationMessages.push("Password must contain at least one of the following symbols: '_', '@', '$'.");
    }

  
    this.setState({ isValid: validationMessages.length === 0, validationMessages });
  };

  render() {
    const { password, isValid, validationMessages } = this.state;

    return (
      <div className="password-validator">
        <label htmlFor="password" className="sub-head-password">Enter Password :    <input
          type="password"
          id="password"
          value={password}
          onChange={this.handleChange}
          className="input"
        /></label>
       
        <ul className="validation-messages">
          {validationMessages.map((message, index) => (
            <li key={index}><p className="para">{message}</p></li>
          ))}
        </ul>
        {isValid && <p className="safe">Your Password is Safe</p>}
      </div>
    );
  }
}

export default PasswordValidator;
