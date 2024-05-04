const getStudents = `
  SELECT 
    students.id,
    students.name, 
    students.email, 
    students.date_of_birth, 
    students.age,
    students.page_number, 
    students.page_size, 
    marks.marks 
  FROM 
    students 
    LEFT JOIN
    marks 
  ON 
    students.id = marks.student_id
`;

// const getStudents = `
// SELECT * FROM students
// `;


const getStudentById = "SELECT * FROM students WHERE id = $1";
const checkEmailExits = "SELECT s FROM students s WHERE s.email = $1";
const addStudents = "INSERT INTO students (name, email, age, date_of_birth) VALUES ($1, $2, $3, $4)";
const updateStudentById = "UPDATE students SET name = $1, age = $2, email = $3, date_of_birth = $4, updated_at = NOW() WHERE id = $5";
const removeStudents = "DELETE FROM students WHERE id = $1";

module.exports = {
    getStudents,
    getStudentById,
    checkEmailExits,
    addStudents,
    updateStudentById,
    removeStudents
}