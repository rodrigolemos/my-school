import { checkSchema } from 'express-validator'

export const setEnrollmentFormat = checkSchema({
  user_id: {
    errorMessage: 'User id must be at an integer number',
    isLength: {
      options: { min: 3 }
    }
  },
  course_id: {
    errorMessage: 'Course id must be at an integer number',
    isLength: {
      options: { min: 3 }
    }
  }
})
