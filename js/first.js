(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
    }

    function click() {
        var n = document.getElementById("in").value;
        var o = document.getElementById("out");
        var c = ""
        for (var i=0;i<Math.pow(2,n);i++)
        {
            c+= Math.round(Math.random());
        }
        o.innerText = c;
        return 0;
    }
})();