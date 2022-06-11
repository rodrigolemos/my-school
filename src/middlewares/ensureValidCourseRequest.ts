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
  tags: {
    errorMessage: 'Please enter valid tags for this course',
    isLength: {
      options: { max: 200 }
    },
    optional: true
  },
  icon: {
    errorMessage: 'Please enter a valid icon',
    isLength: {
      options: { min: 3 }
    },
    optional: true
  },
  resources: {
    errorMessage: 'Please enter valid resources for this course',
    isLength: {
      options: { max: 200 }
    },
    optional: true
  },
  audience: {
    errorMessage: 'Please enter a valid audience',
    isLength: {
      options: { min: 3 }
    },
    optional: true
  },
  knowledge: {
    errorMessage: 'Please enter a valid knowledge',
    isLength: {
      options: { min: 3 }
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
  tags: {
    errorMessage: 'Please enter valid tags for this course',
    isLength: {
      options: { max: 200 }
    },
    optional: true
  },
  icon: {
    errorMessage: 'Please enter a valid icon',
    isLength: {
      options: { min: 3 }
    },
    optional: true
  },
  resources: {
    errorMessage: 'Please enter valid resources for this course',
    isLength: {
      options: { max: 200 }
    },
    optional: true
  },
  audience: {
    errorMessage: 'Please enter a valid audience',
    isLength: {
      options: { min: 3 }
    },
    optional: true
  },
  knowledge: {
    errorMessage: 'Please enter a valid knowledge',
    isLength: {
      options: { min: 3 }
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
