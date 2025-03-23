(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("check").addEventListener("click", check);
        document.getElementById("retry").addEventListener("click", retry);
        document.addEventListener("keyup", enterUp);
        document.getElementById("generate").addEventListener("click", generateVector);
        document.querySelectorAll(".calc button").forEach(element => {
            element.addEventListener("click", typeIn);
        });
        generateVector();
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
      }

    function typeIn(){
        let input = document.getElementById("input").innerHTML.split(" ").join("");
        let text = this.innerText;
        if(input.length==0 && (this.id=="or" || this.id=="and" || this.id=="r_bracket")) return 0;
        if((input.slice(-1)=="V" || input.slice(-1)=="·" || input.slice(-1) == "(") && (this.id=="or" || this.id=="and" || this.id=="r_bracket")) return 0;
        if(this.id=="or" || input.slice(-1) == "V") text = " " + text;
        if(this.id.slice(0, 3)=="not") document.getElementById("input").innerHTML += ' <div class="over">' + text + "</div> ";
        else document.getElementById("input").innerHTML += text;
    }
    function generateVector(){
        var vector = "";
        var len = Math.pow(2, Math.round(Math.random() * 2 + 1));
        for(let i=0;i< len; i++){
            vector+= Math.round(Math.random());
        }
        document.getElementById("vector").innerText = vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");;
        document.getElementById("input").innerText = "";
    }
    function message(mes){
        switch(mes){
            case 0: div = "хуета";
            case 1: div = "норм";
            case 2: div = "перепиши";
        }
        document.getElementById("message").innerHTML = div;
    }
    function check() {
        document.getElementById("message").innerHTML = "";
        var last_sym = document.getElementById("input").innerText.slice(-1).split(" ").join("");
        if(last_sym=="V" || last_sym=="·" || last_sym=="(") message(2);
        var vector = document.getElementById("vector").innerText.split(" ").join("");
        


    }
    function retry(){
        document.getElementById("input").innerText = "";
    }
})();