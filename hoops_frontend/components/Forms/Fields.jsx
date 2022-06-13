import React, { useState } from "react";
import { useField } from "formik";

const getFieldColor = (meta) => {
  if (meta.touched && meta.error) {
    return "error";
  } else if (meta.touched) {
    return "success";
  } else {
    return "bordered";
  }
};

export const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id || props.name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        className={`input input-bordered border-${getFieldColor(meta)}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-error text-sm ml-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MessageTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id || props.name}>
        <span className="label-text">{label}</span>
      </label>
      <textarea
        rows="4"
        className={`textarea textarea-${getFieldColor(meta)} text-input`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-error text-sm ml-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const WaiverCheckbox = ({ label, children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="">
      <label className="cursor-pointer label">
        <div className="grid place-items-center w-full">
          <span className="label-text text-lg my-2">{label}</span>
          <input
            type="checkbox"
            className="checkbox checkbox-lg border-2 border-success checked:border-none"
            {...field}
            {...props}
          />
        </div>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-error text-sm ml-1 mt-1 text-center">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-error text-sm ml-1 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
