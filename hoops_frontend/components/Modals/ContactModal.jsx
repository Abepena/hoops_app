import ContactForm from "components/Forms/ContactForm";
import React from "react";

function ContactModal() {
  return (
    <div className="contact-modal">
      <input type="checkbox" id="contact-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="contact-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
