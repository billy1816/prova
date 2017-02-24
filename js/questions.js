var formElement = null;
var secret = 0; //ahora se lee 23 de <answer>23</answer> suministrado en preguntas.xml
var respuesta = [];
var numpreguntas;
var answer;

//al cargar la página... 
window.onload = function() {

    

    //pide los datos, lee Preguntes.xml del servidor (por http)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "xml/Preguntes.xml", true);
    xhttp.send();
    
    
    
    //Para corregir gestionamos el contenido introducido en el formulario
    formElement = document.getElementById('myform');
    formElement.onsubmit = function() {
        var nota = 0;
        var numPregunta = 0;
        var i = 0;

        while (i < formElement.elements.length) {
            var answer = '';
            var tipus = formElement.elements[i].type;

            switch (tipus) {
                case 'radio':
                    var x = 1;
                    while (numPregunta == formElement.elements[i].id) {
                        if (formElement.elements[i].checked) {
                            answer = x;
                        }
                        i++;
                        x++;
                    }
                    break;

                case 'checkbox':
                    var c = 1;
                    while (numPregunta == formElement.elements[i].id) {
                        if (formElement.elements[i].checked) {
                            answer = answer.concat(c);
                        }
                        i++;
                        c++;

                    }
                    break;

                case 'select-multiple':

                    var numero = formElement.elements[i].options.length;
                    for (x = 0; x < numero; x++) {
                        if (formElement.elements[i].options[x].selected) {
                            answer = answer.concat(x + 1);
                        }
                    }
                    i++;
                    break;

                case 'text':
                    answer = formElement.elements[i].value;
                    i++;
                    break;

                case 'select-one':
                    answer = formElement.elements[i].selectedIndex + 1;
                    i++;
                    break;

                default:
                    i++;
                    break;

            }

            //alert("resposta " + numPregunta + " : " + answer);
            //alert("resposta correcta " + numPregunta + ": " + respuesta[numPregunta]);
            if (answer == respuesta[numPregunta]) {
                //alert('Has acertado');
                nota += 1;
            } else {
                //alert('Has fallado');

            }
            numPregunta++;
        }

        alert("Has tret un: " + nota);
          
        
        

    }
}

//funcion donde cogemos los datos del xml y los ponemos en el html 
function gestionarXml(dadesXml) {


    //Rellenamos p title y guardamos el número secreto
    var xmlDoc = dadesXml.responseXML;
    var formulari = document.getElementById("myform");
    numpreguntas = xmlDoc.getElementsByTagName("question").length; //cuantas opciones hay en el XML
    var resp = 0;

    //Bucle para rellenar todas las opciones de select

    for (i = 0; i < numpreguntas; i++) {

        var pregunta = document.createElement("P");
        var titolPregunta = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);

        pregunta.appendChild(titolPregunta);
        formulari.appendChild(pregunta);


        //option.text = xmlDoc.getElementsByTagName("option")[i].childNodes[0].nodeValue;
        var tipus = xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue;
        var entrada = document.createElement("input");

        switch (tipus) {
            case 'text':
                entrada.type = tipus;
                entrada.id = i;
                formulari.appendChild(entrada);
                break;

            case 'select':
                var selectSimple = document.createElement("select");
                //var numOpcions = xmlDoc.getElementById("option").length;
                var numOpcions = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option").length;

                for (j = 0; j < numOpcions; j++) {
                    var opcio = document.createElement("option");
                    var valorOpcio = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[j].childNodes[0].nodeValue;

                    opcio.setAttribute("value", j + 1);
                    opcio.setAttribute("name", i);
                    opcio.setAttribute("id", i);
                    var textOpcio = document.createTextNode(valorOpcio);
                    opcio.appendChild(textOpcio);

                    selectSimple.appendChild(opcio);
                }
                formulari.appendChild(selectSimple);
                break;

            case 'selectM':
                var numOpcions = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option").length;
                var selectMultiple = document.createElement("select");
                selectMultiple.multiple = true;
                selectMultiple.size = numOpcions;


                for (k = 0; k < numOpcions; k++) {
                    var opcio = document.createElement("option");
                    var valorOpcio = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[k].childNodes[0].nodeValue;

                    opcio.setAttribute("value", k + 1);
                    opcio.setAttribute("name", i);
                    opcio.setAttribute("id", i);
                    var textOpcio = document.createTextNode(valorOpcio);
                    opcio.appendChild(textOpcio);

                    selectMultiple.appendChild(opcio);
                }

                formulari.appendChild(selectMultiple);
                break;

            case 'checkbox':
                var numOpcions = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option").length;
                //var checkboxObject =document.createElement("checkbox");

                for (l = 0; l < numOpcions; l++) {
                    var opcio = document.createElement("option");
                    var valorOpcio = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[l].childNodes[0].nodeValue;

                    opcio.setAttribute("value", l + 1);
                    var textOpcio = document.createTextNode(valorOpcio);
                    opcio.appendChild(textOpcio);

                    //checkboxObject.appendChild
                    var input = document.createElement("input");
                    var label = document.createElement("label");
                    label.innerHTML = valorOpcio;
                    label.setAttribute("value", valorOpcio);
                    input.type = "checkbox";
                    input.name = l;
                    input.id = i;
                    formulari.appendChild(input);
                    formulari.appendChild(label);

                }
                //var checkboxObject = document.createElement("checkbox");
                //
                break;
            case 'radio':
                var numOpcions = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option").length;
                //var checkboxObject =document.createElement("checkbox");

                for (l = 0; l < numOpcions; l++) {
                    var opcio = document.createElement("option");
                    var valorOpcio = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[l].childNodes[0].nodeValue;

                    opcio.setAttribute("value", l + 1);
                    var textOpcio = document.createTextNode(valorOpcio);
                    opcio.appendChild(textOpcio);

                    //checkboxObject.appendChild
                    var input = document.createElement("input");
                    var label = document.createElement("label");
                    label.innerHTML = valorOpcio;
                    label.setAttribute("value", l + 1);
                    input.type = "radio";
                    input.name = i;
                    input.id = i;
                    formulari.appendChild(input);
                    formulari.appendChild(label);

                }
                //var checkboxObject = document.createElement("checkbox");
                //
                break;

        }


        respuesta[i] = xmlDoc.getElementsByTagName("answer")[i].childNodes[0].nodeValue;

    }
    
    var submita = document.createElement("input");
    submita.type = "submit";
    formulari.appendChild(document.createElement("br"));
    formulari.appendChild(submita);
    
}
