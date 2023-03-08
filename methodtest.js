

export function initBtnListeners() {
    document.getElementById('postBtn').addEventListener('click',postBtnEvent);
    document.getElementById('getBtn').addEventListener('click',getBtnEvent);
    document.getElementById('putBtn').addEventListener('click',putBtnEvent);
    document.getElementById('deleteBtn').addEventListener('click',deleteBtnEvent);

}
/*each button will set the method and action of the form, submit the form, grab the JSON response data and convert it to html*/
function JSONToHTMLTable(response) {

}
function sendHTTPRequest() { //maybe one for XMLHTTPRequest and one with fetch API

}
function postBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/post';
    document.querySelector('form').method = 'POST'; 
    //data from endpoint is JSON response to be parsed into string, put into output tag with id value of response

}
function getBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/get';
    document.querySelector('form').method = 'GET'; 
}
function putBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/put';
    document.querySelector('form').method = 'PUT'; 
}
function deleteBtnEvent() {
    document.querySelector('form').action = 'https://httpbin.org/delete';
    document.querySelector('form').method = 'DELETE'; 
}