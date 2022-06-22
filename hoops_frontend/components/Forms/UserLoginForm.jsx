import { Form, Formik } from "formik";
import { TextInput } from "./Fields";
import * as Yup from "yup";
import axios from "axios";
import { getCsrfToken, signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

function UserLoginForm() {
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

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res?.error) {
      notify(res.error);
    }
    if (res.url) router.push(res.url);
    setSubmitting(false);
    setTimeout(alert(JSON.stringify(values, null, 2)), 1000);
  };

  const schema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <div className="grid place-items-center w-full h-full mt-2">
            <div className="w-80 sm:w-96 shadow-xl bg-base-300 card p-4 ">
              <Form>
                <section className="login-form">
                  <h2 className="text-2xl text-center my-2">Login</h2>
                  <div className="grid gap-2 mb-4">
                    <TextInput
                      label="Email"
                      name="email"
                      placeholder="john.doe@example.com"
                    />
                    <TextInput
                      type="password"
                      label="Password"
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mb-2 btn border-none bg-gradient-to-br text-gray-800 from-success to-accent btn-block"
                  >
                    {isSubmitting ? (
                      <i className="fas text-3xl fa-circle-notch fa-spin"></i>
                    ) : (
                      "Login"
                    )}
                  </button>
                </section>
              </Form>
              <section className="oauth-providers">
                <div className="divider">OR SIGN IN WITH</div>
                <div className="flex justify-center gap-2">
                  <button
                    disabled={isSubmitting}
                    onClick={() => signIn("google")}
                    className="btn btn-ghost flex gap-2"
                  >
                    <i className="fab fa-google text-lg"></i>
                    Google
                  </button>
                  <button
                    disabled={isSubmitting}
                    className="btn btn-ghost flex gap-2"
                  >
                    <i className="fab fa-facebook text-lg"></i>
                    Facebook
                  </button>
                </div>
                <small className="text-sm flex gap-2 justify-center">
                  Dont have an account?{" "}
                  <Link href="/register">
                    <a className="link-accent">Register.</a>
                  </Link>
                </small>
              </section>
            </div>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

export default UserLoginForm;

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
