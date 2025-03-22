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
        let text = this.innerText;
        if(this.id=="or" || document.getElementById("input").innerText.slice(-1) == "V") text = " " + text;
        document.getElementById("input").innerText += text;
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

    function check() {
        var vector = document.getElementById("vector").innerText.split(" ").join("");
        
    }
    function retry(){
        document.getElementById("input").innerText = "";
    }
})();