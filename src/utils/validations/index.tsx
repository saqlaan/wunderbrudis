import * as yup from 'yup'

export const signupValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is Required'),
  firstname: yup
    .string()
    .required('First name is Required'),
  lastname: yup
    .string()
    .required('Last name is Required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  termsAccepted: yup
    .bool()
    .oneOf([true], 'Field must be checked')
})

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
  .string()
  .min(8, ({ min }) => `Password must be at least ${min} characters`)
  .required('Password is required'),
})