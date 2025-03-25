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

    

    function retry(){
        document.getElementById("input").innerHTML = "";
    }
})();