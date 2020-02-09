import { EventEmitter } from "events";
import Dispatcher from "./Dispatcher";

class AbstractStore extends EventEmitter {
  constructor() {
    super();
    this.handleActions = this.handleActions.bind(this);
    this.getState = this.getState.bind(this);
    Dispatcher.register(this.handleActions);
  }
  emitChange(eventName) {
    this.emit(eventName);
  }
  addChangeListener(eventName, callback) {
    this.on(eventName, callback);
  }
  removeChangeListener(eventName, callback) {
      this.removeListener(eventName, callback);
  }
}
export default new AbstractStore();
