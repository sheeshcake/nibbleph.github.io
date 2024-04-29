import * as Yup from 'yup';

export const InternalSchema = Yup.object().shape({
  firstname: Yup.string().required('First name required'),
  lastname: Yup.string().required('Last name required'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
});
