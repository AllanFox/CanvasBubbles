let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth    // Full width of the browser screen
canvas.height = window.innerHeight  // Full height of the browser screen

let c = canvas.getContext('2d') // Gets the 2 dimensional context of the canvas


let colorArray = ["red", "blue", "green", "purple", "brown", "black", "yellow"]


window.addEventListener("resize", (event)=> {
	canvas.width = window.innerWidth    // Full width of the browser screen
	canvas.height = window.innerHeight  // Full height of the browser screen
})

class Circle {
	constructor(x, y, dx, dy, radius, color){
		this._x = x
		this._y = y
		this._dx = dx
		this._dy = dy
		this._radius = radius
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
	}

	get x() {
		return this._x
	}

	set x(value) {
		this._x = value
	}

	get y() {
		return this._y
	}

	set y(value) {
		this._y = value
	}

	get dx() {
		return this._dx
	}

	set dx(value) {
		this._dx = value
	}

	get dy() {
		return this._dy
	}

	set dy(value) {
		this._dy = value
	}

	get radius() {
		return this._radius
	}

	set radius(value) {
		this._radius = value
	}

	draw() {
		c.beginPath()
		c.arc(this.x, this.y, 30, 0, Math.PI * 2, false) // Draws a Circle
		c.fillStyle = this.color
		c.fill() // Fills the circles with colors
	}

	update() {
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			// If this condition is true then the circle bounces back
			// from right and left side of the screen
			this.dx = -this.dx
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			// If this condition returns true then the circle bounces back
			// from top and bottom of the screen
			this.dy = -this.dy
		}
		
		this.x += this.dx; // Increments the velocity to move the circle in positive direction
		this.y += this.dy; // Increments the velocity to move the circle in positive direction
		

		this.draw()
	}
}

let circleArray = [] // Array which is storing 100 circles

// Loop to generate 100 circles
for (let i=0; i<100; i++) {

	let radius = Math.random() * 3 + 2 // Radius of the circle

	let x = Math.random() * (innerWidth - radius * 2) + radius   // Helps spawn the circle in random position x
	let y = Math.random() * (innerHeight - radius * 2) + radius  // Helps spawn the circle in random position y

	let dx = (Math.random() - 0.5) * 8 // dx is a x velocity (horizontal) which is random
	let dy = (Math.random() - 0.5) * 8 // dy is a y velocity (vertical) which is random

	circleArray.push(new Circle(x, y, dx, dy, radius)) // push the circle into the array
}


function animate() {
	// This generates an infinite loop for animation
	requestAnimationFrame(animate)
	c.clearRect(0, 0, innerWidth, innerHeight) // Refresh the canvas for each loop

	// Draw 100 circles
	for(let i=0; i<circleArray.length; i++) {
		circleArray[i].update()
	}
    
} 

animate()