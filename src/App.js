import React, { Component } from "react";
import Recaptcha from 'react-recaptcha';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const addressRegex = RegExp(
  /^[a-zA-Z0-9\s,.'-]{3,}$/
);

const phoneRegex = RegExp(
  /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
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

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      phone: null,
      educationLevel: "",
      income: "",
      isChecked: false,
      isCaptcha: false,

      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
      }


    };

  }

  handleCheck = event => {
    console.log('called');
    this.setState({ isChecked: event.target.checked });
  }

  handleSelectEducation = event => {
    this.setState({ educationLevel: event.target.value });
  }
  handleSelectIncome = event => {
    this.setState({ income: event.target.value });
  }

  recaptchaLoaded() {
    console.log('captcha successfully loaded');
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isCaptcha: true
      })
    }
  }

  handleSubscribe() {
    if (this.state.isCaptcha) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }


  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state) || this.state.educationLevel || this.state.income) {
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
        this.setState({ educationLevel: e.target.value });
        break;
      case 'income':
        this.setState({ income: e.target.value });
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
                <select value={this.state.educationLevel} onChange={this.handleSelectEducation}>
                  <option value="Choose an option">Choose an option</option>
                  <option value="High School Graduate">High School Graduate</option>
                  <option value="College Graduate">College Graduate</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Ph.D">Ph.D</option>
                </select>
              </div>
            </div>


            <div className="income">
              <label htmlFor="income">Income (Yearly)</label>
              <div className="dropdown">
                <select value={this.state.income} onChange={this.handleSelectIncome}>
                  <option value="Choose an option">Choose an option</option>
                  <option value="Less than $50K">Less than $50K</option>
                  <option value="Between $50K - $100K">Between $50K - $100K</option>
                  <option value="Above $100K">Above $100K</option>
                </select>
              </div>

            </div>

            <label>
              <input type="checkbox" checked={this.state.isChecked} onChange={this.handleCheck}></input>
              <span> Agree to terms and conditions</span></label>


            <div>
              <div className="convert" onClick={this.handleSubscribe}>Subscribe</div>

              <Recaptcha
                sitekey="6LeBva8UAAAAALtTseBZoC2hnhfukB5EJF288nvm"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
            </div>


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
