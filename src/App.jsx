import { useEffect,useState } from "react";
import SubjectCard from "./components/SubjectCard";
import "./App.css";
function App() {
  const [subjects, setSubjects] = useState(() => {
  const savedSubjects = localStorage.getItem("subjects");

  return savedSubjects
    ? JSON.parse(savedSubjects)
    : [
  { id: 1, name: "DSA" },
  { id: 2, name: "React" },
  { id: 3, name: "DBMS" },
  { id: 4, name: "OOP" },
  { id: 5, name: "Aptitude" },
  { id: 6, name: "JavaScript" },
  { id: 7, name: "Computer Networks" },
  { id: 8, name: "Operating Systems" },
  { id: 9, name: "AI / ML" },
  { id: 10, name: "Projects" },
]
});
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(1);
  const [editingTaskId,setEditingTaskId]=useState(null);
  const [editTitle,setEditTitle]=useState("");
  function updateSubject(id, newName) {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === id ? { ...subject, name: newName } : subject,
      ),
    );
  }
  useEffect(() => {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}, [subjects]);
  function addTask() {
    if (taskTitle.trim() === "") return;
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        title: taskTitle,
        subjectId: selectedSubject,
        completed: false
      },
    ]);
    setTaskTitle("");
  }
  function toggleTask(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }
  function updateTask(taskId, newTitle) {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId
        ? { ...task, title: newTitle }
        : task
    )
  );
}
  function deleteTask(taskId) {
    setTasks((prevTasks) => (
      prevTasks.filter((task) => (
        task.id !== taskId
      ))
    )

    )
  }
  function clearAllTasks() {
  setTasks([]);
}
   const completedTasks = tasks.filter((task) => task.completed).length;
   const progress =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="dashboard">
      <div className="projectHeader">
  <h1>Study Command Center</h1>
</div>
      <div className="subjectGrid">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          id={subject.id}
          name={subject.name}
          updateSubject={updateSubject}
          tasks={tasks}
        />
      ))}
      </div>
      <div className="taskControls">
      <input
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
        placeholder="Enter Task..."
      />
      <select value={selectedSubject} onChange={(event) => (setSelectedSubject(Number(event.target.value)))}>
        {subjects.map((subject) => (
          <option value={subject.id} key={subject.id}>{subject.name}</option>
        ))}
      </select>
      <button className="addTaskButton" onClick={addTask}>Add Task</button>
   <button
   className="clearButton"
  disabled={tasks.length === 0}
  onClick={() => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      clearAllTasks();
    }
  }}
>
  Clear All
</button>
</div>
<div className="statistics">
      <div className="statCard">
        <p>Total Tasks</p>
        <p className="statNumber">{tasks.length}</p>
      </div>

      <div className="statCard">
        <p>Completed</p>
        <p className="statNumber">{completedTasks}</p>
      </div>

      <div className="statCard">
        <p>Pending</p>
        <p className="statNumber">
          {tasks.filter((task) => !task.completed).length}
        </p>
      </div>

      <div className="statCard">
        <p>Progress</p>
        <p className="statNumber">{progress}%</p>
      </div>

    </div>
<div className="taskControls">

      <p>Overall Progress: {progress}%</p>

      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

    </div>
      <div className="taskList">
  {tasks.map((task) => {
    const subject = subjects.find(
      (subject) => subject.id === task.subjectId
    );
   
    return (
      <div className="taskItem" key={task.id}>
        <span className="taskStatus" onClick={() => toggleTask(task.id)}>
          {task.completed ? "✅" : "❌"}
        </span>

        {editingTaskId === task.id ? (
  <input
    className="editTaskInput"
    value={editTitle}
onChange={(event) =>
  setEditTitle(event.target.value)
}
  />
) : (
  <span
    className={`taskTitle ${
      task.completed ? "completed" : ""
    }`}
  >
    {task.title}
  </span>
)}

        <span className="taskSubject">
          {subject.name}
        </span>
        {editingTaskId === task.id ? (
  <button
    className="editButton"
   onClick={() => {
  if (editTitle.trim() === "") return;

  updateTask(task.id, editTitle);
  setEditingTaskId(null);
  setEditTitle("");
}}
  >
    Save
  </button>
) : (
  <button
    className="editButton"
    onClick={() => {
  setEditingTaskId(task.id);
  setEditTitle(task.title);
}}
  >
    Edit
  </button>
)}
        <button className="deleteButton" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    );
  })}
</div>
    </div>
  );
}
export default App;
