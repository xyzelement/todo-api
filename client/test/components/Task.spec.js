import React from "react";
import { connect } from "react-redux";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Task from "../../src/components/Task";
import { mountWithState, shallowWithState } from "enzyme-redux";

Enzyme.configure({ adapter: new Adapter() });

const mapStateToProps = state => ({
  auth: state.auth,
  task: state.task,
  contexts: ["Work", "Home", "Phone"]
});

describe("Testing Task Component", () => {
  it("Edit mode calls makeEditMode, nothing else does", () => {
    const m = jest.fn();
    Task.prototype.makeEditMode = m;

    const ConnectedComponent = connect(mapStateToProps)(Task);

    const wrapper = mountWithState(<ConnectedComponent mode="work" />, {
      auth: { isAuthenticated: true },
      task: { done: false, context: [], hist: [{ on: new Date() }] }
    });
    expect(m.mock.calls.length).toBe(0);

    const wrapper2 = mountWithState(<ConnectedComponent mode="edit" />, {
      auth: { isAuthenticated: true },
      task: { done: false, context: [], hist: [{ on: new Date() }] }
    });
    expect(m.mock.calls.length).toBe(1);
  });

  it("toggleContext adds/removes contexts correctly", () => {
    var out = Task.toggleContext(["a", "b", "c"], "b");
    expect(out).toEqual(["a", "c"]);

    out = Task.toggleContext(["a", "b", "c"], "d");
    expect(out).toEqual(["a", "b", "c", "d"]);

    out = Task.toggleContext(["a"], "a");
    expect(out).toEqual(["a"]);
  });
});
