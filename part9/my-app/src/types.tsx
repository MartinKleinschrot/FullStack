interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartBaseWithDescription {
  type: "special";
  requirements: Array<string>;
}


type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;

export default CoursePart;