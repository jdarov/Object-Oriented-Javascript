

function createStudent(name, year) {
  return {
    name,
    year,
    courses : [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    returnCourseByCode(code) {
      return this.courses.find(course => course.code === code);
    },

    returnCourseByName(courseName) {
      return this.courses.find(course => course.name === courseName);
    },

    addNote(code, note) {
      const course = this.returnCourseByCode(code);
      if (!course) {
        console.log("No course matching that code. Did not log"); 
        return;
      }
      course.notes ??= [];
      course.notes.push(note);
    },

    viewNotes() {
      this.courses.forEach((course) => {
        if (course.notes?.length) console.log(`${course.name}: ${course.notes.join('; ')}`);
      })
    },

    updateNote(code, note) {
      const course = this.returnCourseByCode(code);

      if (!course) {
        console.log('Could not find matching course code');
        return;
      }

      course.notes = [note];
    }
  }
}
function createCourse(name, code) {
  return {
    name,
    code,
  };
}

const school = (() => {
  const students = [];
  const VALID_YEARS = new Set(['1st', '2nd', '3rd', '4th', '5th']);
  return {
    addStudent(name, year) {
      if (!VALID_YEARS.has(year)) {
        console.log(`${year} is an invalid year for ${name}`);
        return;
      }
      const student = createStudent(name, year);
      students.push(student);
      return student;
    },

    listStudents() {
      students.forEach(student => console.log(student));
    },

    getStudentByName(name) {
      return students.find(student => student.name.toLowerCase() === name.toLowerCase());
    },

    enrollStudent(name, courseName, courseCode) {
      const student = this.getStudentByName(name);
      if (!student) {
        console.log(`Student with name ${name} does not exist`);
        return;
      }
      const course = createCourse(courseName, courseCode);
      student.addCourse(course);
    },

    addGrade(studentName, courseName, grade) {
      const student = this.getStudentByName(studentName);
      if (!student) {
        console.log(`Student with name ${studentName} does not exist`);
        return;
      }
      const course = student.returnCourseByName(courseName);
      course.grade = grade;
      return course;
    },

    getReportCard(studentName) {
      const student = this.getStudentByName(studentName);
      if (!student) {
        console.log(`Student with name ${studentName} does not exist`);
        return;
      }
      student.courses.forEach(course => console.log(`${course.name}: ` + (course.grade ?? 'In progress')));
    },

    courseReport(courseName) {
      const grades = students.reduce((acc, student) => {
        const course = student.returnCourseByName(courseName);
        if (course && typeof course.grade === 'number') {
          acc.push({ name: student.name, grade: course.grade });
        }
        return acc;
      }, []);

      if (grades.length === 0) return undefined;

      console.log(`=${courseName} Grades=`);
      grades.forEach(({ name, grade }) => console.log(`${name}: ${grade}`));
      console.log(`---`);

      const avg =
        Math.round(grades.reduce((sum, g) => sum + g.grade, 0) / grades.length);
      console.log(`Course Average: ${avg}`);
    },
  };
})();

school.addStudent('Paul', '3rd');
school.addStudent('Mary', '1st');
school.addStudent('Kim', '2nd');
school.addStudent('Josh', '6th');

school.enrollStudent('Paul', 'Math', 101);
school.enrollStudent('Paul', 'Advanced Math', 102);
school.enrollStudent('Paul', 'Physics', 202);
school.enrollStudent('Mary', 'Math', 101);
school.enrollStudent('Kim', 'Math', 101);
school.enrollStudent('Kim', 'Advanced Math', 102);

school.addGrade('Paul', 'Math', 95);
school.addGrade('Paul', 'Advanced Math', 90);
school.addGrade('Mary', 'Math', 91);
school.addGrade('Kim', 'Math', 93);
school.addGrade('Kim', 'Advanced Math', 90);

school.getReportCard('paul');
school.courseReport('Math');
school.listStudents();
