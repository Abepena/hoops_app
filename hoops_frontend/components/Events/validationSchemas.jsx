import * as Yup from "yup";
import UserInfoForm from "components/Forms/UserInfoForm";
import WaiverForm from "components/Forms/WaiverForm";
import PaymentForm from "components/Forms/PaymentForm";

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const registrationSteps = [
  {
    component: UserInfoForm,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    }),
  },
  {
    component: WaiverForm,
    validationSchema: Yup.object({
      acceptedWaiver: Yup.boolean().oneOf(
        [true],
        "You must read and accept the waiver in order to participate"
      ),
    }),
  },
  {
    component: PaymentForm,
  },
];

export const contactValidation = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  subject: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  message: Yup.string()
    .max(1000, "Must be 1000 characters or less")
    .required("Required"),
});
