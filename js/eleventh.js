(function () {
    window.addEventListener('load', init);

    function init() {
        // document.getElementById("res").addEventListener("click", click);
        document.addEventListener("keyup", enterUp);
        document.querySelector("input[type=checkbox]").addEventListener("change", toggle);
        document.getElementById('gen').addEventListener("click", generate);
        generate();
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
      }
    function toggle(){
        var div = document.getElementById("classes");
        if(this.checked) div.style.display = 'block';
        else div.style.display = 'none';
    }

    function generateVector(){
        var vector = "";
        var len = Math.pow(2, Math.round(Math.random() * 3 + 1));
        for(let i=0;i< len; i++){
            vector+= Math.round(Math.random());
        }
        return vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");;
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
        num_functions = Math.round(Math.random() * 5 + 1);
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

    function click() {
        return 0;
    }
})();