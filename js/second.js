(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
    }

    function click() {
        var vec = document.getElementById("1").value;
        var val = document.getElementById("2").value;
        var n = document.getElementById("3").value;
        var ans= "";
        var off =0;
        const m = Math.pow(2,Math.log2(vec.length)-n);
        alert(m);
        if (val == "1")
        {
            off = m;
        }
        for (let i=off; i<vec.length;i+=2*m)
        {
            for(let j=0;j<m;j++)
            {
                ans+=vec[i+j];
                console.log(i,j)
            }
        }
        document.getElementById("out").innerText = ans;
        return 0;
    }
})();