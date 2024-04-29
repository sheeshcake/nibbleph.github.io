import * as Yup from 'yup';

export const gettingStartedSchema = Yup.object().shape(
  {
    timezone: Yup.string().required('Timezone is required'),
    url: Yup.string()
      .nullable()
      .notRequired()
      .when('url', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url'
          ),
      }),
    businessName: Yup.string()
      .nullable()
      .notRequired()
      .when('businessName', {
        is: (value) => value?.length,
        then: (rule) => rule.min(2, 'Business name must be at least 2 characters.'),
      }),
    businessAddress: Yup.string()
      .nullable()
      .notRequired()
      .when('businessAddress', {
        is: (value) => value?.length,
        then: (rule) => rule.min(5, 'Business address is too short.'),
      }),
    phoneNumber: Yup.string()
      .nullable()
      .notRequired()
      .when('phoneNumber', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(
            /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
            'Phone number is not valid'
          ),
      }),
  },
  [
    // Add Cyclic deps here because when require itself
    ['phoneNumber', 'phoneNumber'],
    ['businessAddress', 'businessAddress'],
    ['businessName', 'businessName'],
    ['url', 'url'],
  ]
);
