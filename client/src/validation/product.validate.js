import * as yup from 'yup';

export const productCreateSchema = yup.object({
  title: yup.string().trim().min(3).max(255).required(),
  description: yup.string().trim().required(),
  price: yup.number().positive().max(1000000).required(),
  stockQty: yup.number().min(0).max(1000),
  isSale: yup.boolean(),
  category: yup.string().required(),
});

export const productUpdateSchema = yup.object({
  title: yup.string().trim().min(3).max(255),
  description: yup.string().trim(),
  price: yup.number().positive().max(1000000),
  stockQty: yup.number().min(0).max(1000),
  isSale: yup.boolean(),
  category: yup.string(),
});