

export function initBtnListeners() {
    document.getElementById('postBtn').addEventListener('click',postBtnEvent);
    document.getElementById('getBtn').addEventListener('click',getBtnEvent);
    document.getElementById('putBtn').addEventListener('click',putBtnEvent);
    document.getElementById('deleteBtn').addEventListener('click',deleteBtnEvent);

}
/*each button will set the method and action of the form, submit the form, grab the JSON response data and convert it to html*/
  //data from endpoint is JSON response to be parsed into string, put into output tag with id value of response
function JSONToHTMLTable(response) {

}
function sendHTTPRequest(method,urlString) { //maybe one for XMLHTTPRequest and one with fetch API
    let xhr = new XMLHttpRequest();
    xhr.open(method,urlString,true);
    xhr.responseType = 'json';
    //let formData = new FormData(document.getElementById("form"));
    xhr.send(); //need to get form data and send it
   // console.log(...formData);
    //remove this tester code
    xhr.onload = function() {
        if (xhr.status != 200) { // HTTP error?
          // handle error
          alert( 'Error: ' + xhr.status);
          return;
        }
        else {
            alert(xhr.response);
        }
      
        // get the response from xhr.response
      };
}
function postBtnEvent() {
   //only send form data in post request
  

}
function getBtnEvent() {
    
    sendHTTPRequest('GET','https://httpbin.org/get');
    JSONToHTMLTable();
}
function putBtnEvent() {
    
}
function deleteBtnEvent() {
    
}