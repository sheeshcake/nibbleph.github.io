
import * as yup from "yup";

export const ListYourSiteSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Email must have a valid email address'),
    description: yup.string().required('Description is required'),
    monthly_traffic: yup.string().required('Monthly traffic is required'),
    domain_authority: yup.string().required('Domain Authority is required'),
    referring_domains: yup.string().required('Referring domains is required'),
  })