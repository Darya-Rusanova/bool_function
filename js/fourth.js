(function () {
    window.addEventListener('load', init);

    function init() {
        // document.getElementById("res").addEventListener("click", click);
        document.addEventListener("keyup", enterUp);
        generateFunction();
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
      }

    function generateFunction(){
        var vector = "";
        for(let i=0;i<4;i++) vector+= Math.round(Math.random());
        document.getElementById("vector").innerText = vector;
      }

    function click() {
        var names = {"0001":"конъюнкция",
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
            }
        var correct = names[document.getElementById("vector").innerText]
        var variants = document.querySelectorAll("variant");
        for(let el of variants){
            
        }
        };
        

})();