(function () {
    window.addEventListener('load', init);

    function init() {
        document.addEventListener("keyup", enterUp);
        document.addEventListener("keydown", ignore);
        document.getElementById("generate").addEventListener("click", generateVector);
        document.querySelectorAll(".variant").forEach(element => {
            element.addEventListener("click", chooseVariant);
        });
        document.getElementById("check").addEventListener("click", check)
        generateVector();
    }
    function enterUp(event) {
        if (event.code == "Enter") check();
      }
      function ignore(event) {
        if (event.code == "Escape") event.preventDefault();
    }

      correct_ans = {}
      chosen_ans = {"T0":0, "T1":0, "S":0, "M":0, "L":0}

    function generateVector(){
        correct_ans = {}
        chosen_ans = {"T0":0, "T1":0, "S":0, "M":0, "L":0}
        var n = Math.round(Math.random()*3+1);
        var vector = ""
        for (var i=0;i<Math.pow(2,n);i++) vector+= Math.round(Math.random());
        document.getElementById("out").innerText = vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
        retry();
        correct_ans = classList(vector);
        console.log(correct_ans, chosen_ans);
    }

    function retry(){
        document.querySelectorAll('.variant').forEach(element => {
            element.classList = 'variant';
        });
    }

    function chooseVariant(){
        if(this.classList=="variant"){
            this.classList.add("checked");
            chosen_ans[this.id] = 1;
        }
        else{
            this.classList.remove("checked");
            chosen_ans[this.id] = 0;
        }
    };

    function check(){
        console.log(Object.keys(chosen_ans));
        Object.keys(chosen_ans).forEach(func => {
            if(chosen_ans[func] == 1) {
                if(chosen_ans[func] == correct_ans[func]){
                    document.getElementById(func).classList.add("chosen_correct");
                }
                else{
                    document.getElementById(func).classList.add("chosen_incorrect");
                }
            }
            else{
                if(chosen_ans[func] == correct_ans[func]){
                    document.getElementById(func).classList.add("not_chosen_correct");
                }
                else{
                    document.getElementById(func).classList.add("not_chosen_incorrect");
                }
            }
        });

    }

    function classList(vector){
        let ans = {};
        ans["T0"] = (vector[0]==0) + 0;
        ans["T1"] = (vector[vector.length-1]==1)+0;
        ans["S"] = samo(vector);
        ans["M"] = mono(vector);
        ans["L"] = mono(vector);
        return ans;
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

    // function test()
    // {
    //     console.log(lin("1111"));
    // }

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