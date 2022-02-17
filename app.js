//GLOBAL VAIABLES
let hex1 = [];
let hex1Bin = 0;
let hex1Data = {};
let hex2 = [];
let hex2Bin = 0;
let hex2Data = {};

//COIN TOSS
function tossCoin() {
	let coinResult = Math.floor(Math.random() * (3 - 2 + 1) + 2);
	return coinResult;
}

//CREATE HEXAGRAM 1
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
	hex2 = [];

	for (let i = 0; i < hex1.length; i++) {
		if (hex1[i] == 6) {
			hex2.push(hex1[i] + 1);
		} else if (hex1[i] == 9) {
			hex2.push(hex1[i] - 1);
		} else {
			hex2.push(hex1[i]);
		}
	}
	//NULL IF NO CHANGING LINES (6 | 9)....niiiiiiiice
	if (hex1.toString() === hex2.toString()) {
		hex2 = [];
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

//RESET GLOBAL VARIABLES
function resetVar() {
	hex1 = [];
	hex1Bin = [];
	hex1Data = {};
	hex2 = [];
	hex2Bin = [];
	hex2Data = {};
}

//TEST AND CONSOLE.LOG
function hexTest() {
	makeHex1();
	makeHex2();
	hexBin();
	console.log(`Hexagram 1 is (${hex1})`);
	console.log(`Hexagram 2 is (${hex2})`);
	console.log(`Hexagram 1 Binary is ${hex1Bin}`);
	console.log(`Hexagram 2 Binary is ${hex2Bin}`);
}

//GET JSON DATA
let data = {};

axios
	.get('https://jeremywriston.github.io/Data/iching_wilhelm_translation.json')
	.then((res) => {
		data = res.data;
	})
	.catch((e) => {
		console.log(e);
	});

//ASSIGN JSON DATA BASED ON BINARIES
function getData() {
	for (let item in data) {
		if (`${data[item].binary}` === hex1Bin) {
			hex1Data = data[item];
		} else if (`${data[item].binary}` === hex2Bin) {
			hex2Data = data[item];
		}
	}
	console.log(hex1Data);
	console.log(hex2Data);
}

//PUSH DATA TO DOM
function presentData() {
	//CREATE LINE IMAGES
	let hexArrays = [hex1, hex2];

	for (let i = 0; i < hexArrays.length; i++) {
		for (let j = 0; j < 6; j++) {
			let imgTemp = document.createElement('img');
			imgTemp.classList.add('lines');
			if (hexArrays[i][j] === 6) {
				imgTemp.src = 'yinchanging.png';
				document.querySelector(`#hex${i + 1}-box`).prepend(imgTemp);
			} else if (hexArrays[i][j] === 7) {
				imgTemp.src = 'yang.png';
				document.querySelector(`#hex${i + 1}-box`).prepend(imgTemp);
			} else if (hexArrays[i][j] === 8) {
				imgTemp.src = 'yin.png';
				document.querySelector(`#hex${i + 1}-box`).prepend(imgTemp);
			} else if (hexArrays[i][j] === 9) {
				imgTemp.src = 'yangchanging.png';
				document.querySelector(`#hex${i + 1}-box`).prepend(imgTemp);
			}
		}
	}

	//CREATE HEX1 ELEMENTS
	document.querySelector('#hex1-title').innerText = hex1Data.title;

	let above1Chinese = hex1Data.wilhelm_above.chinese;
	let above1Symbolic = hex1Data.wilhelm_above.symbolic;
	let above1Alchemical = hex1Data.wilhelm_above.alchemical;
	document.querySelector(
		'#hex1-above'
	).innerText = `above ${above1Chinese}: ${above1Symbolic} ${above1Alchemical}`;

	let below1Chinese = hex1Data.wilhelm_below.chinese;
	let below1Symbolic = hex1Data.wilhelm_below.symbolic;
	let below1Alchemical = hex1Data.wilhelm_below.alchemical;
	document.querySelector(
		'#hex1-below'
	).innerText = `below ${below1Chinese}: ${below1Symbolic} ${below1Alchemical}`;

	document.querySelector('#hex1-judgement').innerText = 'THE JUDGMENT';
	document.querySelector('#hex1-judgement-text').innerText =
		hex1Data.wilhelm_judgment.text;

	document.querySelector('#hex1-image').innerText = 'THE IMAGE';
	document.querySelector('#hex1-image-text').innerText =
		hex1Data.wilhelm_image.text;

	//CREATE HEX2 ELEMENTS
	if (hex2Bin !== 'NaNNaNNaNNaNNaNNaN') {
		document.querySelector('#hex2-title').innerText = hex2Data.title;

		let above2Chinese = hex2Data.wilhelm_above.chinese;
		let above2Symbolic = hex2Data.wilhelm_above.symbolic;
		let above2Alchemical = hex2Data.wilhelm_above.alchemical;
		document.querySelector(
			'#hex2-above'
		).innerText = `above ${above2Chinese}: ${above2Symbolic} ${above2Alchemical}`;

		let below2Chinese = hex2Data.wilhelm_below.chinese;
		let below2Symbolic = hex2Data.wilhelm_below.symbolic;
		let below2Alchemical = hex2Data.wilhelm_below.alchemical;
		document.querySelector(
			'#hex2-below'
		).innerText = `below ${below2Chinese}: ${below2Symbolic} ${below2Alchemical}`;

		document.querySelector('#hex2-judgement').innerText = 'THE JUDGMENT';
		document.querySelector('#hex2-judgement-text').innerText =
			hex2Data.wilhelm_judgment.text;

		document.querySelector('#hex2-image').innerText = 'THE IMAGE';
		document.querySelector('#hex2-image-text').innerText =
			hex2Data.wilhelm_image.text;

		//CREATE CHANGING LINES
		let lineToString = [
			'at the beginning',
			'in the second place',
			'in the third place',
			'in the fourth place',
			'in the fifth place',
			'at the top',
		];

		for (let i = 0; i < hex1.length; i++) {
			if (hex1[i] === 6) {
				let changingH3 = document.createElement('h3');
				let changingP = document.createElement('p');
				changingH3.innerText = `Six ${lineToString[i]} means:`;
				changingP.innerText = hex1Data.wilhelm_lines[i + 1].text;
				document.querySelector('#changing-line-div').append(changingH3);
				document.querySelector('#changing-line-div').append(changingP);
			} else if (hex1[i] === 9) {
				let changingH3 = document.createElement('h3');
				let changingP = document.createElement('p');
				changingH3.innerText = `Nine ${lineToString[i]} means:`;
				changingP.innerText = hex1Data.wilhelm_lines[i + 1].text;
				document.querySelector('#changing-line-div').append(changingH3);
				document.querySelector('#changing-line-div').append(changingP);
			}
		}
	}
}

//RUN SCRIPT
function iChing() {
	makeHex1();
	makeHex2();
	hexBin();
	getData();
	presentData();
}

// iChing();

//RESET
