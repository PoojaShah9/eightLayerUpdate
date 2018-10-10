
//const fs = require('fs');
//dialog module
// const {dialog} = require('electron').remote

// var basepathOfJson = localStorage.getItem("basePath")

// alert("basePath = "+basepathOfJson)
// var newstr = basepathOfJson.replace('eightLayer.exe', 'JsonInput.json');
// console.log(newstr);
// let path = "/home/empower/eightLayerSuperAdmin/src/assets/JsonInput.json";
// fs.readFile(path, 'utf-8', (err, data) => {
//   if(err){
//       console.log(err.message);
//       return;
//   }
// var myData =JSON.parse(data);
// console.log("myData ", myData.eight_layer_api_url_orgId);
// var org_id = myData.eight_layer_api_url_orgId

// localStorage.setItem("Orgnisation_id", org_id);
// //alert("basePath = "+localStorage.getItem("basePath"));

// });

//const fs = require('fs');//dialog module
var basePath = localStorage.getItem("ExePath");
//console.log("basePath=" + basePath);
const { dialog } = require('electron').remote
let path = basePath;
fs.readFile(path, 'utf-8', (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }
  var myData = JSON.stringify(data);
  console.log("myData ", myData.eight_layer_api_url_orgId);
  var org_id = myData.eight_layer_api_url_orgId
  localStorage.setItem("Orgnisation_id", org_id);
});
