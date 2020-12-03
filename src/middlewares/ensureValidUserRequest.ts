import { checkSchema } from 'express-validator'

export const setAddUserFormat = checkSchema({
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

export const setUpdateUserFormat = checkSchema({
  id: {
    errorMessage: 'User id must be provided',
    isLength: {
      options: { min: 3 }
    }
  },
  name: {
    errorMessage: 'Name should be at least 3 chars long',
    isLength: {
      options: { min: 3 }
    },
    trim: true,
    optional: true
  },
  birth_date: {
    errorMessage: 'Please enter a valid birth date',
    isDate: true,
    optional: true
  },
  email: {
    errorMessage: 'Please enter a valid email address',
    isEmail: true,
    optional: true
  },
  password: {
    errorMessage: 'Password should be at least 6 chars long',
    isLength: {
      options: { min: 6 }
    },
    optional: true
  }
})
