import React, { Component } from "react";

import Apps from "../person";
import PasswordValidator from "../password";
import "./index.css";



class Home extends Component {
  state = {
    decimal: "",
    hexa: "",
    phoneNum: "",
    maskedNum: "",
    errorMessage: ""
  };

  onChangeDecimal = (event) => {
    const decimal = event.target.value;
    this.setState({ decimal }, () => this.convertDecimalToHexa(decimal));
  };

  onChangeHexa = (event) => {
    const hexa = event.target.value.toUpperCase();
    if (/^[0-9A-F]*$/.test(hexa) || hexa === "") {
      this.setState({ hexa, errorMessage: "" }, () => this.convertHexaToDecimal(hexa));
    } else {
      this.setState({ errorMessage: "Invalid input" });
    }
  };

  onChangeNumber = (event) => {
    const phoneNum = event.target.value;
    if (/^\d*$/.test(phoneNum) || phoneNum === "") { 
      this.setState({ phoneNum: phoneNum.slice(0, 10) }, () => this.maskPhoneNumber(this.state.phoneNum));
      this.setState({ errorMessage: "" }); 
    } else {
      this.setState({ errorMessage: "Invalid input" }); 
    }
};

  onFocusInput = () => {
    this.setState({ errorMessage: "" });
  };

  convertDecimalToHexa = (decimal) => {
    if (!/^\d+$/.test(decimal) && decimal !== "") {
      this.setState({ errorMessage: "Invalid input" });
      return;
    }

    decimal = parseInt(decimal, 10);
    let hexa = "";

    while (decimal > 0) {
      const remainder = decimal % 16;
      if (remainder < 10) {
        hexa = remainder + hexa;
      } else {
        hexa = String.fromCharCode(remainder + 55) + hexa;
      }
      decimal = Math.floor(decimal / 16);
    }

    this.setState({ hexa });
  };

  convertHexaToDecimal = (hexa) => {
    if (!/^[0-9A-F]+$/.test(hexa) && hexa !== "") {
      this.setState({ errorMessage: "Invalid input" });
      return;
    }

    let decimal = 0;
    const len = hexa.length;

    for (let i = 0; i < len; i++) {
      const digit = parseInt(hexa[i], 16);
      decimal += digit * Math.pow(16, len - 1 - i);
    }

    this.setState({ decimal });
  };

  maskPhoneNumber = (phoneNum) => {
    if (typeof phoneNum === "string" && phoneNum.length >= 1) {
      const maskedNum = phoneNum.slice(0, -3).replace(/./g, "#") + phoneNum.slice(-3);
      this.setState({ maskedNum });
    } else {
      this.setState({ errorMessage: "",maskedNum:"" });
    }
  };

  render() {
    const { decimal, hexa, maskedNum, phoneNum, errorMessage } = this.state;

    return (
      <div className="app-container">
        <h1 className="head">Decimal to Hexa and Vice-Versa</h1>
       <div className="conversion-con">
        <div className="con">
        <p className="sub-head">Decimal</p>
        <input className="input" type="text" onChange={this.onChangeDecimal} onBlur={this.onBlurDecimal} onFocus={this.onFocusInput} value={decimal} />
        </div>
        <div className="con">
        <p className="sub-head">Hexa</p>
        <input className="input" onChange={this.onChangeHexa} onBlur={this.onBlurHexa} onFocus={this.onFocusInput} type="text" value={hexa} />
        </div>
       </div>
        <h1 className="heads">Maskify Number</h1>
       <div className="conversion-con">
        <div className="con">
        <p className="sub-head">Phone Number</p>
        <input className="input" type="text" onChange={this.onChangeNumber} onBlur={this.onBlurNumber} onFocus={this.onFocusInput} value={phoneNum} />
        </div>
        <div className="con">
        <p className="sub-head">Masked Number</p>
        <h2 className="sub-head">{maskedNum}</h2>
        <p className="error">{errorMessage}</p>
        </div>
       </div>
      


      <Apps />
      <PasswordValidator />

      </div>
    );
  }
}

export default Home;
