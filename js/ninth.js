(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.getElementById("in").addEventListener("input", binprov);
        document.addEventListener("keyup", enterUp);
    }
    function enterUp(event) {
        if(document.getElementById("res").disabled == true) return 0;
        if (event.code == "Enter") click();
    }
      
    function binprov(){
        if (this.value=='') document.getElementById("res").disabled = true; 
        else  document.getElementById("res").disabled = false; 
        const message = document.getElementById('message');
        this.value=this.value.replace(/[^0-1]/g,"");
        let length = document.getElementById("in").value.length;
        
        if(length == 1){
            message.textContent = 'Слишком короткий вектор!';
            document.getElementById("res").disabled = true; 
        }
        else if (length > 0 && (length & (length - 1)) === 0) {
            message.textContent = '';
            document.getElementById("res").disabled = false; 
        } else {
            message.textContent = 'Длина не является степенью двойки';
            document.getElementById("res").disabled = true; 
        }
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
                    if((cur&(1<<j)) != 0) v+=  ' ∨ ' + '>vid/<'+(n-j)+ 'x>"revo"=ssalc vid<';
                    else v += ' ∨ ' + (n-j)+ 'x';
                    //if((cur&(1<<j)) != 0) v+="¬";
                }
                ans += "(" + v.split("").reverse().join("").slice(0, -3) + ") · ";
            }
        }
        document.getElementById("out").innerHTML = ans.slice(0, -3);
    }
})();