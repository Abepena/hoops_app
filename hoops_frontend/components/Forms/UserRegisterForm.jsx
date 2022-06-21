import { Form, Formik } from "formik";
import { DatePicker, TextInput } from "./Fields";
import * as Yup from "yup";
import Drawer from "components/Navbars/Drawer";
import Router from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

function UserRegisterForm() {
  const notify = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
        username: values.email,
        email: values.email,
        name: values.name,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      .then((res) => {
        console.log("Well done!");
        console.log("User profile", res.data.user);
        console.log("User token", res.data.jwt);
        signIn("credentials", {
          redirect: false,
          username: values.email,
          password: values.password,
        });
      })
      .catch((err) => {
        notify(err.response.data.error.message);
      });
  };

  const schema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    dob: Yup.date().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password doesn't match"
        ),
      }),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <div className="grid place-items-center w-full h-full mt-2">
          <Form className="w-80 sm:w-96 shadow-xl bg-base-300 card p-4 ">
            <section className="user-register">
              <h2 className="text-2xl text-center my-2">Register</h2>
              <div className="grid grid-flow-col grid-cols-2 gap-6 mb-2">
                <TextInput
                  type="text"
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                />
                <TextInput
                  type="text"
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                />
              </div>
              <div className="grid gap-2 mb-4">
                <DatePicker label="Birthdate" name="dob" type="date" />
                <TextInput
                  label="Email"
                  name="email"
                  placeholder="john.doe@example.com"
                />
                <TextInput type="password" label="Password" name="password" />
                <TextInput
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                />
              </div>
              <button
                type="submit"
                className="mb-2 btn border-none bg-gradient-to-br text-gray-800 from-success to-accent btn-block"
              >
                Register
              </button>
              <small className="text-sm">
                Already have an account?{" "}
                <Link href="/login">
                  <a className="link-accent">Login.</a>
                </Link>
              </small>
            </section>
          </Form>
        </div>
      </Formik>
      <ToastContainer />
    </>
  );
}

export default UserRegisterForm;
