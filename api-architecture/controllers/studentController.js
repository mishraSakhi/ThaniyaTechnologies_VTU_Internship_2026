let students = [];
let idCounter = 1;

const getStudents = (req, res) => {
  res.json(students);
};

const addStudent = (req, res) => {
  const { name, age } = req.body;
  const student = { id: idCounter++, name, age };
  students.push(student);
  res.status(201).json(student);
};

const deleteStudent = (req, res) => {
  const { id } = req.params;
  students = students.filter((s) => s.id !== Number.parseInt(id, 10));
  res.json({ message: `Student ${id} deleted` });
};

module.exports = { getStudents, addStudent, deleteStudent };

