import ContactForm from "components/Forms/ContactForm";
import React from "react";

function ContactModal() {
 
  return (
    <div className="contact-modal">
      <input type="checkbox" id="contact-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <ContactForm/>
          <div className="modal-action">
            <label htmlFor="contact-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
