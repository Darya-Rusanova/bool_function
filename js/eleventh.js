(function () {
    window.addEventListener('load', init);

    function init() {
        window.start.showModal();
        document.querySelectorAll("#play").forEach(element => {
            element.addEventListener("click", play);
        });
        document.getElementById("check").addEventListener("click", result);
        document.addEventListener("keydown", ignore);
        document.querySelector("input[type=checkbox]").addEventListener("change", toggle);
        document.getElementById('gen').addEventListener("click", generate);
        // generate(); // убрать
    }
      function ignore(event) {
        if (event.code == "Escape") event.preventDefault();
    }
    function toggle(){
        var div = document.getElementById("classes");
        if(this.checked) div.style.display = 'none';
        else div.style.display = 'block';
    }

    // задать из начальной всплывашки
    var num_functions = 3;
    var n = 2;
    var cur_n = 1;

    var correct_ans = {"T0":1, "T1":1, "S":1, "M":1, "L":1, "full":1};
    var chosen_ans = {"T0":0, "T1":0, "S":0, "M":0, "L":0};
    var full = 1;

    function play(){
        // num_functions = document.getElementById("").value;
        // n = document.getElementById().value;
        correct_ans = {"T0":1, "T1":1, "S":1, "M":1, "L":1, "full":1};
        chosen_ans = {"T0":0, "T1":0, "S":0, "M":0, "L":0};
        full = 1;
        cur_n = 1;
        document.getElementById("answer").classList = "";

        let td = document.createElement("td");
        td.innerHTML = "<b>Ваш ответ</b>";
        document.getElementById("chosen_answers").replaceChildren(td);
        td = document.createElement("td");
        td.innerHTML = "<b>Верный ответ</b>";
        document.getElementById("correct_answers").replaceChildren(td);
        
        generate();
    }


    function generateVector(){
        var vector = "";
        var len = Math.pow(2, n);
        for(let i=0;i< len; i++){
            vector+= Math.round(Math.random());
        }
        let classes = classList(vector);
        Object.keys(correct_ans).forEach(key => {
            correct_ans[key] *= classes[key];
            if(correct_ans[key] == 1) full = 0;
        });
        correct_ans["full"] = full;
        return vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    }

    function createFunc(vector){
        var p = document.createElement('p');
        p.innerText = vector;
        return p;
    }

    function generate(){
        document.querySelector(".center").replaceChildren();
        document.querySelector(".first-col").replaceChildren();
        document.querySelector(".second-col").replaceChildren();
        // num_functions = Math.round(Math.random() * 5 + 1);
        for(let i = 0; i<num_functions; i++){
            if(i%2) document.querySelector(".first-col").appendChild(createFunc(generateVector()));
                else{
                    if(i+1 == num_functions){
                        document.querySelector(".center").appendChild(createFunc(generateVector()));
                    }
                    else{
                        document.querySelector(".second-col").appendChild(createFunc(generateVector()));        
                    }
                }
        }
      }

      function classList(vector){
        let ans = {};
        ans["T0"] = (vector[0]==0) + 0;
        ans["T1"] = (vector[vector.length-1]==1)+0;
        ans["S"] = samo(vector);
        ans["M"] = mono(vector);
        ans["L"] = lin(vector);
        ans["full"] = (ans["T0"] == 1 || ans["T1"] == 1 || ans["S"] == 1 || ans["L"] == 1 || ans["M"] == 1) ? 1 : 0;
        return ans;
    }
    function check(){
        var text_ans = "ВЕРНО";
        // console.log(document.querySelector("input[type=checkbox]").checked);
        if(document.querySelector("input[type=checkbox]").checked){
            if(correct_ans["full"] == 1) text_ans = "ВЕРНО";
            else text_ans = "НЕВЕРНО";
        }
        else{
            if(correct_ans["full"] == 1) text_ans = "НЕВЕРНО";
        }
        Object.keys(chosen_ans).forEach(key => {
            chosen_ans[key] = document.getElementById(key).checked + 0;
        });
        Object.keys(chosen_ans).forEach(func => {
            let td_chosen = document.createElement("td");
            td_chosen.innerText = (chosen_ans[func] == 1) ? "+" : "-";
            let td_correct = document.createElement("td");
            td_correct.innerText = (correct_ans[func] == 1) ? "+" : "-";
            if(chosen_ans[func]==correct_ans[func]){
                td_chosen.classList.add("correct");
            }
            else{
                td_chosen.classList.add("incorrect");
                text_ans = "НЕВЕРНО";
            }
            if(text_ans=="ВЕРНО") document.getElementById("answer").classList.add("correct_div");
            else document.getElementById("answer").classList.add("incorrect_div");
            document.getElementById("answer").innerText = text_ans;
            document.getElementById("chosen_answers").appendChild(td_chosen);
            document.getElementById("correct_answers").appendChild(td_correct);
        });
        window.res.showModal();
        // console.log("correct_ans");
        // console.log(correct_ans);
        // console.log("chosen_ans");
        // console.log(chosen_ans);
    }
    function result(){
        check();
        window.res.showModal();
        // num_functions = 1;
        // n = 2;
       
    }
    


    function lin(c)
    {
        ans = [];
        var a = c.split("").map(Number);
        ans.push(a[0]);
        for (let z=0;z<(c.length-1);z++) {
            let b=[];
            for(let i=0;i<a.length-1;i++) b[i]=(a[i]+a[i+1]&1);
            ans.push(b[0]);
            let t=a;
            a=b;
            b=t;
        }
        ans[c.length-1]=a[0];
        for(let i=0;i<ans.length;i++) {
           if(sum(dec2bin(i))>1) {
                if(ans[i]=='1') return 0;
           }
        }
        return 1;
    }

    function sum(numbers) {
        numbers=numbers.split("").map(Number);
        let sum = 0;
        for (let number of numbers) sum += number;
        return sum;
    };

    function samo(c){
        for (let i=0;i<(c.length-1)/2;i++){
            if (c[i]==c[c.length-1-i]) return 0;
        } 
        return 1;
    }
    
    function mono(c){
        for (let i=0;i<c.length;i++){
            for (let j=i;j<c.length;j++){
                if (prov(dec2bin(i),dec2bin(j))){
                    if(c[i]>c[j]) return 0;
                }
            }
        }           
        return 1;
    }

    function dec2bin(dec){
        return (dec >>> 0).toString(2);
    }

    function prov(x,y){
            let a = 1;
            for(let i=0;i<x.length;i++){
                if (parseInt(x[i])<parseInt(y[i])){
                    if (a>0) a--;
                    else return 0;
                }
                else if (parseInt(x[i])>parseInt(y[i])) return 0;
            }
            return !(a==1) + 0;
        
    }
})();
