import React from "react";

export const BasicRightsDataTable = () => {
  return (
    <div className="w-full overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
      <table className="w-full border border-black min-w-[650px]">
        <thead>
          <tr className="" style={{ background: 'linear-gradient(95.72deg, rgb(242, 51, 234) 43.24%, rgb(250, 155, 246) 98.17%)' }}>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Right
            </th>
            <th className="border border-black p-2 md:p-3 text-gray-700 text-left text-sm md:text-base font-semibold">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Access
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              You can ask FairChild Institute to confirm whether or not we
              process your personal data. If so, you can access these personal
              data and ask us to explain certain details of the processing.
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Rectification
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              You can ask us to correct inaccurate personal data concerning you.
              If it complies with the purposes of the processing, you can ask us
              to rectify incomplete or inaccurate personal data.
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Erasure (“right to be forgotten”)
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              You can ask us to erase personal data concerning you under
              applicable law. For example, this applies if (1) the personal data
              are no longer necessary in relation to the purposes for which they
              were processed; (2) you withdraw consent to the processing and
              there is no other legal ground for the processing; (3) the
              personal data have been unlawfully processed.
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Restriction on processing
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              You can ask us to mark the stored personal data with the aim to
              limit their processing in the future under applicable law. This
              applies if (1) you contest the accuracy of the personal data; (2)
              you ask to restrict the use of the personal data when their
              processing is unlawful; (3) you need personal data to protect your
              rights when FairChild Institute no longer needs the personal data;
              (4) you have objected the processing based on the legitimate
              interests pursued by us or by a third party.
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Objection to processing (if provided to the data subject under
              applicable laws)
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              You can object, on grounds relating to your particular situation,
              at any time to processing of personal data concerning you which is
              based on the legitimate interests pursued by FairChild Institute
              or by a third party. We shall no longer process the personal data
              unless we demonstrate compelling legitimate grounds for the
              processing which override your interests, rights and freedoms or
              for the establishment, exercise or defense of legal claims.
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              Portability (if provided to the data subject under applicable
              laws)
            </td>
            <td className="border border-black p-2 md:p-3 text-gray-700 align-top text-sm md:text-base">
              When the processing is based on your consent or on the agreement
              with you, you can receive personal data, which you have provided
              to FairChild Institute, in a structured, commonly used and
              machine-readable format and can freely transmit those data to
              another controller. Where technically feasible, the data subject
              can also ask FairChild Institute to transmit the personal data
              directly to another controller.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
