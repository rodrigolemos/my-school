import { checkSchema } from 'express-validator'

export const setEnrollmentFormat = checkSchema({
  user_id: {
    errorMessage: 'User id must be at an integer number',
    isNumeric: true
  },
  course_id: {
    errorMessage: 'Course id must be at an integer number',
    isNumeric: true
  }
})
