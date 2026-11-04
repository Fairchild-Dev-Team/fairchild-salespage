"use client"

import { useInView } from "react-intersection-observer"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ProcessSlideIn } from "@/components/motion/process-slide-in"

export default function TermsOfServicePage() {
  // triggerOnce keeps inView true after the first reveal.
  const { ref, inView: revealed } = useInView({
    triggerOnce: true,
    threshold: 0.12,
    rootMargin: "0px 0px -4% 0px",
  })

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
              Terms of Service
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
            <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
              These Terms of Service (the &ldquo;Terms&rdquo;) govern your use
              of the FairChild Institute websites and mobile applications owned
              or operated by FairChild Institute Inc., operating at 21423
              Monterrico Bay Drive, Cypress, TX 77433 USA and its affiliated
              entities and partners (&ldquo;FairChild Institute,&rdquo;
              &ldquo;we&rdquo; or &ldquo;us&rdquo;) - including the FairChild
              Institute website (the &ldquo;Site&rdquo;), related educational
              applications, interactive features, and resources offered by
              FairChild Institute on the Site, on mobile devices or through
              social media platforms (all of which are collectively referred to
              as the &ldquo;FairChild Institute Service&rdquo; or
              &ldquo;Service&rdquo;) - as well as your participation in the
              FairChild Institute educational programs offered through the
              Service.
              <br />
              <br />
              Please read these Terms carefully. By clicking &ldquo;I accept the
              terms of the User Agreement&rdquo; and &ldquo;Start
              Learning&rdquo;, you affirm that you have read and understand, and
              agree to be bound by, these Terms. If you do not agree to these
              Terms, you should not use the FairChild Institute Service.
              <br />
              <br />
              Your use of certain portions of the Service may be subject to
              additional terms and conditions (&ldquo;Additional Terms&rdquo;).
              Where Additional Terms apply, we will make them available for you
              to read through your use of that portion of the Service. By
              clicking &ldquo;I accept the terms of the User Agreement&rdquo;
              and &ldquo;Start Learning&rdquo;, you agree to be bound by the
              Additional Terms.
            </p>
            <h3 className="mt-8 text-lg font-bold text-gray-700 md:text-xl">
              The FairChild Institute Service
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              The FairChild Institute Service consists of Advanced Professional
              Training Programs offered by FairChild Institute
              (&ldquo;Programs&rdquo;). Upon successful completion of a Program,
              as determined by FairChild Institute, you will receive a
              certificate of completion (a &ldquo;Certificate&rdquo;) (if you do
              not successfully complete a course, you may be entitled to receive
              a certificate of attendance). You understand and acknowledge the
              following:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                THE FairChild Institute SERVICE PROGRAMS ARE NOT ACCREDITED.
                FairChild Institute is not an accredited institution and we do
                not confer formal degrees. A Certificate is not a formal degree.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                YOU WILL NOT RECEIVE ACADEMIC CREDIT FOR YOUR COMPLETION OF A
                PROGRAM. A Certificate will not entitle you to academic credit
                recognized by any other institution.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                COMPLETION OF A PROGRAM IS NOT A GUARANTEE OF FUTURE EMPLOYMENT
                OR ADVANCEMENT. While we believe that your completion of a
                FairChild Institute & Company Service program will enhance your
                knowledge base and skill set and make you a more well-rounded
                employee or employment candidate, we do not and cannot make any
                representations regarding your future employment or advancement.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                YOUR WORK MUST BE YOUR OWN. The work you perform and submit
                (e.g., homework assignments, quizzes, exams, and projects) will
                be your own work (except if you are permitted to work with
                others).
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                YOU MAY NOT SHARE YOUR WORK WITH OTHERS. You will not share
                FairChild Institute your work with anyone else or perform work
                for others (except if you are expressly permitted to share or
                collaborate).
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                NO CHEATING. You will not engage in any dishonest or improper
                conduct to improve your results or affect the results of other
                mentees.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                YOU MAY NOT CHANGE THE PROGRAM FOLLOWING ENROLLMENT, UNLESS
                AUTHORIZED BY FairChild Institute INC. Additional Fees may apply
                by FairChild Institute for changing the Program.
              </li>
            </ul>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Your Responsibilities
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
              In order to participate in the Program, you must register. When
              you register, FairChild Institute collects certain personal
              information about you. You agree that FairChild Institute may use
              information FairChild Institute obtains about you in accordance
              with the provisions of FairChild Institute&apos;s Privacy Policy.
              You also agree that the information you provide at registration
              and any time following registration will be true, accurate, and
              complete and you will update such information so that it remains
              up to date and accurate at all times.
              <br />
              To access the Service, you must sign up as a new FairChild
              Institute user via the Site. Upon registration you shall provide
              valid information requested in the registration form and shall
              update such information if necessary. FairChild Institute shall
              reserve the right to require at any time that you verify the
              information provided upon registration and to request supporting
              documents. In case provided information fails to conform to the
              information provided upon registration, FairChild Institute
              reserves the right to deny your access to the account.
              <br />
              As part of the registration process, you may be asked to select a
              username and password. FairChild Institute may refuse to grant you
              a username or revoke your username for any reason in its sole
              discretion, including if we determine that such username
              impersonates someone else, is illegal, vulgar, or otherwise
              offensive, or is protected by trademark or other proprietary
              rights law, or otherwise may cause confusion. You will be
              responsible for the confidentiality and use of your username and
              password and agree not to transfer or resell your use of or access
              to the Service to any third party.
              <br />
              YOU ARE ENTIRELY RESPONSIBLE FOR MAINTAINING THE CONFIDENTIALITY
              OF YOUR USERNAME AND PASSWORD AND FOR ANY AND ALL ACTIVITIES THAT
              ARE CONDUCTED THROUGH YOUR ACCOUNT. FairChild Institute WILL NOT
              BE LIABLE FOR ANY LOSS OR DAMAGE ARISING FROM YOUR FAILURE TO
              ADEQUATELY SAFEGUARD YOUR PASSWORD OR FOR ANY ACTIONS OCCURRING
              UNDER YOUR PASSWORD.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              We value the integrity of FairChild Institute community. To
              protect this community, you agree to comply with the Code of
              Conduct. In addition, you agree not to use the FairChild Institute
              Service to:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Violate any local, state, national or international law or
                regulation;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Transmit any material that is abusive, harassing, tortious,
                defamatory, vulgar, pornographic, obscene, libelous, invasive of
                another&apos;s privacy, hateful or racially, ethnically, or
                otherwise objectionable;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Stalk, harass, bully, or harm another individual;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Transmit any unsolicited or unauthorized advertising,
                promotional materials, junk mail, spam, chain letters, pyramid
                schemes, or any other form of solicitation;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Knowingly transmit any material that contains adware, malware,
                spyware, software viruses or any other computer code, files or
                programs designed to interrupt, destroy or limit the
                functionality of any computer software or hardware or
                telecommunications equipment;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Defeat or interfere with any security feature of the FairChild
                Institute & Company Service, or attempt to do so;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Impersonate any person or entity, or otherwise misrepresent your
                affiliation with a person or entity;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Interfere with or disrupt the FairChild Institute Service or
                servers or networks connected to the FairChild Institute
                Service, or disobey any requirements, procedures, policies, or
                regulations of networks connected to the FairChild Institute
                Service; or
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Alter or modify any content or component of the FairChild
                Institute, other than your User Content (as defined below).
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You also agree not to use or launch any automated system,
              including, without limitation, &ldquo;robots,&rdquo;
              &ldquo;spiders,&rdquo; &ldquo;offline readers&rdquo; or the like,
              that access the FairChild Institute & Company Service.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Fees and Payment, Refunds, Suspension, and Break Payment.
            </h3>
            <ol className="mt-4 ml-6 list-decimal space-y-3 text-sm leading-relaxed text-gray-700 lg:text-base">
              <li>
                You are responsible for paying the then-current tuition fees for
                the Programs you take.
              </li>

              <li>
                You must pay the applicable tuition fees in advance using the
                payment methods we make available.
              </li>

              <li>
                All charges and payments shall be in U.S. Dollars unless
                otherwise agreed by FairChild Institute.
              </li>

              <li>
                You may choose to pay your tuition fee in full or opt for
                recurring payments.
              </li>

              <li>
                By selecting recurring payments, you authorize FairChild
                Institute to automatically charge your payment method:
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  <li>First payment: on the purchase date</li>
                  <li>Second payment: 26 days from the Program Start date</li>
                  <li>
                    Subsequent payments: every 30 calendar days after the
                    previous payment
                  </li>
                </ul>
              </li>

              <li>
                Regardless of your payment method, schedule, program progress,
                suspension, or service usage, you remain fully responsible for
                paying your tuition fee. This obligation is non-suspendible and
                non-waivable.
              </li>

              <li>
                Tuition fees exclude all applicable taxes, fees, duties, and
                governmental charges. You are responsible for paying any such
                Taxes.
              </li>
            </ol>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Mentee&apos;s Right to Cancellation, Withdrawal, & Refunds
              Cancellation Policy & Refund Policy
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              If you cancel your enrollment in accordance with the terms below,
              all payments made by you, or on your behalf, will NOT be refunded.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Third-party financing, loans, and payment processing.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              If you finance FairChild Institute Service through a third-party
              loan or financial services provider, the contracts with those
              providers may prevail over these Terms on payment, refund, and
              cancellation provisions. You should independently and voluntarily
              decide whether you wish to finance FairChild Institute Service and
              contract with such providers. FairChild Institute has no control
              over your agreements with those providers. <br />
              <br />
              FairChild Institute does not provide you any loans, financial
              services, or payment processing. FairChild Institute does not
              represent any third-party providers. Nor any provider is
              authorized to represent FairChild Institute. FairChild Institute
              disclaims all warranties and liabilities in connection with any
              third-party loans or other financial services or any
              representations concerning those services.
              <br />
              <br />
              FairChild Institute reserves the right to decline payments made
              through loans or third-party financial providers. Alternatively,
              FairChild Institute shall approve such payments only after the
              loan has been approved by the respective financial provider.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Suspension and Termination by FairChild Institute.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              We may suspend your participation in the Program and/or you may
              receive a warning from us describing the nature of a given concern
              under the following circumstances:
            </p>
            <ol className="my-6 ml-6 list-[lower-alpha] space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                If you fail to pay your tuition fees or we are unable to process
                your payment;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                If you breach these Terms and/or the Code of Conduct;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                If you fail the Program deadlines for submitting tasks or
                projects; or
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                If you fail to sign the enrollment agreement or any other
                required paperwork before the Program Start Date and/or within
                14 calendar days following your receipt of the paperwork,
                whichever occurs earlier. Your suspension will last until
                complete elimination of the reason or circumstances causing such
                suspension. If you failed to fix the circumstances leading to
                your suspension within three business days following FairChild
                Institute&apos;s notice of suspension, of if you breach or
                violate these Terms or the Code of Conduct again after receiving
                a warning, FairChild Institute may permanently terminate your
                access to the program without refunding you any fees paid.
              </li>
            </ol>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Regardless of the reason for your suspension or break, you will
              continue to be charged during the time of your suspension/break
              until the cost of your Program is fully paid.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              <span className="font-bold text-gray-900">
                Request for Break:{" "}
              </span>
              You may also ask for a break from your studies for up to three
              months. In case of break, it is your responsibility to meet the
              Program deadlines and complete the Program on time.
              <br />
              You acknowledge and agree that FairChild Institute is authorized
              to terminate your right to complete the Program and to cancel your
              access to the Program in case of your failure to return to the
              studies following three months of the break. Your return to the
              studies will require new enrollment into the Program, without any
              discount or offset.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Regardless of the reason for your suspension or break, you will
              continue to be charged during the time of your suspension/break
              until the cost of your Program is fully paid.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              <span className="font-bold text-gray-900">
                Ownership of FairChild Institute Content, Restrictions on
                Use:{" "}
              </span>
              The content on the FairChild Institute Service, other than
              &ldquo;User Content&rdquo; or &ldquo;Third-Party Content&rdquo;
              (as defined below), including, without limitation, videos, clips,
              photos, text, software, scripts, graphics, sounds, music,
              interactive features and the like (collectively, the
              &ldquo;Content&rdquo;) and all trademarks, design marks, as well
              as certain names, logos and materials displayed on or through the
              FairChild Institute Service that constitute trademarks,
              tradenames, service marks or logos (the &ldquo;Marks&rdquo;) are
              owned by FairChild Institute or its affiliates or licensors and
              are subject to copyright, trademark and other intellectual
              property rights under U.S. and international laws.
              <br />
              Except as authorized by these Terms or as otherwise intended or
              authorized by FairChild Institute through the Service, you agree
              not to copy, download, stream, capture, archive, upload, publish,
              broadcast, sell, resell, modify, translate, decompile,
              disassemble, reverse engineer or exploit for any purposes the
              FairChild Institute Service or any portion of the FairChild
              Institute Service, including, without limitation, the Content and
              the Marks.
              <br />
              The FairChild Institute Service is provided for your personal use
              only. You must abide by all copyright notices, trademark notices,
              information, and restrictions contained in or associated with any
              Content. You must not remove, alter, interfere with, or circumvent
              any copyright, trademark or other proprietary notices marked on
              the Content or any digital rights management mechanism, device, or
              other content protection or access control measure associated with
              the Content.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              User Content
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              The FairChild Institute Service may enable users, among other
              things, to post and share work, make comments, post messages and
              other content to the FairChild Institute Service (collectively,
              the &ldquo;User Content&rdquo;). Such User Content will generally
              be available to all users of the FairChild Institute Service. User
              Content made in connection with a FairChild Institute competition
              or contest may be subject to Additional Terms that may differ from
              these Terms.
              <br />
              <br />
              When you provide FairChild Institute with a user submission, you
              grant to FairChild Institute and its affiliates and their
              successors and assigns, a non-exclusive, fully-paid, royalty-free,
              transferable, irrevocable, perpetual, worldwide license, with the
              right to grant sublicenses through multiple tiers of sublicensees,
              to display, publicly perform, distribute (including, without
              limitation, through third-party websites), store, transcode,
              broadcast, transmit, reproduce, edit, modify, create derivative
              works and otherwise use and reuse your User Content (or any
              portions or derivative works thereof) in any manner, in any medium
              now known or hereinafter created, for any purpose.
              <br />
              <br />
              Unless otherwise provided in any applicable Additional Terms, you
              acknowledge and agree that you have no expectation of compensation
              of any nature with respect to any User Content and that you shall
              not receive any compensation for any User Content.
              <br />
              <br />
              You acknowledge and agree that you have no expectation of
              confidentiality of any nature with respect to any User Content.
              You should not post or share any content to the FairChild
              Institute Service that you do not want to be viewed by others.
              FairChild Institute & Company reserves the right to display
              advertisements in connection with, and/or based upon, your User
              Content and otherwise in connection with the FairChild Institute
              Service.
              <br />
              <br />
              You represent and warrant that: (a) you own all rights in your
              User Content; and (b) your User Content does not infringe the
              copyright, trademark, patent or other intellectual property
              rights, privacy rights, publicity rights or any other legal or
              moral rights of any third party.
              <br />
              <br />
              You acknowledge that FairChild Institute does not necessarily
              pre-screen any User Content uploaded by you or other users of the
              FairChild Institute Service, but that FairChild Institute may
              pre-screen, or review after initial posting, Your User Content for
              a variety of reasons, including, without limitation, for
              compliance with these Terms and any Additional Terms. FairChild
              Institute reserves its right at its discretion to remove any User
              Content or block your access to FairChild Institute Services in
              case your User Content violates these Terms, any Additional Terms,
              or any applicable laws or regulations.
              <br />
              <br />
              FairChild Institute disclaims any and all liability in connection
              with any and all User Content, and you agree to waive any legal or
              equitable rights or remedies you may have against FairChild
              Institute with respect to such User Content.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Third-Party Projects. Third-Party Content.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute Service may enable third party companies doing
              business in the industry to provide you with real world projects
              related to the field of your training (the &ldquo;Third-Party
              Projects&rdquo;). Such third-party companies may provide you with
              the materials, data, or software to facilitate your project (the
              &ldquo;Third-Party Content&rdquo;).
              <br />
              <br />
              Third-Party Content may include all data files, device
              characteristics, written text, software, music, graphics,
              photographs, images, sounds, videos, messages, and any other like
              materials, in any format, which are obtained or derived from third
              party company other than FairChild Institute and made available to
              you through, within, or in conjunction with the Third-Party
              Projects.
              <br />
              <br />
              FairChild Institute does not pre-screen Third-Party Projects or
              Third-Party Content.
              <br />
              <br />
              You should independently and voluntarily decide whether you wish
              to perform any Third-Party Projects or obtain any Third-Party
              Content. Further, you have sole discretion and control to
              determine whether you wish to contract with any third-party
              company regarding the Third-Party Projects or Third-Party Content.
              FairChild Institute has no right to determine your agreements or
              interactions with any third-party company regarding the
              Third-Party Projects or Third-Party Content, but FairChild
              Institute retains the right to control the overall objectives of
              your training.
              <br />
              <br />
              You acknowledge and agree that FairChild Institute does not
              represent you or any third-party companies in relation to the
              Third-Party Projects or Third-Party Content, and these Terms of
              Use do not govern any rights, duties, or terms related to the
              Third-Party Projects or Third-Party Content. FairChild Institute
              is not a party to your agreement with the third-party companies
              regarding the Third-Party Projects or Third-Party Content, if any.
              Nothing in these Terms of Use or other contracts shall be
              construed to establish partnership, joint venture, or agency
              relationship between FairChild Institute and third-party companies
              in relation to the Third-Party Projects or Third-Party Content.
              <br />
              <br />
              FairChild Institute disclaims any liability in connection with any
              Third-Party Content or Third-Party Projects, and you agree to
              waive any legal or equitable rights or remedies you may have
              against FairChild Institute with respect to such Third-Party
              Content or Third-Party Projects.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">Feedback</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You agree that FairChild Institute and its affiliates are free to
              use for any purpose whatsoever, ideas, know-how, concepts,
              techniques, comments, criticisms, reports, or other feedback
              (collectively, &ldquo;Feedback&rdquo;) that you may voice about
              the Service including Feedback that you send to FairChild
              Institute or its affiliates.
              <br />
              You acknowledge and agree that you have no expectation of
              compensation or confidentiality of any nature, and that FairChild
              Institute has no duties to you (including any duty to compensate
              you for your Feedback), with respect to such Feedback.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Infringement Notice Procedures: Copyrights and Trademarks
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Copyright Infringement Notification. FairChild Institute respects
              the intellectual property rights of others. Upon proper notice,
              FairChild Institute will remove or disable content on the Service
              that violates copyright law and may suspend access to the
              FairChild Institute Service of any user who uses the FairChild
              Institute Service in violation of copyright law and may terminate
              the accounts of repeat infringers.
              <br />
              <br />
              FairChild Institute has implemented procedures for receiving
              written notification of claimed copyright infringement (each, a
              &ldquo;Notification&rdquo;) and for processing such claims in
              accordance with law.
              <br />
              <br />
              If you are the owner of any exclusive right under copyright laws,
              or are authorized to act on behalf of such an owner, and you
              believe your work has been copied in a way that constitutes
              copyright infringement, please send FairChild Institute copyright
              agent a Notification of claimed infringement with all of the
              following information:
            </p>
            <ol className="my-6 ml-6 list-[lower-alpha] space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Identification of the copyrighted work claimed to have been
                infringed, or, if multiple copyrighted works are covered by a
                single Notification, a representative list of such works;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Identification of the claimed infringing material and
                information reasonably sufficient to permit FairChild Institute
                to locate the material on the FairChild Institute Service;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Information reasonably sufficient to permit FairChild Institute
                to contact you, such as an address, telephone number, and, if
                available, an e-mail address;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                A statement by you that you have a good faith belief that the
                disputed use is not authorized by the copyright owner, its agent
                or the law;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                A statement by you, made under penalty of perjury, that the
                above information in your Notification is accurate and that you
                are the copyright owner or authorized to act on the copyright
                owner&apos;s behalf; and
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Your physical or electronic signature. Please provide us with a
                Notification that includes all the above enumerated information
                and e-mail or mail it to the following FairChild Institute
                copyright agent:
              </li>
            </ol>
            <div className="mt-4 ml-6">
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                FairChild Institute Inc.
              </p>
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                21423 Monterrico Bay Drive,
              </p>
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Cypress, TX 77433 USA
              </p>
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                E-mail: info@fairchildinstitute.com
              </p>
            </div>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Modifications to FairChild Institute Service
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute reserves the right to modify or discontinue
              the FairChild Institute Service with or without notice to you,
              including the right to cancel, interrupt, or reschedule any
              Program or to modify any course content or requirements. FairChild
              Institute shall not be liable to you should FairChild Institute
              exercise its right to modify or discontinue the FairChild
              Institute Service.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">Links</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              The FairChild Institute Service may contain links to Third-Party
              websites and other Internet resources that are not owned or
              controlled by FairChild Institute (“Third-Party Materials”).
              FairChild Institute&apos;s provision of a link to any Third-Party
              Materials is for your convenience only and does not signify
              FairChild Institute&apos;s endorsement of such other website or
              resource or its contents. <br />
              FairChild Institute SHALL HAVE NO RESPONSIBILITY OR LIABILITY FOR
              ANY CONTENT, INFORMATION, SOFTWARE, MATERIALS OR PRACTICES OF ANY
              THIRD-PARTY ACCESSED THROUGH THE FairChild Institute SERVICE OR
              ANY LINKED WEBSITE.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Disclaimer of Warranties
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              YOU USE THE FairChild Institute SERVICE AT YOUR SOLE RISK. THE
              FairChild Institute SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo;
              AND &ldquo;AS AVAILABLE&rdquo; BASIS. TO THE FULLEST EXTENT
              PERMITTED BY LAW, FairChild Institute AND ITS AFFILIATES EXPRESSLY
              DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
              WITH RESPECT TO THE FairChild Institute SERVICE (INCLUDING, BUT
              NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR USE OR PURPOSE AND NON-INFRINGEMENT).
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              <span className="font-bold text-gray-900">
                Without limiting:{" "}
              </span>
              the generality of the foregoing, you acknowledge and agree that
              our services shall not be tailored to your level of education or
              professional needs and shall be provided without any guarantees,
              conditions, warranties, or representations as to the services or
              their result. To the extent permitted by law, FairChild Institute
              and any third parties connected to FairChild Institute hereby
              expressly exclude all guarantees, conditions, warranties,
              representations, and other terms which might otherwise be implied
              by statute, common law, or the law of equity. FairChild Institute
              and its affiliates make no warranties or representations about the
              accuracy or completeness of Content available on or through the
              FairChild Institute Service or the content of any websites linked
              to the FairChild Institute Service and assume no liability or
              responsibility for any:
            </p>
            <ol className="my-6 ml-6 list-[lower-alpha] space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Errors, mistakes or inaccuracies of content or confidentiality;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Personal injury or property damage, of any nature whatsoever,
                resulting from your access to or use of the FairChild Institute
                Service;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Any unauthorized access to or use of our servers and/or any and
                all personal information and/or financial information stored
                therein (including any and all User Content);
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Any interruption or cessation of transmission to or from the
                FairChild Institute Service;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Any bugs, viruses, Trojan horses or the like which may be
                transmitted to or through the FairChild Institute Service by any
                third party;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                For any loss or damage of any kind incurred as a result of the
                use of any content posted, e-mailed, transmitted or otherwise
                made available on or through the FairChild Institute Service;
                and/or
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                If the services and Content do not meet Your educational needs.
                You are solely responsible for ensuring that the services comply
                with your professional goals and objectives and suit your
                current level of education and background.
              </li>
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              The provisions of this Section shall be applicable to all
              components of the FairChild Institute Service and the Content.
              SPECIFICALLY, FairChild Institute PROVIDES NO WARRANTIES OR
              REPRESENTATIONS, EXPRESS OR IMPLIED, WITH REGARD TO ANY
              THIRD-PARTY COMPONENTS OF THE SERVICES, INCLUDING BUT NOT LIMITED
              TO THIRD-PARTY PROJECTS OR THIRD-PARTY CONTENT, AND WILL NOT BE
              LIABLE FOR ANY FAILURE OF ANY THIRD-PARTY COMPONENT TO FUNCTION AS
              EXPECTED OR INTENDED. FairChild Institute is not responsible for
              any delays, delivery failures, or any other loss or damage
              resulting from the transfer of any data over communications
              networks and facilities, including the Internet, and you
              acknowledge that the FairChild Institute Service may be subject to
              limitations, delays, and other problems inherent in the use of
              such communications facilities.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              LIMITATION OF LIABILITY
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              TO THE EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT WILL
              FairChild Institute OR ITS OFFICERS, EMPLOYEES, DIRECTORS,
              SHAREHOLDERS, SUBSIDIARIES, AFFILIATES, AGENTS OR LICENSORS BE
              LIABLE UNDER ANY THEORY OF LIABILITY (WHETHER IN CONTRACT, TORT,
              STATUTORY OR OTHERWISE) FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO,
              DAMAGES FOR LOSS OF REVENUES, PROFITS, GOODWILL, USE, DATA OR
              OTHER INTANGIBLE LOSSES (EVEN IF SUCH PARTIES WERE ADVISED OF,
              KNEW OF OR SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES),
              RESULTING FROM YOUR (OR ANYONE USING YOUR ACCOUNT&apos;S) USE OF
              THE FairChild Institute SERVICE. <br />
              <br />
              TO THE EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT WILL
              FairChild Institute&apos;S LIABILITY TO YOU EXCEED THE AMOUNTS
              PAID BY YOU TO FairChild Institute FOR THE SERVICE.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Exclusions and Limitations
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You acknowledge and agree that FairChild Institute has based its
              pricing for the FairChild Institute Service in reliance upon the
              limitations of liability and disclaimers of warranties and damages
              in the Sections 11 and 12 above, and that such terms form an
              essential basis of the bargain between the parties. <br />
              <br />
              Some jurisdictions do not allow the exclusion of certain
              warranties or the limitation or exclusion of liability for
              incidental or consequential damages. Accordingly, some of the
              above limitations and disclaimers may not apply to you. To the
              extent FairChild Institute may not, as a matter of applicable law,
              disclaim any implied warranty or limit its liabilities, the scope
              and duration of such warranty and the extent of FairChild
              Institute&apos;s liability shall be the minimum permitted under
              such applicable law.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Indemnification
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You agree to indemnify, defend and hold harmless FairChild
              Institute , its subsidiaries, affiliates, officers, directors,
              employees, consultants and agents from and against any and all
              claims, liabilities, damages, losses, costs, expenses, fees
              (including reasonable attorney&apos;s fees and costs) that they
              may incur as a result of or arising from:
            </p>
            <ol className="my-6 ml-6 list-[lower-alpha] space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                any information (including, without limitation, your User
                Content, Feedback or any other content) you submit, post or
                transmit on or through the FairChild Institute Service or
                otherwise provide to us;
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                our violation of these Terms or any Additional Terms established
                by us; or
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                your violation of law or any rights of any other person or
                entity, including, without limitation, any copyright, patent,
                trademark, trade secret or other proprietary rights of any
                person or entity. FairChild Institute reserves the right, at
                your expense, to assume the exclusive defense and control of any
                matter otherwise subject to indemnification by you, in which
                event you will cooperate with FairChild Institute in asserting
                any available defenses.
              </li>
            </ol>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Minors, Ability to Accept Terms of Service
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              The FairChild Institute Service is not intended for children under
              18 years of age. If you are under 18 years of age you may not use
              the FairChild Institute Service.
              <br />
              <br />
              You affirm that you are the applicable age of majority in your
              jurisdiction of residence or older, or that you have obtained the
              consent of your parent or legal guardian to use the FairChild
              Institute Service, or that you are an emancipated minor.
              <br />
              Pursuant to 47 U.S.C. Section 230(d), FairChild Institute hereby
              notifies you that parental control protections (such as computer
              hardware, software, or filtering services) are commercially
              available that may assist in limiting access to material that is
              harmful to minors. Information regarding providers of such
              protections may be found on the Internet by searching
              &ldquo;parental control protection&rdquo; or similar terms.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Sanctions Compliance
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You represent, warrant, and undertake that with respect to this
              Agreement:
            </p>
            <ol className="my-6 ml-6 list-[lower-alpha] space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                You shall comply with all applicable trade, economic, and
                financial laws, and regulations, including those administered
                and enforced by Switzerland, United States, European Union and
                relevant Member States, the United Nations Security Council, or
                any other government bodies with jurisdictions relevant to this
                Agreement (collectively, &ldquo;Sanctions&rdquo;)
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Neither you nor your agents, representatives, employees, or
                other affiliates are in, or a resident or national of, any
                country that is subject to an export embargo, nor identified on
                any Sanctions lists, nor is owned or, where relevant under
                Sanctions, controlled by the same.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                You will not, directly or indirectly, engage in any unauthorized
                business or dealings with any persons under Sanctions or
                otherwise engage in any activities prohibited by Sanctions.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                You should promptly notify FairChild Institute of the occurrence
                of any fact or event that would render any representation or
                warranty in this Section incorrect or misleading.
              </li>
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You acknowledge and agree that FairChild Institute is entitled
              from time to time to request you to provide documents and
              information verifying that you are in compliance with the
              representations and warranties above, and/or that the transaction
              contemplated by this Agreement is permitted by domestic and
              foreign law, including Sanctions and embargoes law.
              <br />
              <br />
              FairChild Institute may immediately suspend or terminate this
              Agreement in case of any breach by you of any representation or
              warranty in this Section, or if FairChild Institute reasonably
              determines that it cannot perform its obligations under this
              Agreement due to Sanctions-related prohibitions, or if you refuse
              to provide documents and/or information at FairChild
              Institute&apos;s request, or if FairChild Institute reasonably
              determines that such provided documents and/or information are
              insufficient.
              <br />
              <br />
              Without limiting the generality of the foregoing, under no
              circumstances is the use of the FairChild Institute Service
              allowed by entities or individuals located, organized or residing
              in a country or territory of Cuba, Iran, North Korea, Crimea, and
              Syria.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Choice of Law, Arbitration. Waiver of Class Action.
            </h3>
            <ol className="my-6 ml-6 list-[lower-alpha] space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                These Terms of Use and the rights of the parties hereunder shall
                be governed by and construed in accordance with the laws of the
                State of Delaware, exclusive of conflict or choice of law rules.
                Any dispute, claim or controversy arising out of or relating to
                this Agreement or the breach, termination, enforcement,
                interpretation or validity thereof, including the determination
                of the scope or applicability of this agreement to arbitrate,
                shall be determined by arbitration in New York, New York before
                one arbitrator. The arbitration shall be administered by JAMS
                pursuant to its Comprehensive Arbitration Rules and Procedures
                and pursuant to its Mass Arbitration Procedures and Guidelines
                (provided that, with respect to the definition of &ldquo;Mass
                Arbitration&rdquo; as set forth in Procedure 1(c) thereof, the
                number of claimants shall be 50 or more) and in accordance with
                the Expedited Procedures in those Rules and any hearing shall be
                administered online by video conference. Judgment on the award
                may be entered in any court having jurisdiction. The parties
                shall maintain the confidential nature of the arbitration
                proceeding and the award, including the hearing, except as may
                be necessary to prepare for or conduct the arbitration hearing
                on the merits, or except as may be necessary in connection with
                a court application for a preliminary remedy, a judicial
                challenge to an award or its enforcement, or unless otherwise
                required by law or judicial decision. In any arbitration arising
                out of or related to these Terms of Use, the arbitrator(s) shall
                award to the prevailing party, if any, the costs and
                attorneys&apos; fees reasonably incurred by the prevailing party
                in connection with the arbitration. If the arbitrator(s)
                determine a party to be the prevailing party under circumstances
                where the prevailing party won on some but not all of the claims
                and counterclaims, the arbitrator may award the prevailing party
                an appropriate percentage of the costs and attorneys&apos; fees
                reasonably incurred by the prevailing party in connection with
                the arbitration. The arbitrator shall not have the power to
                award punitive damages against any party.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                BY ENTERING INTO THIS AGREEMENT, YOU HEREBY IRREVOCABLY WAIVE
                ANY RIGHT YOU MAY HAVE TO JOIN CLAIMS WITH THOSE OF OTHERS IN
                THE FORM OF A CLASS ACTION OR SIMILAR PROCEDURAL DEVICE. ANY
                CLAIMS ARISING OUT OF, RELATING TO, OR CONNECTED WITH THIS
                AGREEMENT MUST BE ASSERTED INDIVIDUALLY.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Batching. To increase the efficiency of administration and
                resolution of arbitrations, in the event 50 or more similar
                arbitration demands presented by or with the assistance or
                coordination of the same law firm or organization are submitted
                to JAMS or another arbitration provider (if JAMS is unavailable)
                against FairChild Institute within any 180 day period, the
                arbitration provider shall (i) administer the arbitration
                demands in batches of 50 demands per batch (to the extent there
                are fewer than 50 arbitration demands left over after the
                batching described above, a final batch will consist of the
                remaining demands); (ii) designate a single, different
                arbitrator for each batch (unless the parties agree otherwise);
                and (iii) provide for a single filing set of fees (for example,
                if JAMS is the arbitration provider, one filing fee, case
                management fee, and arbitrator compensation fee) due per side
                per batch. You agree to cooperate in good faith with FairChild
                Institute and the arbitration provider to implement such a
                &ldquo;batch approach&rdquo; or other similar approach to
                provide for an efficient resolution of claims, including the
                payment of single filing and administrative fees for batches of
                claims. This &ldquo;Batch Arbitrations&rdquo; provision shall in
                no way be interpreted as authorizing class arbitration of any
                kind. FairChild Institute expressly reserves its right to raise
                unique defenses as to each claimant in connection with this
                process.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Fees. Your responsibility to pay any JAMS filing,
                administrative, and/or arbitrator fees will be solely as set
                forth in the applicable JAMS Rules (as modified by Section 17(c)
                above). If, however, you are able to demonstrate that the costs
                of arbitration will be prohibitive for you as compared to the
                costs of litigation, FairChild Institute will reimburse as much
                of the filing, administration, and/or arbitrator fees as the
                arbitrator deems necessary to prevent the arbitration from being
                cost-prohibitive to you.
              </li>
            </ol>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Miscellaneous
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              These Terms and any Additional Terms, together with your
              Enrollment Agreement, constitute the entire and exclusive and
              final statement of the agreement between you and FairChild
              Institute and govern your use of the FairChild Institute. The
              failure of FairChild Institute to exercise or enforce any right or
              provision of these Terms or any Additional Terms shall not
              constitute a waiver of such right or provision. If for any reason
              any provision of these Terms or any Additional Terms is found to
              be unenforceable, that provision shall be enforced to the maximum
              extent permissible so as to give effect to the original intent of
              that provision, and the remainder of these Terms and any
              Additional Terms shall continue in full force and effect. The
              section titles in these Terms and any Additional Terms are for
              convenience only and have no legal or contractual effect
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Modifications to Terms
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute may, in its sole and absolute discretion,
              change these Terms from time to time. All changes to the Terms or
              the Privacy Policy will be effective when posted, and we will
              provide notification of such changes to you via the Service or
              contact information you may have provided to FairChild Institute
              upon registration. Your continued use of the Service following any
              changes to the Terms or the Privacy Policy will constitute your
              agreement to be bound by such changes. If you object to any such
              changes, your sole recourse shall be to stop using the FairChild
              Institute Service.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">Assignment</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute may, in its sole and absolute discretion,
              assign, transfer, charge, subcontract, or deal in any other manner
              with all or any of its rights or liabilities under these Terms
              without your consent. FairChild Institute is entitled to assign
              the rights to claim for your liabilities to third parties and
              submit necessary information about your outstanding liabilities.
            </p>
            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Complaint procedure
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              To initiate a complaint, please follow these steps:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Compose a written complaint outlining the specific nature of the
                issue you encountered.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Provide a detailed description of the problem, including any
                relevant circumstances.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                If applicable, attach any supporting documentation that may
                assist in our investigation. Please forward your complaint to
                the following address:
              </li>
            </ul>
            <div className="mt-4 ml-6">
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                FairChild Institute Inc.
              </p>
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                21423 Monterrico Bay Drive,
              </p>
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Cypress, TX 77433 USA
              </p>
              <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
                E-mail: info@fairchildinstitute.com
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
                Our team will promptly begin investigating your concern upon
                receipt. We will provide you with a reply within 30 days.
              </p>
            </div>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Program participation and mentee terms
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              The following terms apply to your participation in FairChild
              Institute programmes as a mentee, in addition to the Terms above.
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Conditions to Learning
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Mentees are expected to maintain professionalism, discipline, and
              active participation throughout their learning journey. To ensure
              a productive learning environment, mentees must:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Attend classes regularly and participate actively.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Complete assignments, quizzes, projects, and other required
                tasks within stipulated deadlines.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Maintain respectful conduct towards management, mentors,
                instructors, and fellow mentees.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Adhere to all programme guidelines, due process, and community
                standards.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Refrain from disruptive, unethical, or inappropriate behavior
                during classes and community interactions.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Failure to comply with these conditions may result in warnings,
              restricted access, suspension, or removal from the programme where
              necessary.
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Conditions to Graduation
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Mentees will only qualify for graduation upon successful
              completion of all programme requirements, which may include but
              are not limited to:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Satisfactory class participation and attendance.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Completion of all required assignments, projects, and
                assessments.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Active participation in mentorship and practical sessions where
                applicable.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Compliance with all academic, ethical, and community guidelines
                established by FairChild Institute.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute reserves the right to withhold graduation
              status, certificates, or programme completion recognition where
              the stated conditions have not been met.
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-700">Attendance</h3>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Mentees are expected to attend all live classes promptly and
                consistently.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Mentees may not join a live class later than 30 minutes after
                the scheduled start time.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Repeated lateness or absenteeism may affect participation
                records, certificate eligibility, graduation status, or
                continued access to programme benefits.
              </li>
            </ul>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Certificate Eligibility (Fairchild Institute Certificate
              Eligibility)
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              To qualify for the Fairchild Institute Certificate, mentees must
              satisfy all of the following requirements:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Minimum of 75% participation throughout the programme.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Consistent attendance in live classes and programme activities.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Completion of all assignments and required tasks.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Attempting all quizzes and assessments associated with the
                programme.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Failure to meet any of the above requirements may result in
              disqualification from certificate eligibility.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Certificates will only be issued to mentees who successfully
              fulfill all stipulated programme requirements and completion
              criteria.
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Service Level Agreement (SLA)
            </h3>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                As part of FairChild Institute&apos;s commitment to mentees, all
                class video recordings will be made available within 24 hours
                after each live session.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                While every effort will be made to maintain this timeline
                consistently, exceptional technical circumstances may
                occasionally result in minor delays.
              </li>
            </ul>

            <h4 className="mt-8 text-base font-semibold text-gray-700 md:text-lg">
              Registration Flow (Pre-Payment)
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Before proceeding to payment during registration, mentees should
              be presented with a concise Terms of Service summary, including
              the following:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Attendance and participation are mandatory.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Programme access is time-bound and automatically expires upon
                subscription expiry.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Sharing or redistribution of course materials is prohibited.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Certificates are issued only upon fulfillment of all eligibility
                requirements.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Mentees must maintain professional conduct throughout the
                programme.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                FairChild Institute reserves the right to modify, suspend, or
                cancel programmes where necessary.
              </li>
            </ul>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Resource &amp; Access Policy (Third-Party Projects Section)
            </h3>

            <h4 className="mt-8 text-base font-semibold text-gray-700 md:text-lg">
              Proprietary Resources &amp; Assets
            </h4>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                All FairChild Institute resources, materials, recordings,
                templates, assets, and learning content remain the intellectual
                property of FairChild Institute and are provided strictly for
                individual mentee use.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Sharing, forwarding, reproducing, distributing, or
                redistributing any programme content is prohibited under the
                single-user access agreement.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Unauthorized distribution or misuse of programme materials may
                result in access termination, certificate disqualification, or
                additional disciplinary actions.
              </li>
            </ul>

            <h4 className="mt-8 text-base font-semibold text-gray-700 md:text-lg">
              Access Duration Policy
            </h4>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Mentorship Courses include one (1) year of access from the date
                of enrollment.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Mentorship Programmes include six (6) months of access from the
                date of enrollment.
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Access is automatically restricted upon subscription expiry.
              </li>
            </ul>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Skills &amp; Values (Core Values at FairChild Institute)
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute promotes a culture built on professionalism,
              growth, and excellence. All mentees are expected to uphold the
              following core values:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Discipline
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Collaboration
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Teamwork
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Due Process
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Respect for Management
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Respect for Mentors
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Respect for Instructors
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Professional Communication
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Accountability
              </li>
              <li className="text-sm leading-relaxed text-gray-700 lg:text-base">
                Continuous Learning
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              Mentees are expected to demonstrate these values throughout their
              learning journey and interactions within the FairChild Institute
              ecosystem.
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Additional Terms
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute reserves the right to cancel any class,
              course, or programme with or without prior notice.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              FairChild Institute reserves the right to update, modify, or amend
              these Terms of Service at any time where necessary.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              All mentees are expected to comply with platform rules, community
              standards, and programme guidelines at all times.
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-700">
              Contact Information
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-700 lg:text-base">
              You may contact us at:
            </p>
            <p className="text-sm leading-relaxed font-semibold text-gray-700 lg:text-base">
              FairChild Institute Inc.,
            </p>
            <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
              21423 Monterrico Bay Drive,
            </p>
            <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
              Cypress, TX 77433
            </p>
            <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
              United States
            </p>
            <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
              Email: info@fairchildinstitute.com
            </p>
          </div>
        </ProcessSlideIn>
      </div>
      <div className="mx-auto w-full max-w-page px-6 pb-12 lg:px-[130px]">
        <SiteFooter revealed={revealed} />
      </div>
    </div>
  )
}
