function filterEvenNumbers(arr) {
  return arr.filter((num) => num % 2 === 0);
}

//ex
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const evenNumbers = filterEvenNumbers(numbers);
console.log(evenNumbers); //[2, 4, 6, 8]

///////////////////////////////////////////////

// Exercise: 2 Find the Largest Number
function findLargestNumber(arr) {
  return Math.max(...arr);
}

//ex
const largestNumber = findLargestNumber(numbers);
console.log(largestNumber); //8

///////////////////////////////////////////////

// Exercise: 3 Reverse a String
function reverseString(str) {
  return str.split("").reverse().join("");
}

//ex
const reversedString = reverseString("Hello");
console.log(reversedString); //olleH

//////////////////////////////////////////////

// Exercise: 4 Remove Duplicates
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// ex
const DuplicatesNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 5, 6, 7, 7];
const uniqueNumbers = removeDuplicates(DuplicatesNumbers);
console.log(uniqueNumbers); //  [1, 2, 3, 4, 5, 6, 7]

/////////////////////////////////////////////////
