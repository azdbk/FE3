//work in progress
class Character {
    constructor(x, y, z, model) {
    this.model = model;

    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("gltf-model", model.template);
	this.obj.setAttribute("animation-mixer", `clip: ${model.idle}; timeScale: 1`);
	this.obj.setAttribute("scale", `${model.scale} ${model.scale} ${model.scale}`);
	this.obj.setAttribute("position", { x: x, y: y, z: z });
	this.obj.setAttribute("shadow", "receive: true");

	scene.appendChild(this.obj);

	this.position = { x, y, z };
	this.moving = false;
	this.direction = "forward";
	}

	move(direction) {
	if (this.moving) return; 
	
	this.moving = true;
	let targetPosition = { ...this.position };

	if (direction === "forward") targetPosition.z -= this.model.stepSize;
	if (direction === "backward") targetPosition.z += this.model.stepSize;
	if (direction === "left") targetPosition.x -= this.model.stepSize;
	if (direction === "right") targetPosition.x += this.model.stepSize;

	// Set walk animation
	this.obj.setAttribute("animation-mixer", `clip: ${this.model.walk}; timeScale: 1`);

	// Animate movement
	this.obj.setAttribute("animation", {
	property: "position",
	to: `${targetPosition.x} ${targetPosition.y} ${targetPosition.z}`
	});

	setTimeout(() => {
		this.position = targetPosition;
		this.obj.setAttribute("animation-mixer", `clip: ${this.model.idle}; timeScale: 1`);
		this.moving = false;}, 400);
	}

	rotate(direction) {
	if (this.moving) return; // Prevent rotating while moving
	let rotation = this.obj.getAttribute("rotation");
	if (direction === "left") rotation.y += 90;
	if (direction === "right") rotation.y -= 90;
	this.obj.setAttribute("rotation", rotation);
	}
	
    angleTo(that){
        let dx = that.object3D.position.x - this.obj.object3D.position.x;
        let dz = that.object3D.position.z - this.obj.object3D.position.z;

        this.angle = Math.atan(dx / dz)
        if (dz < 0) {
            this.angle += Math.PI
        }
    }
	
    rotateTowards(that){
        this.angleTo(that);
        this.obj.object3D.rotation.y = this.angle;
    }
	
    forward(){
        let dx = this.model.speed * Math.sin(this.angle);
        let dz = this.model.speed * Math.cos(this.angle);
        this.obj.object3D.position.x += dx;
        this.obj.object3D.position.z += dz;
        this.obj.setAttribute("animation-mixer", { clip: this.model.charge, timeScale: 0.75 });
    }
	
    stop(){
        this.obj.setAttribute("animation-mixer", { timeScale: 0 });
    }
}
