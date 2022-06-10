import { Form } from "formik";
import React from "react";
import { WaiverCheckbox } from "./Fields";

function WaiverForm() {
  return (
    <Form id="waiver">
      <ul className="steps w-full mx-auto">
        <li className="step step-success">Register</li>
        <li className="step step-success">Waiver</li>
        <li className="step">Confirm and Pay</li>
      </ul>
      <section className="waiver-info w-full ">
        <h2 className="text-2xl mb-2">Waiver</h2>
        <p className="waiver-content bg-white p-4 text-neutral  rounded">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          odio! Rem similique debitis quam, sint possimus aliquid sit, ipsam
          ullam omnis nam itaque quibusdam, recusandae fuga veritatis facilis
          aperiam inventore ab nihil nobis? Dolorem corporis libero dignissimos
          quisquam itaque nemo adipisci excepturi vitae similique? Quis
          incidunt, necessitatibus, architecto atque reprehenderit ex aperiam
          voluptatem quas harum, perspiciatis consequuntur possimus iure! Sed
          aperiam quo veritatis veniam itaque dolores expedita delectus, natus
          harum exercitationem voluptates inventore obcaecati repellendus eos
          ratione suscipit ea blanditiis provident non est iure a, mollitia
          quam. Iure, mollitia nobis. Laborum nulla quisquam unde quia autem
          sit, incidunt dolore neque nihil ad mollitia inventore error!
          Cupiditate aliquid ex debitis vitae et, cum ullam mollitia totam
          veritatis, dolore recusandae corporis reiciendis quas, iste quia
          molestias accusamus fugit quaerat officiis ratione similique!
          Voluptatem distinctio, consectetur quisquam rem rerum quasi laborum
          quae dicta reprehenderit ipsam omnis veritatis sequi nulla ex expedita
          possimus aspernatur vitae maxime exercitationem, amet pariatur magni
          eum! Consequuntur voluptatibus similique praesentium deserunt placeat
          possimus a amet sapiente unde enim dicta dolorem cupiditate, libero
          eaque vitae quia? Aspernatur facere, doloribus obcaecati sapiente
          earum error nemo veniam quasi voluptates, aut ullam iste recusandae
          corrupti in!
        </p>
      </section>
      <WaiverCheckbox
        label="I have read and accepted the terms of the waiver."
        name="acceptedWaiver"
      />
    </Form>
  );
}

export default WaiverForm;
