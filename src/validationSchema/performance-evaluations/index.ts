import * as yup from 'yup';

export const performanceEvaluationValidationSchema = yup.object().shape({
  rating: yup.number().integer(),
  comments: yup.string(),
  employee_id: yup.string().nullable(),
});
