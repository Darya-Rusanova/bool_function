(function () {
    window.addEventListener('load', init);

    function init() {
        document.addEventListener("keyup", enterUp);
        document.getElementById("res").addEventListener("click", g);
        document.getElementById("in").addEventListener("input", binprov);
    }

    function enterUp(event) {
        if(document.getElementById("res").disabled == true) return 0;
        if (event.code == "Enter") g();
    }

    
    function binprov(){
        if (this.value=='') document.getElementById("res").disabled = true; 
        else  document.getElementById("res").disabled = false; 
        const message = document.getElementById('message');
        this.value=this.value.replace(/[^0-1]/g,"");
        let length = document.getElementById("in").value.length;
            if (length > 0 && (length & (length - 1)) === 0) {
                message.textContent = '';
                document.getElementById("res").disabled = false; 
            } else {
                message.textContent = 'Длина не является степенью двойки';
                document.getElementById("res").disabled = true; 
            }
    }

    function g() {
        let vector = document.getElementById("in").value
        et = new Set(vector); 
        es = Array.from(et);
        // console.log(et);
        if(es.length==1 && es[0]=='1')
        {
            document.getElementById("test").innerHTML=1;
        }else if (es.length==1 && es[0]=='0')
        {
            document.getElementById("test").innerHTML="Не существует";
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
            // console.log(vec);
    
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
                //console.log(m,t,r);
            }
            for(let i=0;i<t.length;i++)
            {
                //console.log(t[i]);
                for(let j=i+1;j<t.length;j++)
                {
                    //console.log(t[i],t[j],t);
                    let r="",a=1;
                    find0:
                    {
                        for (let k=0;k<t[i].length;k++)
                            {
                                if(t[i][k]!=t[j][k])
                                {
                                    if(t[i][k]=='2') r+=t[j][k];
                                    else if(t[j][k]=='2') r+=t[i][k];
                                    else {r+="2";a--;}
                                    if(a<0)break find0;
                                }else r+=t[i][k];
                            }
                            //console.log(r);
                        et = new Set(r); 
                        y = Array.from(et);
                        if(y.length!=1 || y[0]!='2')
                        {
                            for (let k=0;k<t.length;k++)
                            {
                                //console.log(t,t[k][0],t[k][1],t[k][2]);
                                find:{
                                    for (let z=0;z<t[k].length;z++)
                                        if(r[z]!=t[k][z] && r[z] !="2" || i==k||j==k) break find;
                                    t.splice(k,1);
                                }
        
                            }
                        }
                    }
                }
            }
            //console.log(t);
            let ans="";
            for (let i=0;i<t.length;i++)
            {
                let v="";
                for(let j = 0;j<t[i].length;j++){                 
                    if(t[i][j]==0) v+= '<div class ="over">x'+(j+1)+'</div>·';
                    else if(t[i][j]==1) v += 'x'+(j+1)+'·';
                }
                ans += v.slice(0,-1)+ " ∨ ";
            }
            document.getElementById("test").innerHTML=ans.slice(0, -3);
            //generateTable(Math.log2(vector.length),vector);
        }
        
    }

    function generateTable(n,vector) {
        let rows, columns;
        console.log(n);
    
        if (n % 2 === 0) {
            rows = n;
        } else {
            rows = n-1;
        }
        if (rows==0)rows=1;
        columns = vector.length/rows;
        console.log(columns);
    
        let tableHTML = '<table><tr><th>i/j</th>';
            for (let j = 0; j < columns; j++) {
                tableHTML += "<th>"+dec2bin(j)+"</th>";
            }
            tableHTML += '</tr>';

            for (let i = 0; i < rows; i++) {
                tableHTML += "<tr><th>"+dec2bin(i)+"</td>";
                for (let j = 0; j < columns; j++) {
                    tableHTML += "<td>"+vector[i*columns+j]+"</td>"; 
                }
                tableHTML += "</tr>";
            }

            tableHTML += '</table>';
            document.getElementById('table').innerHTML = tableHTML;
    
        console.log(table);
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
                if (parseInt(x[i])<parseInt(y[i])){
                    if (a>0) a--;
                    else return 0;
                }
                else if (parseInt(x[i])>parseInt(y[i])) return 0;
            }
            return !(a==1) + 0;
        
    }
})();