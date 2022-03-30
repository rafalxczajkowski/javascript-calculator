let numbuttons = document.querySelectorAll('.btn-number');
let btnzero = document.querySelector('#zero');
let btndecimal = document.querySelector('#decimal');
let inputStr = "";
let btnac = document.getElementById('clear');
let btndivide = document.getElementById('divide');
let btnmultiply = document.getElementById('multiply');
let btnsubtract = document.getElementById('subtract');
let btnadd = document.getElementById('add');
let btnequals = document.getElementById('equals');
let result;

//handling actions on buttons 1-9
for (let btn of numbuttons) {
    btn.addEventListener('click', () => {
        writeInput(btn.value);
    })
}
//handling action on button 0
btnzero.addEventListener('click', () => {
    inputStr = document.getElementById('input-display').innerHTML;
    if (inputStr != '') {
        writeInput(btnzero.value);
    }
})

//handling action on button '.'
btndecimal.addEventListener('click', () => {
    inputStr = document.getElementById('input-display').innerHTML;
    if (inputStr == '') {
        document.getElementById('input-display').innerHTML += '0.';
        document.getElementById('display').innerHTML = '0.';
    } else {
        if ((/\d+$/).test(inputStr)) {
            if (!(/\.\d+$/).test(inputStr)) { //if there is no '.' in the number
                document.getElementById('input-display').innerHTML += '.';
                document.getElementById('display').innerHTML += '.';
            }
        }
    }
})

//handling action on button AC
btnac.addEventListener('click', () => {
    resetCalc();
})

//function to add Event Listeners to operation buttons besides subtract
let addEventListenerToButton = (btn) => {
    btn.addEventListener('click', () => {
        inputStr = document.getElementById('input-display').innerHTML;
        if ((/=/).test(inputStr)) {
            document.getElementById('input-display').innerHTML = result;
        }
        if (howManyOps(inputStr) == 2) {
            document.getElementById('input-display').innerHTML = inputStr.slice(0, -2);
        } else if (howManyOps(inputStr) == 1) {
                document.getElementById('input-display').innerHTML = inputStr.slice(0, -1);
            }
        document.getElementById('input-display').innerHTML += btn.value;
        document.getElementById('display').innerHTML = btn.value;
    })
}

//adding Event Listeners to operation buttons
addEventListenerToButton(btndivide);
addEventListenerToButton(btnmultiply);
addEventListenerToButton(btnadd);

//action on button subtract
btnsubtract.addEventListener('click', () => {
    inputStr = document.getElementById('input-display').innerHTML;
    if ((/=/).test(inputStr)) {
        document.getElementById('input-display').innerHTML = result;
    }
    if (howManyOps(inputStr) <= 1) {
        document.getElementById('input-display').innerHTML += '-';
        document.getElementById('display').innerHTML = '-';
    }
})

//handling equals button action
btnequals.addEventListener('click', () => {
    inputStr = document.getElementById('input-display').innerHTML;
    if (!(/=/).test(inputStr)) {
        let finalEquation = doubleSubtParenth(inputStr);
        result = eval(finalEquation);
        document.getElementById('display').innerHTML = result;
        document.getElementById('input-display').innerHTML = finalEquation + '=' + result;
    }
})

//function for displaying on upper line
let writeInput = (value) => {
    inputStr = document.getElementById('input-display').innerHTML;
    if (inputStr == '') { //if it's in initialized state
        document.getElementById('input-display').innerHTML += value;
        document.getElementById('display').innerHTML = value;
    } else { //if it's NOT in initialized state
        if (!(/=/).test(inputStr)) {
            document.getElementById('input-display').innerHTML += value;
            if (['/','*','+'].includes(inputStr.slice(-1))) {
                document.getElementById('display').innerHTML = value; //displaying on bottom line
            } else {
                document.getElementById('display').innerHTML += value;
            }
        }
        else {
            resetCalc();
            document.getElementById('input-display').innerHTML += value;
            document.getElementById('display').innerHTML = value;
        }
    }
}

let resetCalc = () => {
    document.getElementById('input-display').innerHTML = '';
    document.getElementById('display').innerHTML = 0;
}

//counts symbols of operations at the end
let howManyOps = (str) => {
    let ops = /[///*-/+]+$/g;
    if (ops.test(str)) {
        return str.match(ops)[0].length;
    } else {
        return 0;
    }
}

let delLastChar = (str) => {
    str = str.slice(0, -1);
    document.getElementById('input-display').innerHTML = str;
}

//takes string, finds double '-' and adds brackets
let doubleSubtParenth = (str) => {
    let newStr = '';
    let re = /--\d+\.*\d*/g;
    let match = re.exec(str);
    if (match != null) {
        let startIndex = match.index + 1;
        let endIndex = startIndex + match[0].length - 1;
        newStr += str.slice(0, startIndex); //substring to first match
        newStr += '(' + str.slice(startIndex, endIndex) + ')'; //first match
        while ((match = re.exec(str)) != null) {
            startIndex = match.index + 1; //startIndex of the next match
            newStr += str.slice(endIndex, startIndex);
            endIndex = startIndex + match[0].length - 1; //endIndex of the next match
            newStr += '(' + str.slice(startIndex, endIndex) + ')';
        }
        newStr += str.slice(endIndex);
        return newStr;
    } else {
        return str;
    }
}