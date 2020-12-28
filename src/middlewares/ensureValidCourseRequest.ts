import { checkSchema } from 'express-validator'

export const setAddCourseFormat = checkSchema({
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
  positions: {
    errorMessage: 'Please enter an integer and positive positions number',
    isInt: true,
  },
  tags: {
    errorMessage: 'Please enter valid tags for this course',
    isLength: {
      options: { max: 200 }
    },
    optional: true
  },
  created_by: {
    errorMessage: 'Please inform who is creating the course',
    isLength: {
      options: { min: 3 }
    }
  }
})

export const setUpdateCourseFormat = checkSchema({
  id: {
    errorMessage: 'Course id must be provided',
    isLength: {
      options: { min: 3 }
    }
  },
  name: {
    errorMessage: 'Please enter a valid name',
    isLength: {
      options: { min: 3 }
    },
    optional: true
  },
  description: {
    errorMessage: 'Please enter a valid description',
    isLength: {
      options: { min: 3 }
    },
    optional: true
  },
  positions: {
    errorMessage: 'Please enter an integer and positive positions number',
    isInt: true,
    optional: true
  },
  tags: {
    errorMessage: 'Please enter valid tags for this course',
    isLength: {
      options: { max: 200 }
    },
    optional: true
  },
})

export const setDeleteCourseFormat = checkSchema({
  id: {
    errorMessage: 'Course id must be provided',
    isLength: {
      options: { min: 3 }
    }
  }
})
