const LOWER_BASE = 97;
const UPPER_BASE = 65;

const isUpper = char => /[A-Z]/.test(char);
const isAlpha = char => /[a-z]/i.test(char);

const returnAscii = char => char.toLowerCase().charCodeAt(0) - LOWER_BASE;

const changeChar = (char, cipher) => {
  const base = isUpper(char) ? UPPER_BASE : LOWER_BASE;

  const asciiNumber = char.charCodeAt(0);
  const changedCharAscii = (((asciiNumber - base) + cipher) % 26) + base;

  return String.fromCharCode(changedCharAscii);
}

function vigenereCipher(text, cipher) {
  let cipherIdx = 0;
  return [...text].reduce((str, char) => {
    if (isAlpha(char)) {
      str += changeChar(char, returnAscii(cipher[cipherIdx]));
      cipherIdx += 1;
      if (cipherIdx === cipher.length) cipherIdx = 0;
      return str;
    }
    str += char;
    return str;
  }, '');
}

console.log(vigenereCipher("Pineapples don't go on pizzas!", 'meat'));

/*

iterate through the text
if the char is an alphabetic character
  keep track of which index we are in the cipher
  if index = length of cipher reset to 0
  move the char forward by the current letter in the cipher
  move the current letter in cipher forward
  if cipher reaches the end it should loop back to beginning
return the changed text

  fn:
    move characters safely
    check alphabetic
    return the ascii number of a char

*/