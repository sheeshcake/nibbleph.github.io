import * as yup from "yup";

export const serverMaintenanceSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    alert_type: yup.string().required("Alert type is required"),
    feature: yup.array().of(
      yup.object().shape({
        desc: yup.string().required("Features is required"),
      })
    ),
    start_date: yup
      .date()
      .nullable()
      .required("Start date is required")
      .max(yup.ref("end_date"), "Start date must not be later than end date"),
    end_date: yup
      .date()
      .nullable()
      .required("End date is required")
      .min(yup.ref("start_date"), "End date must be after start date"),
    expected_time: yup.string().required("Time is required"),
    roles: yup
      .array()
      .of(yup.string()) // You can replace Yup.string() with the appropriate schema for role values
      .min(1, "Select at least one role")
      .required("Roles are required"),
  })
  .required();


export const createNotifySchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    selectAllUser: yup.boolean(),
    notifiedUser: yup.mixed().required("Select more than 1 user"),
    feature: yup.array().of(
      yup.object().shape({
        desc: yup.string().required("Features is required"),
      })
    ),
  })
  .required();

  export const createNotifySchemaExcludedNotifiedUser = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    selectAllUser: yup.boolean(),
    feature: yup.array().of(
      yup.object().shape({
        desc: yup.string().required("Features is required"),
      })
    ),
  })
  .required();
