//Gombra feliratkozas + Enter
document.getElementById("nevKereses").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("nevKeresesInditas").click();
    }
  });

  document.getElementById("nevKeresesInditas").addEventListener("click", function(event) {
    window.location.href = "/episodes/index.html?name=" + document.getElementById("nevKereses").value;
}, false);

//URl adatkinyeres
var urlParams = new URLSearchParams(window.location.search);
var page = urlParams.get("page");
var cname = urlParams.get("name");

//API behuzas
var apiUrl;

if (page != null && cname != null) {
    apiUrl = "https://rickandmortyapi.com/api/episode?page=" + page + "&name=" + cname;
}
else if (page != null) {
    apiUrl = "https://rickandmortyapi.com/api/episode?page=" + page;
}
else if (cname != null) {
    apiUrl = "https://rickandmortyapi.com/api/episode?&name=" + cname;
}
else {
    apiUrl = "https://rickandmortyapi.com/api/episode";
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
function Feldolgozas(episodes) {
    //Oldalszamok kiirasa
    var oldalszamok = document.getElementById("oldalszamok");

    //Elso oldal gomb
    var elsoOldalLi = document.createElement("li");
    var elsoOldalA = document.createElement("a");

    elsoOldalLi.setAttribute("class", "page-item");
    elsoOldalA.setAttribute("class", "page-link");
    elsoOldalA.setAttribute("href", "/episodes/index.html?page=1");

    var elsoOldalAUrl = "/episodes/index.html?page=1";
    if (cname != null) {
        elsoOldalAUrl += "&name=" + cname;
    }
    elsoOldalA.setAttribute("href", elsoOldalAUrl);

    elsoOldalA.appendChild(document.createTextNode("First"));

    elsoOldalLi.appendChild(elsoOldalA);
    oldalszamok.appendChild(elsoOldalLi);

    //Oldalszamok
    var ah, fh;

    if (page === 0 && episodes && episodes.info && episodes.info.pages >= 3) {
        ah = 1;
        fh = 3;
    } else if (page === 0 && episodes && episodes.info && episodes.info.pages < 3) {
        ah = 1;
        fh = episodes.info.pages;
    } else {
        ah = Math.max(1, page - 3);
        fh = Math.min(page + 3, episodes.info.pages);
    }

    for (var i = ah; i <= fh; i++) {
        var szamOldalLi = document.createElement("li");
        var szamOldalA = document.createElement("a");

        szamOldalLi.setAttribute("class", "page-item");
        szamOldalA.setAttribute("style", "color: black");
        szamOldalA.setAttribute("class", "page-link");
        szamOldalA.setAttribute(
            "href",
            "/episodes/index.html?page=" + i + (cname ? "&name=" + cname : "")
        );

        szamOldalA.appendChild(document.createTextNode(i));

        szamOldalLi.appendChild(szamOldalA);
        oldalszamok.appendChild(szamOldalLi);
    }



    //Utolso oldal gomb
    var utosloOldalLi = document.createElement("li");
    var utosloOldalA = document.createElement("a");

    utosloOldalLi.setAttribute("class", "page-item");
    utosloOldalA.setAttribute("class", "page-link");
    utosloOldalA.setAttribute("href", "/episodes/index.html?page=" + episodes.info.pages);

    var utolsoOldalAUrl = "/episodes/index.html?page=" + episodes.info.pages;
    if (cname != null) {
        utolsoOldalAUrl += "&name=" + cname;
    }
    utosloOldalA.setAttribute("href", utolsoOldalAUrl);

    utosloOldalA.appendChild(document.createTextNode("Last"));

    utosloOldalLi.appendChild(utosloOldalA);
    oldalszamok.appendChild(utosloOldalLi);

    //Tablazat osszerakas
    var torzs = document.getElementById("torzs");

    for (var i = 0; i < episodes.results.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");

        td1.appendChild(document.createTextNode(episodes.results[i].episode));
        td2.appendChild(document.createTextNode(episodes.results[i].name));
        td3.appendChild(document.createTextNode(episodes.results[i].air_date));
        td4.appendChild(document.createTextNode(episodes.results[i].characters.length));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        torzs.appendChild(tr);
    }
}