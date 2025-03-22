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
var round_functions = [];
var round_answers = [];
var round_correct_ans = [];

(function () {
    window.addEventListener('load', init);

    function init() {
        window.start.showModal();
        document.addEventListener("keyup", enterUp);
        document.querySelectorAll(".rounds button").forEach(bt => {
            bt.addEventListener("click", chooseRounds);
        });
        document.querySelectorAll("#play").forEach(v => {
            v.addEventListener("click", play);
        });
        document.getElementById("check").addEventListener("click", check);
        document.querySelectorAll(".variant").forEach(v => {
            v.addEventListener("click", chooseVariant);
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
        if(document.querySelector(".clicked")!==null){
            document.querySelector(".clicked").classList.remove("clicked"); 
        }
        this.classList.add("clicked");
    }
    function chooseVariant(){
        if(document.querySelector(".variant.clicked")!==null){
            document.querySelector(".variant.clicked").classList.remove("clicked"); 
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
        window.res.close();
        var nav_func = document.createElement('p');
        nav_func.classList.add("nav");
        nav_func.innerText = "Функция";
        var nav_ans = document.createElement('p');
        nav_ans.classList.add("nav");
        nav_ans.innerText = "Ваш ответ";
        var nav_right_ans = document.createElement('p');
        nav_right_ans.classList.add("nav");
        nav_right_ans.innerText = "Верный ответ";
        document.querySelector(".func").replaceChildren(nav_func);
        document.querySelector(".answer").replaceChildren(nav_ans);
        document.querySelector(".right-ans").replaceChildren(nav_right_ans);
        document.getElementById("cur_round").innerText = cur_round; 
        generate();
      }
    function check() {
        if(document.querySelector(".variant.clicked ")!==null){
            var correct = functions[document.getElementById("vector").innerText];
            if(document.querySelector(".variant.clicked ").innerText == correct) correct_ans++;
            round_functions.push(document.getElementById("vector").innerText);
            round_answers.push(document.querySelector(".variant.clicked > p").innerText);
            round_correct_ans.push(correct);
            cur_round++;
            document.querySelector(".variant.clicked").classList.remove("clicked");
            if(cur_round>rounds) result();
            else play();
        }
        };
        
    function result(){
        
        document.getElementById("correct").innerText = correct_ans;
        document.getElementById("rounds").innerText = rounds;
        window.res.showModal();
        for(let i = 0; i<rounds; i++){
            let func = document.createElement('p');
            func.innerText = round_functions[i];
            document.querySelector(".func").appendChild(func);
            let ans = document.createElement('p');
            ans.innerText = round_answers[i];
            document.querySelector(".answer").appendChild(ans);
            let ans_corr = document.createElement('p');
            ans_corr.innerText = round_correct_ans[i];
            document.querySelector(".right-ans").appendChild(ans_corr);
        }

        cur_round = 1;  
        round_functions = [];
        round_answers = [];
        round_correct_ans = []; 
    }
})();