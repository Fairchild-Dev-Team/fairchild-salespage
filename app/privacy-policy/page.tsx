"use client"
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ProcessSlideIn } from "@/components/motion/process-slide-in"

import { BasicRightsDataTable } from "./_components/basic-rights-data-table"
import { CategoriesPersonalInformationTable } from "./_components/categories-personal-information-table"
import { PersonalCollectedDataTable } from "./_components/personal-collected-data-table"
import { PersonalDataTable } from "./_components/personal-data-table"
import { ProcessDataTable } from "./_components/process-data-table"

const prose = "text-gray-700 leading-relaxed text-sm lg:text-base"

export default function PrivacyPolicyPage() {
  const [revealed, setRevealed] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
    rootMargin: "0px 0px -4% 0px",
  })

  useEffect(() => {
    if (inView) setRevealed(true)
  }, [inView])

  return (
    <div className="min-h-screen bg-[#FEF5FE]">
      <SiteHeader sticky={false} />
      <section
        ref={ref}
        className="mx-auto w-full max-w-page px-6 pt-8 max-lg:px-6 lg:px-[130px]"
      >
        <div className="flex w-full flex-col gap-4">
          <ProcessSlideIn
            revealed={revealed}
            direction="right"
            delay={0.06}
            className="w-full"
          >
            <h1 className="text-center text-3xl font-semibold text-neutral-900 lg:text-left lg:text-6xl">
              Privacy Policy
            </h1>
          </ProcessSlideIn>

          <ProcessSlideIn
            revealed={revealed}
            direction="left"
            delay={0.12}
            className="w-full"
          >
            <p className="text-center text-sm text-[#525866] md:text-base lg:text-left">
              Updated on 16th April, 2026
            </p>
          </ProcessSlideIn>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-page flex-col gap-4 px-6 max-lg:gap-4 lg:gap-4 lg:px-[130px]">
        <ProcessSlideIn
          revealed={revealed}
          direction="bottom"
          delay={0.18}
          className="w-full"
        >
        <div className="mt-8 mb-8 md:mb-16">
          {/* ── Intro ── */}
          <div className={prose}>
            This Privacy Policy (the <b>"Privacy Policy"</b>) is designed to
            provide data subjects with information on the processing of their
            personal data (any information relating to them) in the context of
            usage of the FairChild Institute's Service (
            <a
              href="https://www.fairchildinstitute.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B88F55] underline underline-offset-2"
            >
              https://www.fairchildinstitute.com/
            </a>{" "}
            and web-resources connected with it) (<b>"Service"</b>), including
            under the Terms of Use accepted by the data subject (
            <b>"Agreement"</b>).
          </div>
          <br />
          <div className={prose}>
            This Privacy Policy is based on the provisions of data protection
            laws, which may be applicable in the country of your residence.
          </div>
          <br />

          {/* ── Controller ── */}
          <div className={prose}>
            <b>Controller</b>
            <br />
            Data controller with regard to personal data processed under this
            Policy is a company providing the Service under the Agreement.
            <br />
            For more details about the identity of the Data controller, please
            refer to the Agreement. Each of these companies is referred to as
            "FairChild Institute" or "we" in this Privacy Policy.
            <br />
            Data subjects can contact us on any questions relating to the
            processing of their personal data under this Privacy Policy by
            either of the following methods:
          </div>
          <ul className={`${prose} list-disc list-inside mt-1 pl-4`}>
            <li>
              Email:{" "}
              <a target="_blank" rel="noopener noreferrer" className="text-[#B88F55] underline underline-offset-2" href="mailto:info@fairchildinstitute.com">info@fairchildinstitute.com</a>
            </li>
          </ul>
          <br />

          {/* ── Categories ── */}
          <div className={prose}>
            <b>Categories of processed personal data</b>
            <br />
            The table below sets out the categories of personal data FairChild Institute collects and processes. FairChild Institute
            collects personal data only from the data subjects.
            <br />
            <br />
            <b>Data</b>
          </div>
          <br />
          <PersonalDataTable />
          <br />

          {/* ── Purposes ── */}
          <div className={prose}>
            <b>Purposes and Legal Bases for the Processing</b>
            <br />
            We process your personal data only when we have one of the legal
            bases mentioned below:
          </div>
          <ol className={`${prose} list-none pl-0 mt-2`}>
            <li className="pl-8 relative mb-2">
              <span className="absolute left-0 font-medium">3.1.</span>
              <b>Performance of the Agreement.</b> – We may process your
              personal data in order to provide you the Service under the
              Agreement.
            </li>
            <li className="pl-8 relative mb-2">
              <span className="absolute left-0 font-medium">3.2.</span>
              <b>Legitimate Interest.</b> – We may process your personal data
              when we (or a third party) has an interest in using your personal
              data in a certain way, which is necessary and justified in light
              of the possible risks.
            </li>
            <li className="pl-8 relative mb-2">
              <span className="absolute left-0 font-medium">3.3.</span>
              <b>Consent.</b> – Where required by applicable laws, we will
              process your personal data based on your consent.
            </li>
            <li className="pl-8 relative mb-2">
              <span className="absolute left-0 font-medium">3.4.</span>
              <b>Legal Obligations.</b> – When we must process your personal
              data to comply with applicable laws.
            </li>
          </ol>
          <div className={`${prose} mt-2`}>The table below sets out:</div>
          <ul className={`${prose} list-disc list-inside mt-2 pl-4`}>
            <li>
              FairChild Institute's purpose for processing your personal
              data;
            </li>
            <li>
              FairChild Institute's legal basis for each purpose under
              applicable law;
            </li>
            <li>
              categories of personal data which FairChild Institute uses for
              each purpose.
            </li>
          </ul>
          <br />
          <ProcessDataTable />
          <br />

          <div className={prose}>
            If applicable data protection laws allow processing of certain
            personal data only on the basis of your consent or other specific
            legal ground, we will obtain such consent or respective legal
            ground. If this is the case, the above table remains relevant only
            in part it is compatible with requirements of applicable data
            protection laws.
            <br />
            Thus, legal basis for processing your personal data may differ
            according to applicable laws in the country of your residence.
            <br />
            We do not process your personal data for other purposes that are not
            covered by this Privacy Policy.
          </div>
          <br />

          {/* ── Sharing ── */}
          <div className={prose}>
            <b>How We Share Your Personal Data</b>
            <br />
            <b>Information we share with third parties</b>
            <br />
            We disclose certain personal data to the following recipients to the
            extent required or permitted by applicable law and/or based on their
            legitimate and reasonable requests:
          </div>
          <ul className={`${prose} list-disc list-inside mt-2 pl-8`}>
            <li>
              Our tutors and academic staff to the extent required to provide
              the Services;
            </li>
            <li>
              Affiliate entities of FairChild Institute which are a part of
              the same group of companies to the extent required to provide the
              Services;
            </li>
            <li>
              Partners looking for educational and career opportunities for
              mentees;
            </li>
            <li>
              Service providers who assist us in providing the Services, such
              as: IT services, legal advisers, accountants, suppliers of payment
              processing services, providers of cloud services for hosting and
              storage of information related to the Service, sales and marketing
              services;
            </li>
            <li>
              Partners assisting us in gathering statistical and aggregated
              information about how users and mentees interact with the
              Service;
            </li>
            <li>
              Partners otherwise assisting in provision of the Service and
              achievement of other purposes mentioned in the section 3 of this
              Privacy Policy;
            </li>
            <li>
              Various public authorities if strictly required to respond to
              their legitimate formal inquiries and for the purpose of
              fulfilling legal obligations;
            </li>
            <li>Loans and financial services providers;</li>
            <li>
              Other third parties when it is required for compliance with
              applicable laws.
            </li>
            <li>
              In the event of transfer or assignment of our business,
              activities, assets and/or rights and obligations, in whole or in
              part, to third parties and/or affiliates, merger with a third
              party or corporate restructuring (including while conducting
              negotiations in connection with such transactions).
            </li>
          </ul>
          <br />
          <div className={prose}>
            These third-party providers will process your personal data only for
            the purpose of performing their functions and they may not use that
            data for any other purpose.
          </div>
          <br />

          {/* ── Payment ── */}
          <div className={prose}>
            <b>Payment Processing.</b>
            <br />
            When you purchase our courses or other products offered by FairChild Institute, we may forward you to the web-resources owned by
            external providers of payment services. When the payment is made, we
            will get information about your payment status only. Under no
            circumstances, we can have access, control, obtain or store
            information about your payment card, banking account or other
            payment details that may be requested by providers of payment
            services. FairChild Institute may not control or have access to
            any communication you may have with those third-party payment
            services providers. Please be aware that such processing may be
            governed by third party privacy policies not under our control.
          </div>
          <br />

          {/* ── Links ── */}
          <div className={prose}>
            <b>Links to Other Sites</b>
            <br />
            Our Privacy Policy is designed to advise you about how we collect,
            use, protect, and disclose the personal data. However, our Service
            may contain links to other sites that are not operated by us. These
            may include, among others, zoom services and other similar video and
            webinar conferencing platforms allowing our mentees to connect
            their classes and tuition with video, audio, phone, chat etc. via
            the internet and their supported device. These services are provided
            by third party providers which require separate registration by the
            user, and we have no control over their services and take no
            responsibility for them. Please note that this Privacy Policy does
            not govern the practices of such third parties, including our
            partners, third party service providers, and/or advertisers, even
            when those services are branded as, or provided on behalf of
            FairChild Institute. Information collected from you by others,
            such as third-party websites that you access through links on the
            websites, are governed by those entities' privacy policies. If you
            click a third-party link, you will be directed to that third party's
            site. We strongly advise you to review the privacy policies of every
            site you visit.
            <br />
            <br />
            WE HAVE NO CONTROL OVER AND ASSUME NO RESPONSIBILITY FOR THE
            CONTENT, PRIVACY POLICIES OR PRACTICES OF ANY THIRD-PARTY SITES AND
            SERVICES.
          </div>
          <br />

          {/* ── Transfers ── */}
          <div className={prose}>
            <b>
              How your Personal Data is Stored, Transferred, and Secured —
              Transfers to Other Countries
            </b>
            <br />
            We may transfer personal data internationally with FairChild Institute &amp;
            Company affiliated group companies, subcontractors and partners when
            carrying out the activities described in this Privacy Policy.
            <br />
            Whenever we transfer personal data internationally, we use tools to
            make sure the data transfer complies with applicable law.
            <br />
            We also identify and use additional tools to:
          </div>
          <ul className={`${prose} list-disc list-inside mt-2 pl-8`}>
            <li>
              Make sure the personal data transfer complies with applicable law;
            </li>
            <li>
              Help to give your personal data the same level of protection under
              applicable law;
            </li>
            <li>
              Identify whether public authorities of the third country may seek
              access to the data with or without the data importer&apos;s
              knowledge either via legislation, practice, or reported precedent.
            </li>
          </ul>
          <br />

          {/* ── Storage & Security ── */}
          <div className={prose}>
            <b>Storage of Personal Data</b>
            <br />
            We store personal data as long as it is required to achieve the
            purposes of the processing specified in section 3 of this Privacy
            Policy, unless there are specific longer retention periods that are
            defined by applicable laws. Anonymized, non-identifiable data may be
            retained and used by FairChild Institute without limitation.
            <br />
            If you wish to have any personal data removed from our databases,
            please contact us by sending a request with the use of contact
            details specified in Section 1 of this Privacy Policy.
          </div>
          <br />
          <div className={prose}>
            <b>How Personal Information is Secured</b>
            <br />
            As appropriate and as required by applicable law, we use security
            measures appropriate to the sensitivity of the information we
            collect, including physical, organizational, and technological
            protections. However, since no security system is impenetrable, we
            cannot guarantee the security of our databases, nor can we guarantee
            that information you supply will not be intercepted while being
            transmitted to us over the Internet.
            <br />
            Personal data may only be accessed by persons within our
            organization, or third parties identified in the Section 4 as set
            forth in this Policy.
          </div>
          <br />

          {/* ── Basic Rights ── */}
          <div className={`${prose} mb-4`}>
            <b>Basic Rights of Data Subjects</b>
            <br />
            <br />
            Please see Your rights and their descriptions in this table.
          </div>
          <BasicRightsDataTable />
          <br />

          <div className={`${prose} mt-4`}>
            To exercise their rights, subject to legal limitations, data
            subjects can contact us with the use of contact details specified in
            Section 1 of this Privacy Policy.
          </div>
          <br />
          <div className={prose}>
            <b>Withdrawal of Consent</b>
            <br />
            Where processing is based on consent, you have the right to withdraw
            consent at any time.
            <br />
            You can opt-out of receiving electronic communications at any time
            by opt-out method, e.g., replying "STOP" to SMS messages, clicking
            the unsubscribe link in emails, or contacting us directly at contact
            details specified in Section 1 of this Privacy Policy.
          </div>
          <br />
          <div className={prose}>
            <b>Right to Lodge a Complaint With a Supervisory Authority</b>
            <br />
            When provided by applicable laws, you have the right to lodge a
            complaint with a supervisory authority in the area of data
            protection in the country of your residence.
          </div>
          <br />
          <div className={prose}>
            <b>Necessity to Provide Personal Data</b>
            <br />
            We only collect such personal data that is necessary for us to
            perform our Service or for other purposes disclosed in the Section 3
            of the Policy.
            <br />
            However, please be aware that there are no general statutory or
            contractual requirements for data subjects to provide FairChild Institute with personal data processed under this Policy. Thus,
            this is a matter of your choice whether you wish to disclose any
            personal data to us.
          </div>
          <br />
          <div className={prose}>
            <b>Cookies</b>
            <br />
            We use &ldquo;cookies&rdquo; to help personalize and optimize your
            online experience and time online, including for storing user
            preferences, improving search results, tracking user trends and
            other general improvement of the Service.
            <br />
            You can turn cookies off in the settings of your web browser or
            mobile device.
          </div>
          <br />
          <div className={prose}>
            <b>Children's Privacy</b>
            <br />
            We do not knowingly or intentionally collect personal data through
            the Service from children under eighteen (18) years of age. If you
            are under eighteen (18) years of age, do not attempt to register for
            or use our Service, do not provide us any personal data about
            yourself. If you are a parent or guardian and you are aware that
            your child has violated this Privacy Policy and provided us personal
            data, please contact with the use of contact details specified in
            section 1 of this Privacy Policy.
          </div>
          <br />
          <div className={prose}>
            <b>Changes to this Privacy Policy</b>
            <br />
            We may change this Privacy Policy from time to time at our sole
            discretion. If so, we may notify the data subjects about these
            changes by an appropriate method. If there is no explicit
            notification, the data subjects may always review the up-to-date
            version of this Privacy Policy.
            <br />
            Any changes we make will be reflected in an update to our Privacy
            Policy and by revising the "last updated" date at the top of this
            Privacy Policy. You are advised to check back to this page
            periodically to learn of any changes made to our policies. Changes
            to this Privacy Policy are effective when they are posted on this
            page.
          </div>
          <br />

          {/* ── Accessibility ── */}
          <div className={prose}>
            <b>Difficulty Accessing this Privacy Policy</b>
            <br />
            Individuals with disabilities who are unable to usefully access our
            Privacy Policy online may contact us at the above-listed contact
            information to inquire how they can obtain a copy of our policy in
            another, more easily readable format. Under no circumstances, will
            we collect or otherwise process information about your health or
            other sensitive data about you in connection with such request.
          </div>
          <br />

          {/* ── State / Country ── */}
          <div className={prose}>
            <b>STATE/COUNTRY SPECIFIC PRIVACY POLICIES AND NOTIFICATIONS.</b>
            <br />
            <br />
            <b>A. Privacy Information for California Residents</b>
            <br />
            This section of the Privacy Policy applies only with regard to
            California residents. When applicable, this section shall prevail
            over all other parts of the Privacy Policy in case of discrepancies.
            <br />
            <br />
            <b>Personal Information Collected over the Last 12 Months</b>
            <br />
            Personal information we collected directly from you:
          </div>
          <br />
          <PersonalCollectedDataTable />
          <br />
          <div className={prose}>
            We do not sell your personal information to third parties. This
            includes, but is not limited to, personal information collected
            through text messages (SMS/MMS) and email communications.
          </div>
          <br />
          <div className={prose}>
            <b>How We Share Your Personal Information with Third Parties</b>
            <br />
            <b>
              Categories of Personal Information Disclosed over the last 12
              months
            </b>
          </div>
          <br />
          <CategoriesPersonalInformationTable />
          <br />
          <div className={prose}>
            <b>Information We Sell</b>
            <br />
            We do not sell your personal information to third parties. Please
            note that "sale" of personal information does not include those
            instances when such information is part of a merger, acquisition, or
            other transaction involving all or part of our business. If we sell
            all or part of our business, make a sale or transfer of assets, or
            are otherwise involved in a merger or other business transaction, we
            may transfer your personal information to a third party as part of
            that transaction. If such transaction materially affects the manner
            in which your personal information is processed, we will notify you
            of such change prior to its implementation.
          </div>
          <br />
          <div className={prose}>
            <b>Your California Privacy Rights</b>
            <br />
            We have in place policies and procedures to facilitate the exercise
            of privacy rights available to California residents under applicable
            law. If you are a California resident, you may be entitled to the
            following:
            <br />
            Right to Access: to have access to your personal information upon
            simple request – that is, you may receive a copy of such information
            upon receipt of a verifiable request, along with other information
            related to the collection or processing.
            <br />
            Disclosure of Direct Marketers: to have access upon simple request,
            and free of charge, the categories and names/addresses of third
            parties that have received personal information for direct marketing
            purposes. FairChild Institute does not share your personal
            information with third parties for their direct marketing purposes.
            Right to Information About Collecting, Selling, Sharing, or
            Disclosing Personal Information: upon receipt of a verifiable
            request, you may obtain a list of:
          </div>
          <ul className={`${prose} list-disc list-inside mt-2 pl-8`}>
            <li>
              The specific pieces of your personal information FairChild Institute holds;
            </li>
            <li>
              The categories of personal information collected about you, sold
              to third parties, or disclosed to third parties for business
              purposes;
            </li>
            <li>
              The categories of personal information sold within the last 12
              months;
            </li>
            <li>
              The categories of sources from which personal information is
              collected;
            </li>
            <li>
              The business or commercial purpose for collecting or selling
              personal information; and
            </li>
            <li>
              The categories of third parties with whom personal information is
              shared, sold, or disclosed for a business purpose.
            </li>
          </ul>
          <br />
          <div className={prose}>
            Right to Opt-Out of the Sale of Personal Information: California
            residents have the right to opt-out of the sale of their personal
            information under certain circumstances. Right to Deletion: to
            obtain the deletion of your personal information in the situations
            set forth by applicable data protection law and upon receipt of a
            verifiable request. Right to Non-Discrimination. As defined under
            relevant law, you have a right to non-discrimination in the services
            or quality of services you receive from us for exercising your
            rights.
            <br />
            Please contact with the use of contact details specified in section
            1 of this Privacy Policy in relation to exercising these rights.
            Note that we may ask you to verify your identity – such as by
            requiring you to provide information about yourself – before
            responding to such requests.
          </div>
          <br />
          <div className={prose}>
            <b>Submitting a Verifiable Request under the CCPA</b>
            <br />
            <br />
            As mentioned above, California residents have certain rights to
            access, delete, or otherwise exercise rights regarding their
            personal information under the California Consumer Privacy Act of
            2018 ("CCPA"). FairChild Institute will respond to an
            individual's "verifiable request" to exercise his or her rights
            under the CCPA – that is, where FairChild Institute has received
            a request purporting to be from a particular individual, and
            FairChild Institute has been able to verify the individual's
            identity. The need to verify an individual's identity is critical to
            protecting your information, and to ensuring that your information
            is not shared with anyone pretending to be you or someone who is not
            authorized to act on your behalf.
            <br />
            Submitting your request. You may submit a verifiable request with
            the use of contact details specified in section 1 of this Privacy
            Policy. We will ask you to provide information about yourself so
            that we can verify your identity as part of this process. This
            information may include your name, address, whether you have an
            account with FairChild Institute, and other information deemed
            necessary by us to reasonably verify your identity. Once we have
            your submission, we will compare the information you provided to the
            information we have about you to verify your identity. If necessary,
            we may ask for additional information if we have difficulty
            confirming your identity. We will not share your information or
            honor other requests in those situations where we are unable to
            confirm that a request for your information is a "verifiable
            request." We will not be able process your request if we cannot
            verify your identity.
            <br />
            Submitting a request through an authorized agent. Under California
            law a California resident can appoint an "authorized agent" to make
            certain verifiable requests upon their behalf, such as the right to
            know what information we collect about the consumer or to request
            deletion of the consumer's information. An authorized agent may
            submit a request by following the steps outlined above. An
            authorized agent must identify the consumer he or she is submitting
            a request on behalf of, and provide the information requested by
            FairChild Institute to verify the consumer's identity. We will
            also require the purported authorized agent to submit proof that he
            or she has been authorized by the consumer to act on the consumer's
            behalf.
            <br />
            Because the security and privacy of your information is paramount,
            we will ask that you identify and provide permission in writing for
            such persons to act as your authorized agent and exercise your
            applicable rights under California law in such situations. This may
            require us to contact you directly and alert you that an individual
            has claimed to be your agent and is attempting to access or delete
            your information. We will also independently verify your identity to
            ensure that an unauthorized person is not attempting to impersonate
            you and exercise your rights without authorization. We will not
            share your information or honor any other requests in those
            situations where you cannot or do not grant permission in writing
            for an identified authorized agent to act on your behalf, or where
            we cannot independently verify your identity.
          </div>
          <br />
          <div className={prose}>
            <b>Submitting a Request for Removal of Minor Information</b>
            <br />
            To request the removal of information about a minor from this site,
            parents or guardians may submit a request with the subject line
            "Removal of Minor Information." Such requests must come from the
            minor's parents or guardian; minors may not submit information to us
            via email.
            <br />
            Your submission should include the following information:
          </div>
          <ul className={`${prose} list-disc list-inside mt-2 pl-8`}>
            <li>The nature of your request;</li>
            <li>The identity of the content or information to be removed;</li>
            <li>Whether such content or information is found on the Site;</li>
            <li>
              The location on content or information on the Site (e.g.,
              providing the URL for the specific web page the content or
              information is found on);
            </li>
            <li>
              That the request is related to the "Removal of Minor Information;"
              and
            </li>
            <li>
              Your name, street address, city, state, zip code, and e-mail
              address.
            </li>
          </ul>
          <br />
          <div className={prose}>
            If we become aware that a minor has provided us personal data or
            otherwise used the Service in violation of the Privacy Policy, we
            will take steps to remove that information.
            <br />
            Pursuant to 47 U.S.C. Section 230(d), FairChild Institute hereby
            notifies you that parental control protections (such as computer
            hardware, software, or filtering services) are commercially
            available that may assist in limiting access to material that is
            harmful to minors. Information regarding providers of such
            protections may be found on the Internet by searching "parental
            control protection" or similar terms.
          </div>
          <br />
          <div className={prose}>
            <b>
              Our Policy on "Do Not Track" Signals under the California Online
              Protection Act
            </b>
            <br />
            We do not support Do Not Track. Do Not Track is a preference you can
            set in your web browser to inform websites that you do not want to
            be tracked. You can enable or disable "Do Not Track" by visiting the
            "Preferences" or "Settings" page of your web browser.
            <br />
            Third parties may collect data that relates to you. We cannot
            control third parties' responses to do-not-track signals or other
            such mechanisms. Third parties' use of data relating to you and
            responsiveness to do-not-track signals is governed by their
            respective privacy policies.
          </div>
          <br />
          <div className={prose}>
            <b>How to Contact Us/Submit a CCPA Inquiry</b>
            <br />
            If you are a California resident and have any questions about this
            Privacy Policy, our practices, or your personal information, please
            contact us via the contact information at the top of this Policy.
          </div>
          <br />
          <div className={prose}>
            <b>
              B. Privacy Information for Residents of Colorado, Utah, Virginia,
              and Nevada:
            </b>
            <br />
            Unless that contradicts to the law of the state of your residence,
            provisions of the Chapter A "Privacy Information for California
            Residents" will apply to the processing of your data. Please contact
            us whenever you have questions related to your rights or any other
            questions under this Privacy Policy by either of the methods set
            forth in the Section 1.
          </div>
          <br />
        </div>
        </ProcessSlideIn>
      </div>
      <div className="mx-auto w-full max-w-page px-6 pb-12 lg:px-[130px]">
        <SiteFooter revealed={revealed} />
      </div>
    </div>
  )
}
