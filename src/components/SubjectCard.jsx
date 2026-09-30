import { useState } from "react";
function SubjectCard({ id,name: subjectName ,updateSubject,tasks}) {
  const [name, setName] = useState(subjectName);
  const [isEditing, setIsEditing] = useState(false);
  const taskCount=tasks.filter((task)=>(task.subjectId === id)).length;
  const completedCount = tasks.filter(
  (task) => task.subjectId === id && task.completed
).length;
const subjectProgress =
  taskCount === 0
    ? 0
    : Math.round((completedCount / taskCount) * 100);
  return (
    <div className="subjectContainer">
      {isEditing ? (
        <>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button onClick={() => {
            updateSubject(id,name);
            setIsEditing(false)}}>Save</button>
        </>
      ) : (
        <>
          <p>{name}</p>
          <p>{taskCount === 1 ? "1 Task" : `${taskCount} Tasks`}</p>
          <p>
  {completedCount} / {taskCount} completed
</p>
<p>Progress: {subjectProgress}%</p>
<div className="progressBar">
  <div
    className="progressFill"
    style={{ width: `${subjectProgress}%` }}
  ></div>
</div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
export default SubjectCard;
