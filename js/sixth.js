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
        if (event.code == "Enter") click();
      }

    function typeIn(){
        let input = document.getElementById("input").innerText.split(" ").join("");
        let text = this.innerHTML;
        let span = document.createElement("span");
        // console.log(input.slice(-2, -1), this.id.slice(-2, -1));
        if(this.id == "del"){
            if(input.length == 0) return 0;
            console.log("removing " + document.getElementById("input").lastChild.innerHTML);
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
        switch(mes){
            case 0: div = "хуета";
            case 1: div = "норм";
            case 2: div = "перепиши";
        }
        document.getElementById("message").innerHTML = div;
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
        return (holder.length === 0) // return true if length is 0, otherwise false
    }

    function check() {
        
        document.getElementById("message").innerHTML = "";
        if(!isWrittenCorrect()){   
            message(2);
            return 0;
        }
        var vector = document.getElementById("vector").innerText.split(" ").join("");
        var dnf = "";
        document.getElementById("input").childNodes.forEach(element => {
            if(element.className == "over") dnf += "!";
            dnf += element.innerText;
        });
        if(!checkBrackets(dnf)){
            message(2);
            return 0;
        }
        dnf = dnf.split("V")
        let bad = 0;
        dnf.forEach(con => {
            if(!checkBrackets(con)){
                message(0);
                bad = 1;
            }
            
        });
        if(bad) return 0;
        // console.log(dnf);
        // console.log("all good")
    }

    function retry(){
        document.getElementById("input").innerHTML = "";
    }
})();