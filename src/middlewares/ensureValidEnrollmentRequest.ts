import { checkSchema } from 'express-validator'

export const setEnrollmentFormat = checkSchema({
  user_id: {
    errorMessage: 'User id must be provided',
    isLength: {
      options: { min: 10 }
    }
  },
  course_id: {
    errorMessage: 'Course id must be provided',
    isLength: {
      options: { min: 10 }
    }
  }
})

export const setUpdateEnrollmentFormat = checkSchema({
  user_id: {
    errorMessage: 'User id must be provided',
    isLength: {
      options: { min: 10 }
    }
  },
  course_id: {
    errorMessage: 'Course id must be provided',
    isLength: {
      options: { min: 10 }
    }
  },
  approved_by: {
    errorMessage: 'Approved by id must be provided',
    isLength: {
      options: { min: 10 }
    }
  },
  status: {
    errorMessage: 'Status must be provided',
    isLength: {
      options: { min: 1, max: 1 }
    }
  }
})
