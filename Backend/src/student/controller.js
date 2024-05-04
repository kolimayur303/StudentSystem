const pool = require('../db');
const queries = require('./quereis')

// const getStudent = (req, res) => {
//     pool.query(queries.getStudents, (err, results)=> {
//         if(err){
//             res.status(400).json({status:400,msg:'Error',data:err.toString()});
//         }else{
//             res.status(200).json(results.rows);
//         }
//     });
// }

const getStudent = async (req, res) => {
    const { page, limit } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        // Fetch students with pagination
        const queryResult = await pool.query(`
            SELECT 
                students.id,
                students.name, 
                students.email, 
                students.date_of_birth, 
                students.age,
                marks.marks 
            FROM 
                students 
            LEFT JOIN
                marks 
            ON 
                students.id = marks.student_id
            ORDER BY students.id
            LIMIT $1 OFFSET $2
        `, [limit, offset]);
        const students = queryResult.rows;

        const totalCountQuery = await pool.query(`
            SELECT 
                COUNT(*) AS total_count
            FROM 
                students
        `);
        const totalCount = parseInt(totalCountQuery.rows[0].total_count);

        res.json({
            students,
            totalCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / parseInt(limit))
        });
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getStudentById = (req, res) => {
const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (err, results)=> {
        if(err){
            res.status(400).json({status:400,msg:'Error',data:err.toString()});
        }else{
            res.status(200).json(results.rows);
        }
    });
}

const addStudent = async (req, res) => {
    const student = req.body;
    const studentData = [student.name, student.email, student.age, student.dob];

    try {
        // Check if email already exists
        const emailExists = await pool.query(queries.checkEmailExits, [req.body.email]);
        if (emailExists.rows.length) {
            return res.status(200).send("Email already exists.");
        }

        pool.query(queries.addStudents, studentData);
        
        res.status(200).send("Student data added successfully.");
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).send("Error adding student data.");
    }
};

// Update a students information
const updateStudentById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body;

    try {
        const student = await pool.query(queries.getStudentById, [id]);
        if (student.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await pool.query(queries.updateStudentById, [name, age, email, dob, id]);

        res.status(200).json({ message: 'Student information updated successfully' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const removeStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (!results.rows.length) {
            return res.status(404).send("Student does not exist in the database");
        }

        pool.query(queries.removeStudents, [id], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            res.status(200).send("Student removed successfully.");
        });
    });
};


module.exports = {
    getStudent,
    getStudentById,
    addStudent,
    updateStudentById,
    removeStudentById
}