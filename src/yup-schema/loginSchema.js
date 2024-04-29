import * as yup from "yup";

export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

export const RegisterSchema = yup.object().shape({
  first_name: yup.string().required("First name required"),
  last_name: yup.string().required("Last name required"),
  // password: yup.string().required("Password required"),
  country: yup.string().required("Country is required"),
  business: yup.string().required("Business is required"),
  phone_number: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Your password must be at least 8 characters.")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      getCharacterValidationError("special character")
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const updateUserSchema = yup.object().shape({
  first_name: yup.string().required("First name required"),
  last_name: yup.string().required("Last name required"),
  country: yup.string().required("Country is required"),
  business: yup.string().required("Business is required"),
  phone_number: yup.string().nullable().required("Phone number is required"),
  role: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
});

export const createAccountSchema = yup.object().shape({
  first_name: yup.string().required("First name required"),
  last_name: yup.string().required("Last name required"),
  // business: yup.string().required("Business is required"),
  user_type: yup.string().required("User type is required"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  country: yup.string().required("Country is required"),
});

export const ResetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
});

export const VerifyCodeSchema = yup.object().shape({
  code1: yup.string().required("Code is required"),
  code2: yup.string().required("Code is required"),
  code3: yup.string().required("Code is required"),
  code4: yup.string().required("Code is required"),
  code5: yup.string().required("Code is required"),
  code6: yup.string().required("Code is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const ListYourSiteSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must have a valid email address"),
  description: yup.string().required("Description is required"),
  monthly_traffic: yup.number().required("Monthly traffic is required"),
  domain_authority: yup.number().required("Domain Authority is required"),
  referring_domains: yup.number().required("Referring domains is required"),
});
