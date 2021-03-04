import Course from '../models/Course'

describe('Course tests', () => {

  it('should return all courses', () => {
    const courses: Course[] = [];
    const course: Course = new Course();

    course.id = 0;
    course.name = 'test';
    course.description = 'test';
    course.period = 'N';
    course.positions = 1;
    course.tags = [];
    course.created_at = new Date();
    course.updated_at = new Date();
    course.created_by = 1;

    courses.push(course);

    expect(courses[0]).toHaveProperty('id');
  });

});
