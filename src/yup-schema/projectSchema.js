import * as yup from 'yup';

export const projectSchema = yup
  .object({
    project_name: yup.string().required('Project name is required').min(2, 'Project name must be atleast two characters.'),
    subscription: yup.mixed().required('Subscription is required'),
    url_links: yup.array().of(
      yup.object().shape({
        link: yup.string(),
        anchor: yup.string(),
        type: yup.string()
      })
    ),
  })
  .required();

export const projectSchemaUpdate = yup
  .object({
    project_name: yup.string().required('Project name is required').min(2, 'Project name must be atleast two characters.'),
    subscription: yup.mixed().required('Subscription is required'),
    url_links: yup.array().of(
      yup.object().shape({
        link: yup.string().required("Link is required"),
        anchor: yup.string().required("Anchor is required"),
        type: yup.string().required("Type is required")
      })
    ),
  })
  .required();
  
export const createArticleSchema = yup
  .object({
    project_name: yup.string().required('Project name is required').min(2, 'Project name must be atleast two characters.'),
  })
  .required();
