//URL parameterek keresese
var urlParams = new URLSearchParams(window.location.search);
var charId = urlParams.get("charId");

//API behuzas
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://rickandmortyapi.com/api/character/" + charId, true);

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        /*console.log(JSON.parse(xhr.responseText));*/
        Feldolgozas(JSON.parse(xhr.responseText));
    }
};

xhr.send(null);

//Feldolgozas
function Feldolgozas(character) {
    var kep = document.getElementById("kep");
    kep.setAttribute("src", character.image);
    kep.setAttribute("alt", character.name);
    kep.setAttribute("title", character.name);
    kep.setAttribute("class", "w-100 mb-5");

    document.getElementById("nev").appendChild(document.createTextNode(character.name));
    document.getElementById("gender").appendChild(document.createTextNode(character.gender));
    document.getElementById("status").appendChild(document.createTextNode(character.status));
    document.getElementById("location").appendChild(document.createTextNode(character.location.name));
    document.getElementById("origin").appendChild(document.createTextNode(character.origin.name));

    var color;

        switch(character.status){
            case "Alive":
                color = "green";
                break;

            case "Dead":
                color = "red";
                break;

            case "unknown":
                color = "black";
                break;
        }
        document.getElementById("status").setAttribute("style", "color: " + color)
};

document.getElementById("goBack").addEventListener("click", function () {
    window.history.back();
}, false);