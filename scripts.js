// region Switches

// Simple css to style it like a toggle switch
// Tutorial:
// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

const modeToggleSwitch = document.querySelector('#mode-checkbox');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    modeToggleSwitch.checked = true;
  }
}

modeToggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); //add this
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light'); //add this
  }
}
// endregion

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
let characters = []
let desiredLength = 15;

const pwdField1El = document.getElementById("pwd-field-1");
const pwdField2El = document.getElementById("pwd-field-2");

let useSymbols = true;
let useNumbers = true;

const symbolsToggleSwitch = document.querySelector('#symbols-checkbox');
const numbersToggleSwitch = document.querySelector('#numbers-checkbox');
const desiredLengthField = document.querySelector('#pwd-length');

function updateSwitches(){
  symbolsToggleSwitch.checked = useSymbols;
  numbersToggleSwitch.checked = useNumbers;
}

function updateCharacters(){
  characters = [...letters]
  if(useNumbers){
    characters = [...characters, ...numbers]
  }
  if(useSymbols){
    characters = [...characters, ...symbols]
  }
  console.log(characters);
}

updateCharacters();
updateSwitches();

symbolsToggleSwitch.addEventListener('change', toggleSymbols, false);
numbersToggleSwitch.addEventListener('change', toggleNumbers, false);

function toggleSymbols(e){
  useSymbols = !useSymbols;
  updateCharacters();
  updateSwitches();
}

function toggleNumbers(e){
  useNumbers = !useNumbers;
  updateCharacters();
  updateSwitches();
}

function generateRandomPassword(){
  let password = "";
  for(let i=0; i<desiredLength; i++){
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password
}

function btnGenerateClick(){
  let pwd1 = generateRandomPassword();
  let pwd2 = generateRandomPassword();
  console.log(`P1: ${pwd1}`)
  console.log(`P2: ${pwd2}`)
  pwdField1El.value = pwd1;
  pwdField2El.value = pwd2;
}

function updateLength(){
  desiredLength = desiredLengthField.value;
}

function copyToClipboard(field){
  let text = document.getElementById(field).value;
  let dummyEl = document.createElement("textarea");
  document.body.appendChild(dummyEl);
  dummyEl.value=text;
  dummyEl.select();
  document.execCommand('copy');
  document.body.removeChild(dummyEl);
}