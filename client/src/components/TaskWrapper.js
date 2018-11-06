import Task from "./Task";
import { connect } from "react-redux";
import * as actions from "../actions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    contexts: ["Work", "Home", "Phone"] //TODO: make this real!
  };
};

export default connect(
  mapStateToProps,
  actions
)(Task);
