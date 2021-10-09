var profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = profileDataArr => {   //with only one param you can omit the parens around it
    //This
    for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
    }

    console.log('===================');

    //is the same as this ...

    profileDataArr.forEach((profileItem) => {
        console.log(profileItem)
    });

    //We could clean this up even further:
    //profileDataArr.forEach(profileItem => console.log(profileItem)); //using ES6 syntax and arrow functions
};

printProfileData(profileDataArgs);

//var is function-scoped, so redeclaring it in a block will cause its value outside the block to change as well:

// var one = 'one: declared outside the block';

// if (true===true) {
    // var one = 'one: declared inside the block'; //notice: we redeclare 'one' here
    // console.log(one); //prints 'one: declared inside the block'
// }

//'let' is blocked-scoped, so redclaring a 'let' variable inside of a block creates a different 'let' variable with the same name whose scope is inside the block:

// let two = 'two: declared outside the block';

// if (true === true) {
//     let two = 'two: declared inside the block';
//     console.log(two); //prints 'two: declared inside the block'
// }

// console.log(two); //prints 'two: declared outside the block', because two declared inside the block is a separate variable. The 'let' variables are unrelated and therefore are unaffected by each other. 

// console.log(one); //also prints 'one: declared inside the block', because the variable was redeclared in the 'if' block. The outer 'var variable was therefore destroyed and replaced by the inner var variable. So it basically doesn't care about blocks - just a top down declaration order in the .js file

//Notes through 9.1.6: 

//process is an object (like window or the DOM), that provides information about, and control over, the current Node.js process
//argv (argument vector) is a variable that contains the arguments passed to a program through the command line - typically an array
//slice allows you to take a piece of an array and put it in a new one

//so we've created an array as the value for profileDataArgs,
//the array is a "slice" of the argv array in the process object, from index 2 through the last element in the argv array
//the function printProfileData takes profileDataArr as a parameter and runs a for loop through its argument
//as long as i is less than the array's length, we console log theArray[i] and then increment i before running it again

//const = a constant - you can't overrite its value 
//var = a variable - you can
//let = you can overwrite it

//let and const are block-scoped (just hold within the curly braces)
//var has function-scope 

//.forEach method on arrays - basically automatically runs a foreloop through the array