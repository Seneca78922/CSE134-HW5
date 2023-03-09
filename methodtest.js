
setInterval(updateDate,1000);
export function initBtnListeners() {
    
    
    document.getElementById('postBtn').addEventListener('click',postBtnEvent);
    document.getElementById('getBtn').addEventListener('click',getBtnEvent);
    document.getElementById('putBtn').addEventListener('click',putBtnEvent);
    document.getElementById('deleteBtn').addEventListener('click',deleteBtnEvent);

}
export function updateDate() {
  let date = document.getElementById("date_time");
  date.value = new Date();
}
/*each button will set the method and action of the form, submit the form, grab the JSON response data and convert it to html*/
  //data from endpoint is JSON response to be parsed into string, put into output tag with id value of response
function createSubTable(output,currValue){
  let subTable = document.createElement("table");
  subTable.appendChild(document.createTextNode("{"));
    Object.entries(output).forEach(([key,value],index) => {
        let subRow = subTable.insertRow();
        let subKey = subRow.insertCell();
        let subValue = subRow.insertCell();
        subKey.innerHTML = JSON.stringify(key);
        
        subValue.innerHTML = JSON.stringify(value);
        if (index != Object.entries(output).length - 1) {subValue.append(",");}
    });
    subTable.appendChild(document.createTextNode("},\n"));
    currValue.appendChild(subTable);
}

function JSONToHTMLTable(response,method) {

    let outputArea = document.getElementById("response");
    outputArea.innerHTML = "<p>HTTP Response<p>"; //center this

    let JSONOutput = JSON.parse(response);
    let table = document.createElement("table");
    table.appendChild(document.createTextNode("{"));
    //table.appendChild(document.createTextNode("{"));
    Object.entries(JSONOutput).forEach(([key,value]) => {
      let currRow = table.insertRow();
      let currKey = currRow.insertCell();
      let currValue = currRow.insertCell();
      currKey.innerHTML = JSON.stringify(key);
      console.log(currKey.innerHTML);
      //currValue.innerHTML = JSON.stringify(value);
      if (key == "form") {
        createSubTable(JSONOutput.form,currValue);
      }
      else if (key == "headers") {
        createSubTable(JSONOutput.headers,currValue);
      }
      else if (key == "args") {
        createSubTable(JSONOutput.args, currValue);
      }
      else if (key == "files") {
        createSubTable(JSONOutput.args, currValue);
      }
      else {
        currValue.innerHTML = JSON.stringify(value);
        if (key != "url") {
           currValue.append(",");
        }
        
      }

  });
  table.appendChild(document.createTextNode("}"));

  outputArea.appendChild(table);
  


}
   
function sendHTTPRequest(method,urlString) { //maybe one for XMLHTTPRequest and one with fetch API
    let xhr = new XMLHttpRequest();
    xhr.open(method,urlString);
    //xhr.responseType = 'json';
    //let formData = new FormData(document.getElementById("form"));
    if (method == 'GET'){
      xhr.send(); //need to get form data and send it
    }
    else if (method == 'POST'){
      console.log(document.forms.form);
      let formData = new FormData(document.forms.form);
      xhr.send(formData);
    }
    else if (method == "PUT") {
      let formData = new FormData(document.forms.form);
      xhr.send(formData);
    }
    else {
      //DELETE
      xhr.send(null);

    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText); //remove 
        JSONToHTMLTable(xhr.responseText,method);
      }
  }
  
    
}
function postBtnEvent() {
   //only send form data in post request
   sendHTTPRequest('POST','https://httpbin.org/post');

  

}
function getBtnEvent() {
  //normally woudl do /get/idOfForm
     sendHTTPRequest('GET','https://httpbin.org/get');
}
function putBtnEvent() {
  //normally would do /put/idOfForm
  sendHTTPRequest('PUT','https://httpbin.org/put');
}
function deleteBtnEvent() {
  //normally would do /delete/idOfForm
  sendHTTPRequest('DELETE','https://httpbin.org/delete');
}