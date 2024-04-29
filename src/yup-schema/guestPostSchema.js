import * as yup from 'yup';

export const domainMetricsSchema = yup
    .object({
        DA_MIN: yup.string().required('Enter min DA'),
        DA_MAX: yup.string().required('Enter max DA')
    }).required();
