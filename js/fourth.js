var functions = {"0001":"конъюнкция",
    "0111":"дизъюнкция",
    "0110":"сложение по модулю 2",
    "1110":"штрих Шеффера",
    "1000":"стрелка Пирса",
    "1101":"импликация",
    "1001":"эквивалентность",
    "0010":"коимпликация",
    "1011":"обратная импликация",
    "0100":"обратная коимпликация",
    "0000":"константа 0",
    "1111":"константа 1",
    "0011":"первый аргумент",
    "1100":"отрицание первого аргумента",
    "0101":"второй аргумент",
    "1010":"отрицание второго аргумента"
    };

var rounds = 1;
var cur_round = 1;
var correct_ans = 0;

(function () {
    window.addEventListener('load', init);

    function init() {
        window.start.showModal();
        document.addEventListener("keyup", enterUp);
        document.querySelectorAll(".rounds button").forEach(bt => {
            bt.addEventListener("click", chooseRounds);
        });
        document.getElementById("play").addEventListener("click", play);
        document.getElementById("check").addEventListener("click", check);
        document.querySelectorAll("#variant").forEach(bt => {
            bt.addEventListener("click", chooseVariant);
        });
    }
    function enterUp(event) {
        if (event.code == "Enter"){
            if(cur_round == rounds) result();
            else check();
        }
    }
    function chooseRounds(){
        rounds = this.innerText;
        if(document.querySelectorAll(".clicked")!==null){
            document.querySelectorAll(".clicked").forEach(element => {
                element.classList.remove("clicked"); 
             });
        }
        this.classList.add("clicked");
    }
    function chooseVariant(){
        if(document.querySelectorAll(".clicked")!==null){
            document.querySelectorAll(".clicked").forEach(element => {
                element.classList.remove("clicked"); 
             });
        }
        this.classList.add("clicked");
    };

    function generateVector(){
        var vector = "";
        for(let i=0;i<4;i++) vector+= Math.round(Math.random());
        return vector;
    }
    function generate(){
        let vector = generateVector();
        document.getElementById("vector").innerText = vector;
        var names = {};
        Object.assign(names, functions);
        var correct = names[vector];
        names[vector] = "-";
        var variants = document.querySelectorAll("#variant");
        var var_names = [];
        var correct_num = Math.round(Math.random() * 6);
        for(let i = 0; i<6; i++){
            if(i==correct_num) var_names.push(correct);
            else{
                let num = generateVector();
                while(names[num]=="-") num = generateVector();
                var_names.push(names[num]);
                names[num] = "-";
            }
        }
        variants.forEach(el => {
            let name = var_names.pop();
            el.innerText = name;     
        });
      }

    function play(){
        document.getElementById("cur_round").innerText = cur_round;
        generate();
      }
    function check() {
        var correct = functions[document.getElementById("vector").innerText];
        if(document.querySelector("#variant.clicked ").innerText = correct) correct_ans++;
        cur_round++;
        if(cur_round>rounds) result();
        else play();
        };
        
    function result(){
        document.getElementById("correct").innerText = correct_ans;
        document.getElementById("rounds").innerText = rounds;
    }

})();