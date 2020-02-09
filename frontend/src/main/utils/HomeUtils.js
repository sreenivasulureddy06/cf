import Dispatcher from "../stores/Dispatcher.js";

export function loadAllImages(data) {
    let type = "LIST_ALL_IMAGES";
    let payload = {
        data: data
    };
    Dispatcher.dispatch({
        type: type,
        payload: payload
    });
}

export function uploadImages() {
    let type = "UPLOAD_IMAGES";
    let payload = {
    };
    Dispatcher.dispatch({
        type: type,
        payload: payload
    });
}
export function deleteImages() {
    let type = "DELETE_IMAGES";
    let payload = {
    };
    Dispatcher.dispatch({
        type: type,
        payload: payload
    });
}
