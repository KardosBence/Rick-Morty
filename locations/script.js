//Gombra feliratkozas + Enter
document.getElementById("nevKereses").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("nevKeresesInditas").click();
    }
  });

  document.getElementById("nevKeresesInditas").addEventListener("click", function(event) {
    window.location.href = "/locations/index.html?name=" + document.getElementById("nevKereses").value;
}, false);

//URl adatkinyeres
var urlParams = new URLSearchParams(window.location.search);
var page = urlParams.get("page");
var cname = urlParams.get("name");

//API behuzas
var apiUrl;

if (page != null && cname != null) {
    apiUrl = "https://rickandmortyapi.com/api/location?page=" + page + "&name=" + cname;
}
else if (page != null) {
    apiUrl = "https://rickandmortyapi.com/api/location?page=" + page;
}
else if (cname != null) {
    apiUrl = "https://rickandmortyapi.com/api/location?&name=" + cname;
}
else {
    apiUrl = "https://rickandmortyapi.com/api/location";
}

//API behuzas
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
function Feldolgozas(locations) {
    //Oldalszamok kiirasa
    var oldalszamok = document.getElementById("oldalszamok");

    //Elso oldal gomb
    var elsoOldalLi = document.createElement("li");
    var elsoOldalA = document.createElement("a");

    elsoOldalLi.setAttribute("class", "page-item");
    elsoOldalA.setAttribute("class", "page-link");

    var elsoOldalAUrl = "/locations/index.html?page=1";
    if (cname != null) {
        elsoOldalAUrl += "&name=" + cname;
    }
    elsoOldalA.setAttribute("href", elsoOldalAUrl);

    elsoOldalA.appendChild(document.createTextNode("First"));

    elsoOldalLi.appendChild(elsoOldalA);
    oldalszamok.appendChild(elsoOldalLi);

    //Oldalszamok
    if (Number(page) == 0 && locations.info.pages >= 3) {
        //Nem jott parameterul page ertek
        ah = 1;
        fh = 3;
    }
    else if (Number(page) == 0 && locations.info.pages < 3) {
        ah = 1;
        fh = locations.info.pages;
    }
    
    else {
        var ah = Number(page) - 1;
        var fh = Number(page) + 1;

        if (ah < 1) {
            ah = 1;
            fh++;
        }

        if (fh > locations.info.pages) {
            fh = locations.info.pages;
        }
    }

    for (var i = ah; i <= fh; i++) {
        var szamOldalLi = document.createElement("li");
        var szamOldalA = document.createElement("a");

        szamOldalLi.setAttribute("class", "page-item");
        szamOldalA.setAttribute("style", "color: black");
        szamOldalA.setAttribute("class", "page-link");

        var szamOldalAUrl = "/locations/index.html?page=" + i;
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

    var utolsoOldalAUrl = "/locations/index.html?page=" + locations.info.pages;
    if (cname != null) {
        utolsoOldalAUrl += "&name=" + cname;
    }
    utosloOldalA.setAttribute("href", utolsoOldalAUrl);

    utosloOldalA.appendChild(document.createTextNode("Last"));

    utosloOldalLi.appendChild(utosloOldalA);
    oldalszamok.appendChild(utosloOldalLi);

    //Tablazat osszerakasa
    var torzs = document.getElementById("torzs");

    for (var i = 0; i < locations.results.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");

        td1.appendChild(document.createTextNode(locations.results[i].name));
        td2.appendChild(document.createTextNode(locations.results[i].type));
        td3.appendChild(document.createTextNode(locations.results[i].dimension));
        td4.appendChild(document.createTextNode(locations.results[i].residents.length));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        torzs.appendChild(tr);
    }
}