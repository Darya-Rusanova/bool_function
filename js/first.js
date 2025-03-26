(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.getElementById("res").disabled = true; 
        document.addEventListener("keyup", enterUp);
        document.getElementById("in").addEventListener("input", prove);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
    }
    function prove(){
        this.value = this.value.replace(/[^\d]/g, "");
        if (this.value=='') document.getElementById("res").disabled = true; 
        else  document.getElementById("res").disabled = false; 
        if (this.value == '0') this.value='';
        if (this.value > 12) {
            this.value = 12;
        }
    }

    function click() {
        var n = document.getElementById("in").value;
        var o = document.getElementById("out");
        var c = ""
        for (var i=0;i<Math.pow(2,n);i++)
        {
            c+= Math.round(Math.random());
        }
        o.innerText = c.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
        return 0;
    }
})();