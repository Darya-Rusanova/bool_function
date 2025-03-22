(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("check").addEventListener("click", check);
        document.addEventListener("keyup", enterUp);
        generateVector();
        document.getElementById("generate").addEventListener("click", generateVector);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
    }

    function generateVector(){
    var vector = "";
    var len = Math.pow(2, Math.round(Math.random() * 3 + 1));
    for(let i=0;i< len; i++){
        vector+= Math.round(Math.random());
    }
    document.getElementById("vector").innerText = vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    }
    
    function check() {
        return 0;
    }
})();
