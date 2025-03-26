(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("check").addEventListener("click", check);
        document.addEventListener("keyup", enterUp);
        generate();
        document.getElementById("generate").addEventListener("click", generate);
        document.getElementById("retry").addEventListener("click", retry);
        blocksDrag();
    }
    function enterUp(event) {
        if (event.code == "Enter") check();
    }

    var n = 1;

    function retry(){
        document.querySelector(".arguments").replaceChildren();
        document.getElementById("significant").replaceChildren();
        document.getElementById("fictitious").replaceChildren();
        for(let i = 1; i<=n; i++){
            let block = document.createElement("p");
            block.setAttribute("draggable", true);
            block.classList.add("blocks");
            block.innerText = "x"+i;
            document.querySelector(".arguments").appendChild(block);
        }
        blocksListener();
    }

    function generate(){
        document.querySelector(".arguments").replaceChildren();
        document.getElementById("significant").replaceChildren();
        document.getElementById("fictitious").replaceChildren();
        var vector = "";
        n = Math.round(Math.random() * 3 + 1);
        var len = Math.pow(2, n);
        for(let i=0;i< len; i++){
            vector+= Math.round(Math.random());
        }
        document.getElementById("vector").innerText = vector.replace(/\B(?=(\d{4})+(?!\d))/g, " ");

        for(let i = 1; i<=n; i++){
            let block = document.createElement("p");
            block.setAttribute("draggable", true);
            block.className = "blocks";
            block.innerText = "x"+i;
            document.querySelector(".arguments").appendChild(block);
        }
        blocksListener();
    }
    
    function message(mes){
        var msg = "";
        switch(mes){
            case 0:
                msg = "Неверно! Вернитесь и попробуйте еще раз.";
                break;
            case 1: 
                msg = "Верно!";
                break;
        }
        document.getElementById("message").innerText = msg;
        window.res.showModal();
    }

    function check(){
        if(document.querySelector(".arguments").childElementCount > 0) message(0);
        let bad = 0;
        document.getElementById("fictitious").childNodes.forEach(element => {
            let num = element.innerText;
            if(isFictive(num) == 0) bad = 1;
        });
        if(bad) message(0);
        message(1);
    
    }

    function isFictive(vec, n) {
        const m = Math.pow(2, Math.log2(vec.length)-n);
        var ost_0 = "";
        var ost_1 = ""
        for (let i=0; i<vec.length;i+=2*m){
            for(let j=0;j<m;j++) ost_0+=vec[i+j];
        }
        for (let i=m; i<vec.length;i+=2*m){
            for(let j=0;j<m;j++) ost_0+=vec[i+j];
        }   
        if(ost_0 == ost_1) return 1;
        return 0;
    }

    function blocksListener(){
        var blocks = document.querySelectorAll('.blocks');
        
        blocks.forEach(block => {
            block.addEventListener('dragstart', dragStart);
        });
        
    }
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.innerText);
    }
    
    function blocksDrag(){
        var dropAreas = document.querySelectorAll('div.area');
        dropAreas.forEach(area => {
            area.addEventListener('dragover', dragOver);
            area.addEventListener('drop', drop);
        });
    }
    
    function dragOver(e) {
        e.preventDefault(); // Позволяет элементу быть сброшенным
    }
    
    function drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData('text/plain');
        if(data[0] != "x" || e.target.className == "blocks") return 0;
        var blocks = document.querySelectorAll('.blocks');
        const newBlock = document.createElement('p');
        newBlock.className = 'blocks';
        newBlock.textContent = data;
        newBlock.setAttribute('draggable', 'true'); // Добавляем атрибут draggable
        
        e.target.appendChild(newBlock);
        
        // Удаляем оригинальный блок
        const originalBlock = [...blocks].find(block => block.innerText === data);
        
        if (originalBlock) {
            let parent = originalBlock.parentNode;
            // console.log("child: ", originalBlock);
            // console.log("parent: ", parent)
            parent.removeChild(originalBlock);
            // console.log("killed a child")
        }
        
        // Добавляем обработчик для нового блока
        newBlock.addEventListener('dragstart', dragStart);
        blocks = document.querySelectorAll('.blocks');
    }
})();


