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
            className="input input-bordered"
          />
          <TextInput
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            className="input input-bordered"
          />
        </div>
        <div className="grid gap-2 mb-4">
          <TextInput
            type="email"
            label="Email"
            name="email"
            placeholder="john.doe@example.com"
            className="input input-bordered"
          />
          <TextInput
            type="phone"
            label="Phone Number"
            name="phone"
            placeholder="800-500-5555"
            className="input input-bordered"
          />
        </div>
      </section>
    </Form>
  );
}

export default UserInfoForm;
