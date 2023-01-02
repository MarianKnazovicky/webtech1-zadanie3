var num;

class MyAmplifier extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");

        const label1 = wrapper.appendChild(document.createElement("label"));
        label1.setAttribute("for","check1");
        label1.innerHTML = "slider";

        const check1 = wrapper.appendChild(document.createElement("input"));
        check1.setAttribute("type","checkbox");
        check1.setAttribute("id","check1");
        check1.setAttribute("checked","true");

        const ampSlider = wrapper.appendChild(document.createElement("input"));
        ampSlider.setAttribute("class", "slider");
        let minVal = this.getAttribute("min-val");
        let maxVal = this.getAttribute("max-val");
        ampSlider.setAttribute("type","range");
        ampSlider.setAttribute("step","1");
        ampSlider.setAttribute("value",minVal);
        ampSlider.setAttribute("min",minVal);
        ampSlider.setAttribute("max",maxVal);

        num = minVal;

        const label2 = wrapper.appendChild(document.createElement("label"));
        label2.setAttribute("for","check2");
        label2.innerHTML = "číslo";

        const check2 = wrapper.appendChild(document.createElement("input"));
        check2.setAttribute("type","checkbox");
        check2.setAttribute("id","check2");
        check2.setAttribute("checked","true");

        const ampInput = wrapper.appendChild(document.createElement("input"));
        ampInput.setAttribute("class", "ampinput");
        ampInput.setAttribute("type","number");
        ampInput.setAttribute("value",minVal);
        ampInput.setAttribute("min",minVal);
        ampInput.setAttribute("max",maxVal);

        const style = document.createElement("style");
        style.textContent = `
        .wrapper{
            display: grid;
            grid: auto / 15% 35% 50%;
            width: 250px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .slider{
            width: 120px;
        }
        
        .ampinput{
            width: 120px;
        }
        
        input[type=number] {
            background-color: #F7F7F7;
            border-radius: 5px;
            border: 1px solid #C7C7C7;
        }
        
        input[type=number]:focus {
            outline: none;
        }
        
        input[type=range] {
          height: 20px;
          -webkit-appearance: none;
          width: 100%;
        }
        input[type=range]:focus {
          outline: none;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 5px;
          cursor: pointer;
          animate: 0.2s;
          box-shadow: 0px 0px 1px #000000;
          background: #FFFFFF;
          border-radius: 5px;
          border: 1px solid #CDD4D3;
        }
        input[type=range]::-webkit-slider-thumb {
          box-shadow: 0px 0px 1px #000000;
          border: 1px solid #C7C7C7;
          height: 20px;
          width: 30px;
          border-radius: 2px;
          background: #F7F7F7;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -8.5px;
        }
        input[type=range]:focus::-webkit-slider-runnable-track {
          background: #FFFFFF;
        }
        input[type=range]::-moz-range-track {
          width: 100%;
          height: 5px;
          cursor: pointer;
          animate: 0.2s;
          box-shadow: 0px 0px 1px #000000;
          background: #FFFFFF;
          border-radius: 5px;
          border: 1px solid #CDD4D3;
        }
        input[type=range]::-moz-range-thumb {
          box-shadow: 0px 0px 1px #000000;
          border: 1px solid #C7C7C7;
          height: 20px;
          width: 30px;
          border-radius: 2px;
          background: #F7F7F7;
          cursor: pointer;
        }
        input[type=range]::-ms-track {
          width: 100%;
          height: 5px;
          cursor: pointer;
          animate: 0.2s;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }
        input[type=range]::-ms-fill-lower {
          background: #FFFFFF;
          border: 1px solid #CDD4D3;
          border-radius: 10px;
          box-shadow: 0px 0px 1px #000000;
        }
        input[type=range]::-ms-fill-upper {
          background: #FFFFFF;
          border: 1px solid #CDD4D3;
          border-radius: 10px;
          box-shadow: 0px 0px 1px #000000;
        }
        input[type=range]::-ms-thumb {
          margin-top: 1px;
          box-shadow: 0px 0px 1px #000000;
          border: 1px solid #F7F7F7;
          height: 20px;
          width: 30px;
          border-radius: 2px;
          background: #F7F7F7;
          cursor: pointer;
        }
        input[type=range]:focus::-ms-fill-lower {
          background: #FFFFFF;
        }
        input[type=range]:focus::-ms-fill-upper {
          background: #FFFFFF;
        }

        `;
        this.shadowRoot.append(style,wrapper);

        this.ampInputChange = (event) => {
            const customEvent = new CustomEvent('update-amp',{
                bubbles:true,
                composed:true,
                detail: {value: event.target.value},
            });
            ampSlider.value = event.target.value;
            num = event.target.value;
            this.dispatchEvent(customEvent);
        };

        this.ampSliderChange = (event) => {
            const customEvent = new CustomEvent('update-amp',{
                bubbles:true,
                composed:true,
                detail: {value: event.target.value},
            });
            ampInput.value = event.target.value;
            num = event.target.value;
            this.dispatchEvent(customEvent);
        };

        this.check1Change = () => {
            const customEvent = new CustomEvent('update-slider-vis',{
                bubbles:true,
                composed:true,
            });
            if( ampSlider.style.visibility === "hidden"){
                ampSlider.style.visibility = "visible";
            }else{
                ampSlider.style.visibility = "hidden";
            }
            this.dispatchEvent(customEvent);
        };

        this.check2Change = () => {
            const customEvent = new CustomEvent('update-input-vis',{
                bubbles:true,
                composed:true,
            });
            if( ampInput.style.visibility === "hidden"){
                ampInput.style.visibility = "visible";
            }else{
                ampInput.style.visibility = "hidden";
            }
            this.dispatchEvent(customEvent);
        };

        ampInput.addEventListener("change",this.ampInputChange);
        ampSlider.addEventListener("change",this.ampSliderChange);
        check1.addEventListener("change",this.check1Change);
        check2.addEventListener("change",this.check2Change);
    }
}

customElements.define("my-amplifier",MyAmplifier);

var stopData = false;
var koniec = document.getElementById("koniec");

koniec.onclick = function (){
    stopData = true;
    Plotly.newPlot('myScatter', data);
};

var evtSource = new EventSource("http://old.iolab.sk/evaluation/sse/sse.php");

var sinus = document.getElementById("show-sin");
var kosin = document.getElementById("show-cos");

sinus.onclick = function (){
    traceSin.visible = !!sinus.checked;
    Plotly.newPlot('myScatter', data);
};

kosin.onclick = function (){
    traceKos.visible = !!kosin.checked;
    Plotly.newPlot('myScatter', data);
};

var traceSin = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Sínus',
    line:{
        color:'rgb(0,100,255)'
    },
    visible: true
};

var traceKos = {
    x: [],
    y: [],
    type: 'scatter',
    name: 'Kosínus',
    line:{
        color:'rgb(255,100,0)'
    },
    visible: true
};


var data = [traceSin, traceKos];

Plotly.newPlot('myScatter', data);

evtSource.addEventListener("message", (event) => {
    update();
});

function update(){
    if (stopData) {
        return;
    }

    console.log(num);
    const web = JSON.parse(event.data);
    console.log(web);

    console.log(web.x);
    traceSin.x.push(web.x);
    traceKos.x.push(web.x);
    traceSin.y.push(num * web.y1);
    traceKos.y.push(num * web.y2);
    data = [traceSin,traceKos];
    Plotly.newPlot('myScatter', data);
}

window.onresize = function (){
    Plotly.newPlot('myScatter', data);
};

//POZNAMKY CVICENIE

/*class MyButton extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");

        const button = wrapper.appendChild(document.createElement("button"));
        button.setAttribute("class","btn");
        button.innerHTML = "klikni na mna ou yeah";

        const ampInput = wrapper.appendChild(document.createElement("input"));
        ampInput.setAttribute("type","number");
        ampInput.setAttribute("value","5");
        let minVal = this.getAttribute("min-val");
        let maxVal = this.getAttribute("max-val");
        ampInput.setAttribute("min-val",maxVal);
        ampInput.setAttribute("max-val",minVal)



        const style = document.createElement("style");
        style.textContent = `.btn{
            background: #CFC;
        }`;
        this.shadowRoot.append(style,wrapper);

        this.clickEventFunc = (event) => {
            const customEvent = new CustomEvent('click-button',{
                bubbles: true,
                composed: true,
            })
            this.dispatchEvent(customEvent)
        }

        this.shadowRoot.querySelector("button").addEventListener("click", this.clickEventFunc);
    }
}*/

//customElements.define("my-button", MyButton);