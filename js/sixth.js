(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("check").addEventListener("click", check);
        document.getElementById("retry").addEventListener("click", retry);
        document.addEventListener("keyup", enterUp);
        document.getElementById("generate").addEventListener("click", generateVector);
        document.querySelectorAll(".calc button").forEach(element => {
            element.addEventListener("click", typeIn);
        });
        generateVector();
    }
    function enterUp(event) {
        if (event.code == "Enter") check();
      }

    function typeIn(){
        let input = document.getElementById("input").innerText.split(" ").join("");
        let text = this.innerHTML;
        let span = document.createElement("span");
        if(this.id == "del"){
            if(input.length == 0) return 0;
            document.getElementById("input").removeChild(document.getElementById("input").lastChild);
            return 0;
        }
        if(input.length==0 && (this.id=="or" || this.id=="and" || this.id=="r_bracket")) return 0;
        if((input.slice(-1)=="V" || input.slice(-1)=="·" || input.slice(-1) == "(") && (this.id=="or" || this.id=="and" || this.id=="r_bracket")) return 0;
        if(input.slice(-2, -1)=='x' && (this.id.slice(-2, -1) == "x" || this.id == 'l_bracket')) return 0;
        if(this.id=="or") text = " " + text + " ";
        if(this.id.slice(0, 3)=="not"){
             span.innerText = text;
             span.classList.add("over");
        }
        else{
            span.innerHTML = text;
        }
        document.getElementById("input").appendChild(span);

    }
    function generateVector(){
        var vector = "";
        var len = Math.pow(2, Math.round(Math.random() * 2 + 1));
        for(let i=0;i< len; i++){
            vector+= Math.round(Math.random());
        }
        document.getElementById("vector").innerText = vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");;
        document.getElementById("input").innerText = "";
    }
    function message(mes){
        var msg = "";
        switch(mes){
            case 0:
                msg = "Неверно! Вернитесь и попробуйте еще раз.";
                break;
            case 1: 
                msg = "Верно!";
                break;
            case 2: 
                msg = "Некорректная запись! Вернитесь и попробуйте еще раз.";
                break;
        }
        document.getElementById("message").innerText = msg;
        window.res.showModal();
    }

    function isWrittenCorrect(){
        var last_sym = document.getElementById("input").innerText.slice(-1).split(" ").join("");
        if(last_sym=="V" || last_sym=="·" || last_sym=="("){
            return 0;
        };
        return 1;
    }

    function checkBrackets(expr){
        var holder = []
        for (let letter of expr) { 
            if(letter=="("){ 
                holder.push(letter)
            }else if(letter==")"){ 
                if(holder[holder.length - 1] === "("){
                    holder.splice(-1,1) 
                }else{ 
                    holder.push(letter)
                    break 
                }
            }
        }
        return (holder.length === 0) 
    }

    function isDNF(dnf){
        let inCon = 0;
        for(let i = 0; i<dnf.length; i++){      
            if(dnf.slice(i, i+2) == "·(") inCon++;
            if(inCon>0 && dnf[i] == "V"){
                console.log("NOT DNF");
                return 0;
            } 
            if(dnf[i]==")" && inCon > 0) inCon--;

        }
        inCon = 0;
        for(let i = dnf.length-1; i>=0; i--){
            // console.log(i, inCon, dnf.slice(i-2, i))
            if(dnf.slice(i-2, i) == ")·") inCon++;
            if(inCon>0 && dnf[i] == "V"){
                console.log("NOT DNF");
                return 0;
            } 
            if(dnf[i]=="(" && inCon > 0) inCon--;
        }
        console.log("DNF");
        return 1;

        

            // dnf = dnf.split("V");
            // let bad = 0;
            // dnf.forEach(con => {
            //     while(con[0] == "(") con = con.slice(1);
            //     while(con.slice(-1) == ")") con = con.slice(0, -1);
            //     let op_br = 0;
            //     let cl_br = 0;
            //     for(let i of con){
            //         if(i=="(") op_br++;
            //         if(i==")") cl_br++;
            //     }
            //     if(op_br!=cl_br){
            //         console.log("NOT DNF")
            //         bad = 1;
            //     }
                
            // });
            // if(bad) return 0;
            // console.log("DNF");
            // return 1;
            }

    // на вход подается выражение БЕЗ скобок
    function isCorrect(dnf, xMax){
        dnf.replace("(", "");
        dnf.replace(")", "");
        dnf = dnf.split("V");
        var vector = document.getElementById("vector").innerText.split(" ").join("");
        var n = Math.log2(vector.length);
        if(xMax !== n) return 0;
        for(let i = 0; i<vector.length; i++){
            if(returnBool(dnf, i.toString(2).padStart(n, "0")) != vector[i]) return 0;
        }
        return 1;
    }

    function returnBool(func, set){
        // я по частицам собираю твой портрет...
        let finalVal = 0;
        func.forEach(element => {
            if(element.split("·").length == 1){
                let not = (element[0] == "!") ? 1 : 0;
                let localVal = (not==0) ? set[parseInt(element[1])-1] : (set[parseInt(element[2])-1] == 1 ? 0 : 1);
                finalVal = finalVal | localVal;
            }
            else{
                let localFinal = 1;
                let con = element.split("·");
                con.forEach(element => {
                    let not = (element[0] == "!") ? 1 : 0;
                    let localVal = (not==0) ? set[parseInt(element[1])-1] : (set[parseInt(element[2])-1] == 1 ? 0 : 1);
                    localFinal *= localVal;
                });
                finalVal = finalVal | localFinal;
            }
        });
        return finalVal;
    }

    function check() {
        if(document.getElementById("input").innerText == "") return 0;
        if(!isWrittenCorrect()){   
            message(2);
            return 0;
        }
        var dnf = "";
        var xMax = 1;
        document.getElementById("input").childNodes.forEach(element => {
            let el = element.innerText;
            if(el.slice(-1) == "2" || el.slice(-1) == "3") xMax = Math.max(xMax, parseInt(el.slice(-1)));
            if(element.className == "over") dnf += "!";
            dnf += el.split(" ").join("");
        });
        if(!checkBrackets(dnf)){
            message(2);
            return 0;
        }
        if(!isDNF(dnf) || !isCorrect(dnf, xMax)){
            message(0);
            return 0;
        }
        message(1);
    }

    function retry(){
        document.getElementById("input").innerHTML = "";
    }
})();