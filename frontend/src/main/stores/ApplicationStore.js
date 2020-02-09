import { EventEmitter } from 'events';
import Dispatcer from "../stores/Dispatcher.js";

let imagesList = {}
class ApplicationStore extends EventEmitter {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        this.dispatchToken = Dispatcer.register(this.dispatcherCallback.bind(this))
        this.emitChange = this.emitChange.bind(this);
        this.addChangeListener = this.addChangeListener.bind(this);
        this.removeChangeListener = this.removeChangeListener.bind(this);
        this.getAllImages = this.getAllImages.bind(this);
    }
    getAllImages() {
        return imagesList.images;
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
    dispatcherCallback(action) {
        switch (action.type) {
            case 'LIST_ALL_IMAGES':
                imagesList = action.payload.data;
                break;
            case 'UPLOAD_IMAGES':
                break;
            case 'DELETE_IMAGES':
            break;
        }
        let eventName = 'STORE_' + action.type;
        this.emitChange(eventName);
        return true;
    }
}
export default new ApplicationStore();