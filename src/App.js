import { useState } from "react";

let nextId = 4;

export default function StudentAPI() {
  const [students, setStudents] = useState([
    { id: 1, name: "Vidya K", course: "Full Stack" },
    { id: 2, name: "Nihal Shetty", course: "Data Science" },
    { id: 3, name: "Nandeesh S", course: "Cloud Computing" },
  ]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const addStudent = () => {
    if (!name || !course) return;
    setStudents([...students, { id: nextId++, name, course }]);
    setName("");
    setCourse("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif", padding: 20 }}>
      <h2>Student API</h2>

      <h4>GET /students</h4>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Course</th><th>DELETE /students/:id</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td><button onClick={() => deleteStudent(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>POST /students</h4>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: 8 }} />
      <input placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} style={{ marginRight: 8 }} />
      <button onClick={addStudent}>Add</button>
    </div>
  );
}
