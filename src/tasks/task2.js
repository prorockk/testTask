const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost", 
    user: "root",
    database: "test_database",
    password: ""
});

conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

const a =   `SELECT Student.FirstName, Student.LastName, COUNT(Student.StudentId) as count 
            FROM Student INNER JOIN Exams 
            ON Student.StudentId = Exams.StudentId
            WHERE Exams.Result < 3
            GROUP BY Student.StudentId HAVING count >= 2;`

const b =   `SELECT student._group, COUNT(*) as count
            FROM (
            SELECT Student.FirstName, Student.LastName, Student.StudentId, COUNT(*) as count 
            FROM Student INNER JOIN Exams 
            ON Student.StudentId = Exams.StudentId
            WHERE Exams.Result < 3
            GROUP BY Student.StudentId HAVING count >= 2) AS fail
            JOIN Student ON fail.StudentId = Student.StudentId 
            JOIN Exams ON Student.StudentId = Exams.StudentId 
            GROUP BY Student.StudentId 
            HAVING  count > 10;`

conn.querry(a, (result) => {
    console.log(result);
})

conn.querry(b, (result) => {
    console.log(result);
})