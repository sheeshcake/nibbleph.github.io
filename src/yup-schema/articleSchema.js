import * as yup from 'yup';

export const createArticleSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    tags:  yup.mixed().required("Select more than 1 tags"),
    cover: yup.mixed()
  })
  .required();
