(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.getElementById("res").disabled = true; 
        document.getElementById("num").disabled = true; 
        document.addEventListener("keyup", enterUp);
        document.getElementById("zero").addEventListener("input", inputCheck);
        document.getElementById("one").addEventListener("input", inputCheck);
        document.getElementById("num").addEventListener("input", inputCheck);
    }
    function enterUp(event) {
        if(document.getElementById("res").disabled == true) return 0;
        if (event.code == "Enter") click();
    }
    
    function inputCheck(){
        if(binprov("zero") == 0 | binprov("one") == 0 | provarg() == 0 | isEqualLength() == 0){
            document.getElementById("res").disabled = true;
            // console.log(binprov(), prov(), provarg())
        }
        else document.getElementById("res").disabled = false;
    }

    function isEqualLength(){
        if(document.getElementById("zero").value.length!=document.getElementById("one").value.length){ 
                message.textContent = 'Длина остаточных должна быть одинаковой';
                document.getElementById('num').disabled = true;
                return 0;
            } 
        return 1;
    }

    function binprov(id){
        const message = document.getElementById('message');
        var vector = document.getElementById(id);
        console.log(id);
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

        // if (this.value=='') document.getElementById("num").disabled = true; 
        // else  document.getElementById("num").disabled = false; 
        // const message = document.getElementById('message');
        // this.value=this.value.replace(/[^0-1]/g,"");
        // let length = this.value.length;
        // if(document.getElementById("zero").value.length!=document.getElementById("one").value.length)
        //     { 
        //         message.textContent = 'Длина остаточных должна быть одинаковая';
        //         document.getElementById('num').disabled = true;
        //     } 
        // else 
        // {
        //     message.textContent = '';
        //     document.getElementById('num').disabled = false;
        //     if (length > 0 && (length & (length - 1)) === 0) {
        //         message.textContent = '';
        //         document.getElementById('num').disabled = false;
        //     } else {
        //         message.textContent = 'Длина не является степенью двойки';
        //         document.getElementById('num').disabled = true;
        //     }
        // }
    }
    function provarg(){
        var arg = document.getElementById("num");
        arg.value = arg.value.replace(/[^\d]/g, "");
        if (arg.value == '0' || binprov("one") == 0 || binprov("zero") == 0){
            arg.value='';
            return 0;
        }
        if(arg.value.length == 0) return 0;
        if (arg.value>Math.log2(document.getElementById("zero").value.length*2))arg.value=Math.log2(document.getElementById("zero").value.length*2);
        return 1;
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