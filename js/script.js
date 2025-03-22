const blocks = document.querySelectorAll('.blocks');
const dropAreas = document.querySelectorAll('.area');

blocks.forEach(block => {
    block.addEventListener('dragstart', dragStart);
});

dropAreas.forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
}

function dragOver(e) {
    e.preventDefault(); // Позволяет элементу быть сброшенным
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    const newBlock = document.createElement('p');
    newBlock.className = 'blocks';
    newBlock.textContent = data;
    newBlock.setAttribute('draggable', 'true'); // Добавляем атрибут draggable

    e.target.appendChild(newBlock);

    // Удаляем оригинальный блок
    const originalBlock = [...blocks].find(block => block.innerText === data);
    if (originalBlock) {
        originalBlock.parentNode.removeChild(originalBlock);
    }
    
    // Добавляем обработчик для нового блока
    newBlock.addEventListener('dragstart', dragStart);
}