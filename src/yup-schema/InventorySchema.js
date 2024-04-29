import * as yup from 'yup';

export const selectWebsiteSchema = yup
    .object({
        website_name: yup.mixed().required('Please Select Website'),
    }).required();
