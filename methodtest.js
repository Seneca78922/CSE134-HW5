

export function initFormMethods() {

}

export function postBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/post';
    document.querySelector('form').method = 'POST'; 

}
export function getBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/get';
    document.querySelector('form').method = 'GET'; 
}
export function putBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/put';
    document.querySelector('form').method = 'PUT'; 
}
export function deleteBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/delete';
    document.querySelector('form').method = 'DELETE'; 
}