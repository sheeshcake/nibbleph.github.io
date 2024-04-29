import * as yup from 'yup';

export const LinkJuicePlansSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    price: yup
      .string()
      .required('Price is required')
      .matches(/^[0-9]+$/, 'Numbers only')
      .test('greaterThanZero', 'Value must be greater than zero', (value) => (value ? value > 0 : ' ')),
    links: yup
      .string()
      .required('Links is required')
      .matches(/^[0-9]+$/, 'Numbers only')
      .test('greaterThanZero', 'Value must be greater than zero', (value) => (value ? value > 0 : ' ')),
    description: yup.string().required('Name is required'),
  })
  .required();
