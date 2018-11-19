let programX = "R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3";
let test1 = "R2, L3";
let test2 = "R2, R2, R2";
let test3 = "R5,  L5, R5, R3";


function Taxicab(program) {
	this.program = program;
	this.tokens = program.replace(/\s+/g, "").split(",");
	this.parseDigit = function (token) {
		let result = [];
		for (let i = 0; i < token.length; i++) {
			let char = token.charAt(i);
			if (char >= "0" && char <= "9") {
				result.push(parseInt(char));
			}
		}
		return parseInt(result.join(""));
	};
	this.parseToken = function (token) {
		let result = [];
		for (let i = 0; i < token.length; i++) {
			let char = token.charAt(i);
			if (char >= "0" && char <= "9") {
				let number = this.parseDigit(token.substring(i, token.length))
				result.push(number);
				i += number.length;
			}
			if (char == "L" || char == "R") {
				result.push(char);
			}
		}
		return result;
	};

	this.run = function () {
		let history = [
			// x,y
			[0, 0]
		];
		let compass = [
			"north", // north
			"east", // east
			"south", // south
			"west" // west
		];

		let facing = 0

		for (let i = 0; i < this.tokens.length; i++) {
			let token = this.tokens[i];
			let [turn, num] = this.parseToken(token);
			let rotation = turn === "R" ? 1 : -1;
			facing = facing + rotation + 4;
			let direction = compass[facing % 4];
			console.log(`compass ${direction}`);
			let previous = i === 0 ? history[0] : history[i];

			console.log(`previous ${previous}, rotation ${rotation}`);

			let x = previous[0],
				y = previous[1];
			if (direction === "north") {
				y += num;
			}
			if (direction === "east") {
				x += num;
			}
			if (direction === "south") {
				y -= num;
			}
			if (direction === "west") {
				x -= num;
			}


			history.push([x, y]);
		}

		function manhatten(arr) {
			let start = arr[0];
			let end = arr[arr.length - 1];
			console.log(`start ${start}, end ${end}`);
			let distance = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
			console.log(`distance ${distance}`)
		}
		console.log(`${JSON.stringify(history)}`)
		manhatten(history);
	}

}

new Taxicab(test1).run();
new Taxicab(test2).run();
new Taxicab(test3).run();
new Taxicab(programX).run();

/* 
var a = [
	[0, 0],
	[1, 0],
	[1, -3],
	[3, -3],
	[3, 2],
	[1, 2],
	[1, 1],
	[-2, 1],
	[-2, -3],
	[-4, -3],
	[-4, -5],
	[0, -5],
	[0, -7],
	[1, -7],
	[1, -8],
	[3, -8],
	[3, -11],
	[4, -11],
	[4, -7],
	[6, -7],
	[6, -2],
	[9, -2],
	[9, -6],
	[10, -6],
	[10, -8],
	[11, -8],
	[11, -11],
	[15, -11],
	[15, -16],
	[19, -16],
	[19, -11],
	[24, -11],
	[24, -8],
	[26, -8],
	[26, -5],
	[23, -5],
	[23, -4],
	[26, -4],
	[26, 0],
	[28, 0],
	[28, -5],
	[32, -5],
	[32, -6],
	[33, -6],
	[33, -5],
	[38, -5],
	[38, -3],
	[39, -3],
	[39, -1],
	[227, -1],
	[227, 4],
	[224, 4],
	[224, 9],
	[225, 9],
	[225, 11],
	[221, 11],
	[221, 14],
	[226, 14],
	[226, 17],
	[229, 17],
	[229, -28],
	[233, -28],
	[233, -32],
	[161, -32],
	[161, -30],
	[164, -30],
	[164, -29],
	[165, -29],
	[165, -28],
	[164, -28],
	[164, 164],
	[163, 164],
	[163, 163],
	[164, 163],
	[164, 167],
	[165, 167],
	[165, 169],
	[160, 169],
	[160, 166],
	[155, 166],
	[155, 163],
	[152, 163],
	[152, 159],
	[155, 159],
	[155, 158],
	[151, 158],
	[151, 156],
	[149, 156],
	[149, 159],
	[144, 159],
	[144, 162],
	[143, 162],
	[143, 163],
	[147, 163],
	[147, 165],
	[144, 165],
	[144, 166],
	[147, 166],
	[147, 170],
	[144, 170],
	[144, 166],
	[146, 166],
	[146, 168],
	[147, 168],
	[147, 165],
	[152, 165],
	[152, 166],
	[156, 166],
	[156, 164],
	[160, 164],
	[160, 165],
	[163, 165],
	[163, 162],
	[162, 162],
	[162, 157],
	[164, 157],
	[164, 153],
	[160, 153],
	[160, 155],
	[161, 155],
	[161, 150],
	[156, 150],
	[156, 146],
	[157, 146],
	[157, 141],
	[154, 141],
	[154, 145],
	[159, 145],
	[159, 142],
	[160, 142],
	[160, 144],
	[156, 144],
	[156, 145],
	[160, 145],
	[160, 140],
	[162, 140],
	[162, 143],
	[166, 143],
	[166, 147],
	[168, 147],
	[168, 149],
	[164, 149],
	[164, 147],
	[159, 147],
	[159, 148],
	[163, 148],
	[163, 145],
	[158, 145],
	[158, 141],
	[162, 141],
	[162, 146],
	[157, 146],
	[157, 149],
	[161, 149],
	[161, 150],
	[158, 150],
	[158, 152],
	[156, 152],
	[156, 153],
	[153, 153],
	[153, 148],
	[148, 148],
	[148, 153],
	[151, 153],
	[151, 157],
	[149, 157],
	[149, 161],
	[154, 161],
	[154, 160],
	[150, 160],
	[150, 157]
]
 */
/* a.reduce((prev, next) => {
	let key = next.join(";");
	if (prev.hasOwnProperty(key)) {

	}
	prev[next.join(";")] = 1
}, {}); */