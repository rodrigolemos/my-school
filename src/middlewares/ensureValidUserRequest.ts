import { checkSchema } from 'express-validator'

export const setUserFormat = checkSchema({
  name: {
    errorMessage: 'Name should be at least 3 chars long',
    isLength: {
      options: { min: 3 }
    },
    trim: true
  },
  birth_date: {
    errorMessage: 'Please enter a valid birth date',
    isDate: true
  },
  email: {
    errorMessage: 'Please enter a valid email address',
    isEmail: true
  },
  password: {
    errorMessage: 'Password should be at least 6 chars long',
    isLength: {
      options: { min: 6 }
    }
  },
  role: {
    errorMessage: 'Please enter a valid role',
    isLength: {
      options: { min: 3 }
    }
  }
})
