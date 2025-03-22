(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.addEventListener("keyup", enterUp);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
      }

    function click() {
        var vec = document.getElementById("vector").value;
        var val = document.getElementById("residual").value;
        var n = document.getElementById("num").value;
        var ans= "";
        var off =0;
        const m = Math.pow(2,Math.log2(vec.length)-n);
        // alert(m);
        if (val == "1")
        {
            off = m;
        }
        for (let i=off; i<vec.length;i+=2*m)
        {
            for(let j=0;j<m;j++)
            {
                ans+=vec[i+j];
            }
        }
        document.getElementById("out").innerText = ans.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
        return 0;
    }
})();