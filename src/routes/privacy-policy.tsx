import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy - PhysioApp" },
      {
        name: "description",
        content:
          "How PhysioApp collects, stores, shares and protects clinic, patient and WhatsApp/Meta data.",
      },
    ],
  }),
});

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="August 19, 2026"
      intro={
        <p>
          This Privacy Policy explains how <strong>PhysioApp</strong> ("PhysioApp", "we", "us",
          "our") collects, uses, stores, shares and protects information when a clinic and its staff
          use the PhysioApp platform to manage patients, appointments, billing, home exercise plans
          and WhatsApp communication. It applies to clinic/admin users, the staff they invite, and
          the patients whose records those clinics manage inside PhysioApp.
        </p>
      }
    >
      <section id="clinic-admin-information">
        <h2>1. Clinic / Admin Account Information</h2>
        <p>
          When a clinic signs up for PhysioApp, we collect information needed to create and run the
          account, including: clinic/business name and branch details, admin and staff names, email
          addresses, phone numbers, role/permission level, login credentials, and — for the Chain
          plan — SSO identity provider details. We use this information to provision the account,
          authenticate users, enforce role-based access within a clinic, and communicate service
          updates, billing notices and support responses.
        </p>
      </section>

      <section id="patient-information">
        <h2>2. Patient Information</h2>
        <p>
          PhysioApp is a clinical record system operated <strong>by and for the clinic</strong>.
          Patient data is entered and controlled by the clinic, and may include: patient name,
          contact details, demographic and intake form data, appointment and visit history, SVG
          body-map pain assessments and range-of-motion scores, home exercise plan (HEP) assignments
          and completion/adherence data, referral source and referring-doctor reports, and
          billing/invoice records tied to that patient. PhysioApp processes this data as a service
          provider on behalf of the clinic, which remains the data controller for its own patients'
          records.
        </p>
      </section>

      <section id="appointment-information">
        <h2>3. Appointment Information</h2>
        <p>
          We store appointment scheduling data — date, time, therapist/branch assigned, session
          type, status (booked, completed, cancelled, no-show) and any notes the clinic attaches —
          to power the calendar, reminders, and recovery/adherence reporting features described on
          our <a href="/#product">product</a> pages.
        </p>
      </section>

      <section id="whatsapp-numbers-messages">
        <h2>4. WhatsApp Phone Numbers / Messages</h2>
        <p>
          Where a clinic enables WhatsApp reminders, PhysioApp stores the patient's WhatsApp phone
          number and the content and delivery status of messages sent through the platform —
          appointment confirmations and reminders, home-exercise nudges, payment links and receipts,
          and any reply a patient sends back into that thread. This data is used solely to deliver
          the clinic's communications and to show the clinic delivery/read status; it is not used to
          build advertising profiles.
        </p>
      </section>

      <section id="meta-whatsapp-data">
        <h2>5. Meta / WhatsApp Data</h2>
        <p>
          PhysioApp sends and receives WhatsApp messages through the Meta-operated WhatsApp Business
          Platform (WhatsApp Business API). As part of that integration, message content,
          delivery/read receipts, and the recipient's WhatsApp phone number pass through Meta's
          infrastructure and are subject to Meta's own data-handling terms in addition to this
          policy. We only request the permissions and message templates required to deliver
          clinic-initiated, patient-relevant communications, and we do not use Meta/WhatsApp data
          for advertising or share it with third-party ad networks.
        </p>
      </section>

      <section id="how-data-is-stored">
        <h2>6. How Data Is Stored</h2>
        <p>
          Data is stored in access-controlled cloud infrastructure, encrypted at rest and in transit
          (TLS). Each clinic's data is logically separated from other clinics, and access within a
          clinic is governed by the roles assigned to its admins and staff. Backups are retained to
          protect against data loss and are subject to the same security controls as production
          data.
        </p>
      </section>

      <section id="how-data-is-shared">
        <h2>7. How Data Is Shared</h2>
        <p>We share data only where necessary to operate the service:</p>
        <ul>
          <li>With Meta/WhatsApp, to deliver WhatsApp messages as described in Section 5.</li>
          <li>
            With payment processors and UPI providers, to process billing, invoicing and payment
            collection.
          </li>
          <li>
            With infrastructure and hosting sub-processors, to run and secure the application.
          </li>
          <li>
            With a referring doctor, only when a clinic user explicitly chooses to send a
            recovery/referral report to that recipient.
          </li>
          <li>
            When required by law, legal process, or to protect the rights, safety or property of
            PhysioApp, our clinics, or their patients.
          </li>
        </ul>
        <p>We do not sell clinic or patient data.</p>
      </section>

      <section id="data-retention">
        <h2>8. Data Retention</h2>
        <p>
          We retain clinic and patient data for as long as the clinic's account is active, so that
          treatment history, billing records and recovery trends remain available for continuity of
          care. After an account is closed, data is retained for a limited period to allow export or
          reactivation, and thereafter deleted or anonymized, except where longer retention is
          required for legal, tax, or audit purposes. See our{" "}
          <a href="/data-deletion">Data Deletion</a> page for how a clinic or patient can request
          earlier deletion.
        </p>
      </section>

      <section id="security">
        <h2>9. Security</h2>
        <p>
          We apply industry-standard safeguards, including encryption in transit and at rest,
          role-based access control, audit logging of record access and changes, and staff access
          limited on a need-to-know basis. No system is completely secure, and we encourage clinics
          to use strong, unique passwords and enable any available account-level protections.
        </p>
      </section>

      <section id="user-rights">
        <h2>10. User Rights</h2>
        <p>
          Depending on applicable law (including India's Digital Personal Data Protection Act, 2023,
          and other regional data protection frameworks), clinic admins and, through their clinic,
          patients may have the right to access, correct, export, or request deletion of their
          personal data, and to withdraw consent to WhatsApp communications at any time by replying
          "STOP" or asking their clinic to disable reminders. Clinics, as controllers of their
          patient data, are responsible for responding to their patients' rights requests; PhysioApp
          supports those requests through the account tools described in our{" "}
          <a href="/data-deletion">Data Deletion</a> page and via direct support.
        </p>
      </section>

      <section id="contact-information">
        <h2>11. Contact Information</h2>
        <p>
          Questions about this Privacy Policy or how your data is handled can be sent to{" "}
          <a href="mailto:privacy@physioapp.io">privacy@physioapp.io</a>. If you are a patient,
          please also contact your clinic directly, since they control the records held about you in
          PhysioApp.
        </p>
      </section>
    </LegalPage>
  );
}
