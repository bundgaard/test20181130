const can = document.getElementById("canvas");
const ctx = can.getContext("2d");
const width = can.width;
const height = can.height;
const scale = [1, 1];
let drag = false;
let dragStart = {
	x: 0,
	y: 0
};
let a = [
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
	[150, 157],
];

function setup() {}
can.addEventListener("mousewheel", (event) => {

	let delta = Math.max(-1, Math.min(1, event.wheelDelta))
	scale[0] = scale[0] + delta;
	scale[1] = scale[1] + delta;
	ctx.clearRect(0, 0, width, height);
	draw()

});
can.addEventListener("mousedown", (evt) => {
	dragStart.x = evt.pageX - can.offsetLeft;
	dragStart.y = evt.pageY - can.offsetTop;
	drag = true;
});
can.addEventListener("mouseup", (evt) => {
	drag = false;
});

can.addEventListener("mousemove", (evt) => {
	if (drag) {
		let dragEnd = {
			x: evt.pageX - can.offsetLeft,
			y: evt.pageY - can.offsetTop,
		}
		ctx.clearRect(0, 0, width, height);
		ctx.translate(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
		ctx.clearRect(0, 0, width, height);
		draw();
		dragStart = dragEnd;
	}
});

function drawTaxiRide(arr, scaleArr) {
	ctx.clearRect(0, 0, width, height);
	ctx.save();
	let current = arr[0];
	var scaleX = 1,
		scaleY = 1;
	if (scaleArr !== undefined) {
		ctx.scale(1, -1)
		scaleX = scaleArr[0], scaleY = scaleArr[1];
	}

	for (let i = 1; i < arr.length; i++) {
		let point = arr[i];
		let [x, y] = point;
		ctx.beginPath();
		ctx.moveTo(current[0] * scaleX, (-height - (current[1] * scaleY)) / 2);
		ctx.lineTo(x * scaleX, (-height - (y * scaleY)) / 2);
		ctx.stroke();
		current = point;
	}
	ctx.restore();
}
let worldCoord = [0, 0];

function draw() {
	/*
		drawTaxiRide([
			[0, 0],
			[2, 0],
			[2, -2],
			[0, -2]
		], [8, 8])
	 */
	/* drawTaxiRide([
		[0, 0],
		[5, 0],
		[5, 5],
		[10, 5],
		[10, 2]
	], [8, 8]) */

	drawTaxiRide(a, scale, worldCoord);

}

function update() {}

function loop() {
	requestAnimationFrame(loop);
}