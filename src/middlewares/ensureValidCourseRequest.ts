import { checkSchema } from 'express-validator'

export const setCourseFormat = checkSchema({
  name: {
    errorMessage: 'Please enter a valid name',
    isLength: {
      options: { min: 3 }
    }
  },
  description: {
    errorMessage: 'Please enter a valid description',
    isLength: {
      options: { min: 3 }
    }
  },
  period: {
    custom: {
      errorMessage: 'Please enter a valid period (M, E, V)',
      options: (value, { }) => {
        // morning, evening, nightly
        return ['m', 'e', 'n'].indexOf(value.toLowerCase()) >= 0
      }
    }
  },
  created_by: {
    errorMessage: 'Please inform who is creating the course',
    isNumeric: true
  }
})
