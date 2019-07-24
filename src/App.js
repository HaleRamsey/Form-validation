import React, { Component } from "react";
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const addressRegex = RegExp(
  /^[a-zA-Z0-9\s,.'-]{3,}$/
);

const phoneRegex = RegExp(
  /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;


  //validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });


  //validate that the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
};




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      phone: null,
      educationLevel: null,
      income: null,
      checkbox: false,
      title: "choose one",

      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        educationLevel: "",
        income: "",
      }
      
      
    };
  }

  handleCheck = event => {
    this.setState({ checkbox: event.target.checked });
  }

  handleSelect = event => {
    this.setState({ title: event.target.value });
  }


  handleSubmit = e => {
    e.preventDefault();

    //if (true) {
    if (formValid(this.state)) {
      console.log(`
      --SUBMITTING--
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Address: ${this.state.address}
      Phone: ${this.state.phone}
      Education Level: ${this.state.educationLevel}
      Income: ${this.state.income}
     
    `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3
            ? 'minimum 3 characters required'
            : "";
        break;
      case 'lastName':
        formErrors.lastName =
          value.length < 3
            ? 'minimum 3 characters required'
            : "";
        break;
      case 'email':
        formErrors.email =
          emailRegex.test(value)
            ? ''
            : "invalid email address";
        break;
      case 'address':
        formErrors.address =
          addressRegex.test(value)
            ? ''
            : "invalid address entry";
        break;
      case 'phone':
        formErrors.phone =
          phoneRegex.test(value)
            ? ''
            : "Enter as follows xxx-xxx-xxxx";
        break;
      case 'educationLevel':
        
        break;
        case 'income':
          
          break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }



  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}

            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder="Address"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>

            <div className="phone">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className={formErrors.phone.length > 0 ? "error" : null}
                placeholder="Phone"
                name="phone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
              )}
            </div>

            <div className="educationLevel">
              <label htmlFor="educationLevel">Education Level</label>
              <div className="dropdown">
                <select id="dropdown" required="">
                  <option value="">Choose an option</option>
                  <option value="1">High School Graduate</option>
                  <option value="2">College Graduate</option>
                  <option value="3">Master's Degree</option>
                  <option value="4">PHD</option>
                </select>
              </div>
            </div>



            <div className="income">
              <label htmlFor="income">Income (Yearly)</label>
              <div className="dropdown">
                <select value={this.state.title} onChange={this.handleSelect} required="">
                  <option value="">Choose an option</option>
                  <option value="1">Less than $50K</option>
                  <option value="2">Between $50K - $100K</option>
                  <option value="3">Above $100K</option>
                </select>
              </div>

            </div>

            <li>
              <input
                type="checkbox"
                checked={this.state.checkbox}
                onChange={this.handleCheck}
              />
            </li>

            <div className="submitForm">
              <button onClick={this.handleSubmit}>Sumbit Form</button>
            </div>

            <div className="cancel">
              <a href="http://localhost:3000/#">Cancel</a>
            </div>


          </form>
        </div >
      </div >
    );
  }
}

export default App;
