import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/data-deletion")({
  component: DataDeletion,
  head: () => ({
    meta: [
      { title: "Data Deletion Instructions - PhysioApp" },
      {
        name: "description",
        content:
          "How patients and clinics can request deletion of their data from PhysioApp, including data received via WhatsApp/Meta.",
      },
    ],
  }),
});

function DataDeletion() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      lastUpdated="August 19, 2026"
      intro={
        <p>
          This page explains how a patient, or a clinic on a patient's behalf, can request that
          personal data held in PhysioApp — including data collected through the WhatsApp/Meta
          integration described in our <a href="/privacy-policy">Privacy Policy</a> — be deleted.
        </p>
      }
    >
      <section id="who-can-request">
        <h2>1. Who Can Request Deletion</h2>
        <p>
          Because PhysioApp records belong to the clinic that created them, deletion requests are
          normally made through your clinic — they are best placed to verify your identity and
          locate your record. If your clinic is unresponsive, or you'd prefer to contact us
          directly, you can submit a request to PhysioApp using the methods below and we will
          coordinate with your clinic to complete it.
        </p>
      </section>

      <section id="how-to-request">
        <h2>2. How to Request Deletion</h2>
        <p>You can request deletion of your patient data in any of the following ways:</p>
        <ul>
          <li>
            <strong>Ask your clinic</strong> — the clinic's admin can permanently delete your
            patient record, including assessments, appointment history, home exercise plans, and
            billing records, from their PhysioApp dashboard.
          </li>
          <li>
            <strong>Reply on WhatsApp</strong> — reply <strong>"DELETE MY DATA"</strong> to any
            message from your clinic's PhysioApp WhatsApp number to stop future messages and trigger
            a deletion request to that clinic.
          </li>
          <li>
            <strong>Email us directly</strong> at{" "}
            <a href="mailto:privacy@physioapp.io">privacy@physioapp.io</a> with the clinic name, the
            phone number or email your record is under, and the phrase "Data Deletion Request." We
            will verify the request and forward it to the clinic, or action it directly where we act
            as the data controller (e.g., for your PhysioApp admin/support account).
          </li>
        </ul>
      </section>

      <section id="what-gets-deleted">
        <h2>3. What Gets Deleted</h2>
        <p>A completed deletion request removes:</p>
        <ul>
          <li>Patient profile, contact details, and intake information;</li>
          <li>SVG body assessments, session notes, and range-of-motion/pain scores;</li>
          <li>Appointment and attendance history;</li>
          <li>Home exercise plan assignments and adherence data;</li>
          <li>
            WhatsApp message history stored within PhysioApp (delivery/read logs and content);
          </li>
          <li>Referral reports generated for that patient.</li>
        </ul>
      </section>

      <section id="exceptions">
        <h2>4. Exceptions and Retention Exceptions</h2>
        <p>
          We may retain limited data where required to comply with law, resolve disputes, enforce
          our agreements, or meet financial/tax record-keeping obligations (for example, invoice and
          payment records may be retained for the statutory period even after a patient profile is
          deleted). Where this applies, retained data is restricted from general access and used
          only for that legal or compliance purpose.
        </p>
      </section>

      <section id="timeline">
        <h2>5. Timeline</h2>
        <p>
          We aim to complete verified deletion requests within <strong>30 days</strong>. You will
          receive a confirmation once the request has been processed. WhatsApp opt-outs ("DELETE MY
          DATA" or "STOP") take effect immediately for future messaging, independent of how long the
          full data-deletion process takes.
        </p>
      </section>

      <section id="contact">
        <h2>6. Contact</h2>
        <p>
          For any question about this process, email{" "}
          <a href="mailto:privacy@physioapp.io">privacy@physioapp.io</a>.
        </p>
      </section>
    </LegalPage>
  );
}
