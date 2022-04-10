import React from 'react'

const Header = ({ course }) =>{
    return(
        <h1>{course.name}</h1>
    )
} 

const Total = ({ course }) => {
    const initialValue = 0;
    const sum = course.parts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.exercises;
        }, initialValue);

    return(
        <p><b>total of {sum} exercises </b></p>
    )
} 

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map(part => 
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
      )
}

export default Course