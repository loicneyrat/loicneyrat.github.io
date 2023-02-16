const canvas = document.getElementById("bg-stage");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let particleColor = 'rgba(200, 200, 200, 255)';//"#ffffff"; //#8C5523";
let linkColor = "#ffffff";

function mod(n, m) {
  return ((n % m) + m) % m;
}

let mouse = {
	x: null,
	y: null,
	radius: (canvas.height * canvas.width) / (100*100) // (canvas.width / 10) //
};

window.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

window.addEventListener('mouseout', (event) => {
	mouse.x = undefined;
	mouse.y = undefined;
});


class Particle {

	constructor(x, y, directionX, directionY, radius, color) {
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.radius = 2;
		this.color = color;//"#8C5523";
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill();
	}

	update() {
		if (this.x > canvas.width || this.x < 0) {
			this.x = mod(this.x, canvas.width);
			//this.directionX = -this.directionX;
		}
		if (this.y > canvas.height || this.y < 0) {
			this.y = mod(this.y, canvas.height);
			//this.directionY = -this.directionY;
		}

		let dx = this.x - mouse.x;
		let dy = this.y - mouse.y;
		let distance = Math.sqrt(dx**2 + dy**2);
		let collides = false; //distance < mouse.radius + this.radius;
		if (collides) {
			if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
				this.x += 10;
			}
			if (mouse.x > this.x && this.x > this.radius * 10) {
				this.x -= 10;
			}
			if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
				this.y += 10;
			}
			if (mouse.y > this.y && this.y > this.radius * 10) {
				this.y -= 10;
			}
			this.directionX = -this.directionX;
			this.directionY = -this.directionY;

		}
		this.x += this.directionX;
		this.y += this.directionY;
		
		this.draw();
	}
}

function init() {
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, 150, 0, Math.PI * 2, false);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
	particlesArray = [];
	let numberOfParticles = Math.min((canvas.height * canvas.width) / 3000, 400);//3000; //9000 //225
	for (let i = 0; i < numberOfParticles; i++) {
		let radius = Math.random() * 4 + 1;
		let x = Math.random() * (innerWidth - 4 * radius) + radius * 2;
		let y = Math.random() * (innerHeight - 4 * radius) + radius * 2;
		let directionX = (Math.random() * 2) - 1; //(Math.random() * 5) - 2.5;
		let directionY = (Math.random() * 2) - 1; //(Math.random() * 5) - 2.5;
		let color = particleColor; 
		particlesArray.push(new Particle(x, y, directionX, directionY, radius, color))
	}
	//animate();
}

function animate() {
	// Réinitialise le canvas
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	// Mise à jour des positions des particules
	for (let i = 0; i < particlesArray.length; i++){
		particlesArray[i].update();
	}
	connect();
	requestAnimationFrame(animate);
}

function connect() {
	let opacityValue = 0.1
	for (let a = 0; a < particlesArray.length; a++){
		let p1 = particlesArray[a];
		let mouseDistance = ((p1.x - mouse.x) ** 2 + (p1.y - mouse.y) ** 2);
		if (mouseDistance < (canvas.width / 7) * (canvas.height / 7)) {
			opacityValue = 1;// - (mouseDistance/20_000)
			ctx.strokeStyle = 'rgba(150, 100, 0, '+opacityValue+')'; //'rgba(140,85,31, '+opacityValue+')';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
			p1.color = 'rgba(150, 100, 0, 1.0)';
		} else {
			p1.color = particleColor;
		}
		for (let b = a; b < particlesArray.length; b++) {
			let p2 = particlesArray[b];
			let distance = ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
			if (distance < (canvas.width / 7) * (canvas.height / 7)) {
				opacityValue = 1 - (distance/20_000)
				ctx.strokeStyle = 'rgba(150, 150, 150, '+opacityValue+')'; //'rgba(140,85,31, '+opacityValue+')';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.stroke();
			}

		}
	}
}

init();
animate();
