import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfService,
  head: () => ({
    meta: [
      { title: "Terms of Service - PhysioApp" },
      {
        name: "description",
        content:
          "The terms governing a clinic's use of PhysioApp, including WhatsApp usage, subscriptions, and data responsibilities.",
      },
    ],
  }),
});

function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="August 19, 2026"
      intro={
        <p>
          These Terms of Service ("Terms") govern access to and use of PhysioApp by a clinic and the
          staff it authorizes ("you", "your clinic"). By creating an account or using PhysioApp,
          your clinic agrees to these Terms. If you do not agree, do not use the service.
        </p>
      }
    >
      <section id="clinic-responsibility">
        <h2>1. Clinic's Responsibility for Patient Information</h2>
        <p>
          Your clinic is the data controller for the patient records it creates in PhysioApp. You
          are responsible for the accuracy of the information you enter, for obtaining any consents
          required by law before recording assessments, sending WhatsApp reminders, or sharing
          referral reports, and for restricting account access to authorized staff only. PhysioApp
          processes patient data on your clinic's behalf and in accordance with your instructions
          and our <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>2. Acceptable Use</h2>
        <p>You agree not to use PhysioApp to:</p>
        <ul>
          <li>Store or process data you are not legally permitted to hold;</li>
          <li>Send unsolicited, unlawful, or misleading communications to patients or others;</li>
          <li>Attempt to breach, probe, or disrupt the security or availability of the service;</li>
          <li>Reverse-engineer, resell, or white-label the platform without written permission;</li>
          <li>Upload malicious code or use the service to harm any third party.</li>
        </ul>
      </section>

      <section id="whatsapp-usage">
        <h2>3. WhatsApp Usage</h2>
        <p>
          PhysioApp's WhatsApp reminders, exercise nudges and payment links are delivered through
          the Meta WhatsApp Business Platform and are subject to Meta's WhatsApp Business Messaging
          Policy in addition to these Terms. Your clinic is responsible for ensuring it has a lawful
          basis and, where required, patient consent (opt-in) to message a patient on WhatsApp, for
          the content of any custom message templates it submits, and for honoring patient opt-outs
          promptly. PhysioApp may suspend WhatsApp messaging for an account that violates Meta's
          policies or generates excessive complaints/blocks.
        </p>
      </section>

      <section id="subscription-payment">
        <h2>4. Subscription / Payment</h2>
        <p>
          PhysioApp is offered on the Starter, Advance and Enterprise subscription plans described
          on our <a href="/#pricing">pricing page</a>, billed monthly unless otherwise agreed.
          Subscription fees are exclusive of applicable taxes (including GST) unless stated
          otherwise. Fees are non-refundable except where required by law or expressly stated at
          purchase. We may change pricing on renewal with advance notice. Failure to pay may result
          in suspension of access until the account is brought current.
        </p>
      </section>

      <section id="account-termination">
        <h2>5. Account Termination</h2>
        <p>
          Your clinic may cancel its subscription at any time; access continues until the end of the
          current billing period. We may suspend or terminate an account for material breach of
          these Terms (including Acceptable Use or WhatsApp Usage violations), non-payment, or where
          required by law, with notice where reasonably practicable. On termination, we retain
          exported/backup data only as described in our{" "}
          <a href="/privacy-policy#data-retention">Privacy Policy</a> and{" "}
          <a href="/data-deletion">Data Deletion</a> page.
        </p>
      </section>

      <section id="service-availability">
        <h2>6. Service Availability</h2>
        <p>
          We aim to keep PhysioApp available and reliable but do not guarantee uninterrupted access.
          The service may be temporarily unavailable for maintenance, updates, or events outside our
          reasonable control (including outages of third-party providers such as hosting, payment,
          or WhatsApp/Meta infrastructure). We will make reasonable efforts to notify clinics of
          planned maintenance in advance.
        </p>
      </section>

      <section id="intellectual-property">
        <h2>7. Intellectual Property</h2>
        <p>
          PhysioApp, its software, design, trademarks and content are owned by us or our licensors
          and are protected by intellectual property law. Your clinic retains ownership of the
          patient and clinic data it enters into PhysioApp. We grant your clinic a limited,
          non-exclusive, non-transferable right to use PhysioApp for its own clinical and business
          operations for the term of the subscription; no other rights are granted.
        </p>
      </section>

      <section id="liability">
        <h2>8. Liability</h2>
        <p>
          PhysioApp is provided "as is" and "as available." To the maximum extent permitted by law,
          we disclaim implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement, and are not liable for indirect, incidental, or consequential damages
          arising from use of the service. PhysioApp is a practice-management and communication
          tool, not a substitute for clinical judgment — treatment decisions remain the clinic's and
          treating therapist's responsibility. Our aggregate liability for any claim relating to the
          service is limited to the fees paid by your clinic in the 12 months preceding the claim.
        </p>
      </section>

      <section id="data-responsibilities">
        <h2>9. Data Responsibilities</h2>
        <p>
          As between the parties, your clinic is responsible for the lawfulness of the data it
          uploads and the instructions it gives us regarding that data (including deletion
          requests), and PhysioApp is responsible for processing that data securely and only in
          accordance with those instructions and our <a href="/privacy-policy">Privacy Policy</a>.
          Where required, the parties will enter into a separate data processing agreement
          (available on the Enterprise plan) governing sub-processor use, breach notification, and
          audit rights.
        </p>
      </section>

      <section id="governing-law">
        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-law
          principles, and any dispute arising from them will be subject to the exclusive
          jurisdiction of the courts located in India, unless otherwise required by applicable local
          law where your clinic operates.
        </p>
      </section>

      <p className="pt-4 text-sm text-[#0F172A]/50">
        Questions about these Terms can be sent to{" "}
        <a href="mailto:legal@physioapp.io">legal@physioapp.io</a>.
      </p>
    </LegalPage>
  );
}
