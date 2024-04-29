import * as yup from 'yup';

export const couponSchema = yup
  .object({
    name: yup.string().required('Please enter your Email').min(2, 'Coupon name must be atleast two characters.'),
    type: yup.string(),
    description: yup.string().required('Coupon description is required'),
    // value: yup.number().when('type', {
    //   is: 'percent',
    //   then: yup
    //     .number()
    //     .transform((value) => (Number.isNaN(value) ? undefined : value))
    //     .nullable()
    //     .required('Value is required')
    //     .min(1, 'Minimum is 1')
    //     .max(100, 'Maximum is 100'),
    //   otherwise: yup
    //     .number()
    //     .transform((value) => (Number.isNaN(value) ? undefined : value))
    //     .nullable()
    //     .required('Value is required')
    //     .min(1, 'Minimum is 1')
    // }),
    value: yup.string().required('Value is required'),
    type: yup.string().required('Coupon is required'),
    duration: yup
      .string()
      .required('Coupon duration is required')
      .matches(/\d*(\.d*)?/g, 'Positive numbers only'),
    maxRedemptions: yup
      .string()
      .required('Status is required')
      .matches(/\d*(\.d*)?/g, 'Positive numbers only'),
    // status: yup.string(),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
  })
  .required();
