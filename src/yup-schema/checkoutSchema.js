import * as yup from 'yup';

export const checkoutInfoSchema = yup
    .object({
        website_url: yup.string().required('Website url is required'),
        link_anchor_text: yup.string().required('Link Anchor Text is required'),

        suggestedarticletitle1: yup.string(),
        suggestedarticletitle2: yup.string(),
        suggestedarticletitle3: yup.string(),

        hasAuthorityLinks: yup.boolean().default(false),
        provideOwnContent: yup.string(),
        confirmProvideOwnContent: yup.string(),
        confirmProvideOwnContent: yup.string(),
        ownTitle: yup.string(),
        googleDriveLink: yup.string(),
        contentLength: yup.string(),
        daysSelect: yup.string(),
        request: yup.string(),

        authortylinks1: yup.string().when('hasAuthorityLinks', {
            is: true,
            then: () => yup.string().matches(/^https?:\/\/(?:www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/, {
                message: 'Invalid URL',
                excludeEmptyString: true
            }).required('Authority Link 1 is required'),
            otherwise: () => yup.string().matches(/^https?:\/\/(?:www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/, {
                message: 'Invalid URL',
                excludeEmptyString: true
            })
        }),

        authortylinks2: yup.string().matches(/^https?:\/\/(?:www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/, {
            message: 'Invalid URL',
            excludeEmptyString: true
        }),
        authortylinks3: yup.string().matches(/^https?:\/\/(?:www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/, {
            message: 'Invalid URL',
            excludeEmptyString: true
        }),

    }).required();


export const checkoutBillingInfo = yup
    .object({
        emailAddress: yup.string(),
        discount: yup.number(),
        storeCredit: yup.boolean(),
        termsAndCondition: yup.boolean(),
        guaranteed: yup.boolean(),
    }).required();

export const checkoutData = yup
    .object({
        quantity: yup.number().required('Quantity is required'),
    }).required();
