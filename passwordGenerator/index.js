// const capitalLetterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const smallLetterSet = "abcdefghijklmnopqrstuvwxyz";
// const numberSet = "1234567890";
// const symbolSet = "@#$%&/?,.";
// let inputChecked = 0;
// // let password = "";

// let passwordInput = document.querySelector("#showPassword");
// let passwordLength = document.querySelector("#passwordLength");
// let uppercase = document.querySelector("#uppercase");
// let lowercase = document.querySelector("#lowercase");
// let number = document.querySelector("#number");
// let symbols = document.querySelector("#symbols");
// let button = document.querySelector("#button");

// const generateRandomLetter = (dataSet) => {
//   return dataSet[Math.floor(Math.random() * dataSet.length)];
// };

// let generatePassword = (password = "") => {
//   inputChecked = 0;
//   if (password.length >= Number(passwordLength.innerHTML)) {
//     // console.log(password);
//     return password;
//   }

//   if (uppercase.checked) {
//     password += generateRandomLetter(capitalLetterSet);
//     inputChecked++;
//   }
//   console.log(inputChecked);
//   if (lowercase.checked) {
//     password += generateRandomLetter(smallLetterSet);
//     inputChecked++;
//   }
//   console.log(inputChecked);
//   if (number.checked) {
//     password += generateRandomLetter(numberSet);
//     inputChecked++;
//   }
//   console.log(inputChecked);
//   if (symbols.checked) {
//     password += generateRandomLetter(symbolSet);
//     inputChecked++;
//   }
//   console.log(inputChecked);
 

//   if (Number(passwordLength.innerHTML) < inputChecked) {
//     passwordLength.innerHTML = 0;
//     passwordLength.innerHTML = inputChecked;
//     inputChecked = 0;
//   }
//   password = truncateString(password, Number(passwordLength.innerHTML));
//   // console.log(password);
  
//   passwordInput.value = password;
//   if(password.length <=Number(passwordLength.innerHTML))
//   return generatePassword(password);
// };

// button.addEventListener("click", () => {
//   if (Number(passwordLength.innerHTML) >= 1) {
//     generatePassword();
//   }
// });

// function truncateString(str, num) {
//   if (str.length > num) {
//     let subStr = str.substring(0, num);
//     return subStr;
//   } else {
//     return str;
//   }
// }

// generateRandomLetter();


// document.querySelector(".inputCheck").addEventListener("click", () => {
//   // document.querySelector(".inputCheck").classList.add("click");
//   let inputcheck = document.querySelector(".inputCheck");
//   let checked += inputcheck.classList.add("click");
//   // console.log(2);
// })





const capitalLetterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const smallLetterSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890";
const symbolSet = "@#$%&/?,.";
let inputChecked = 0;
let password = "";


let passwordInput = document.querySelector("#showPassword");
let copyBtn = document.querySelector("#copyBtn");
let copyText = document.querySelector("#copyText");
let passwordLengthDisplay = document.querySelector("#passwordLengthDisplay");
let slider = document.querySelector("#slider");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let number = document.querySelector("#number");
let symbols = document.querySelector("#symbols");
let passwordStregth = document.querySelector("#strength")
let passwordentroph = document.querySelector("#entroph")
let button = document.querySelector("#button");
let checkedInput1 = document.querySelector(".first-option-box");
let checkedInput2 = document.querySelector(".second-option-box");

let passwordLength = 10;

// Event start from here

slider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  PasswordSizeMaker(passwordLength);
})

copyBtn.addEventListener("click", () =>{
  if(passwordInput.value !== ""){
    copyText.classList.add("show");
    setTimeout(()=>{
      copyText.classList.remove("show");
    },2000)
  }
  
})

checkedInput1.addEventListener("click", (e) =>{ 
  checkboxColorFiller(e);
})

checkedInput2.addEventListener("click", (e) =>{ 
 checkboxColorFiller(e);
})

button.addEventListener("click", () => {
  passwordInput.textContent = "";
  if (Number(passwordLength) >= 4) {
    // console.log(typeof Number(passwordLength));
    const password1 = generatePassword();
    passwordInput.value = password1;
    generatePassword();
    updateEntropy(password1);
  }
});

document.getElementById("copyBtn").addEventListener("click", function() {

  let copyPassword = copyText.textContent = passwordInput.value;
  navigator.clipboard.writeText(copyPassword)
  .then(() =>{
    // alert("Your password is :- " + copyPassword)
  }).catch((e) =>{
    console.log("Error is :- ", Error);
  })
  
});

// Event end here


// function start from here
function updateEntropy(password1) {
  const entropy = calculatePasswordEntropy(password1);
  passwordentroph.textContent = `${entropy.toFixed(2)} bits`;
}

function calculatePasswordEntropy(password1) {
  const selectedSets = [];
  if (uppercase.checked) selectedSets.push(capitalLetterSet);
  if (lowercase.checked) selectedSets.push(smallLetterSet);
  if (number.checked) selectedSets.push(numberSet);
  if (symbols.checked) selectedSets.push(symbolSet);

  if (selectedSets.length === 0) {
    return 0; // No character sets selected, entropy is zero.
  }

  const charsetSize = selectedSets.reduce((total, set) => total + set.length, 0);
  const passwordLength = password1.length;
  const bitsOfEntropy = Math.log2(Math.pow(charsetSize, passwordLength));
  return bitsOfEntropy;
}


const generateRandomLetter = (dataSet) => {
  return dataSet[Math.floor(Math.random() * dataSet.length)];
};

let generatePassword = (password = "") => {
  passwordInput.value = "";
  inputChecked = 0;

  if (uppercase.checked) {
    password += generateRandomLetter(capitalLetterSet);
    inputChecked++;
    strengthCalc();
  }

  if (lowercase.checked) {
    password += generateRandomLetter(smallLetterSet);
    inputChecked++;
    strengthCalc();
  }

  if (number.checked) {
    password += generateRandomLetter(numberSet);
    inputChecked++;
    strengthCalc();
  }

  if (symbols.checked) {
    password += generateRandomLetter(symbolSet);
    inputChecked++;
    strengthCalc();
  }

  
  if(password.length <= Number(passwordLength)){
    return generatePassword(password);
  }
  password = truncateString(password, Number(passwordLength));
  // console.log(typeof password)
  // console.log( typeof Array.from(password));
  password = shufflePassword(Array.from(password));

  
  passwordInput.value = password;
  return password;
};

function PasswordSizeMaker(){
  passwordLengthDisplay.textContent = passwordLength;
  slider.value = passwordLength;
  const min = slider.min;
  const max = slider.max;
  slider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

}

function checkboxColorFiller(e){
  
  e.target.classList.toggle("click");
}

function truncateString(str, num) {
  if (str.length > num) {
    let subStr = str.substring(0, num);
    return subStr;
  } else {
    return str;
  }
}

function strengthColorChanger(color = "#fff"){
  passwordStregth.style.backgroundColor = color;
  passwordStregth.style.boxShadow = `0 0 10px ${color}`;
}

function strengthCalc(){
  let uppercaseChecked = uppercase.checked;
  let lowercaseChecked = lowercase.checked;
  let numberChecked = number.checked;
  let symbolsChecked = symbols.checked;
  
  if((uppercaseChecked === true) && (lowercaseChecked === true) && ((numberChecked === true) && (symbolsChecked === true)) && (passwordLength >= 8)){
    strengthColorChanger("#05f816");
  } else if(((uppercaseChecked === true) || (lowercaseChecked === true)) && ((numberChecked === true) || (symbolsChecked === true)) && (passwordLength >= 8)){
    strengthColorChanger("#F8f305");
    // console.log("Your password is yellow")
  }else{
    strengthColorChanger("#F80509");
    // console.log("Your password is weak")
  }
}

function shufflePassword(array){
  // fisher Yates Mathod (algo)
  for(let i = array.length - 1; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  let str = "";
  array.forEach((el) => {
      str += el;
  });
  return str;
}

PasswordSizeMaker();


// functions end here




