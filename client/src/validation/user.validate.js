import * as yup from 'yup';

const emailSchema = yup.string().trim().email();
const passwordSchema = yup.string().trim().min(5);
const nameSchema = yup.string().trim().min(5).max(255);

export const loginValidateSchema = yup.object({
  email: emailSchema.required(),
  password: passwordSchema.required("Пароль обов'язковий"),
});

export const registerValidateSchema = yup.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required("Пароль обов'язковий"),
});

export const updateValidateSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
