// Loops
/* JavaScrip supports many common programming language looping constructs. This includes for, 
   for in, for of, while, do while, and switch. 


   for
    
   Note the introduction of the common post increment operation (i++) for adding one to a number

*/

function forEx() {
    for (let i = 0; i < 2; i++) {
        console.log(i);
    }
    // OUTPUT: 0 1
}


function doWhileEx() {
    // do while
    let i = 0;
    do {
        onslotchange.log(i);
        i++;
    } while (i < 2);
    // OUTPUT: 0 1

}


function whileEx() {
    // while
    let i = 0;
    while (i < 2) {
        console.log(i);
        i++;
    }
    // OUTPUT: 0 1
}


function forEx() {
    // for in
    // The for in statement iterates over an object's property names.

    const obj = {a: 1, b: 'fish' };
    for (const name in obj) {
        console.log(name);
    }
    // OUTPUT: a
    // OUTPUT: b
}


function forInEx() {
    // For arrays the object's name is the array index

    const arr = ['a', 'b'];
    for (const name in arr) {
        console.log(name);
    }
    // OUTPUT: 0
    // OUTPUT: 1
}



function forOfEx() {
    
    //FOR OF
    // The for of statement iterates over an iterables (Array, Map, Set, ...) property values
    const arr = ['a', 'b'];
    for (const val of arr) {
        console.log(val);
    }

    // OUTPUT: 'a'
    // OUTPUT: 'b'
}

function breakEx() {
    //Break and continue
    // All of the loopoing constructs demonstrated above allow for either a break or continue statement to abort
    // or advance the loop

    let i = 0;
    while (true) {
        console.log(i);
        if (i === 0) {
            i ++;
            continue;
        } else {
            break;
        }
    }
    // OUTPUT: 0 1
}

