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

var game_functions = [];

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
        document.addEventListener("keydown", ignore);
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
    function ignore(event) {
        if (event.code == "Escape") event.preventDefault();
    }
    function chooseRounds(){
        rounds = this.innerText;
        
        if(document.querySelectorAll(".checked")!==null){
            document.querySelectorAll(".checked").forEach(element => {
                element.classList.remove("checked");
            });
        }
        // this.classList.add("checked");
        document.querySelectorAll("#" + this.id).forEach(element => {
            element.classList.add("checked");
        });
    }
    function chooseVariant(){
        if(document.querySelector(".variant.checked")!==null){
            document.querySelector(".variant.checked").classList.remove("checked"); 
        }
        this.classList.add("checked");
    };

    function generateVector(){
        var vector = "";
        for(let i=0;i<4;i++) vector+= Math.round(Math.random());
        return vector;
    }
    function generate(){
        let vector = generateVector();
        while(game_functions.indexOf(vector) != -1) vector = generateVector();
        game_functions.push(vector);
        document.getElementById("vector").innerText = vector;
        var names = {};
        Object.assign(names, functions);
        var correct = names[vector];
        names[vector] = "-";
        var variants = document.querySelectorAll("#variant");
        var var_names = [];
        var correct_num = Math.floor(Math.random() * 6);
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
        window.start.close();
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
        if(cur_round==rounds) document.getElementById("check").innerText = "РЕЗУЛЬТАТ";
        else document.getElementById("check").innerText = "ДАЛЕЕ";
        generate();
      }
    function check() {
        if(document.querySelector(".variant.checked ")!==null){
            var correct = functions[document.getElementById("vector").innerText];
            if(document.querySelector(".variant.checked ").innerText == correct) correct_ans++;
            round_functions.push(document.getElementById("vector").innerText);
            round_answers.push(document.querySelector(".variant.checked > p").innerText);
            round_correct_ans.push(correct);
            cur_round++;
            document.querySelector(".variant.checked").classList.remove("checked");
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
            if(round_answers[i]!=round_correct_ans[i]) ans.classList.add("incorrect");
            else ans.classList.add("correct");
            document.querySelector(".answer").appendChild(ans);
            let ans_corr = document.createElement('p');
            ans_corr.innerText = round_correct_ans[i];
            document.querySelector(".right-ans").appendChild(ans_corr);
        }

        cur_round = 1; 
        correct_ans = 0; 
        round_functions = [];
        round_answers = [];
        round_correct_ans = []; 
        game_functions = [];
    }
})();