export const dataActions = [
  {
    id: 'sendEmail',
    label: 'Send email',
  },
];
export const DropdownOptionsSendTo = [
  {
    id: 'sendToAll',
    label: 'Send to All',
  },
  {
    id: 'sendToAllPass',
    label: 'Send to All Pass',
  },
  {
    id: 'sendToAllFail',
    label: 'Send to All Fail',
  },
  {
    id: 'sendToCustom ',
    label: 'Send to Custom ',
  },
];
export const useTemplate = [
  {
    id: '1',
    templateForApproval: 'Template for approval',
    useThisTemplate: {
      title: 'Use this template',
      arrays: [
        {
          id: '1',
          title: 'Congratulations on Passing the Selection Process!',
          content:
            'Dear [Candidate Name], </br> I am pleased to inform you that you have successfully passed the selection process for the Potential developer at our company. We were impressed with your skills, qualifications, and experience, and believe that you would be an excellent addition to our team. </br> Once again, congratulations on passing the selection process, and we look forward to working with you in the near future!',
        },
      ],
    },
  },
  {
    id: '2',
    templateForApproval: 'Template for rejection',
    useThisTemplate: {
      title: 'Use this template',
      arrays: [
        {
          id: '2',
          title: 'Your application to Hectagon ',
          content:
            'Dear [Candidate Name],</br>Thank you for your application and for expressing interest in discussing career opportunities with McKinsey & Company.</br></br>After careful consideration of your application, we have concluded that we cannot proceed with your candidacy for the Associate position at this time.</br></br>Despite this decision, we would like to keep your information on file for possible opportunities with us in the future.If you are not interested, please feel free to let us know.',
        },
      ],
    },
  },
];
