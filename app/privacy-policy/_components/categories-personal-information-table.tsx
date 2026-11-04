import React from "react";

export const CategoriesPersonalInformationTable = () => {
  return (
    <div className="w-full overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
      <table className="w-full border border-black min-w-[650px]">
        <thead>
          <tr className="" style={{ background: 'linear-gradient(95.72deg, rgb(242, 51, 234) 43.24%, rgb(250, 155, 246) 98.17%)' }}>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Categories of Data Disclosed
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Types of Entities to which Data was Disclosed
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Reason for Disclosure of Data
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Categories of Recipients
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Identifiers, Characteristic of protected classifications under
                California and federal law, Commercial Information,
                Internet/Network Activity, Professional, employment-related, and
                education Information
              </p>
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Please see Section 4.
              </p>
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Provision of the services, improvement of the services,
                informing current and potential mentees about courses and
                educational opportunities, to protect the security and integrity
                of our network and to detect, investigate and prevent activities
                that may violate our policies and terms, pose safety issues, or
                be fraudulent or illegal, for marketing, promotion, and
                advertising purposes, to comply with legal obligations and law
                enforcement requests, to establish, exercise, or defend legal
                claims, to conduct business planning, reporting, and
                forecasting; to conduct research, contests, surveys
              </p>
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                Please see Section 4.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
