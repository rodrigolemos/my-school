import { checkSchema } from 'express-validator'

export const setAddUserFormat = checkSchema({
  name: {
    errorMessage: 'Name should be at least 3 chars long',
    isLength: {
      options: { min: 3 }
    },
    trim: true
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
  },
  contact: {
    errorMessage: 'Contact should be at least 3 chars long',
    trim: true,
    optional: true
  },
  bio: {
    errorMessage: 'Bio should be at least 3 chars long',
    trim: true,
    optional: true
  },
})

export const setDeleteUserFormat = checkSchema({
  id: {
    errorMessage: 'User id must be provided',
    isLength: {
      options: { min: 3 }
    }
  }
})