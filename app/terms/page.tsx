import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service \u2014 CribDesk",
  description:
    "Terms governing the CribDesk website, services, and SMS/MMS communications.",
  alternates: { canonical: "/terms" },
};

// Wording and published dates preserved from https://cribdesk-oexqzjea.manus.space/terms.
export default function TermsPage() {
  return (
    <LegalPage>
      <div>
        <h1>{"Terms of Service"}</h1>
        <p>{"Last updated: May 27, 2026"}</p>
      </div>
      <div>
        <section>
          <p>
            {
              'These Terms of Service ("Terms") govern your access to and use of the CribDesk website located at'
            }{" "}
            <span>{"www.cribdesk.ai"}</span>{" "}
            {
              'and any related services, including SMS/MMS messaging communications, provided by CribDesk, LLC ("CribDesk," "we," "us," or "our"). By accessing our website, joining our waitlist, or using our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.'
            }
          </p>
        </section>
        <section>
          <h2>{"1. Eligibility"}</h2>
          <p>
            {
              "You must be at least 18 years of age to use our services. By using CribDesk, you represent and warrant that you are 18 or older and have the legal authority to enter into these Terms. Our services are intended for licensed real estate professionals and businesses operating in the United States."
            }
          </p>
        </section>
        <section>
          <h2>{"2. SMS/MMS Communications — User Consent"}</h2>
          <p>
            {
              "CribDesk obtains express written consent before sending any SMS/MMS messages. Consent is collected through an unchecked, optional checkbox on our website forms at the point where you provide your phone number. By checking the SMS consent checkbox, you expressly agree to receive text messages from CribDesk as described below. We do not send SMS/MMS messages without prior opt-in consent."
            }
          </p>
          <p>
            {
              "By opting in, you consent to receive SMS/MMS text messages from CribDesk, including:"
            }
          </p>
          <ul>
            <li>
              {"Waitlist status updates and founding member notifications"}
            </li>
            <li>
              {"Product launch announcements and onboarding instructions"}
            </li>
            <li>
              {
                "Transactional messages related to your account or service usage"
              }
            </li>
            <li>
              {
                "Promotional messages about CribDesk features, pricing, and special offers"
              }
            </li>
          </ul>
          <p>
            <strong>{"Consent is not a condition of any purchase."}</strong>
            {
              " You may use our services without consenting to receive SMS messages."
            }
          </p>
          <p>
            {
              "By using CribDesk's services, you also agree to the collection, use, and handling of your personal information as outlined in our"
            }{" "}
            <Link href="/privacy">{"Privacy Policy"}</Link>
            {", which is incorporated into these Terms by reference."}
          </p>
        </section>
        <section>
          <h2>{"3. Opt-Out Procedures"}</h2>
          <p>
            {
              "You may stop receiving SMS/MMS messages from CribDesk at any time by replying any of the following keywords to any message from us:"
            }
          </p>
          <ul>
            <li>
              <span>{"STOP"}</span>
              {", "}
              <span>{"STOPALL"}</span>
              {", "}
              <span>{"UNSUBSCRIBE"}</span>
              {", "}
              <span>{"CANCEL"}</span>
              {", "}
              <span>{"END"}</span>
              {", or "}
              <span>{"QUIT"}</span>
              {" — to opt out of all messages"}
            </li>
            <li>
              <span>{"HELP"}</span>
              {" or "}
              <span>{"INFO"}</span>
              {" — to receive support contact information"}
            </li>
            <li>
              <span>{"START"}</span>
              {", "}
              <span>{"YES"}</span>
              {", or "}
              <span>{"UNSTOP"}</span>
              {" — to re-subscribe after opting out"}
            </li>
          </ul>
          <p>
            {
              "After opting out, you will receive one final confirmation message and no further messages will be sent. You may re-subscribe at any time by replying START or by re-submitting the opt-in form on our website."
            }
          </p>
          <p>
            {"You may also request opt-out by contacting us at"}{" "}
            <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
            {". We will process all opt-out requests within one business day."}
          </p>
        </section>
        <section>
          <h2>{"4. Message Frequency and Content"}</h2>
          <p>
            {
              "By subscribing to CribDesk's SMS/MMS communications, you agree to receive messages related to our AI-powered lead qualification platform, including product updates, service notifications, and promotional offers. You can expect to receive up to 4 messages per month, though frequency may vary and may be higher during onboarding or product launch periods."
            }
          </p>
          <p>
            {
              "Message and data rates may apply. CribDesk reserves the right to modify message frequency and content with appropriate notice to subscribers."
            }
          </p>
        </section>
        <section>
          <h2>{"5. Acceptable Use"}</h2>
          <p>
            {
              "You agree to use CribDesk's services only for lawful purposes and in accordance with these Terms. You agree not to:"
            }
          </p>
          <ul>
            <li>
              {"Use the service to send unsolicited communications or spam"}
            </li>
            <li>
              {
                "Violate any applicable federal, state, or local laws or regulations, including the Telephone Consumer Protection Act (TCPA) and CAN-SPAM Act"
              }
            </li>
            <li>
              {
                "Impersonate any person or entity or misrepresent your affiliation"
              }
            </li>
            <li>
              {
                "Interfere with or disrupt the integrity or performance of our services"
              }
            </li>
            <li>
              {"Attempt to gain unauthorized access to our systems or data"}
            </li>
            <li>
              {
                "Use our services to engage in any fraudulent, abusive, or harmful activity"
              }
            </li>
          </ul>
        </section>
        <section>
          <h2>{"6. Intellectual Property"}</h2>
          <p>
            {
              "All content, trademarks, logos, software, and materials on our website and platform are the exclusive property of CribDesk, LLC or its licensors. You may not reproduce, distribute, modify, or create derivative works without our prior written consent. Nothing in these Terms grants you any license to use our intellectual property except as expressly stated."
            }
          </p>
        </section>
        <section>
          <h2>{"7. Data Security and Information Handling"}</h2>
          <p>
            {
              "CribDesk implements commercially reasonable security measures to protect your personal information, including encryption in transit (TLS/HTTPS) and access controls. However, no method of electronic transmission or storage is completely secure."
            }
          </p>
          <p>
            {
              "Your use of our services and submission of personal information is governed by our"
            }{" "}
            <Link href="/privacy">{"Privacy Policy"}</Link>
            {
              ", which is incorporated into these Terms by reference. By agreeing to these Terms, you also agree to our Privacy Policy."
            }
          </p>
        </section>
        <section>
          <h2>{"8. No Sharing of Mobile Opt-In Data"}</h2>
          <p>
            {
              "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes."
            }
          </p>
          <p>
            {
              "All text messaging originator opt-in data and consent will not be shared with any third parties. Your mobile phone number, opt-in consent records, and any related personal data are used solely to deliver the messaging services described in these Terms and our Privacy Policy. This data will not be sold, rented, or disclosed to any third party for marketing or promotional purposes."
            }
          </p>
          <p>
            {
              "This disclosure satisfies the CTIA Messaging Principles and Best Practices (Section 5.2.1) and The Campaign Registry (TCR) requirements for SMS opt-in data handling."
            }
          </p>
        </section>
        <section>
          <h2>{"9. Liability and Disclaimers"}</h2>
          <p>
            {
              "CribDesk is not responsible for any delays, failures in delivery, or any other issues related to the transmission or receipt of SMS/MMS text messages. Delivery of text messages is subject to effective transmission by your mobile carrier and is not guaranteed by CribDesk. Carriers are not liable for delayed or undelivered messages."
            }
          </p>
          <p>
            {
              "By subscribing to our SMS/MMS services, you acknowledge and agree that CribDesk will not be liable for any damages, losses, or injuries arising from or related to the use or failure to receive any text messages, including but not limited to delays, non-delivery, or technical issues."
            }
          </p>
          <p>
            {
              'Our services are provided on an "as-is" and "as-available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. To the maximum extent permitted by applicable law, CribDesk\'s total liability for any claims arising under these Terms shall not exceed the amounts paid by you to CribDesk in the twelve months preceding the claim.'
            }
          </p>
        </section>
        <section>
          <h2>{"10. Indemnification"}</h2>
          <p>
            {
              "You agree to indemnify, defend, and hold harmless CribDesk, LLC and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of our services, your violation of these Terms, or your violation of any applicable law or regulation."
            }
          </p>
        </section>
        <section>
          <h2>{"11. Governing Law and Dispute Resolution"}</h2>
          <p>
            {
              "These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which CribDesk, LLC is incorporated, without regard to conflict of law principles."
            }
          </p>
          <p>
            {
              "Any disputes arising from or relating to these Terms or your use of our services shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive or other equitable relief in a court of competent jurisdiction to prevent irreparable harm."
            }
          </p>
        </section>
        <section>
          <h2>{"12. Changes to These Terms"}</h2>
          <p>
            {
              'We reserve the right to modify these Terms at any time. When we make material changes, we will update the "Last updated" date at the top of this page and, where appropriate, notify you by email or SMS. Your continued use of our services after any changes constitutes your acceptance of the revised Terms.'
            }
          </p>
        </section>
        <section>
          <h2>{"13. Termination"}</h2>
          <p>
            {
              "We reserve the right to suspend or terminate your access to our services at any time, with or without notice, for any violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use our services will immediately cease."
            }
          </p>
        </section>
        <section>
          <h2>{"14. Contact Us"}</h2>
          <p>
            {
              "If you have any questions about these Terms of Service, please contact us:"
            }
          </p>
          <div>
            <p>
              <span>{"CribDesk, LLC"}</span>
            </p>
            <p>
              {"Email:"}{" "}
              <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
            </p>
            <p>
              {"Website: "}
              <span>{"www.cribdesk.ai"}</span>
            </p>
          </div>
        </section>
        <p>
          {
            "These Terms of Service are provided for informational purposes. CribDesk recommends consulting qualified legal counsel to ensure full compliance with all applicable federal, state, and carrier regulations, including but not limited to TCPA, CTIA guidelines, and The Campaign Registry (TCR) requirements."
          }
        </p>
      </div>
    </LegalPage>
  );
}
