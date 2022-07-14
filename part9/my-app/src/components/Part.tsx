import CoursePart from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart}): JSX.Element => {
  switch (course.type) {
    case 'normal':
      return (
        <div>
          <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br/>
          <i>{course.description}</i>
          </p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <p>
            <b>{course.name} {course.exerciseCount}</b>
            <br/>
            <i>project exercises {course.groupProjectCount}</i>
          </p>
        </div>
      );
    case 'submission': 
      return (
        <div>
          <p>
            <b>{course.name} {course.exerciseCount}</b>
            <br/>
            <i>{course.description}</i>
            <br/>
            submit to {course.exerciseSubmissionLink}
          </p>
        </div>
      );
    case 'special': 
    return (
      <div>
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <br/>
          <i>{course.description}</i>
          <br/>
          required skills: {course.requirements.join(', ')}
        </p>
      </div>
    );
    default:
      return assertNever(course);
  }
};

export default Part;