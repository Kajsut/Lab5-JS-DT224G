"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Kajsa Widén
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");



// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm(event) {
    // Förhindra att formuläret skickas
    event.preventDefault();

    //Variabel som håller koll på eventuella fel
    let validate = true;    
    
    //Tömmer arrayen
    errors = [];
    
    //Läser in värden från formuläret
    const name = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();


    // Kontrollera formulärets obligatoriska fält
    if (name === "") {
        errors.push("Ange ett namn")
        validate = false;
    }

    if (email === ""){
        errors.push("Ange en e-postadress")
        validate = false;
    }

    if (phone === ""){
        errors.push("Ange ett telefonnummer")
        validate = false;
    }

    // Visa eventuella felmeddelanden
   displayErrors()

   //skriver på studentkortet om allt stämmer
   if (validate){
    createStudentCard(name, email, phone);
   }

    // Returnera resultatet (true eller false) av valideringen
    return validate;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML ="";

    // Skriv ut aktuella felmeddelanden till DOM
    if (errors.length > 0){
        for(let i = 0; i < errors.length; i++){
            const liEl = document.createElement("li");
            liEl.innerHTML = errors[i];
            errorList.appendChild(liEl);
        }
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard(name, email, phone) {
    // Hämta information från formuläret
    const font = fontSelect.value;

    // Uppdatera studentkortet 
    previewFullname.textContent = name;
    previewFullname.style.fontFamily = font;
    previewEmail.textContent = email;
    previewEmail.style.fontFamily = font;
    previewPhone.textContent = phone;
    previewPhone.style.fontFamily = font;

    // Lägg till studentkortet i historiken
    historySection.innerHTML =`Namn: ${name} <br>Email: ${email} <br>Telefon: ${phone} <br>Font: ${font}`;

    // Spara och uppdatera historiken
    const studentCard = {
        name: name,
        email: email,
        phone: phone,
        font: font
    }

    history.unshift(studentCard);
    saveHistory();
    renderHistory();        //Visar history på hemsidan

}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    const studentCardJson = JSON.stringify(history);
    localStorage.setItem("studentHistory", studentCardJson);
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const localStorageData = localStorage.getItem("studentHistory");

    if(localStorageData !== null){
        history = JSON.parse(localStorageData);
    }

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML ="";

    // Skriv ut innehållet i history till DOM

    //kollar om det finns några kort sedan innan
    if (history.length === 0){
        return;
    } 

        history.forEach(function (studentCard) {
            const articleEl = document.createElement("article");
            const name = document.createElement("p");
            const email = document.createElement("p");
            const phone = document.createElement("p");
            const font = document.createElement("p");

            name.textContent = studentCard.name;
            email.textContent = studentCard.email;
            phone.textContent = studentCard.phone;
            font.textContent = studentCard.font;

            const pEl = document.createElement("p");
            pEl.innerHTML = `Namn: ${name.textContent} <br>E-post: ${email.textContent} <br>Telefon: ${phone.textContent} <br>Font: ${font.textContent}`;

            historySection.appendChild(articleEl);
            articleEl.appendChild(pEl);
        });
    
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare
//Reagrar på studentkort-knappen
form.addEventListener("submit", validateForm)


// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory()
renderHistory()