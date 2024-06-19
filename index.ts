#! /usr/bin/env node

import inquirer from "inquirer";

//class Student
class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = []; //initilize empty array for course
    this.balance = 1000;
  }

  //method to enroll students  in a course
  enrollCourse(course: string) {
    this.courses.push(course);
    console.log(`You have successfully enrolled in ${course} course.`);
  }

  //method to view balance
  viewBalance() {
    console.log(`Balance for ${this.name} : $${this.balance}`);
  }
  //method for pay tuition fee
  payfee(amount: number) {
    this.balance -= amount;
    console.log(`$${amount}Fees paid successfully for ${this.name}`);
    console.log(`Remaining balance : $${this.balance}`);
  }
  //method for show status of student
  showStatus() {
    console.log(`ID : ${this.id}`);
    console.log(`Name : ${this.name}`);
    console.log(`Courses : ${this.courses.join(`,`)}`);
    console.log(`Balance : ${this.balance}`);
  }
}

// defining a student manager class to manage students
class Student_Manager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  // method to add a new student
  addStudent(name: string) {
    const student = new Student(name);
    this.students.push(student);
    console.log(
      `Student ${name} added successfully. Student ID :${student.id}`
    );
  }
  //method to enroll a student in a course
  enrollCourse( studentId: number, course: string) {
    const STUDENT = this.findStudent(studentId);
    if (STUDENT) {  
      STUDENT.enrollCourse(course);
      console.log(`${STUDENT.name} Enrolled successfully for ${course}.`);
    } else {
      console.log(`Student with ID ${studentId} not found.`);
    }
  }
  //method to view balance of a student
  viewBalance(studentId: number) {
    const STUDENT = this.findStudent(studentId);
    if (STUDENT) {
      STUDENT.viewBalance();
    } else {
      console.log(`Student with ID ${studentId} not found.`);
    }
  }
  //method to pay tuition fee for a student
  payFee(studentId: number, amount: number) {
    const STUDENT = this.findStudent(studentId);
    if (STUDENT) {
      STUDENT.payfee(amount);
    } else {
      console.log(`Student with ID ${studentId} not found.`);
    }
  }
  //method to show status of a student
  showStatus(studentId: number) {
    const STUDENT = this.findStudent(studentId);
    if (STUDENT) {
      STUDENT.showStatus();
    } else {
      console.log(`Student with ID ${studentId} not found.`);
    }
  }

  //method to find a student by ID
  findStudent(studentId: number) {
    return this.students.find((s) => s.id === studentId);
  }
}

//main function to run the program
async function main() {
  console.log("Welcome to student managment system by 'Ayesha'");
  console.log("-".repeat(50));
  const studentManager = new Student_Manager();

  //while loop to keep program running
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option",
        choices: [
          "Add a student",
          "Enroll in a course",
          "View student balance",
          "Pay fees",
          "Show student status",
          "Exit",
        ],
      },
    ]);

    //using switch case to handle  user choice
    switch (choice.choice) {
      case "Add a student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter student name",
          },
        ]); 
        studentManager.addStudent(name_input.name);
        break;
      case "Enroll in a course":
        let enroll_input = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter course name",
          }
        ]);
        studentManager.enrollCourse(
          enroll_input.studentId,
          enroll_input.course
        );
        break;
      case "View student balance":
        let balance_input = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          },
        ]);
        studentManager.viewBalance(balance_input.studentId);
        break;
      case "Pay fees":
        let pay_input = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter amount to pay",
          },
        ]);
        studentManager.payFee(pay_input.studentId, pay_input.amount);
        break;
      case "Show student status":
        let status_input = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          },
        ]);
        studentManager.showStatus(status_input.studentId);
        break;
      case "Exit":
        console.log("Exiting program...");
        process.exit();
    }
  }
}

//calling main function
main();
