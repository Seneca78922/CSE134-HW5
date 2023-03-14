
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
/*
Loop through each row of key,value pairs in JSON response and convert that into rows in an HTML table. 
Have nested tables for key value pairs for headers, args, form, etc. Append table to <output> area. 
*/
function JSONToHTMLTable(response,method) {
   
    let outputArea = document.getElementById("response");
    outputArea.innerHTML = "<p>HTTP Response<p>"; //center this

    let JSONOutput = JSON.parse(response);
    let table = document.createElement("table");
    table.appendChild(document.createTextNode("{"));
    
    Object.entries(JSONOutput).forEach(([key,value]) => {
      let currRow = table.insertRow();
      let currKey = currRow.insertCell();
      let currValue = currRow.insertCell();
      currKey.innerHTML = JSON.stringify(key);
      console.log(currKey.innerHTML);
      
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

function sendXMLHTTPRequest(method,urlString) {
  
    let xhr = new XMLHttpRequest();
    xhr.open(method,urlString);
    
    if (method == 'GET'){
      xhr.send(); 
    }
    //if post or put request, set some http request headers and send the form data to endpoint
    else if (method == 'POST' || method == 'PUT'){
      console.log(document.forms.form);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("X-Sent-By", "javascript");
      
      let id = document.forms.form.id.value;
      let article_name = document.forms.form.article_name.value;
      let article_body = document.forms.form.article_body.value;
      let date_time = document.forms.form.date_time.value;
      let formData =  `id=${id}&article_name=${article_name}&article_body=${article_body}&date_time=${date_time}`;
      xhr.send(formData);
    }
    else {
      //DELETE request, not sending any form data
      xhr.send(null);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        //console.log(xhr.responseText); 
        //If receive http response, then convert response from JSON into html table
        JSONToHTMLTable(xhr.responseText,method);
      }
  }
      
}
function postBtnEvent() {
   //only send form data in post request
   sendXMLHTTPRequest('POST','https://httpbin.org/post');

}
function getBtnEvent() {
  //normally would do /get/idOfForm
     sendXMLHTTPRequest('GET','https://httpbin.org/get');
}
function putBtnEvent() {
  //normally would do /put/idOfForm
  sendXMLHTTPRequest('PUT','https://httpbin.org/put');
}
function deleteBtnEvent() {
  //normally would do /delete/idOfForm
  sendXMLHTTPRequest('DELETE','https://httpbin.org/delete');
}