const { Pool } = require("pg");

const pool = new Pool ({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const queryString = `
    SELECT teachers.name AS teacher, cohorts.name AS cohort, COUNT(assistance_requests.teacher_id) AS total_assistances
    FROM assistance_requests
    JOIN students ON students.id = student_id
    JOIN teachers ON teachers.id = teacher_id
    JOIN cohorts ON cohorts.id = students.cohort_id
    WHERE cohorts.name LIKE $1
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name;
`;

const cohortName = process.argv[2];
const values = [`%${cohortName}`];

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.cohort}: ${user.teacher}`
      )
    })
  })