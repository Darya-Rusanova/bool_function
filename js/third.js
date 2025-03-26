(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.getElementById("res").disabled = true; 
        document.addEventListener("keyup", enterUp);
        document.getElementById("zero").addEventListener("input", binprov);
        document.getElementById("one").addEventListener("input", binprov);
        document.getElementById("num").addEventListener("input", provarg);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
    }
    
    function binprov(){
        const message = document.getElementById('message');
        this.value=this.value.replace(/[^0-1]/g,"");
        let length = this.value.length;
        if(document.getElementById("zero").value.length!=document.getElementById("one").value.length)
            { 
                message.textContent = 'Длина остаточных должна быть одинаковая';
                document.getElementById("res").disabled = true; 
                document.getElementById('num').disabled = true;
            } 
        else 
        {
            message.textContent = '';
            document.getElementById("res").disabled = false; 
            document.getElementById('num').disabled = false;
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
    }
    function provarg(){
        if (this.value=='') document.getElementById("res").disabled = true; 
        else  document.getElementById("res").disabled = false; 
        this.value = this.value.replace(/[^\d]/g, "");
        if (this.value>Math.log2(document.getElementById("zero").value.length))this.value=Math.log2(document.getElementById("zero").value.length);
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
        document.getElementById("out").innerText = s.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    }
})();