class Tree {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");

    // Creating multiple layers for the pine tree
    for (let i = 0; i < 3; i++) {
      let pines = document.createElement("a-cone");
      pines.setAttribute("material", "src: url(images/tree.png); repeat: 2 2"); // Repeat the texture
      pines.setAttribute("height", `${2 - i * 0.5}`); // Each layer gets shorter
      pines.setAttribute("radius-bottom", `${1.2 - i * 0.4}`); // Smaller radius on top layers
      pines.setAttribute("position", `0 ${1.5 + i * 0.7} 0`); // Positioning each layer higher
      this.obj.append(pines);
    }

    // Creating the stump
    let stump = document.createElement("a-cylinder");
    stump.setAttribute("position", "0 0 0");
    stump.setAttribute("material", "src: url(images/wood.jpg); repeat: 4 2"); // Repeat the texture
    stump.setAttribute("radius", "0.25");
    stump.setAttribute("height", "1");
    this.obj.append(stump);

    // Set the position of the tree (x, y, z) based on semi-circle positioning
    this.obj.setAttribute("position", `${x} ${y} ${z}`);

    // Append the tree to the scene
    scene.append(this.obj);
  }

  scale(size) {
    this.obj.setAttribute("scale", `${size} ${size} ${size}`);
  }
}