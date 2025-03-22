(function () {
    window.addEventListener('load', init);

    function init() {
        document.addEventListener("keyup", enterUp);
        document.getElementById("retry").addEventListener("click",gen);
        document.querySelectorAll(".variant").forEach(element => {
            element.addEventListener("click",click);
        });
        gen();
        test();
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
      }

    function gen(){
        var n = Math.round(Math.random()*3+1);
        var o = document.getElementById("out");
        var c = ""
        for (var i=0;i<Math.pow(2,n);i++)
        {
            c+= Math.round(Math.random());
        }
        o.innerText = c;
        let ans=[];
        if (c[0]==0)ans.push(1);
        else ans.push(0);
        if (c[c.length-1]==1)ans.push(1);
        else ans.push(0);
        ans.push(samo(c));
        ans.push(mono(c));
        ans.push(lin(c));
        console.log(ans);
    }

    function lin(c)
    {
        ans = [];
        var a = c.split("").map(Number);
        ans.push(a[0]);
        for (let z=0;z<(c.length-1);z++)
        {
            let b=[];
            for(let i=0;i<a.length-1;i++)
            {
                b[i]=(a[i]+a[i+1]&1);
            }
            ans.push(b[0]);
            let t=a;
            a=b;
            b=t;
        }
        ans[c.length-1]=a[0];
        for(let i=0;i<ans.length;i++)
        {
           if(sum(dec2bin(i))>1)
           {
                if(ans[i]=='1')
                {
                    return 0;
                }
           }
        }
        return 1;
    }

    function sum(numbers) {
        numbers=numbers.split("").map(Number);
        let sum = 0;
        for (let number of numbers) {
          sum += number;
        }
        return sum;
    };

    function test()
    {
        console.log(lin("1111"));
    }

    function samo(c)
    {
        for (let i=0;i<(c.length-1)/2;i++)
        {
            if (c[i]==c[c.length-1-i])
            {
                return 0;
            }
        } 
        return 1;
    }
    
    function mono(c)
    {
        for (let i=0;i<c.length;i++)
        {
            for (let j=i;j<c.length;j++)
            {
                if (prov(dec2bin(i),dec2bin(j)))
                {
                    if(c[i]>c[j])
                    {
                        return 0;
                    }
                }
            }
        }           
        return 1;
    }

    function dec2bin(dec) {
        return (dec >>> 0).toString(2);
    }

    function prov(x,y)
    {
        find:
        {

            let a = 1;
            for(let i=0;i<x.length;i++)
            {
                if (parseInt(x[i])<parseInt(y[i]))
                {
                    if (a>0)
                    {
                        a--;
                    }
                    else 
                    {
                        return 0;
                    }
                }else if (parseInt(x[i])>parseInt(y[i])) return 0;
            }
            if (a==1) return 0;
            else return 1;
        }
    }

    function click() {
        if (this.classList=="variant non-checked")
        {
            this.classList.remove("non-checked");
            this.classList.add("checked");
        }else
        {
            this.classList.remove("checked");
            this.classList.add("non-checked");
        }
    }
})();