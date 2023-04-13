//Gombra feliratkozas + Enter
document.getElementById("nevKereses").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("nevKeresesInditas").click();
    }
  });

  document.getElementById("nevKeresesInditas").addEventListener("click", function(event) {
    window.location.href = "index.html?name=" + document.getElementById("nevKereses").value;
}, false);

//=============================================================================

//URL parameterek keresese
var urlParams = new URLSearchParams(window.location.search);
var page = urlParams.get("page");
var cname = urlParams.get("name");

//API behuzas
var apiUrl;

if (page != null && cname != null) {
    apiUrl = "https://rickandmortyapi.com/api/character?page=" + page + "&name=" + cname;
}
else if (page != null) {
    apiUrl = "https://rickandmortyapi.com/api/character?page=" + page;
}
else if (cname != null) {
    apiUrl = "https://rickandmortyapi.com/api/character?&name=" + cname;
}
else {
    apiUrl = "https://rickandmortyapi.com/api/character";
}

var xhr = new XMLHttpRequest();
xhr.open("GET", apiUrl, true);

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        //console.log(JSON.parse(xhr.responseText));
        Feldolgozas(JSON.parse(xhr.responseText));
    }
};

xhr.send(null);

//Feldolgozas
function Feldolgozas(characters) {
    //Oldalszamok kiirasa
    var oldalszamok = document.getElementById("oldalszamok");

    //Elso oldal gomb
    var elsoOldalLi = document.createElement("li");
    var elsoOldalA = document.createElement("a");

    elsoOldalLi.setAttribute("class", "page-item");
    elsoOldalA.setAttribute("class", "page-link");

    var elsoOldalAUrl = "index.html?page=1";
    if (cname != null) {
        elsoOldalAUrl += "&name=" + cname;
    }
    elsoOldalA.setAttribute("href", elsoOldalAUrl);

    elsoOldalA.appendChild(document.createTextNode("First"));

    elsoOldalLi.appendChild(elsoOldalA);
    oldalszamok.appendChild(elsoOldalLi);

    //Oldalszamok
    if (Number(page) == 0 && characters.info.pages >= 3) {
        //Nem jott parameterul page ertek
        ah = 1;
        fh = 3;
    }
    else if (Number(page) == 0 && characters.info.pages < 3) {
        ah = 1;
        fh = characters.info.pages;
    }
    else {
        var ah = Number(page) - 1;
        var fh = Number(page) + 1;

        if (ah < 1) {
            ah = 1;
            fh++;
        }

        if (fh > characters.info.pages) {
            fh = characters.info.pages;
            ah--;
        }
    }

    for (var i = ah; i <= fh; i++) {
        var szamOldalLi = document.createElement("li");
        var szamOldalA = document.createElement("a");

        szamOldalLi.setAttribute("class", "page-item");
        szamOldalA.setAttribute("style", "color: black");
        szamOldalA.setAttribute("class", "page-link");

        var szamOldalAUrl = "index.html?page=" + i;
        if (cname != null) {
            szamOldalAUrl += "&name=" + cname;
        }
        szamOldalA.setAttribute("href", szamOldalAUrl);

        szamOldalA.appendChild(document.createTextNode(i));

        szamOldalLi.appendChild(szamOldalA);
        oldalszamok.appendChild(szamOldalLi);
    }

    //Utolso oldal gomb
    var utosloOldalLi = document.createElement("li");
    var utosloOldalA = document.createElement("a");

    utosloOldalLi.setAttribute("class", "page-item");
    utosloOldalA.setAttribute("class", "page-link");

    var utolsoOldalAUrl = "index.html?page=" + characters.info.pages;
    if (cname != null) {
        utolsoOldalAUrl += "&name=" + cname;
    }
    utosloOldalA.setAttribute("href", utolsoOldalAUrl);

    utosloOldalA.appendChild(document.createTextNode("Last"));

    utosloOldalLi.appendChild(utosloOldalA);
    oldalszamok.appendChild(utosloOldalLi);

    //Kartyak kiirasa
    for (var i = 0; i < characters.results.length; i++) {
        //console.log(characters[i]);

        //Kartya osszerakas
        var col = document.createElement("div");
        col.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3 mb-4");

        var divCard = document.createElement("div");
        divCard.setAttribute("class", "card h-100 w-100");
        divCard.setAttribute("style", "width: 18rem;");

        var img = document.createElement("img");
        img.setAttribute("src", characters.results[i].image);
        img.setAttribute("class", "card-img-top w-100");

        var divBody = document.createElement("div");
        divBody.setAttribute("class", "card-body");

        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.appendChild(document.createTextNode(characters.results[i].name));

        var ul = document.createElement("ul");

        var li1 = document.createElement("li");
        var li2 = document.createElement("li");
        var li3 = document.createElement("li");
        var li4 = document.createElement("li");
        var li5 = document.createElement("li");
        var li6 = document.createElement("li");

        //(feltetel) ? igaz : hamis;
        li1.appendChild(document.createTextNode(characters.results[i].status));
        li2.appendChild(document.createTextNode(characters.results[i].species));
        li3.appendChild(document.createTextNode((characters.results[i].type == "") ? "No Type" : characters.results[i].type));
        li4.appendChild(document.createTextNode(characters.results[i].gender));
        li5.appendChild(document.createTextNode(characters.results[i].location.name));

        var color;

        switch (characters.results[i].status) {
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

        li1.setAttribute("style", "color: " + color + "; " + "font-weight: bold");

        //Epizod cimenek kinyerese API-n keresztul
        xhr.open("GET", characters.results[i].episode[0], false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                li6.appendChild(document.createTextNode(
                    JSON.parse(xhr.responseText).name
                ));
            }
        };
        xhr.send(null);

        divBody.appendChild(h5);
        divBody.appendChild(li1);
        divBody.appendChild(li2);
        divBody.appendChild(li3);
        divBody.appendChild(li4);
        divBody.appendChild(li5);
        divBody.appendChild(li6);

        var gomb = document.createElement("a");
        gomb.setAttribute("class", "btn btn-success mt-2 w-100");
        gomb.setAttribute("href", "./character/index.html?charId=" + characters.results[i].id);
        gomb.appendChild(document.createTextNode("Bővebb Info..."));

        divBody.appendChild(gomb);

        divCard.appendChild(img);
        divCard.appendChild(divBody);

        col.appendChild(divCard);

        document.getElementById("kartyak").appendChild(col);
    }
}