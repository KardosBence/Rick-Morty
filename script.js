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
        col.setAttribute("class", "col-8 col-md-6 col-lg-4 col-xl-3 mb-4");

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

        var divText = document.createElement("div");
        divText.setAttribute("class", "card-text my-4 text-indent-2");

        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        var p4 = document.createElement("p");
        var p5 = document.createElement("p");
        var p6 = document.createElement("p");

        //(feltetel) ? igaz : hamis;
        p1.appendChild(document.createTextNode(characters.results[i].status));
        p2.appendChild(document.createTextNode(characters.results[i].species));
        p3.appendChild(document.createTextNode((characters.results[i].type == "") ? "No type" : characters.results[i].type));
        p4.appendChild(document.createTextNode(characters.results[i].gender));
        p5.appendChild(document.createTextNode(characters.results[i].location.name));

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

        p1.setAttribute("style", "color: " + color + "; " + "font-weight: bold");

        //Epizod cimenek kinyerese API-n keresztul
        xhr.open("GET", characters.results[i].episode[0], false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                p6.appendChild(document.createTextNode( 
                    JSON.parse(xhr.responseText).name
                ));
            }
        };
        xhr.send(null);

        divText.appendChild(p1);
        divText.appendChild(p2);
        divText.appendChild(p3);
        divText.appendChild(p4);
        divText.appendChild(p5);
        divText.appendChild(p6);

        divBody.appendChild(h5);
        divBody.appendChild(divText);

        var gomb = document.createElement("a");
        gomb.setAttribute("class", "btn btn-success my-3 m-auto w-100");
        gomb.setAttribute("href", "character/index.html?charId=" + characters.results[i].id);
        gomb.appendChild(document.createTextNode("Bővebb Info..."));

        divBody.appendChild(gomb);

        divCard.appendChild(img);
        divCard.appendChild(divBody);

        col.appendChild(divCard);

        document.getElementById("kartyak").appendChild(col);
    }
}