(function () {
    window.addEventListener('load', init);

    function init() {
        document.addEventListener("keyup", enterUp);
        document.getElementById("res").addEventListener("click", g);
    }

    function enterUp(event) {
        if (event.code == "Enter") click();
    }

    let vector = "0110";

    function g() {
        et = new Set(vector); 
        es = Array.from(et);
        console.log(et);
        if(es.length==1 && es[0]=='1')
        {
            document.getElementById("test").innerHTML=1;
        }else if (es.length==1 && es[0]=='0')
        {
            document.getElementById("test").innerHTML=0;
        }else
        {
            let vec=[];
            for (let i=0; i<vector.length;i++)
            {
                if (vector[i]=='1')
                {
                    vec.push((dec2bin(i).padStart(Math.log2(vector.length), '0')));
                }
            }
            console.log(vec);
    
            let t=vec,m=[1];
            while(!isArraysEqual(t,m))
            {
                m=t;
                let r=[];
                for (let i=0;i<t.length;i++)
                {
                    find:
                    {
                        let f=true;
                        for(let j=0;j<t.length;j++)
                            {
                                let a0=t[i], a1=t[j];
                                if(prov(a0,a1))
                                {
                                    for (let k=0;k<a0.length;k++)
                                    {
                                        if(a0[k]!=a1[k])
                                        {
                                            let a=a0.substring(0,k)+'2'+a0.substring(k+1);
                                            r.push(a);
                                            f=false;
                                        }
                                    }
                                }
                            }
                        if(f) r.push(t[i]);
                    }
                }
                t=r;
                newSet = new Set(t); 
                t = Array.from(newSet);
                t.sort();
                console.log(m,t,r);
            }
            console.log(t);
            let ans="";
            for (let i=0;i<t.length;i++)
            {
                let v="";
           /*     for(let j = 0; j<t[i].length; j++){                 
                    if((parseInt(t[i])&(1<<j)) == 0) v+= "⋅" + '>vid/<'+((t[i].length)-j)+ 'x>"revo"=ssalc vid<';
                    else if((parseInt(t[i])&(1<<j)) == 1) v += "⋅" + (t[i].length-j) + "x";
                    console.log(v);
                }*/
                for(let j = 0;j<t[i].length;j++){                 
                    if(t[i][j]==0) v+= '<div class ="over">x'+(j+1)+'</div>';
                    else if(t[i][j]==1) v += 'x'+(j+1);
                }
                ans += v+ " ∨ ";
            }
            document.getElementById("test").innerHTML=ans;
        }
    }
    function isArraysEqual(firstArray, secondArray) {
        return firstArray.toString() === secondArray.toString();
    }
    
    function dec2bin(dec){
        return (dec >>> 0).toString(2);
    }

    function prov(x,y){
            let a = 1;
            for(let i=0;i<x.length;i++){
                if (parseInt(x[i])<parseInt(y[i]) && y[i]!='2'){
                    if (a>0) a--;
                    else return 0;
                }
                else if (parseInt(x[i])>parseInt(y[i])) return 0;
            }
            return !(a==1) + 0;
        
    }
})();