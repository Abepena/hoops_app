import { contactValidation } from "components/Events/validationSchemas";
import UserInfoForm from "components/Forms/UserInfoForm";
import { Form, Formik } from "formik";
import { MessageTextArea, TextInput } from "./Fields";

function ContactForm() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const handleSubmit = (values) => {
    setTimeout(() => {
      alert(JSON.stringify({ ...values }, null, 2));
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactValidation}
    >
      <Form>
        <section className="user-info">
          <h2 className="text-2xl my-2">How can we help?</h2>
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
            <TextInput
              type="email"
              label="Email"
              name="email"
              placeholder="john.doe@example.com"
              
            />
            <TextInput
              type="phone"
              label="Phone Number"
              name="phone"
              placeholder="800-500-5555"
              
            />
          </div>
          <MessageTextArea
            label="Message"
            name="message"
            placeholder="Let us know any questions you may have here"
            
          />
        </section>
      </Form>
    </Formik>
  );
}

export default ContactForm;
