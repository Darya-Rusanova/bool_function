(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.getElementById("res").disabled = true; 
        document.getElementById("num").disabled = true;
        document.addEventListener("keyup", enterUp);
        document.getElementById("vector").addEventListener("input", inputCheck);
        document.getElementById("residual").addEventListener("input", inputCheck);
        document.getElementById("num").addEventListener("input", inputCheck);
    }
    function enterUp(event) {
        if(document.getElementById("res").disabled == true) return 0;
        if (event.code == "Enter") click();
    }

    function inputCheck(){
        if(binprov() == 0 | prov() == 0 | provarg() == 0){
            document.getElementById("res").disabled = true;
            // console.log(binprov(), prov(), provarg())
        }
        else document.getElementById("res").disabled = false;
    }

    function binprov(){
        // console.log('checking vector');
        const message = document.getElementById('message');
        var vector = document.getElementById("vector");
        vector.value=vector.value.replace(/[^0-1]/g,"");
        let length = vector.value.length;
        if(length == 1 || length == 0){
            message.textContent = 'Слишком короткий вектор!';
            document.getElementById("num").disabled = true;
            return 0;
        }
        if ((length & (length - 1)) === 0) {
            message.textContent = '';
            document.getElementById("num").disabled = false;
            return 1;
        } 
        message.textContent = 'Длина не является степенью двойки';
        document.getElementById("num").disabled = true;
        return 0;
    }

    function prov(){
        // console.log('checking 0/1');
        var residual = document.getElementById("residual");
        residual.value=residual.value.replace(/[^0-1]/g,"")
        if (residual.value.length>1) residual.value=residual.value.substr(0,1);
        if(residual.value.length == 0) return 0;
        return 1;
    }

    function provarg(){
        // console.log('checking arg');
        var arg = document.getElementById("num");
        arg.value = arg.value.replace(/[^\d]/g, "");
        if (arg.value == '0' || binprov() == 0){
            arg.value='';
            return 0;
        }
        if (arg.value>Math.log2(document.getElementById("vector").value.length))arg.value=Math.log2(document.getElementById("vector").value.length);
        if(arg.value.length == 0) return 0;
        return 1;
    }

    function click() {
        var vec = document.getElementById("vector").value;
        var val = document.getElementById("residual").value;
        var n = document.getElementById("num").value;
        var ans= "";
        var off =0;
        const m = Math.pow(2,Math.log2(vec.length)-n);
        if (val == "1")
        {
            off = m;
        }
        for (let i=off; i<vec.length;i+=2*m)
        {
            for(let j=0;j<m;j++)
            {
                ans+=vec[i+j];
            }
        }
        document.getElementById("out").innerText = ans.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
        return 0;
    }
})();