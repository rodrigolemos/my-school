import { checkSchema } from 'express-validator'

export const setAddQuestionFormat = checkSchema({
  course_id: {
    errorMessage: 'Please enter a valid course_id',
    isLength: {
      options: { min: 3 }
    }
  },
  order: {
    errorMessage: 'Please enter a valid order',
    isInt: true,
  },
  question: {
    errorMessage: 'Please enter a valid question',
    isLength: {
      options: { min: 3 }
    }
  },
  alternatives: {
    errorMessage: 'Please enter valid alternatives',
    notEmpty: true,
  },
  answers: {
    errorMessage: 'Please enter valid answers',
    notEmpty: true,
  },
  created_by: {
    errorMessage: 'Please inform who is creating the question',
    isLength: {
      options: { min: 3 }
    }
  }
})

export const setDeleteQuestionFormat = checkSchema({
  id: {
    errorMessage: 'Please enter a valid id',
    isLength: {
      options: { min: 3 }
    }
  },
  course_id: {
    errorMessage: 'Please enter a valid course_id',
    isLength: {
      options: { min: 3 }
    }
  },
  order: {
    errorMessage: 'Please enter a valid order',
    isInt: true,
  },
})
