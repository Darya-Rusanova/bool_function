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
        var zero = document.getElementById("zero").value;
        var one = document.getElementById("one").value;
        var num = document.getElementById("num").value;
        var s = '';
        var n = zero.length/Math.pow(2, num-1);
        for(let i = 0; i<zero.length; i+=n){
            s+=zero.slice(i, i+n) + one.slice(i, i+n);
        }
        document.getElementById("out").innerText = s;
    }
})();