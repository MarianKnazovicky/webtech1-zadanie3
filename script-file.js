var body = document.getElementById("myBody");

var roky = [];
var znamkyA = [];
var znamkyB = [];
var znamkyC = [];
var znamkyD = [];
var znamkyE = [];
var znamkyFX = [];
var znamkyFN = [];
var znamky1617 = [];
var znamky1718 = [];
var znamky1819 = [];
var znamky1920 = [];
var znamky2021 = [];
var znamky2122 = [];
var znamkyOnline = [];
var znamkyPrezen = [];
var znamkyAop = [];
var znamkyBop = [];
var znamkyCop = [];
var znamkyDop = [];
var znamkyEop = [];
var znamkyFxop = [];
var znamkyFnop = [];



body.onload = function (){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            load(this.responseXML);
        }
    };

    xmlhttp.open("GET", "z03.xml", true);
    xmlhttp.send();
};

function load(xmlDoc) {

    var zaznam = xmlDoc.getElementsByTagName("zaznam");

    for (let i = 0; i < zaznam.length; i++) {
        var hodnotenie = zaznam[i].getElementsByTagName("hodnotenie");

        roky[i] = zaznam[i].childNodes[1].childNodes[0].nodeValue;
        znamkyA[i] = hodnotenie[0].getElementsByTagName('A')[0].childNodes[0].nodeValue;
        znamkyB[i] = hodnotenie[0].getElementsByTagName('B')[0].childNodes[0].nodeValue;
        znamkyC[i] = hodnotenie[0].getElementsByTagName('C')[0].childNodes[0].nodeValue;
        znamkyD[i] = hodnotenie[0].getElementsByTagName('D')[0].childNodes[0].nodeValue;
        znamkyE[i] = hodnotenie[0].getElementsByTagName('E')[0].childNodes[0].nodeValue;
        znamkyFX[i] = hodnotenie[0].getElementsByTagName('FX')[0].childNodes[0].nodeValue;
        znamkyFN[i] = hodnotenie[0].getElementsByTagName('FN')[0].childNodes[0].nodeValue;

    }

    initZnamky(znamky2122, 0);
    initZnamky(znamky2021, 1);
    initZnamky(znamky1920, 2);
    initZnamky(znamky1819, 3);
    initZnamky(znamky1718, 4);
    initZnamky(znamky1617, 5);

    initOnlinePrezen();

    barGraph();
    scatterGraph();
    pieGraphs();
}

function initZnamky(a, index) {
    a[0] = znamkyA[index];
    a[1] = znamkyB[index];
    a[2] = znamkyC[index];
    a[3] = znamkyD[index];
    a[4] = znamkyE[index];
    a[5] = znamkyFX[index];
    a[6] = znamkyFN[index];
}

function initOnlinePrezen() {
    let pocetOnline = 0;
    for (let i = 0; i < znamky2122.length;i++)
        pocetOnline += znamky2122[i] * 1;
    for (let i = 0; i < znamky2021.length;i++)
        pocetOnline += znamky2021[i] * 1;

    let pocetPrezencne = 0;
    for (let i = 0; i < znamky1920.length;i++)
        pocetPrezencne += znamky1920[i] * 1;
    for (let i = 0; i < znamky1819.length;i++)
        pocetPrezencne += znamky1819[i] * 1;
    for (let i = 0; i < znamky1718.length;i++)
        pocetPrezencne += znamky1718[i] * 1;
    for (let i = 0; i < znamky1617.length;i++)
        pocetPrezencne += znamky1617[i] * 1;

    for (let i = 0; i < znamky2122.length;i++)
        initOnline(znamkyOnline,pocetOnline,i);

    for (let i = 0; i < znamky2122.length;i++)
        initPrezen(znamkyPrezen,pocetPrezencne,i);

    initZnamkyOnlinePrezen(znamkyAop, 0);
    initZnamkyOnlinePrezen(znamkyBop, 1);
    initZnamkyOnlinePrezen(znamkyCop, 2);
    initZnamkyOnlinePrezen(znamkyDop, 3);
    initZnamkyOnlinePrezen(znamkyEop, 4);
    initZnamkyOnlinePrezen(znamkyFxop, 5);
    initZnamkyOnlinePrezen(znamkyFnop, 6);
}

function initOnline( online, pocet, index){
    online[index] = ((znamky2122[index]*1 + znamky2021[index]*1) / pocet) * 100;
}

function initPrezen( prezen, pocet, index){
    prezen[index] = ((znamky1920[index]*1 + znamky1819[index]*1 +znamky1718[index]*1 + znamky1617[index]*1) / pocet) * 100;
}

function initZnamkyOnlinePrezen(a , index){
    a[0] = znamkyOnline[index];
    a[1] = znamkyPrezen[index];

}

window.onresize = function (){
    barGraph();
    scatterGraph();
    pieGraphs();
};

function scatterGraph(){

    let obdobie = ["Online", "Prezenčne"];

    var traceA = {
        x: obdobie,
        y: znamkyAop,
        mode: 'lines+markers',
        marker: { size: 15 },
        type: 'scatter',
        name: 'A'
    };

    var traceB = {
        x: obdobie,
        y: znamkyBop,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 15 },
        name: 'B'
    };
    var traceC = {
        x: obdobie,
        y: znamkyCop,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 15 },
        name: 'C'
    };

    var traceD = {
        x: obdobie,
        y: znamkyDop,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 15 },
        name: 'D'
    };
    var traceE = {
        x: obdobie,
        y: znamkyEop,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 15 },
        name: 'E'
    };
    var traceFX = {
        x: obdobie,
        y: znamkyFxop,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 15 },
        name: 'FX'
    };
    var traceFN = {
        x: obdobie,
        y: znamkyFnop,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 15 },
        name: 'FN'
    };


    var layout = {
        xaxis: {
            title: {
                text: 'Obdobie'
            }
        },
        yaxis: {
            title: {
                text: 'Počet žiakov'
            }
        },
    };

    var data = [traceA, traceB, traceC, traceD, traceE,traceFX,traceFN];

    Plotly.newPlot('myScatter', data, layout);
}

function barGraph() {

    var traceA = {
        x: roky,
        y: znamkyA,
        type: 'bar',
        name: 'A'
    };

    var traceB = {
        x: roky,
        y: znamkyB,
        type: 'bar',
        name: 'B'
    };
    var traceC = {
        x: roky,
        y: znamkyC,
        type: 'bar',
        name: 'C'
    };

    var traceD = {
        x: roky,
        y: znamkyD,
        type: 'bar',
        name: 'D'
    };
    var traceE = {
        x: roky,
        y: znamkyE,
        type: 'bar',
        name: 'E'
    };
    var traceFX = {
        x: roky,
        y: znamkyFX,
        type: 'bar',
        name: 'FX'
    };
    var traceFN = {
        x: roky,
        y: znamkyFN,
        type: 'bar',
        name: 'FN'
    };

    var layoutv = {
        barmode: 'group',
        xaxis: {
            title: {
                text: 'Semester'
            }
        },
        yaxis: {
            title: {
                text: 'Počet žiakov'
            }
        },
    };

    var layouth = {
        barmode: 'group',
        xaxis: {
            title: {
                text: 'Počet žiakov'
            }
        },
        yaxis: {
            title: {
                text: 'Semester'
            }
        },
    };

    var layout;

    if(screen.width > 768){
        layout = layoutv;
    }else{
        horizontal(traceA);
        horizontal(traceB);
        horizontal(traceC);
        horizontal(traceD);
        horizontal(traceE);
        horizontal(traceFX);
        horizontal(traceFN);
        layout=layouth;
    }
    var data = [traceA, traceB, traceC, traceD, traceE, traceFX, traceFN];

    Plotly.newPlot('myBar', data, layout);
}

function horizontal(trace){
    let a = trace.x;
    trace.x = trace.y;
    trace.y = a;
    trace.orientation = 'h';
}

function pieGraphs(){
    var pie2122 = [{
        values: znamky2122,
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        type: "pie",
        title: roky[0],
        textinfo: 'label+position+percent',
    }];


    var layout2122 = {
        autosize: true
    };

    Plotly.newPlot('myPie1', pie2122, layout2122);

    var pie2021 = [{
        values: znamky2021,
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        type: "pie",
        title: roky[1],
        textinfo: 'label+position+percent',
    }];


    var layout2021 = {
        autosize: true
    };

    Plotly.newPlot('myPie2', pie2021, layout2021);

    var pie1920 = [{
        values: znamky1920,
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        type: "pie",
        title: roky[2],
        textinfo: 'label+position+percent',
    }];


    var layout1920 = {
        autosize: true
    };

    Plotly.newPlot('myPie3', pie1920, layout1920);

    var pie1819 = [{
        values: znamky1819,
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        type: "pie",
        title: roky[3],
        textinfo: 'label+position+percent',
    }];


    var layout1819 = {
        autosize: true
    };

    Plotly.newPlot('myPie4', pie1819, layout1819);

    var pie1718 =[ {
        values: znamky1718,
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        type: "pie",
        title: roky[4],
        textinfo: 'label+position+percent',
    }];


    var layout1718 = {
        autosize: true
    };

    Plotly.newPlot('myPie5', pie1718, layout1718);

    var pie1617 = [{
        values: znamky1617,
        labels: ["A", "B", "C", "D", "E", "FX", "FN"],
        type: "pie",
        title: roky[5],
        textinfo: 'label+position+percent',
    }];


    var layout1617 = {
        autosize: true,
    };

    Plotly.newPlot('myPie6', pie1617, layout1617);
}

