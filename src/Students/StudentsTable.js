import React, { Component } from "react";

import axios from "axios";

import Loader from "../UIElements/Loader/Loader";
import Intro from "../Shared/Intro/Intro";
import ControlsBar from "../Shared/ControlsBar/ControlsBar";
import MainTable from "../Shared/Table/Table";

class StudentsTable extends Component {
  state = {
    loading: false,
    students: null,
    classId: "",
    classes: [],
    searchText: "",
  };

  getStudents = async () => {
    try {
      this.setState({ loading: true });
      const res = await axios.get(
        "https://english-center.onrender.com/api/v1/students"
      );
      this.setState({ loading: false, students: res.data.students });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });

      alert("error");
    }
  };

  goToAdd = () => {
    this.props.history.push("/Students/Add");
  };

  goToEdit = (studentId) => {
    this.props.history.push(`/students/edit/${studentId}`);
  };

  goToDetails = (studentId) => {
    this.props.history.push(`/students/${studentId}`);
  };

  delete = async (studentId, studentName) => {
    if (
      window.confirm(
        `Are you sure you want to delete a student with name ${studentName} ?`
      )
    ) {
      try {
        await axios.delete(
          `https://english-center.onrender.com/api/v1/student/delete/${studentId}`
        );
        this.getStudents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  classChangeHandler = (e) => {
    this.setState({ classId: e.target.value });
  };

  addStudentToClassHandler = async (e, studentId) => {
    e.preventDefault();
    this.setState({ loading: true });
    // get the classId from the state
    const classId = this.state.classId;
    try {
      const body = { classId: classId, studentId: studentId };
      await axios.patch(
        `https://english-center.onrender.com/api/v1/class/addStudent`,
        body
      );
      this.getStudents();
    } catch (error) {
      alert(error.response.data.error);
      this.setState({ loading: false });
    }
  };

  getClassesForSelecting = async () => {
    try {
      const res = await axios.get(
        "https://english-center.onrender.com/api/v1/classes"
      );
      this.setState({ classes: res.data.classes });
    } catch (error) {
      alert("error");
    }
  };

  searching = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = async () => {
    if (this.state.searchText === "") return alert("Please insert something");
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://english-center.onrender.com/api/v1/students/search/${this.state.searchText}`
      );
      console.log("search -> res", response);
      this.setState({ loading: false });
      console.log(response.data.students);

      if (response.data.students.length < 1) {
        return alert("Students Not Found!");
      }
      this.setState({ students: response.data.students });
    } catch (error) {
      console.log("search -> error", error);
      alert(error.response.data.error);
    }
  };

  componentDidMount() {
    this.getClassesForSelecting();
    this.getStudents();
  }

  render() {
    return (
      <div>
        <Intro thisCategory="Students" logo="People" />
        <ControlsBar
          searching={this.searching}
          search={this.search}
          thisCategory="Students"
          adding={true}
          goToAdd={this.goToAdd}
          reportURL="/students-by-age"
        />
        {this.state.students && (
          <MainTable
            classId={this.state.classId}
            classes={this.state.classes}
            addStudentToClass={this.addStudentToClassHandler}
            classChangeHandler={this.classChangeHandler}
            students={true}
            view={true}
            options={true}
            heads={["FullName", "Email", "Age", "Gender", "Joined-At"]}
            body={["email", "age", "gender", "joinedAt"]}
            items={this.state.students}
            deleteItem={this.delete}
            goToEdit={this.goToEdit}
            goToDetails={this.goToDetails}
          />
        )}
        {this.state.loading && <Loader />}
      </div>
    );
  }
}

export default StudentsTable;
