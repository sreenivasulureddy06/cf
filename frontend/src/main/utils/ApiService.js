import * as HomeUtils from "../utils/HomeUtils.js";

export function get(url) {
    const response = fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        HomeUtils.loadAllImages(data);
    });
}
export function listAllImage(url) {
    get(url);
}
export function postMultiPartFile(url, body) {
    fetch(url, {
        mode: 'no-cors',
        method: "POST",
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Accept: "application/json"
        },
        body: body
        }).then(function (res) {
            HomeUtils.uploadImages();
        }, function (e) {
            alert("Error submitting form!"+ e);
    });
}
export function post(url, body) {
    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: body
        }).then(function (res) {
            HomeUtils.deleteImages();
        }, function (e) {
            alert("Error submitting form!"+ e);
    });
}
export function uploadImages(url, body) {
    postMultiPartFile(url, body);
}
export function deleteImages(url, body) {
    post(url, body);
}