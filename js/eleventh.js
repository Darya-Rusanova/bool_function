(function () {
    window.addEventListener('load', init);

    function init() {
        window.start.showModal();
        document.querySelectorAll("#play").forEach(element => {
            element.addEventListener("click", play);
        });
        document.getElementById("check").addEventListener("click", check);
        document.addEventListener("keydown", ignore);
        document.querySelector("input[type=checkbox]").addEventListener("change", toggle);
        document.getElementById('gen').addEventListener("click", generate);
        document.querySelectorAll("input[type=range]").forEach(element => {
            element.addEventListener("input", change);
        });
    }
      function ignore(event) {
        if (event.code == "Escape") event.preventDefault();
    }
    function toggle(){
        var div = document.getElementById("classes");
        if(this.checked) {
            div.style.animation = "hide 0.5s forwards";
            setTimeout(() => {
                div.style.display = 'none'; 
            }, 400);
        }
        else {
            div.style.display = 'block';
            div.style.animation = "show 0.5s forwards";
        }
        document.querySelectorAll(".checkbox-input").forEach(element => {
            element.checked = false;
        });
    }
    function change(){
        if(count==1) game=1;
        else game=2;

        var nfmin = parseInt(document.getElementById("f-low-"+game).value);
        var nfmax = parseInt(document.getElementById("f-high-"+game).value);
        var nmin = parseInt(document.getElementById("arg-low-"+game).value);
        var nmax = parseInt(document.getElementById("arg-high-"+game).value);
        if(nfmin>nfmax) nfmin = [nfmax, nfmax = nfmin][0];
        if(nmin>nmax) nmin = [nmax, nmax = nmin][0];
        document.getElementById("text-f-low-"+game).innerText = nfmin;
        document.getElementById("text-f-high-"+game).innerText = nfmax;
        document.getElementById("text-arg-low-"+game).innerText = nmin;
        document.getElementById("text-arg-high-"+game).innerText = nmax;
    }

    // задать из начальной всплывашки, это плейсхолдер
    var num_functions = 0;
    var n = 0;
    var count = 1;

    var correct_ans = {"T0":1, "T1":1, "S":1, "M":1, "L":1};
    var chosen_ans = {"T0":0, "T1":0, "S":0, "M":0, "L":0};
    var full = 1;

    function retry(){
        document.querySelectorAll("input[type=checkbox]").forEach(element => {
            element.checked = false;
        });
        document.getElementById("classes").style.display = 'block';
        document.getElementById("classes").style.animation = "show 0.5s forwards";
    }
    function getNums(){
        if(count==1){
            game=1;
        }
        else game=2;
        var nfmin = parseInt(document.getElementById("f-low-"+game).value);
        var nfmax = parseInt(document.getElementById("f-high-"+game).value);
        var nmin = parseInt(document.getElementById("arg-low-"+game).value);
        var nmax = parseInt(document.getElementById("arg-high-"+game).value);
        if(nfmin>nfmax) nfmin = [nfmax, nfmax = nfmin][0];
        if(nfmax == nfmin) num_functions = nfmax;
        else num_functions = Math.floor(Math.random() * (nfmax - nfmin + 1)) + nfmin;
        if(nmin>nmax) nmin = [nmax, nmax = nmin][0];
        if(nmin == nmax) n = nmin;
        else n =  Math.floor(Math.random() * (nmax - nmin + 1)) + nmin;
        if(game==1){
            document.getElementById("f-low-2").value = nfmin;
            document.getElementById("f-high-2").value = nfmax;
            document.getElementById("arg-low-2").value = nmin;
            document.getElementById("arg-high-2").value = nmax;
            document.getElementById("text-f-low-2").innerText = nfmin;
            document.getElementById("text-f-high-2").innerText = nfmax;
            document.getElementById("text-arg-low-2").innerText = nmin;
            document.getElementById("text-arg-high-2").innerText = nmax;
        }
        
    }

    function play(){
        getNums();
        retry();
        correct_ans = {"T0":1, "T1":1, "S":1, "M":1, "L":1};
        chosen_ans = {"T0":0, "T1":0, "S":0, "M":0, "L":0};
        full = 1;
    
        document.getElementById("answer").setAttribute("class", "");
        document.getElementById("text_ans").setAttribute("class", "");
        

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
        let classes = classesList(vector);
        Object.keys(chosen_ans).forEach(key => {
            correct_ans[key] *= classes[key];
        });
        return vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    }

    function createFunc(vector){
        var p = document.createElement('p');
        p.innerText = vector;
        return p;
    }

    function generate(){
        retry();
        var used = [];
        document.querySelector(".center").replaceChildren();
        document.querySelector(".first-col").replaceChildren();
        document.querySelector(".second-col").replaceChildren();
        for(let i = 0; i<num_functions; i++){  
            var vector = generateVector();
            if(n>1){
                while(used.indexOf(vector) != -1) vector = generateVector();
            }
            used.push(vector);
            if(i%2) document.querySelector(".first-col").appendChild(createFunc(vector));
                else{
                    if(i+1 == num_functions){
                        document.querySelector(".center").appendChild(createFunc(vector));
                    }
                    else{
                        document.querySelector(".second-col").appendChild(createFunc(vector));        
                    }
                }
        }
      }

      function classesList(vector){
        let ans = {};
        ans["T0"] = (vector[0]==0) + 0;
        ans["T1"] = (vector[vector.length-1]==1)+0;
        ans["S"] = samo(vector);
        ans["M"] = mono(vector);
        ans["L"] = lin(vector);
        return ans;
    }
    function check(){
        count++;
        var text_ans = "ВЕРНО";
        var full = 1;
        Object.keys(correct_ans).forEach(key => {
            if(correct_ans[key]==1) full=0;
        });
        if(document.querySelector("input[type=checkbox]").checked){
            document.getElementById("text_ans").innerText = "Полная";
            if(full == 1){
                text_ans = "ВЕРНО";
                document.getElementById("text_ans").classList.add("correct");
            }
            else{
                text_ans = "НЕВЕРНО";
                document.getElementById("text_ans").classList.add("incorrect");
            }
            
        }
        else{
            document.getElementById("text_ans").innerText = "Неполная";
            if(full == 1){
                text_ans = "НЕВЕРНО";
                document.getElementById("text_ans").classList.add("incorrect");
            }
            else document.getElementById("text_ans").classList.add("correct");
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

            document.getElementById("answer").innerText = text_ans;
            document.getElementById("chosen_answers").appendChild(td_chosen);
            document.getElementById("correct_answers").appendChild(td_correct);
        });
        if(text_ans=="ВЕРНО") document.getElementById("answer").classList.add("correct_div");
        else document.getElementById("answer").classList.add("incorrect_div");
        
        if(full==1) document.getElementById("text_ans_correct").innerText = "Полная";
        else document.getElementById("text_ans_correct").innerText = "Неполная";
        window.res.showModal();
    }
    


    function lin(c)
    {
        if(c.length==2) return 1;
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
