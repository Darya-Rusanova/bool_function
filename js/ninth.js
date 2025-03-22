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
        var ans = '';
        var vector = document.getElementById("in").value;
        var n = Math.log2(vector.length);
        if(vector.split("0").length - 1 == 0){
            document.getElementById("out").innerText = "Функция не имеет СКНФ :(";
            return 0;
        };
        for(let i = 0; i<vector.length; i++){
            if(vector[i]=='0'){
                var cur = i;
                var v = "";
                for(let j = 0; j<n; j++){
                    v += " ∨ " + (n-j) + "x";
                    if((cur&(1<<j)) != 0) v+="¬";
                }
                ans += "(" + v.split("").reverse().join("").slice(0, -3) + ") · ";
            }
        }
        console.log(2&1, 2&(1<<1), 2&(1<<2));
        document.getElementById("out").innerText = ans.slice(0, -3);
    }
})();