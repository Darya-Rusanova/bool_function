import {bFunc} from '../js/class.js'
(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
    }

    function click() {
        let n = document.getElementById("in").value;
        let o = document.getElementById("out");
        let f = new bFunc(n)
        o.innerText = f.show();
        return 0;
    }
})();