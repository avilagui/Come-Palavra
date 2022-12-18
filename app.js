const tiles = document.querySelector(".tile-container"); //tiles é o elemento que contém as linhas                                       
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow"); //elemento que contem o enter e o backspace
const keyboardFirstRow = document.querySelector("#keyboardFirstRow"); //elemento que contem as teclas do teclado 
const keyboardSecondRow = document.querySelector("#keyboardSecondRow"); 
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");
const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];    //array das teclas do teclado 
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];
const rows = 6; //numero de linhas
const columns = 5; //numero de colunas
let currentRow = 0; //linha atual
let currentColumn = 0; 
let comePalavra = "CATAR";  //Palavra a ser descoberta
const guesses = []; //array das letras que forem digitadas


for (let rowIndex = 0; rowIndex < rows; rowIndex++) { //cria as linhas
    guesses[rowIndex] = new Array(columns); // as colunas são adicionadas ao array guesses
    const tileRow = document.createElement("div"); //cria a linha
    tileRow.setAttribute("id", "row" + rowIndex); //id da linha adicionado
    tileRow.setAttribute("class", "tile-row"); //classe da linha 
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) { //cria a coluna
        const tileColumn = document.createElement("div"); 
        tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex); //id da coluna adicionado
        tileColumn.setAttribute( 
            "class",
            rowIndex === 0 ? "tile-column typing" : "tile-column disabled" 
        );
        tileRow.append(tileColumn); //coluna adicionada a linha
        guesses[rowIndex][columnIndex] = ""; //coluna adicionada ao array guesses
    }
    tiles.append(tileRow); //linha adicionada ao elemento que contém as linhas
}
const checkGuess = () => {  //verifica se a palavra digitada é igual a palavra a ser descoberta
    const guess = guesses[currentRow].join(""); //transforma o array em string
    if (guess.length !== columns) { //verifica se a palavra digitada tem o mesmo numero de letras da palavra a ser descoberta
        return; //se não tiver, retorna
    }
    let comePalavraLocal = [...comePalavra] //transforma a palavra a ser descoberta em array
    var currentColumns = document.querySelectorAll(".typing"); //pega as colunas que estão sendo digitadas
    for (let index = 0; index < columns; index++) { //verifica se a letra digitada está na palavra a ser descoberta
        const letter = guess[index]; //pega a letra digitada
        if (comePalavraLocal.indexOf(letter) < 0) {     //verifica se a letra digitada está na palavra a ser descoberta
            currentColumns[index].classList.add("wrong") //se não estiver, adiciona a classe wrong(amarelo)
        } else { //se estiver
            if (comePalavraLocal[index] === letter) { //verifica se a letra digitada está na posição correta
                currentColumns[index].classList.add("right") //se estiver, adiciona a classe right (verde)
            } else {
                currentColumns[index].classList.add("displaced") //se não estiver, adiciona a classe displaced (vermelho)
            }
        }
    }
    if (guess !== comePalavra) { //verifica se a palavra digitada é igual a palavra a ser descoberta
        if (currentRow === rows - 1) { //verifica se a linha atual é a ultima linha
            window.location.reload() //se for, recarrega a página
        } else { //se não for vai para proxima linha
            moveToNextRow()
        }
    }
};

const moveToNextRow = () => { //vai para a proxima linha
    var typingColumns = document.querySelectorAll(".typing") //pega as colunas que estão sendo digitadas
    for (let index = 0; index < typingColumns.length; index++) { //remove a classe typing e adiciona a classe disabled
        typingColumns[index].classList.remove("typing") 
        typingColumns[index].classList.add("disabled")
    }
    currentRow++  //a linha atual é incrementada
    currentColumn = 0  //a coluna atual é zerada

    const currentRowEl = document.querySelector("#row" + currentRow) //pega a linha atual
    var currentColumns = currentRowEl.querySelectorAll(".tile-column") //pega as colunas da linha atual
    for (let index = 0; index < currentColumns.length; index++) { //remove a classe disabled e adiciona a classe typing
        currentColumns[index].classList.remove("disabled")
        currentColumns[index].classList.add("typing")
    }
}

const handleKeyboardOnClick = (key) => { //função que é chamada quando uma tecla é clicada
    if (currentColumn === columns) { //verifica se a coluna atual é a ultima coluna
        return;
    }
    const currentTile = document.querySelector( //pega a coluna atual
        "#row" + currentRow + "column" + currentColumn  //id da coluna atual
    );
    currentTile.textContent = key; //adiciona a letra clicada na coluna atual
    guesses[currentRow][currentColumn] = key; //adiciona a letra clicada no array guesses
    currentColumn++; //incrementa a coluna atual
};
const createKeyboardRow = (keys, keyboardRow) => { //cria as linhas do teclado
    keys.forEach((key) => { //cria as colunas do teclado
        var buttonElement = document.createElement("button"); //cria o botão
        buttonElement.textContent = key; //adiciona o texto do botão
        buttonElement.setAttribute("id", key); //adiciona o id do botão
        buttonElement.addEventListener("click", () => handleKeyboardOnClick(key)); //adiciona o evento de click no botão
        keyboardRow.append(buttonElement); //adiciona o botão na linha do teclado
    }); 
};
createKeyboardRow(keysFirstRow, keyboardFirstRow); //chama a função que cria as linhas do teclado
createKeyboardRow(keysSecondRow, keyboardSecondRow); 
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => { //função que é chamada quando o botão backspace é clicado
    if (currentColumn === 0) { //verifica se a coluna atual é a primeira coluna
        return
    }

    currentColumn-- //decrementa a coluna atual
    guesses[currentRow][currentColumn] = "" //remove a letra do array guesses
    tile.textContent = "" //remove a letra da coluna atual
};

const backspaceButton = document.createElement("button"); //cria o botão backspace
backspaceButton.addEventListener("click", handleBackspace); //adiciona o evento de click no botão
backspaceButton.textContent = "<"; //adiciona o texto do botão
backspaceAndEnterRow.append(backspaceButton); //adiciona o botão na linha do teclado
const enterButton = document.createElement("button"); //cria o botão enter
enterButton.addEventListener("click", checkGuess); //adiciona o evento de click no botão
enterButton.textContent = "ENTER"; //adiciona o texto do botão
backspaceAndEnterRow.append(enterButton); //adiciona o botão na linha do teclado

document.onkeydown = function (evt) { //função que é chamada quando uma tecla é pressionada
    evt = evt || window.evt //pega o evento
    if (evt.key === "Enter") { //verifica se a tecla pressionada é o enter
        checkGuess(); //chama a função que verifica se a palavra digitada é igual a palavra a ser descoberta
    } else if (evt.key === "Backspace") { //verifica se a tecla pressionada é o backspace
        handleBackspace() //chama a função que remove a letra da coluna atual
    } else { //se não for o enter ou o backspace
        handleKeyboardOnClick(evt.key.toUpperCase()) //chama a função que adiciona a letra digitada na coluna atual
    }
}

function iniciaModal(modalID) {
        const modal = document.getElementById(modalID);
        if (modal) {
            modal.classList.add('mostrar');
            modal.addEventListener('click', (e) => {
                if (e.target.id == modalID || e.target.className == 'fechar') {
                    modal.classList.remove('mostrar');
                    localStorage.fechaModal = modalID;
                }
            });
        }
}

const btnTutorial = document.querySelector('.btn-tutorial');
btnTutorial.addEventListener('click', () => iniciaModal('modal-tutorial'));

function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e) => {
            if (e.target.id == modalID || e.target.className == 'fechar') {
                modal.classList.remove('mostrar');
                localStorage.fechaModal = modalID;
            }
        });
    }
}

const btnCreditos = document.querySelector('.btn-creditos');
btnCreditos.addEventListener('click', () => iniciaModal('modal-credito'));

var btn = document.querySelector("#refresh");
btn.addEventListener("click", function () {

    location.reload();
});