const fs = require('fs'); //This is how you load a module (sort of like a style file or package in latex). Now when you use fs you can access its methods and properties or whatever. Just like in latex, you call it at the top (or before you call it anyway)

const generatePage = require('./src/page-template'); //it is somewhat odd to me that using a module or a package requires naming a constant

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: gitHubUserName => {
                if (gitHubUserName) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(` 
    =================
    Add a New Project
    =================
    `); //template literals - we cannot comment within them
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: gitLink => {
                if (gitLink) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser() //COMMENT BACK IN LATER AND COMMENT OUT CODE BELOW from "const mockData" to "generatePage(mockdata)"
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
       if (err) throw new Error(err);

       console.log('Page created! Check out index.html in this directory to see it!');
     });
  });

// const mockData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//       'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//       {
//         name: 'Run Buddy',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskinator',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskmaster Pro',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//       },
//       {
//         name: 'Robot Gladiators',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//         languages: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//       }
//     ]
//   };

// const pageHTML = generatePage(mockData);


// const pageHTML = generatePage(name,github);

// fs.writeFile('./index.html', snorms(nomiker,github), err => { //./index.html is the same as index.html: both mean "in my folder"
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

//Alternative to the above assignments, apparently it automatically increments
//the syntax seems to be const [first-element-of-array,second,...] = arrayname; We were stacking these in class


//"require" is like "usepackage" in latex 


//assignment destructuring

// const nomiker = profileDataArgs[0];
// const github = profileDataArgs[1]; 



// const printProfileData = profileDataArr => {   //with only one param you can omit the parens around it
//     //This
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//     }

//     console.log('===================');

//     //is the same as this ...

//     profileDataArr.forEach((profileItem) => {
//         console.log(profileItem)
//     });

//     //We could clean this up even further:
//     //profileDataArr.forEach(profileItem => console.log(profileItem)); //using ES6 syntax and arrow functions
// };

// printProfileData(profileDataArgs);

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

//Notes through 9.2
//Template literals are a way to plug input variables into a string with backticks 
//You can use linebreaks here to produce linebreaks within backticks 