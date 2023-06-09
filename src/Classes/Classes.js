import React, { Component, Fragment } from "react";
import axios from "axios";
import Boxes from "../Shared/Boxes/Boxes";

export class Classes extends Component {
  state = {
    classes: [],
    loading: false,
    searchText: "",
  };
  getClasses = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://english-center.onrender.com/api/v1/classes`
      );
      this.setState({ classes: res.data.classes, loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
      alert("something went wrong, please try again later");
    }
  };

  goToAdd = () => {
    this.props.history.push("/Classes/Add");
  };

  goToEdit = (classId) => {
    this.props.history.push(`/Classes/Edit/${classId}`);
  };

  delete = async (classId, className) => {
    if (
      window.confirm(`Do You want to delete a subject with name ${className} ?`)
    ) {
      try {
        await axios.delete(
          `https://english-center.onrender.com/api/v1/class/delete/${classId}`
        );
        this.getClasses();
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };
  searching = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = async () => {
    if (this.state.searchText === "") return alert("Please insert something");
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://english-center.onrender.com/api/v1/classes/search/${this.state.searchText}`
      );
      this.setState({ loading: false });
      if (res.data.classes.length < 1) {
        return alert("Classes Not Found!");
      }
      console.log(res.data);
      this.setState({ classes: res.data.classes });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  goToDetails = (classId) => {
    this.props.history.push(`/Classes/Details/${classId}`);
  };
  componentDidMount() {
    this.getClasses();
  }
  render() {
    return (
      <Fragment>
        <Boxes
          searching={this.searching}
          search={this.search}
          items={this.state.classes}
          loading={this.state.loading}
          logo="Class"
          thisCategory="Classes"
          reportURL="/students-by-class"
          goToAdd={this.goToAdd}
          goToEdit={this.goToEdit}
          goToDetails={this.goToDetails}
          delete={this.delete}
        />
      </Fragment>
    );
  }
}

export default Classes;
