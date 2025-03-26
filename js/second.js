(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.getElementById("res").disabled = true; 
        document.addEventListener("keyup", enterUp);
        document.getElementById("vector").addEventListener("input", binprov);
        document.getElementById("residual").addEventListener("input", prov);
        document.getElementById("num").addEventListener("input", provarg);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
    }
    function binprov(){
        const message = document.getElementById('message');
        this.value=this.value.replace(/[^0-1]/g,"");
        let length = document.getElementById("vector").value.length;
            if (length > 0 && (length & (length - 1)) === 0) {
                message.textContent = '';
                document.getElementById("res").disabled = false; 
                document.getElementById('num').disabled = false;
            } else {
                message.textContent = 'Длина не является степенью двойки';
                document.getElementById("res").disabled = true; 
                document.getElementById('num').disabled = true;
            }
    }

    function prov(){
        if (this.value=='') document.getElementById("res").disabled = true; 
        else  document.getElementById("res").disabled = false; 
        this.value=this.value.replace(/[^0-1]/g,"")
        if (this.value.length>1)this.value=this.value.substr(0,1);
    }
    function provarg(){
        if (this.value=='') document.getElementById("res").disabled = true; 
        else  document.getElementById("res").disabled = false; 
        this.value = this.value.replace(/[^\d]/g, "");
        if (this.value>Math.log2(document.getElementById("vector").value.length))this.value=Math.log2(document.getElementById("vector").value.length);
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