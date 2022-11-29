'use strict'

/* Página de Login */

function logar() {

    var email = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;

    if (email == 'avilacamilla' && password == 'comunidadeCode') {
        alert('Autenticado com sucesso!');
        location.href = 'home.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

/* Página home */

const notes = document.querySelector(".notes");

const addNoteTitle = document.querySelector(".add_note_title");
const addNoteText = document.querySelector(".add_note_text");
const addNoteBtn = document.querySelector(".add_note_btn");
const deleteAllNote = document.querySelector(".delete_all_note_btn");

let localStorageSize = localStorage.length / 2;
let numClick = 1;
let i = 0;
let article;
let inputTitle;
let textArea;
let buttons;
let deleteNote;
let saveNote;
let keyTitle = 0;
let keyText = 1000000;

function adicionarNota(){
    article = document.createElement("ARTICLE");
    inputTitle = document.createElement("INPUT");
    textArea = document.createElement("TEXTAREA");
    buttons = document.createElement("DIV");
    deleteNote = document.createElement("IMG");
    saveNote = document.createElement("IMG");

    article.appendChild(inputTitle);
    article.appendChild(textArea);
    article.appendChild(buttons);
    buttons.appendChild(deleteNote);
    buttons.appendChild(saveNote);
    notes.appendChild(article); 

    article.classList.add("your_note");
    article.classList.add(`your_note_${i}`);
    inputTitle.classList.add(`your_note_title_${i}`);
    textArea.classList.add(`your_note_text_${i}`);
    buttons.classList.add("button_action");
    deleteNote.classList.add(`${keyTitle}`);
    deleteNote.classList.add(`${keyText}`);
    deleteNote.classList.add(`your_note_btn_${i}`);
    saveNote.classList.add(`${keyTitle}`);
    saveNote.classList.add(`${keyText}`);
    saveNote.classList.add(`your_note_btn_${i}`);
}

function atribuirValor(){
    const yourNoteTitle = document.querySelector(`.your_note_title_${i}`);
    const yourNoteText = document.querySelector(`.your_note_text_${i}`);

    deleteNote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
    saveNote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

    yourNoteTitle.value = addNoteTitle.value;
    yourNoteText.value = addNoteText.value;

    localStorage.setItem(keyTitle, yourNoteTitle.value);
    localStorage.setItem(keyText, yourNoteText.value);

    addNoteTitle.value = "";
    addNoteText.value = "";
}

function recuperarValor(){
    const yourNoteTitle = document.querySelector(`.your_note_title_${i}`);
    const yourNoteText = document.querySelector(`.your_note_text_${i}`);

    deleteNote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
    saveNote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

    yourNoteTitle.value = localStorage.getItem(keyTitle);
    yourNoteText.value = localStorage.getItem(keyText);
}

function eliminarNota(){
    deleteNote.addEventListener("click", (e)=>{
        let resposta = confirm("Tem certeza de que deseja excluir esta nota?");
        if(resposta){
            notes.removeChild(e.path[2]);
            localStorage.removeItem(e.path[0].classList[0]);
            localStorage.removeItem(e.path[0].classList[1]);
            localStorageSize = localStorage.length / 2;
        }
    });
}

function guardarNota(){
    saveNote.addEventListener("click", (e)=>{
        let valorAnteriorTitle = localStorage.getItem(e.path[0].classList[0]);
        let valorAnteriorText = localStorage.getItem(e.path[0].classList[1]);

        let valorAtualTitle = e.path[2].children[0].value;
        let valorAtualText = e.path[2].children[1].value;

        if(valorAnteriorTitle != valorAtualTitle || valorAnteriorText != valorAtualText){
            if(valorAtualTitle.length != 0 && valorAtualText.length != 0){
                let resposta = confirm("Tem certeza de deseja guardar?");
                if(resposta){
                    localStorage.setItem(e.path[0].classList[0], valorAtualTitle);
                    localStorage.setItem(e.path[0].classList[1], valorAtualText);
                }
            }else{
                alert("Não pode deixar nenhum campo vazio");
            }
        }
    })
}

addNoteBtn.addEventListener("click", ()=>{
    if( addNoteTitle.value.length != 0 &&
        addNoteText.value.length != 0){
        adicionarNota();
        atribuirValor();
        i++
        numClick++
        keyTitle++
        keyText++
        localStorageSize = localStorage.length / 2;
        eliminarNota();
        guardarNota();
    }
});

window.addEventListener("load", ()=>{
    if(localStorage.length > 0){
        while(localStorageSize > i){
            if( localStorage.getItem(keyTitle) == null && 
                localStorage.getItem(keyText) == null ){
                keyTitle++;
                keyText++
            }else{
                adicionarNota();
                recuperarValor();
                eliminarNota();
                guardarNota();
                i++
                keyText++
                keyTitle++
                numClick++
            }
        }
    }
});

deleteAllNote.addEventListener("click", (e)=>{
    let resposta = confirm("Tem certeza de que deseja excluir Tudo?");
    if(resposta){
        localStorage.clear();
        for(let j = 0; j < localStorageSize; j++){
            const articleClass = document.querySelectorAll(".your_note")
            notes.removeChild(articleClass[0]);
        }
    }
});
