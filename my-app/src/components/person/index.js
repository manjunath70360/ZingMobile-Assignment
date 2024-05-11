import React, { Component } from "react";
import "../home/index.css";

class Person {
  constructor(name, age, mobile) {
    this.name = name;
    this.age = age;
    this.mobile = mobile;
  }
}

class PersonForm extends Component {
  state = {
    name: "",
    age: "",
    mobile: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, age, mobile } = this.state;
    const person = new Person(name, age, mobile);
    this.props.onPersonSubmit(person);
  };

  render() {
    const { name, age, mobile } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2 className="head">Person Details</h2>
        <label className="sub-head">
          Name:
          <input className="input" type="text" name="name" value={name} onChange={this.handleChange} />
        </label>
        <label className="sub-head">
          Age:
          <input className="input" type="number" name="age" value={age} onChange={this.handleChange} />
        </label>
        <label className="sub-head">
          Mobile:
          <input className="input" type="text" name="mobile" value={mobile} onChange={this.handleChange} />
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    );
  }
}

class PersonDetails extends Component {
  render() {
    const { person } = this.props;

    return (
      <div>
        <h2 className="head">Person Details</h2>
        <p className="sub-head">Name: {person.name}</p>
        <p className="sub-head">Age: {person.age}</p>
        <p className="sub-head">Mobile: {person.mobile}</p>
      </div>
    );
  }
}

class Apps extends Component {
  state = {
    person: null,
  };

  handlePersonSubmit = (person) => {
    this.setState({ person });
  };

  render() {
    const { person } = this.state;

    return (
      <div className="person-con">

          <PersonForm onPersonSubmit={this.handlePersonSubmit} />
   
        
          {person && <PersonDetails person={person} />}
  
      </div>
    );
  }
}

export default Apps;
