import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy \u2014 CribDesk",
  description:
    "How CribDesk collects, uses, protects, and handles personal information.",
  alternates: { canonical: "/privacy" },
};

// Wording and published dates preserved from https://cribdesk-oexqzjea.manus.space/privacy.
export default function PrivacyPage() {
  return (
    <LegalPage>
      <h1>{"CribDesk Privacy Policy"}</h1>
      <p>
        <strong>{"Effective Date: October 29, 2026"}</strong>
        <br />
        <strong>{"Last Updated: October 29, 2026"}</strong>
      </p>
      <p>
        {
          'CribDesk, LLC ("CribDesk," "we," "us," or "our") respects your privacy and is committed to protecting the personal information entrusted to us.'
        }
      </p>
      <p>
        {
          "This Privacy Policy explains how we collect, use, process, store, disclose, and protect personal information when individuals access or use our website at "
        }
        <a href="https://www.cribdesk.ai">{"https://www.cribdesk.ai"}</a>
        {","}
        {
          ' our software applications, and our related products and services (collectively, the "Services").'
        }
      </p>
      <p>
        {
          "CribDesk is an AI-powered digital assistant designed primarily for real estate professionals. Our Services may include customer relationship management, messaging and communication tools, lead qualification, artificial intelligence features, social media integrations, scheduling, marketing assistance, and other business productivity tools."
        }
      </p>
      <p>{"This Privacy Policy applies to:"}</p>
      <ul>
        <li>{"Visitors to the CribDesk website."}</li>
        <li>{"Individuals who register for or use CribDesk."}</li>
        <li>
          {"Real estate professionals and businesses using our Services."}
        </li>
        <li>
          {
            "Individuals who communicate with CribDesk users through authorized connected messaging or social media accounts."
          }
        </li>
        <li>
          {
            "Prospective customers, leads, and other individuals whose information is processed through the Services."
          }
        </li>
      </ul>
      <p>
        {
          "Please read this Privacy Policy carefully to understand our practices regarding your personal information."
        }
      </p>
      <h2>{"1. Information We Collect"}</h2>
      <p>
        {
          "We collect information necessary to operate, maintain, secure, and improve our Services. The information collected depends on how individuals interact with CribDesk and which features are enabled."
        }
      </p>
      <h3>{"1.1 Information You Provide Directly"}</h3>
      <p>{"We may collect:"}</p>
      <ul>
        <li>{"Full name, email address, and telephone number."}</li>
        <li>
          {
            "Business name, brokerage affiliation, and professional information."
          }
        </li>
        <li>{"Account registration and profile information."}</li>
        <li>{"Real estate market and business preferences."}</li>
        <li>{"Customer support inquiries and communications."}</li>
        <li>{"Billing and subscription information."}</li>
        <li>
          {
            "Content, documents, images, or other information voluntarily submitted to our Services."
          }
        </li>
        <li>{"Communication preferences and SMS/MMS consent records."}</li>
      </ul>
      <h3>{"1.2 Information Collected Through Connected Accounts"}</h3>
      <p>
        {
          "CribDesk may allow users to connect third-party accounts, including Facebook, Instagram, WhatsApp, email, and calendar services, where supported."
        }
      </p>
      <p>
        {
          "Depending on the integrations enabled and permissions granted, we may collect or process:"
        }
      </p>
      <ul>
        <li>
          {"Account names, usernames, identifiers, and profile information."}
        </li>
        <li>
          {"Authorized business page or professional account information."}
        </li>
        <li>
          {
            "Messages, comments, and communications associated with connected accounts."
          }
        </li>
        <li>
          {
            "Contact or sender identifiers and information supplied during communications."
          }
        </li>
        <li>{"Engagement and interaction data."}</li>
        <li>{"Authorized posts, media, and related content."}</li>
        <li>{"Calendar events, appointments, and scheduling information."}</li>
        <li>{"Information necessary to maintain authorized connections."}</li>
      </ul>
      <p>
        {
          "CribDesk accesses connected account information only through supported integrations and permitted access methods, subject to applicable platform terms and user authorization."
        }
      </p>
      <h3>{"1.3 Real Estate Customer and Lead Information"}</h3>
      <p>
        {
          "When real estate professionals use CribDesk, the Services may process information about their clients, prospective clients, and business contacts."
        }
      </p>
      <p>{"Such information may include:"}</p>
      <ul>
        <li>{"Names, email addresses, and telephone numbers."}</li>
        <li>{"Property preferences, locations, and housing requirements."}</li>
        <li>{"Purchase, sale, rental, or investment interests."}</li>
        <li>{"Communications, inquiries, and appointment requests."}</li>
        <li>
          {"Lead status, interaction history, and follow-up information."}
        </li>
        <li>
          {
            "Information voluntarily provided during conversations with real estate professionals."
          }
        </li>
      </ul>
      <p>
        {
          "Information about these individuals may be processed even when they have not registered for a CribDesk account."
        }
      </p>
      <p>
        {
          "CribDesk processes this information to support the services requested by its business users, subject to applicable privacy laws, contractual obligations, and platform requirements."
        }
      </p>
      <h3>{"1.4 Automatically Collected Information"}</h3>
      <p>
        {
          "When individuals access our website or applications, we may automatically collect certain technical information, including:"
        }
      </p>
      <ul>
        <li>
          {"IP address and approximate location derived from IP address."}
        </li>
        <li>{"Browser type and operating system."}</li>
        <li>{"Device information and identifiers."}</li>
        <li>{"Website pages visited and features used."}</li>
        <li>{"Referring URLs."}</li>
        <li>
          {"Access timestamps, activity logs, and diagnostic information."}
        </li>
        <li>{"Cookies and similar tracking technologies."}</li>
      </ul>
      <p>
        {
          "We use this information for security, analytics, troubleshooting, service delivery, and product improvement."
        }
      </p>
      <h2>{"2. How We Use Personal Information"}</h2>
      <p>
        {
          "CribDesk may process personal information for the following purposes:"
        }
      </p>
      <p>
        <strong>{"Service Delivery"}</strong>
      </p>
      <ul>
        <li>{"Creating and managing user accounts."}</li>
        <li>{"Providing platform functionality."}</li>
        <li>{"Managing communications and business contacts."}</li>
        <li>{"Organizing leads and customer interactions."}</li>
        <li>{"Supporting scheduling and appointment management."}</li>
        <li>{"Delivering requested integrations and automation features."}</li>
      </ul>
      <p>
        <strong>{"Artificial Intelligence and Lead Qualification"}</strong>
      </p>
      <ul>
        <li>{"Analyzing authorized communications."}</li>
        <li>{"Categorizing inquiries and customer interests."}</li>
        <li>{"Identifying potential leads."}</li>
        <li>{"Generating lead qualification scores and recommendations."}</li>
        <li>{"Suggesting responses and follow-up actions."}</li>
        <li>{"Supporting business workflow automation."}</li>
      </ul>
      <p>
        <strong>{"Customer Support and Communications"}</strong>
      </p>
      <ul>
        <li>{"Responding to inquiries."}</li>
        <li>{"Providing onboarding and technical assistance."}</li>
        <li>{"Sending requested notifications."}</li>
        <li>{"Communicating service updates."}</li>
      </ul>
      <p>
        <strong>{"Service Improvement and Security"}</strong>
      </p>
      <ul>
        <li>{"Diagnosing technical problems."}</li>
        <li>{"Improving platform reliability and functionality."}</li>
        <li>{"Monitoring for fraud, abuse, and unauthorized activity."}</li>
        <li>{"Understanding aggregate usage patterns."}</li>
      </ul>
      <p>
        <strong>{"Marketing"}</strong>
      </p>
      <ul>
        <li>
          {
            "Sending marketing communications where permitted by law and applicable consent requirements."
          }
        </li>
        <li>
          {"Providing information about new features, products, and offers."}
        </li>
      </ul>
      <p>
        <strong>{"Legal and Regulatory Compliance"}</strong>
      </p>
      <ul>
        <li>{"Complying with applicable legal obligations."}</li>
        <li>{"Responding to lawful requests."}</li>
        <li>{"Enforcing applicable agreements and policies."}</li>
        <li>
          {
            "Protecting the rights and safety of CribDesk, our users, and others."
          }
        </li>
      </ul>
      <p>
        {
          "We do not use personal information for purposes incompatible with those disclosed in this policy or applicable authorizations."
        }
      </p>
      <h2>{"3. Facebook, Instagram, and Meta Platform Integrations"}</h2>
      <p>
        {
          "CribDesk may integrate with products and services provided by Meta Platforms, Inc., including Facebook and Instagram."
        }
      </p>
      <p>
        {
          "These integrations are designed to enable authorized real estate professionals to manage business communications, respond to inquiries, qualify leads, and organize customer interactions."
        }
      </p>
      <h3>{"3.1 Information Accessed From Meta Platforms"}</h3>
      <p>
        {
          "Depending on the permissions granted and features used, CribDesk may access:"
        }
      </p>
      <ul>
        <li>
          {"Facebook Page and Instagram professional account identifiers."}
        </li>
        <li>{"Names, usernames, and authorized profile information."}</li>
        <li>
          {"Messages and communications associated with authorized accounts."}
        </li>
        <li>{"Comments, interactions, and engagement information."}</li>
        <li>{"Authorized content and associated metadata."}</li>
        <li>
          {
            "Information provided by individuals who communicate with connected business accounts."
          }
        </li>
        <li>
          {
            "Information required to authenticate, maintain, and operate permitted integrations."
          }
        </li>
      </ul>
      <p>
        {
          "The specific information accessed depends on the features enabled, the permissions approved by Meta, and the access authorized by the relevant account holder."
        }
      </p>
      <p>
        {
          "CribDesk does not require users to disclose their Facebook or Instagram passwords to connect their accounts."
        }
      </p>
      <h3>{"3.2 How We Use Meta Platform Data"}</h3>
      <p>{"We may process authorized Meta Platform Data to:"}</p>
      <ul>
        <li>{"Display and organize messages and inquiries."}</li>
        <li>{"Help real estate professionals manage communications."}</li>
        <li>{"Identify and categorize potential customer inquiries."}</li>
        <li>{"Generate AI-assisted lead qualification insights."}</li>
        <li>{"Suggest appropriate responses and follow-up activities."}</li>
        <li>{"Maintain customer interaction histories where permitted."}</li>
        <li>
          {
            "Perform actions expressly authorized by users and permitted by Meta."
          }
        </li>
      </ul>
      <p>
        {
          "We process Meta Platform Data only for purposes permitted by applicable Meta Platform Terms, developer policies, granted permissions, and this Privacy Policy."
        }
      </p>
      <h3>{"3.3 Restrictions on Meta Platform Data"}</h3>
      <p>{"CribDesk does not sell Meta Platform Data."}</p>
      <p>
        {
          "We do not provide Meta Platform Data to data brokers or use it for unauthorized advertising, profiling, or unrelated marketing activities."
        }
      </p>
      <p>
        {
          "We do not use Meta Platform Data to train generalized artificial intelligence models."
        }
      </p>
      <p>
        {
          "Where authorized Meta Platform Data is processed through service providers, such processing must be limited to permitted service delivery purposes and subject to applicable Meta requirements."
        }
      </p>
      <p>
        {
          "We do not authorize service providers to use Meta Platform Data for their independent advertising or unrelated commercial purposes."
        }
      </p>
      <h3>{"3.4 Disconnecting Meta Accounts"}</h3>
      <p>
        {
          "Users may revoke CribDesk's access to their connected Facebook or Instagram accounts through the applicable Meta account settings."
        }
      </p>
      <p>
        {
          "Revoking access generally prevents CribDesk from obtaining additional information through that authorization."
        }
      </p>
      <p>
        {
          "However, disconnecting an account does not necessarily delete information previously stored within CribDesk."
        }
      </p>
      <p>
        {
          "Users and other affected individuals may request deletion of stored personal information using the procedures described in Section 10."
        }
      </p>
      <h3>{"3.5 Meta's Independent Privacy Practices"}</h3>
      <p>{"Facebook and Instagram are operated by Meta Platforms, Inc."}</p>
      <p>
        {
          "Meta's collection and processing of information through its own platforms is governed by Meta's privacy policies and applicable terms."
        }
      </p>
      <p>
        {"For additional information, please visit "}
        <a href="https://www.facebook.com/privacy/policy/">
          {"https://www.facebook.com/privacy/policy/"}
        </a>
        {"."}
      </p>
      <h2>{"4. Artificial Intelligence and Automated Processing"}</h2>
      <p>
        {
          "CribDesk uses artificial intelligence and automated technology to provide certain platform features."
        }
      </p>
      <p>{"These technologies may analyze information such as:"}</p>
      <ul>
        <li>{"Customer messages and inquiries."}</li>
        <li>{"Communication history."}</li>
        <li>{"Property-related preferences."}</li>
        <li>{"User-provided business information."}</li>
        <li>{"Lead interaction patterns."}</li>
        <li>{"Authorized content and other relevant information."}</li>
      </ul>
      <p>{"AI-powered features may generate:"}</p>
      <ul>
        <li>{"Suggested responses."}</li>
        <li>{"Lead qualification scores."}</li>
        <li>{"Communication summaries."}</li>
        <li>{"Task recommendations."}</li>
        <li>{"Follow-up suggestions."}</li>
        <li>{"Marketing content."}</li>
        <li>{"Other business productivity insights."}</li>
      </ul>
      <p>
        {
          "These outputs are intended to assist users and may be incomplete or inaccurate."
        }
      </p>
      <p>
        {
          "Users should exercise independent judgment when relying on AI-generated recommendations, particularly for decisions that may materially affect another individual."
        }
      </p>
      <h3>{"4.1 Third-Party AI Processing"}</h3>
      <p>
        {
          "CribDesk may use third-party AI infrastructure and technology service providers to support authorized features."
        }
      </p>
      <p>
        {
          "Where personal information is transmitted to such providers, we seek to limit the information shared to what is necessary to deliver the relevant functionality and apply appropriate contractual, privacy, and security safeguards."
        }
      </p>
      <p>
        {
          "Meta Platform Data is subject to additional restrictions under the applicable Meta platform policies."
        }
      </p>
      <h3>{"4.2 Human Oversight"}</h3>
      <p>
        {
          "CribDesk's AI-generated lead scores and recommendations are designed to support business decision-making rather than replace professional judgment."
        }
      </p>
      <p>
        {
          "Users remain responsible for reviewing recommendations and ensuring that their use of the Services complies with applicable laws, including fair housing, consumer protection, anti-discrimination, and communications requirements."
        }
      </p>
      <h2>{"5. SMS/MMS Messaging and Consent"}</h2>
      <p>
        {
          "CribDesk may provide SMS/MMS communications for account notifications, onboarding, product updates, service-related messages, and promotional communications."
        }
      </p>
      <p>
        {
          "CribDesk may also provide messaging tools that allow authorized business users to communicate with their own customers."
        }
      </p>
      <h3>{"5.1 Consent to Receive Messages From CribDesk"}</h3>
      <p>
        {
          "When required by applicable law, we obtain affirmative consent before sending SMS/MMS communications."
        }
      </p>
      <p>
        {
          "Providing a telephone number through a general website form does not, by itself, constitute consent to receive promotional text messages."
        }
      </p>
      <p>
        {
          "Promotional SMS/MMS communications are sent only where the recipient has provided the legally required marketing consent."
        }
      </p>
      <p>
        {
          "Consent to receive promotional messages is not a condition of purchasing CribDesk products or services."
        }
      </p>
      <h3>{"5.2 CribDesk Messaging Program"}</h3>
      <ul>
        <li>
          <strong>{"Program Name:"}</strong>
          {" CribDesk"}
        </li>
        <li>
          <strong>{"Message Types:"}</strong>
          {
            " Waitlist notifications, onboarding information, service updates, account notifications, product announcements, and promotional offers."
          }
        </li>
        <li>
          <strong>{"Message Frequency:"}</strong>
          {
            " Frequency varies. Waitlist and promotional communications generally may include up to four messages per month. Service-related notifications may occur more frequently depending on the services used."
          }
        </li>
        <li>
          <strong>{"Message and Data Rates:"}</strong>
          {" Message and data rates may apply."}
        </li>
        <li>
          <strong>{"Carrier Liability:"}</strong>
          {
            " Mobile carriers are not liable for delayed or undelivered messages."
          }
        </li>
      </ul>
      <h3>{"5.3 Opting Out"}</h3>
      <p>
        {"You may opt out of SMS/MMS communications from CribDesk by replying "}
        <strong>{"STOP"}</strong>
        {" to a message from us."}
      </p>
      <p>{"We may send a final message confirming your opt-out."}</p>
      <p>
        {
          "After your request is processed, we will stop sending messages covered by that opt-out unless you subsequently provide renewed consent."
        }
      </p>
      <p>
        {"You may also request assistance by replying "}
        <strong>{"HELP"}</strong>
        {" or contacting "}
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
        {"."}
      </p>
      <h3>{"5.4 Mobile Information Protection"}</h3>
      <p>
        <strong>
          {
            "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes."
          }
        </strong>
      </p>
      <p>
        {
          "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes."
        }
      </p>
      <p>
        {
          "Text messaging originator opt-in data and consent records will not be shared with third parties or affiliates for their marketing or promotional purposes."
        }
      </p>
      <p>
        {
          "We may disclose information to messaging infrastructure providers strictly as necessary to deliver authorized communications, maintain security, comply with law, and administer the messaging service."
        }
      </p>
      <p>
        {
          "Consent to receive messages from CribDesk does not constitute consent to receive messages from another business."
        }
      </p>
      <h3>{"5.5 Messages Sent by CribDesk Users"}</h3>
      <p>
        {
          "Business users who send messages to their customers through CribDesk are responsible for obtaining the appropriate recipient permissions and complying with applicable messaging and privacy laws."
        }
      </p>
      <p>
        {
          "CribDesk's messaging tools do not independently grant a business permission to contact individuals who have not consented where consent is legally required."
        }
      </p>
      <h2>{"6. How We Share Personal Information"}</h2>
      <p>
        {
          "We may share personal information only where reasonably necessary for authorized business operations, subject to applicable laws and platform restrictions."
        }
      </p>
      <h3>{"6.1 Service Providers"}</h3>
      <p>{"We may use third-party providers to support:"}</p>
      <ul>
        <li>{"Cloud hosting and infrastructure."}</li>
        <li>{"Data storage and security."}</li>
        <li>{"Messaging and communications delivery."}</li>
        <li>{"Artificial intelligence processing."}</li>
        <li>{"Analytics and technical monitoring."}</li>
        <li>{"Payment processing."}</li>
        <li>{"Customer support and business operations."}</li>
      </ul>
      <p>
        {
          "Service providers are expected to process information only for authorized purposes and under appropriate confidentiality and security arrangements."
        }
      </p>
      <h3>{"6.2 Connected Platform Providers"}</h3>
      <p>
        {
          "When users enable integrations, relevant information may be exchanged with supported third-party platforms as necessary to operate those integrations."
        }
      </p>
      <p>
        {
          "Such exchanges remain subject to user authorizations and applicable platform requirements."
        }
      </p>
      <h3>{"6.3 Legal Obligations"}</h3>
      <p>
        {"We may disclose personal information where reasonably necessary to:"}
      </p>
      <ul>
        <li>{"Comply with applicable law or legal process."}</li>
        <li>{"Respond to valid governmental requests."}</li>
        <li>{"Investigate suspected unlawful conduct."}</li>
        <li>
          {
            "Protect the rights, property, or safety of CribDesk, our users, or others."
          }
        </li>
      </ul>
      <h3>{"6.4 Business Transactions"}</h3>
      <p>
        {
          "Personal information may be transferred in connection with a merger, acquisition, restructuring, financing, or sale of business assets, subject to applicable legal obligations and restrictions governing particular information, including Meta Platform Data."
        }
      </p>
      <h3>{"6.5 User-Directed Disclosures"}</h3>
      <p>
        {
          "We may share information when a user expressly requests or authorizes us to do so, provided the disclosure is permitted by applicable law and platform requirements."
        }
      </p>
      <p>
        {"We do not sell Meta Platform Data or SMS opt-in consent information."}
      </p>
      <h2>{"7. Business Users and Their Customers"}</h2>
      <p>
        {
          "CribDesk provides tools to real estate professionals and other authorized businesses."
        }
      </p>
      <p>
        {
          "In certain circumstances, these businesses determine which personal information they collect from customers, how they use that information, and the purposes for which CribDesk processes it."
        }
      </p>
      <p>
        {
          "CribDesk may act as a service provider or processor on behalf of such businesses, depending on the relevant relationship and applicable law."
        }
      </p>
      <p>
        {
          "Business users are responsible for providing required privacy notices, obtaining appropriate permissions, and ensuring the lawful collection and use of customer information."
        }
      </p>
      <p>
        {
          "Individuals whose information has been submitted to CribDesk by a business user may contact that business directly regarding its privacy practices."
        }
      </p>
      <p>
        {"They may also contact CribDesk at "}
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
        {
          " to request assistance with access, correction, or deletion of information processed through our Services."
        }
      </p>
      <p>
        {
          "Where a request relates to information controlled by one of our business customers, we may coordinate with that customer, subject to applicable legal and platform obligations."
        }
      </p>
      <h2>{"8. Cookies and Tracking Technologies"}</h2>
      <p>{"CribDesk may use cookies and similar technologies to:"}</p>
      <ul>
        <li>{"Maintain website and application functionality."}</li>
        <li>{"Remember preferences."}</li>
        <li>{"Support authentication and security."}</li>
        <li>{"Analyze website traffic and platform usage."}</li>
        <li>{"Measure service performance and marketing effectiveness."}</li>
      </ul>
      <p>
        {
          "Where required, we will provide appropriate notice and obtain consent for nonessential tracking technologies."
        }
      </p>
      <p>
        {
          "Users may manage cookie preferences through available website controls or their browser settings."
        }
      </p>
      <p>
        {
          "Disabling certain cookies may limit some website or application functionality."
        }
      </p>
      <h2>{"9. Data Security"}</h2>
      <p>
        {
          "CribDesk implements reasonable administrative, technical, and organizational safeguards intended to protect personal information."
        }
      </p>
      <p>{"Depending on the relevant system, these safeguards may include:"}</p>
      <ul>
        <li>
          {
            "Encryption of information transmitted over supported secure connections."
          }
        </li>
        <li>{"Access restrictions and authentication controls."}</li>
        <li>
          {
            "Limited access to personal information based on business responsibilities."
          }
        </li>
        <li>{"Security monitoring and technical reviews."}</li>
        <li>
          {"Controls intended to reduce unauthorized access or disclosure."}
        </li>
        <li>
          {"Procedures for evaluating and responding to security incidents."}
        </li>
      </ul>
      <p>
        {
          "No electronic system or transmission method can be guaranteed to be completely secure."
        }
      </p>
      <p>
        {
          "We continuously seek to maintain safeguards appropriate to the nature of the information processed and the risks associated with our Services."
        }
      </p>
      <h2>{"10. Data Retention, Access, and Deletion"}</h2>
      <p>
        {
          "CribDesk retains personal information only for as long as reasonably necessary to provide authorized Services, fulfill legitimate business purposes, comply with applicable legal requirements, resolve disputes, and maintain appropriate records."
        }
      </p>
      <p>
        {
          "Retention periods may differ depending on the type of information, the relevant service, applicable contractual obligations, and legal requirements."
        }
      </p>
      <h3>{"10.1 Meta Platform Data Retention"}</h3>
      <p>
        {
          "Information obtained through Facebook, Instagram, or other Meta integrations will be retained only as permitted under applicable Meta Platform Terms and for purposes consistent with the authorized Services."
        }
      </p>
      <p>
        {
          "Subject to applicable legal retention requirements, CribDesk will delete relevant Meta Platform Data when:"
        }
      </p>
      <ul>
        <li>
          {
            "An authorized user or affected individual validly requests deletion."
          }
        </li>
        <li>
          {"The information is no longer needed for a permitted purpose."}
        </li>
        <li>{"The relevant service or integration is discontinued."}</li>
        <li>{"Meta requires deletion."}</li>
        <li>
          {"Deletion is required by applicable law or platform requirements."}
        </li>
        <li>
          {
            "Other applicable deletion obligations arise following account closure or termination."
          }
        </li>
      </ul>
      <h3>{"10.2 How to Request Data Deletion"}</h3>
      <p>
        {
          "Any individual whose personal information is processed by CribDesk, including individuals who do not have a CribDesk account, may request deletion of their information."
        }
      </p>
      <p>{"To submit a request:"}</p>
      <ol>
        <li>
          {"Send an email to "}
          <strong>
            <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
          </strong>
          {"."}
        </li>
        <li>
          {"Use the subject line "}
          <strong>{"Data Deletion Request"}</strong>
          {" or "}
          <strong>{"Meta Data Deletion Request"}</strong>
          {"."}
        </li>
        <li>
          {
            "Provide sufficient information to help us identify the relevant account, communication, or data."
          }
        </li>
        <li>
          {
            "Specify whether you wish to delete particular information or all personal information associated with you."
          }
        </li>
      </ol>
      <p>
        {
          "We may request additional information when reasonably necessary to verify identity and prevent unauthorized deletion."
        }
      </p>
      <p>
        {
          "We will review and process valid deletion requests without undue delay and aim to respond within 30 days, or sooner where required by applicable law or platform obligations."
        }
      </p>
      <p>
        {
          "Certain records may be retained where legally required or otherwise permitted, but Meta Platform Data will remain subject to applicable Meta restrictions."
        }
      </p>
      <h3>{"10.3 Disconnecting Connected Accounts"}</h3>
      <p>
        {
          "Users may revoke third-party account access through the relevant platform's settings."
        }
      </p>
      <p>
        {
          "Revoking access prevents future authorized retrieval but may not automatically remove previously stored information."
        }
      </p>
      <p>
        {
          "To request removal of previously stored information, follow the deletion procedure above."
        }
      </p>
      <h3>{"10.4 Account Closure"}</h3>
      <p>
        {"Users may request closure of their CribDesk account by emailing "}
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
        {"."}
      </p>
      <p>
        {
          "Following a valid account closure request, we will delete or de-identify associated personal information as required under applicable law, contractual obligations, and relevant platform policies."
        }
      </p>
      <h3>{"10.5 Deletion From Service Providers"}</h3>
      <p>
        {
          "Where personal information has been disclosed to service providers, CribDesk will take appropriate steps to ensure relevant deletion requests are communicated and implemented where required."
        }
      </p>
      <h2>{"11. Your Privacy Rights"}</h2>
      <p>
        {
          "Depending on your location and applicable laws, you may have rights regarding your personal information, including:"
        }
      </p>
      <ul>
        <li>
          <strong>{"Access:"}</strong>
          {" Request access to personal information we hold about you."}
        </li>
        <li>
          <strong>{"Correction:"}</strong>
          {" Request correction of inaccurate or incomplete information."}
        </li>
        <li>
          <strong>{"Deletion:"}</strong>
          {
            " Request deletion of personal information, subject to applicable exceptions."
          }
        </li>
        <li>
          <strong>{"Portability:"}</strong>
          {
            " Request a copy of certain information in a portable format where applicable."
          }
        </li>
        <li>
          <strong>{"Objection:"}</strong>
          {
            " Object to certain forms of data processing where such rights apply."
          }
        </li>
        <li>
          <strong>{"Restriction:"}</strong>
          {
            " Request restrictions on certain processing activities where applicable."
          }
        </li>
        <li>
          <strong>{"Marketing Opt-Out:"}</strong>
          {" Withdraw consent to marketing communications."}
        </li>
        <li>
          <strong>{"Consent Withdrawal:"}</strong>
          {
            " Withdraw previously granted consent where processing is based on consent."
          }
        </li>
        <li>
          <strong>{"Appeal:"}</strong>
          {
            " Appeal certain privacy rights decisions where applicable law provides that right."
          }
        </li>
      </ul>
      <p>
        {
          "We will not unlawfully discriminate against individuals for exercising applicable privacy rights."
        }
      </p>
      <p>
        {"Requests may be submitted to "}
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
        {"."}
      </p>
      <h2>{"12. International Data Processing"}</h2>
      <p>
        {
          "CribDesk and its authorized service providers may process personal information in the United States or other countries where they operate."
        }
      </p>
      <p>
        {
          "Data protection laws in these jurisdictions may differ from those in an individual's country or state of residence."
        }
      </p>
      <p>
        {
          "Where required, CribDesk will implement appropriate safeguards for international data transfers and processing."
        }
      </p>
      <p>
        {
          "Information obtained from Meta platforms remains subject to applicable Meta requirements regardless of the location of processing."
        }
      </p>
      <h2>{"13. Children's Privacy"}</h2>
      <p>
        {
          "CribDesk is intended for business and professional use and is not directed to individuals under 18 years of age."
        }
      </p>
      <p>
        {
          "We do not knowingly solicit personal information directly from children for purposes of registering or using CribDesk Services."
        }
      </p>
      <p>
        {
          "If we become aware that personal information has been collected or processed in violation of applicable children's privacy requirements, we will take appropriate steps to address the issue, including deletion where required."
        }
      </p>
      <p>
        {
          "If you believe we have collected information about a child improperly, please contact "
        }
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
        {"."}
      </p>
      <h2>{"14. Third-Party Services and Links"}</h2>
      <p>
        {
          "Our Services may contain links to or integrations with third-party websites, applications, and platforms."
        }
      </p>
      <p>
        {
          "These may include social media providers, communications services, payment processors, scheduling providers, and other business applications."
        }
      </p>
      <p>
        {
          "CribDesk does not control the independent privacy practices of third-party services."
        }
      </p>
      <p>
        {
          "We encourage users to review the applicable privacy policies and terms of those services before providing information or authorizing integrations."
        }
      </p>
      <h2>{"15. Legal Bases for Processing"}</h2>
      <p>
        {
          "Where applicable privacy laws require a lawful basis for processing personal information, CribDesk may rely on:"
        }
      </p>
      <ul>
        <li>
          <strong>{"Contractual necessity:"}</strong>
          {" Processing needed to provide requested Services."}
        </li>
        <li>
          <strong>{"Consent:"}</strong>
          {" Processing authorized through valid consent, where required."}
        </li>
        <li>
          <strong>{"Legitimate interests:"}</strong>
          {
            " Processing necessary for reasonable business operations, security, service improvement, and customer support, subject to applicable balancing requirements."
          }
        </li>
        <li>
          <strong>{"Legal obligations:"}</strong>
          {
            " Processing required to comply with applicable laws and regulations."
          }
        </li>
        <li>
          <strong>{"Other lawful grounds:"}</strong>
          {" Where specifically permitted under applicable law."}
        </li>
      </ul>
      <p>
        {
          "Our reliance on a particular legal basis depends on the type of information and the purpose of processing."
        }
      </p>
      <h2>{"16. Changes to This Privacy Policy"}</h2>
      <p>
        {
          "We may update this Privacy Policy periodically to reflect changes in our Services, technology, data practices, legal requirements, or third-party platform policies."
        }
      </p>
      <p>
        {
          'When changes are made, we will revise the "Last Updated" date at the beginning of the policy.'
        }
      </p>
      <p>
        {
          "Where required by applicable law, we will provide additional notice of material changes or obtain renewed consent."
        }
      </p>
      <p>{"The current version will remain available at:"}</p>
      <p>
        <a href="https://www.cribdesk.ai/privacy">
          {"https://www.cribdesk.ai/privacy"}
        </a>
      </p>
      <h2>{"17. Contact Information"}</h2>
      <p>
        {
          "If you have questions regarding this Privacy Policy, wish to exercise your privacy rights, report a concern, or request deletion of personal information, please contact:"
        }
      </p>
      <p>
        <strong>{"CribDesk, LLC"}</strong>
        <br />
        <strong>{"Website:"}</strong>{" "}
        <a href="https://www.cribdesk.ai">{"https://www.cribdesk.ai"}</a>
        <br />
        <strong>{"Email:"}</strong>{" "}
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
      </p>
      <p>
        <strong>{"Privacy and Data Deletion Requests:"}</strong>
        <br />
        <a href="mailto:hello@cribdesk.ai">{"hello@cribdesk.ai"}</a>
      </p>
      <p>
        <strong>{"Suggested Email Subject:"}</strong>
        {
          " Privacy Request / Data Deletion Request / Meta Data Deletion Request"
        }
      </p>
      <p>
        {
          "We are committed to reviewing privacy inquiries and responding in accordance with applicable laws and platform requirements."
        }
      </p>
      <hr />
      <p>
        <strong>{"End of Privacy Policy"}</strong>
      </p>
    </LegalPage>
  );
}
