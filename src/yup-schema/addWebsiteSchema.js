import * as yup from "yup";

export const addWebsiteSchema = yup
  .object({
    website_url: yup
      .string()
      .matches(
        /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/[\w.-]*)*\/?(\?[\w-]+=[\w%&]*)?(#[\w-]+)?$/,
        {
          message: "Invalid URL",
        }
      )
      .required("Enter website url"),
    enter_website_description: yup
      .string()
      .required("Enter Website Description"),
    display_only_english: yup.boolean(),
    da: yup.string().required("Enter DA"),
    tf: yup.string().required("Enter TF"),
    rd: yup.string().required("Enter RD"),
    monthly_traffic: yup.string().required("Enter monthly traffic"),
    quantity: yup.string().required("Enter Quantity"),
    // email_message: yup.string().required("Enter message"),
    budget: yup.string().required("Enter Budget"),
    category: yup.array().required("Select more than 1 category"),

  })
  .required();
  

  export const MySiteSchema = yup
  .object({
    website_url: yup
      .string()
      .matches(
        /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/[\w.-]*)*\/?(\?[\w-]+=[\w%&]*)?(#[\w-]+)?$/,
        {
          message: "Invalid URL",
        }
      ).required()
    ,
    enter_website_description: yup
      .string()
     ,
    display_only_english: yup.boolean(),
    // da: yup.number(),
    // tf: yup.number(),
    // rd: yup.number(),
    // dr: yup.number(),
    // monthly_traffic: yup.string(),
    quantity: yup.string(),
    // email_message: yup.string().required("Enter message"),
    budget: yup.string(),
    category: yup.array().required("Select more than one Category").min(1,'Please select more than 1 Category'),
  })


  

export const createWebsiteSchema = yup
  .object({
    website_url: yup
      .string()
      .required("Website URL is required")
      .matches(
        /^https?:\/\/(?:www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
        {
          message: "Invalid URL",
          excludeEmptyString: true,
        }
      ),
    description: yup.string("Enter Description"),
    domain_authority: yup.string("Enter Moz Domain Authority"),
    domain_rating: yup.string("Enter Domain Rating"),
    monthly_traffic: yup.string("Enter Monthly Traffic"),
    monthly_traffic_location: yup
      .string("Enter Monthly Traffic Location")
      ,
    category: yup.array().required("Select more than 1 category"),
    language: yup.string().required("Enter Language"),
    price: yup.string().required("Enter Price"),
  })
  .required();
