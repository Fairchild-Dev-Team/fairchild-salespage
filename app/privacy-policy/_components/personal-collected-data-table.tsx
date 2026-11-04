import React from "react";

export const PersonalCollectedDataTable = () => {
  return (
    <div className="w-full overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
      <table className="w-full border border-black min-w-[650px]">
        <thead>
          <tr className="" style={{ background: 'linear-gradient(95.72deg, rgb(242, 51, 234) 43.24%, rgb(250, 155, 246) 98.17%)' }}>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Categories of Data Collected
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Data collected from you and why it was collected
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>



            
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Identifiers
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Personal data that we need to create your account at FairChild Institute. This includes:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">Full name;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">Email;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">Phone number;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">Address;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Age (whether the user is under 18);
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">Zip-code;</li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Information about your authorization to work.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Characteristic of protected classifications under California or
              Federal law.
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Gender;
                  <ul className="list-disc list-inside mt-2">
                    <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                      Presence of children;
                    </li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Commercial information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Record of services purchased or considered for purchase from
                  FairChild Institute
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Geolocation Data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">None.</p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Financial Information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                None.** Note that we use third party payment processors to
                facilitate your payments and do not store your payment card
                information.
              </p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Biometric Data
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">None.</p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Audio, electronic, visual, thermal, olfactory, or similar
              information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">None.</p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Internet/Network Activity
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                As described in Section 11: Cookies
              </p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Professional or Employment-related Information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Depending on the category of the data subject as defined in
                Section 2, we may collect:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Area of activities or occupation;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Working experience;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Employment status;
                </li>
                <li className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  Authorization to work.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Education Information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">None.</p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Education Information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Highest degree or level of education and study subject.
              </p>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Device Information
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">None.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};