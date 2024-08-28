import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AuthService from "../../services/auth.service";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  backgroundColor: "transparent",
  boxShadow: "none",
  margin: 0,
}));

type Props = {};

type State = {
  successful: boolean;
  message: string;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      successful: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required("This field is required!"),
      lastName: Yup.string().required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .min(6, "The password must be between 6 and 40 characters.")
        .max(40, "The password must be between 6 and 40 characters.")
        .required("This field is required!"),
      gender: Yup.string().required("This field is required!"),
      phoneNumber: Yup.string().required("This field is required!"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("This field is required!"),
    });
  }

  handleRegister = (formValue: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phoneNumber: string;
  }) => {
    const { firstName, lastName, email, password, gender, phoneNumber } =
      formValue;

    this.setState({
      message: "",
      successful: false,
    });

    AuthService.register(
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber
    ).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  };

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      phoneNumber: "",
    };

    return (
      <div className="body-space">
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema()}
          onSubmit={this.handleRegister}
        >
          {({ handleChange, handleBlur, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <p className="title">Create Your Secure IP Account</p>
                <h2 className="subsubtitle" style={{ fontStyle: "oblique" }}>
                  Join the network to safeguard your intellectual property with
                  blockchain technology and AI insights.
                </h2>
                <div className="center-container">
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Item className="space-between-container">
                        <TextField
                          type="text"
                          name="firstName"
                          required
                          label="First Name"
                          className="textfield"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="alert alert-danger"
                        />
                        <TextField
                          type="text"
                          name="lastName"
                          required
                          label="Last Name"
                          className="textfield"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="alert alert-danger"
                        />
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Item className="space-between-container">
                        <TextField
                          required
                          label="Email"
                          className="textfield"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          name="email"
                          type="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="alert alert-danger"
                        />
                        <TextField
                          type="text"
                          name="phoneNumber"
                          required
                          label="Phone Number"
                          className="textfield"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="alert alert-danger"
                        />
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Item className="space-between-container">
                        <TextField
                          required
                          label="Password"
                          className="textfield"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          name="password"
                          type="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="alert alert-danger"
                        />
                        <TextField
                          required
                          label="Confirm Password"
                          className="textfield"
                          variant="outlined"
                          name="passwordConfirm"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="passwordConfirm"
                          component="div"
                          className="alert alert-danger"
                        />
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Item className="">Gender</Item>
                    </Grid>
                    <Grid item xs={8}>
                      <Item className="gender-container">
                        <RadioGroup
                          row
                          name="gender"
                          onChange={handleChange}
                          value={values.gender}
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            className="textField2"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            className="textField2"
                          />
                        </RadioGroup>
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Item className="space-between-container">
                        <p className="label subsubtitle">
                          Already have an account?
                        </p>
                        <a href="/login" className="link">
                          Login
                        </a>
                      </Item>
                    </Grid>
                  </Grid>
                  <div className="form-group submit-button">
                    {" "}
                    <button type="submit" className="btn btn-primary btn-block">
                      <span>Sign Up</span>
                    </button>
                  </div>
                </div>
              </div>

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
