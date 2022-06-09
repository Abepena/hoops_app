import React from "react";

function ContactModal() {
  return (
    <div className="contact-modal">
      <input type="checkbox" id="contact-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Interner user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
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
