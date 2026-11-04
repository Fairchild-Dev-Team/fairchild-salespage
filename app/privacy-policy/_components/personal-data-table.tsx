import React from "react";

export const PersonalDataTable = () => {
  return (
    <div className="w-full overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
      <table className="w-full border border-black min-w-[650px]">
        <thead>
          <tr className="" style={{ background: 'linear-gradient(95.72deg, rgb(242, 51, 234) 43.24%, rgb(250, 155, 246) 98.17%)' }}>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Subjects
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Category
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Users
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Registration data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Personal data that we need to create your account at FairChild Institute. This includes:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">full name;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">email;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">phone number;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">address;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">age;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">zip-code;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  other registration/authentication data.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Mentees
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Mentee data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                If you decide to participate in FairChild Institute courses, we
                may need to receive certain additional information about you. This
                may include:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  information about chosen courses;{" "}
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  attendance and progress on courses;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  feedback regarding courses;{" "}
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">payment status;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  information about working permit;{" "}
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  area of activities or occupation;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  employment status;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  highest degree or level of education and study subject;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">gender;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  the presence of children;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">degree.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Users, mentees, visitors of the website, participants of FairChild Institute events
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Other data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                When you use the Service or interact with FairChild Institute team
                or website, you may choose to provide us certain personal data
                about yourself. In particular, this is the case when you contact
                Service team on various matters or subscribe to informational or
                promotional materials about the Service. To do so, we may collect
                information about your name, age, and contact details. Please note
                that all these actions do not require registration.
              </p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Users, mentees, visitors of the website
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Cookie
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                FairChild Institute uses cookies on its platform to improve the
                quality of your user experience. A cookie is a commonly used small
                text file that the internet browser installs on your device when
                you visit a website, and the browser sends information on your
                visit back to the website when you revisit it. Information
                collected by cookies may include browser information, internet
                activity, and usage data.
              </p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Tutors
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Tutor data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                FairChild Institute makes available certain information about its
                tutors who participate in its educational courses. This includes:
              </p>

              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">full name;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">education;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  city of residence;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  area of activities;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  working experience.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Graduating Mentees
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Mentee data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Most (if not all) of which FairChild Institute may already have
                (but some personal data may have changed and be updated etc).
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
