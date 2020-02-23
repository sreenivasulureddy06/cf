import * as HomeUtils from "../utils/HomeUtils.js";

export async function get(url) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    let data = await response.json();
    return data;
}
export function listAllImage(url, body) {
    post(url, body).then(data=>{
        HomeUtils.loadAllImages(data);
    });
}
export function listAllDesignImage(url, body) {
    post(url, body).then(data=>{
        HomeUtils.loadAllDesignImages(data);
    });
}
export async function postMultiPartFile(url, body) {
    let response = await fetch(url, {
        mode: 'no-cors',
        method: "POST",
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Accept: "application/json"
        },
        body: body
        });
}
export async function post(url, body) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: body
    });
    let data = {};
    if(response !== null && response !== undefined) {
        data = await response.json();
        return data;
    }
    return data;
}
export function uploadImages(url, body) {
    postMultiPartFile(url, body).then(response=>{
        HomeUtils.uploadImages();
    });
}
export function deleteImages(url, body) {
    post(url, body).then(res=>{
        HomeUtils.deleteImages();
    });
}
export function deleteDesignImages(url, body) {
    post(url, body).then(res=>{
        HomeUtils.deleteDesignImages();
    });
}
export function uploadDesignImages(url, body) {
    postMultiPartFile(url, body).then(response=>{
        HomeUtils.uploadDesignImages();
    });
}
export function submitRequest(url, body) {
    post(url, body).then(response => {
        alert("Thank you for submission of request, we will reach out you soon.");
        window.location.reload();
    });
}
export function listSubmissions(url, body) {
    post(url, body).then(response => {
        HomeUtils.listSubmissions(response);
    });
}