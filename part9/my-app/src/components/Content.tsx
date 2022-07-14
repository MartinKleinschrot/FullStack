import Part from './Part'
import CoursePart from '../types';

const Content = ({ courseParts }: { courseParts: Array<CoursePart>}) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} course={course}/>
      ))}
    </div>
  );
};

export default Content;