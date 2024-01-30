const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>  
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>  
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part, i) => <Part key={i} part={part.name} exercises={part.exercises} /> )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
  
    const total = parts.reduce( (s, p) => s + p.exercises, 0)
  
    return (
      <div>
        <b>total of {total} exercises</b>
      </div>  
    )
  }
  const Course = ({ courses }) => {
    return (
      <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )}
    </div>
    )
  }

  export default Course