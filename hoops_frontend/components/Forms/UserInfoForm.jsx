import { Form } from "formik";
import React from "react";
import { TextInput } from "./Fields";

function UserInfoForm() {
  return (
    <Form id="register">
      <ul className="steps w-full mx-auto">
        <li className="step step-success">Register</li>
        <li className="step">Waiver</li>
        <li className="step">Confirm and Pay</li>
      </ul>
      <section className="user-info">
        <h2 className="text-2xl my-2">Details</h2>
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
      </section>
    </Form>
  );
}

export default UserInfoForm;
