class Cloud {
  constructor(x, y, z, speed, scene) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = speed;
    this.scene = scene;
    this.cloudGroup = document.createElement("a-entity");
    this.cloudGroup.setAttribute("position", `${this.x} ${this.y} ${this.z}`);
    this.scene.appendChild(this.cloudGroup);

    this.sizes = [2.2, 1.7, 1.7];
    this.offsets = [[0, 0.5, 0], [2.5, -0.3, 0], [-2.5, -0.3, 0.2]];

    this.createCloudParts();
    this.startMoving();
  }
}