import * as yup from "yup";

export const PointsSchema = yup.object().shape({
    points: yup
      .string().required('Points is required').matches(/^[0-9]+$/, "Numbers only"),
      // .required("Email is required")
      // .email("Email must be a valid email address"),
    type: yup.string().required('Type is required')
  });