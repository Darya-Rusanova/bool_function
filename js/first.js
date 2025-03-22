(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.addEventListener("keyup", enterUp);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
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