//GLOBAL VAIABLES
let hex1 = [];
let hex1Bin = 0;
let hex1Data = {}
let lines= [false, false, false, false, false, false]
let hex2 = [];
let hex2Bin = 0;
let hex2Data = {}

//TOSS COINS... AND CREATE HEX1 ARRAYS
function tossCoin() {
    let coinResult = Math.floor(Math.random() * (3 - 2 + 1) + 2);
    return coinResult;
}

function makeHex1() {
    for (let i = 0; hex1.length < 6; i++) {
        let coin1 = tossCoin();
        let coin2 = tossCoin();
        let coin3 = tossCoin();
        let temp = coin1 + coin2 + coin3;
        hex1.push(temp);
        coin1 = 0;
        coin2 = 0;
        coin3 = 0;
        temp = 0;
    }
}

//DETERMINE CHANGING LINES AND CREATE HEX2 ARRAYS
function makeHex2() {
    for (let i = 0; i < hex1.length; i++) {
        if (hex1[i] == 6) {
            hex2.push(hex1[i] + 1);
            lines[i] = true;
        }
        else if (hex1[i] == 9) {
            hex2.push(hex1[i] - 1);
            lines[i] = true;
        }
        else {
            hex2.push(hex1[i]);
        }
    }
}


//DETERMINE BINARIES FOR HEXAGRAMS
function hexBin() {
    let bin1 = [];
    let bin2 = [];
    for (let i = 0; i < 6; i++) {
        bin1.push(hex1[i] % 2);
        bin2.push(hex2[i] % 2);
    }
    hex1Bin = bin1.join('');
    hex2Bin = bin2.join('');
}

function resetVar() {
    hex1 = [];
    hex2 = []
    hex1Bin = [];
    hex2Bin = [];
    lines = [false, false, false, false, false, false];
}

function hexTest() {
    makeHex1();
    makeHex2();
    hexBin();
    console.log(`Hexagram 1 is (${hex1})`);
    console.log(`Hexagram 2 is (${hex2})`);
    console.log(`Changing lines are (${lines})`);
    console.log(`Hexagram 1 Binary is ${hex1Bin}`);
    console.log(`Hexagram 2 Binary is ${hex2Bin}`);
    //resetVar();
}

//GET JSON DATA
let data = {};

axios.get('https://jeremywriston.github.io/Data/iching_wilhelm_translation.json')
    .then(res => {
        data = res.data;
    })
    .catch(e => {
        console.log(e)
    })

//PULL JSON DATA BASED ON BINARIES
function getData() {
    for(let item in data) {
        //console.log((typeof `${data[item].binary}`));
        if (`${data[item].binary}` === hex1Bin) {
            hex1Data = data[item];
        }
        else if (`${data[item].binary}` === hex2Bin) {
            hex2Data = data[item];
        }
    }
    console.log(hex1Data);
    console.log(hex2Data);
}

//PUSH RELATIVE DATA TO DOM

//(RESET AND) RUN SCRIPT



