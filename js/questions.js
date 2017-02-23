var formElement=null;
var respuestaSelect=null;
var nota = 0;
window.onload = function(){ 
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    corregirNumber();
       presentarNota();
   }
   return false;
 }
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML;
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 function corregirNumber(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("P1: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("P1: Te has pasado");
    else darRespuestaHtml("P1: Te has quedado corto");
  }
}
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 3");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}
function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe un número");
    return false;
   } 
