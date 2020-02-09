import AbstractStore from "./AbstractStore";

class ReduceStore extends AbstractStore {
  constructor() {
    super();
    this.reduce = this.reduce.bind(this);
    this.history = [];
  }
  reduce(action, state) {}

  handleActions(action) {
    const newState = this.reduce(action, this.state);
    if (newState !== this.state) {
      this.history.push(this.state);
      this.state = newState;
    }
    this.emit("change");
  }
}

export default ReduceStore;
