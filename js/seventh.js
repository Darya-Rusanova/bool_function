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

    function toPostfix(expr) {
        var priority = {'V': 1, '·': 2};
        var output = [];
        var stack = [];
        for (let char of expr) {
            if (char[0] == "x") { 
                output.push("x");
            } else if (char == "V" || char == "·") { 
                while (stack.length && priority[stack[stack.length - 1]] >= priority[char]) {
                    output.push(stack.pop());
                }
                stack.push(char);
            } else if (char == '(') { 
                stack.push(char);
            } else if (char == ')') { 
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                stack.pop();
            }
        }
        while (stack.length) {
            output.push(stack.pop());
        }
        return output.join('');
    }
    
    function isCNF(cnf){
        cnf = cnf.split('').reverse().join('');
        var char = 0;
        var operands = 0;
        var inDis = 0;
        while(char < cnf.length){
            if(cnf[char] == "V"){
                inDis = 1;
                operands = 0;
            }
            if(cnf[char] == "x" && inDis==1){
                operands++;
                if(operands == 2){
                    inDis = 0;
                    operands = 0;
                }
            }
            if(cnf[char] == "·" && operands < 2 && inDis){
                console.log("NOT CNF")
                return 0;
            }
            char++;
        }
        console.log("CNF")
        return 1;
    }

    function isCorrect(cnf, xMax){
        cnf = cnf.replaceAll("(", "");
        cnf = cnf.replaceAll(")", "");
        console.log(cnf);
        cnf = cnf.split("·");
        var vector = document.getElementById("vector").innerText.split(" ").join("");
        var n = Math.log2(vector.length);
        if(xMax > n) return 0;
        console.log(cnf);
        for(let i = 0; i<vector.length; i++){
            if(returnBool(cnf, i.toString(2).padStart(n, "0")) != vector[i]) return 0;
        }
        return 1;
    }

    function returnBool(func, set){
        // я по частицам собираю твой портрет...
        let finalVal = 1;
        func.forEach(element => { 
            let localFinal = 0;
            let dis = element.split("V");
            dis.forEach(element => {
                let not = (element[0] == "!") ? 1 : 0;
                let localVal = (not==0) ? set[parseInt(element[1])-1] : (set[parseInt(element[2])-1] == 1 ? 0 : 1);
                localFinal = localFinal | localVal;
            });
            finalVal *= localFinal;
        });
        return finalVal;
    }
    
    function check() {
        if(document.getElementById("input").innerText == "") return 0;
        if(!isWrittenCorrect()){   
            message(2);
            return 0;
        }
        var cnf = [];
        var xMax = 1;
        document.getElementById("input").childNodes.forEach(element => {
            let el = element.innerText;
            if(el.slice(-1) == "2" || el.slice(-1) == "3") xMax = Math.max(xMax, parseInt(el.slice(-1)));
            if(element.className == "over") cnf += "!";
            cnf += el.split(" ").join("");
        });
        if(!checkBrackets(cnf)){
            message(2);
            return 0;
        }
        if(!isCNF(toPostfix(cnf)) || !isCorrect(cnf, xMax)){
            message(0);
            return 0;
        }
        message(1);
    }

    function retry(){
        document.getElementById("input").innerHTML = "";
    }
})();