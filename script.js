let rnd = (l, u) => Math.random() * (u - l) + l;

let scene, camera, torches = [], fires = [];

window.onload = function () {
	scene = document.querySelector("a-scene");
	camera = scene.querySelector("a-camera");
  
	let mainCharacterData = {template: "#lord", idle: "Armature|Idle", walk: "Armature|Walk", scale: 3.5, speed: 0.05};

    //let mainCharacter = new Character(0, -0.5, 0, mainCharacterData);

  let positions = [
    {
      torch: { x: -13, y: 5, z: -5, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -8.7, y: 10.5, z: -5, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: -13, y: 5, z: -12, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -8.7, y: 10.5, z: -12, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: -13, y: 5, z: -19, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -8.7, y: 10.5, z: -19, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: -13, y: 5, z: -26, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -8.7, y: 10.5, z: -26, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: 11.5, y: 5, z: -5, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: 7.5, y: 10.5, z: -5, rotation: { x: -65, y: 90, z: 0 } }
    },
	{
      torch: { x: 11.5, y: 5, z: -12, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: 7.5, y: 10.5, z: -12, rotation: { x: -65, y: 90, z: 0 } }
    },
    {
      torch: { x: 11.5, y: 5, z: -19, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: 7.5, y: 10.5, z: -19, rotation: { x: -65, y: 90, z: 0 } }
    },
    {
      torch: { x: 11.5, y: 5, z: -26, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: 7.5, y: 10.5, z: -26, rotation: { x: -65, y: 90, z: 0 } }
    },
	{
      torch: { x: -21, y: 5, z: -110, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -17, y: 10.5, z: -110, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: -21, y: 5, z: -103, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -17, y: 10.5, z: -103, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: -21, y: 5, z: -96, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -17, y: 10.5, z: -96, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: -21, y: 5, z: -89, rotation: { x: -330, y: 90, z: 0 } },
      fire: { x: -17, y: 10.5, z: -89, rotation: { x: 65, y: 90, z: 0 } }
    },
    {
      torch: { x: 1.5, y: 5, z: -110, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: -2.5, y: 10.5, z: -110, rotation: { x: -65, y: 90, z: 0 } }
    },
    {
      torch: { x: 1.5, y: 5, z: -103, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: -2.5, y: 10.5, z: -103, rotation: { x: -65, y: 90, z: 0 } }
    },	
    {
      torch: { x: 1.5, y: 5, z: -96, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: -2.5, y: 10.5, z: -96, rotation: { x: -65, y: 90, z: 0 } }
    },	
    {
      torch: { x: 1.5, y: 5, z: -89, rotation: { x: -330, y: -90, z: 0 } },
      fire: { x: -2.5, y: 10.5, z: -89, rotation: { x: -65, y: 90, z: 0 } }
    },	

	
  ];

  positions.forEach(pos => {
    let torch = new Torch(pos.torch.x, pos.torch.y, pos.torch.z, pos.torch.rotation);
    let fire = new Fire(pos.fire.x, pos.fire.y, pos.fire.z, pos.fire.rotation);
    torches.push(torch);
    fires.push(fire);
  });

  loop();
};

function calculateDistance(camera, torch) {
  let x1 = camera.object3D.position.x;
  let y1 = camera.object3D.position.y;
  let z1 = camera.object3D.position.z;
  let x2 = torch.x;
  let y2 = torch.y;
  let z2 = torch.z;

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

function loop() {
  torches.forEach((torch, index) => {
    let fire = fires[index];
    let dist = calculateDistance(camera, torch);

    if (dist < 18) {
      if (fire.obj.getAttribute("visible") !== "true") {
        fire.toggleVisibility(true); // Show fire and light
      }
    } else {
      if (fire.obj.getAttribute("visible") !== "false") {
        fire.toggleVisibility(false); // Hide fire and light
      }
    }
  });

  setTimeout(loop, 5);
}


document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  const doors = {
    door1: {
      leftDoor: document.getElementById('left-door'),
      rightDoor: document.getElementById('right-door'),
    },
    door2: {
      leftDoor: document.getElementById('left-door2'),
      rightDoor: document.getElementById('right-door2'),
    },
    door3: {
      leftDoor: document.getElementById('left-door3'),
      rightDoor: document.getElementById('right-door3'),
    },
  };

  const inventoryItems = {
    key1: document.getElementById('inventory-item1'),
    key2: document.getElementById('inventory-item2'),
    key3: document.getElementById('inventory-item3'),
  };

  const inventory = {}; 

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const keyID = key.getAttribute('data-key');
      if (!inventory[keyID]) {
        inventory[keyID] = true;

        const inventoryItem = inventoryItems[keyID];
        if (inventoryItem) {
          if (keyID === 'key1') {
            inventoryItem.src = 'images/copperKey.png';
          } else if (keyID === 'key2') {
            inventoryItem.src = 'images/silverKey.png';
          } else if (keyID === 'key3') {
            inventoryItem.src = 'images/goldKey.png';
          }
          inventoryItem.style.display = 'block';
        } else {
          console.error(`Inventory item for ${keyID} not found!`);
        }

        key.setAttribute('visible', false);
      } else {
        alert('You already have this key!');
      }
    });
  });

  Object.keys(doors).forEach((doorID) => {
    const door = doors[doorID];
    const requiredKey = `key${doorID.slice(-1)}`;

    door.rightDoor.addEventListener('click', () => {
      if (inventory[requiredKey]) {
        unlockDoor(door, requiredKey);
      } else {
        alert('You need the correct key to unlock this door!');
      }
    });
  });

  const keyTargetPositions = {
    key1: { x: 22, y: 5.3, z: -42.3 }, 
    key2: { x: 89, y: 5.2, z: -42.3, rotation: { x: 0, y: -90, z: 0 } }, 
    key3: { x: 43, y: 5.3, z: -86.67, rotation: { x: 0, y: 90, z: 0 } }, 
  };

  function unlockDoor(door, keyID) {
    const key = document.querySelector(`#${keyID}`);

    const keyClone = key.cloneNode(true);
    document.querySelector('a-scene').appendChild(keyClone);

    keyClone.setAttribute('position', key.getAttribute('position'));

    const targetPosition = keyTargetPositions[keyID];
    if (!targetPosition) {
      console.error(`No target position defined for ${keyID}`);
      return;
    }

    // **Play key unlocking sound**
    const keySound = new Audio('audios/keySound.mp3');
    keySound.play();

    keyClone.setAttribute('animation', 
      `property: position; 
      to: ${targetPosition.x} ${targetPosition.y} ${targetPosition.z}; 
      dur: 1000; easing: easeInOutQuad`
    );

    if (targetPosition.rotation) {
      keyClone.setAttribute('animation__rotation', 
        `property: rotation;
        to: ${targetPosition.rotation.x} ${targetPosition.rotation.y} ${targetPosition.rotation.z}; 
        dur: 1000; easing: linear; loop: false`
      );
    }

    setTimeout(() => {
      alert(`The ${keyID} has unlocked the door!`);

      const doorSound = new Audio('audios/doorSound.mp3');
      doorSound.play();

      // Open the doors
      door.leftDoor.setAttribute('animation', 
        `property: rotation;
        to: 0 30 0;
        dur: 3000; easing: easeInOutQuad`
      );

      door.rightDoor.setAttribute('animation', 
        `property: rotation;
        to: 0 -30 0;
        dur: 3000; easing: easeInOutQuad`
      );

      setTimeout(() => {
        keyClone.parentNode.removeChild(keyClone);
      }, 2000);

      delete inventory[keyID];
      inventoryItems[keyID].style.display = 'none';

    }, 1000); 
  }
});







// CHESTS
document.addEventListener('DOMContentLoaded', () => {
  const chests = [
    { id: 'treasure_Chest1', lightId: 'chest_light1' },
    { id: 'treasure_Chest2', lightId: 'chest_light2' },
    { id: 'treasure_Chest3', lightId: 'chest_light3' }
  ];

  chests.forEach(chest => {
    const treasureChest = document.getElementById(chest.id);
    const lid = treasureChest.querySelector('#lid');
    const chestLight = document.getElementById(chest.lightId); 
    const chestBarrier = treasureChest.querySelector('#chestBarrier');
    let isOpen = false;

    if (lid) {
      lid.addEventListener('click', () => {
        isOpen = !isOpen;

        // **Play chest opening/closing sound**
        const chestSound = new Audio('audios/chestSound.mp3');
        chestSound.play();

        lid.setAttribute('animation', {
          property: 'rotation',
          to: isOpen ? '90 0 0' : '0 0 0',
          dur: 1000,
        });

        if (chestLight) {
          chestLight.setAttribute('animation', {
            property: 'intensity',
            to: isOpen ? 1 : 0, 
            dur: 1000,
          });
        } else {
          console.warn(`No chest light found for ${chest.id}`);
        }

        if (chestBarrier) {
          chestBarrier.setAttribute('animation__position', {
            property: 'position',
            to: isOpen ? '0 2 0' : '0 0.5 0',
            dur: 2000,
            easing: 'easeOutQuad',
          });
          chestBarrier.setAttribute('animation__opacity', {
            property: 'material.opacity',
            to: isOpen ? 0 : 0.8,
            dur: 3000,
            easing: 'easeOutQuad',
          });
        }
      });
    }
  });
});




//PILLARS
const pillars = [
  {
    id: "pillar1",
    position: "-20.4 0 -14",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },

  {
    id: "pillar2",
    position: "20.5 0 -14",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar3",
    position: "20.5 0 21",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar4",
    position: "-20.4 0 21",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar5",
    rotation: "0 270 0",
    position: "36.5 0 -23.5",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar6",
    rotation: "0 270 0",
    position: "36.5 0 -62",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar7",
    rotation: "0 270 0",
    position: "-6.5 0 -62",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar8",
    rotation: "0 270 0",
    position: "-6.5 0 -24",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar9",
    rotation: "0 270 0",
    position: "-6.5 0 -103",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar10",
    rotation: "0 270 0",
    position: "-6.5 0 -66.5",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar11",
    rotation: "0 270 0",
    position: "36.5 0 -66.5",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar12",
    rotation: "0 270 0",
    position: "-80 0 -69",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar13",
    rotation: "0 270 0",
    position: "36.5 0 -103",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
  {
    id: "pillar14",
    rotation: "0 270 0",
    position: "-28.5 0 -69",
    components: {
      cylinder: {
        position: "0 7.5 -50",
        radius: 0.9,
        height: 14.5,
        color: "#d4d4d4",
        src: "#column_Pattern",
        repeat: "5 1",
      },
      top: {
        position: "5 12.41 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
      bottom: {
        position: "5 -1.5 -5",
        parts: [
          { position: "-6.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-3.5 2 -45", radius: 0.5, height: 2, src: "#column_Part", rotation: "0 90 90" },
          { position: "-5 2 -45", height: 0.7, width: 1.9, depth: 3, src: "#column_TopPart", rotation: "0 90 0" },
        ],
      },
    },
  },
];

function createPillar(pillarData) {
  const pillarEntity = document.createElement('a-entity');
  pillarEntity.setAttribute('id', pillarData.id);
  pillarEntity.setAttribute('position', pillarData.position);

  const cylinder = document.createElement('a-cylinder');
  const cylinderData = pillarData.components.cylinder;
  cylinder.setAttribute('position', cylinderData.position);
  cylinder.setAttribute('radius', cylinderData.radius);
  cylinder.setAttribute('height', cylinderData.height);
  cylinder.setAttribute('color', cylinderData.color);
  cylinder.setAttribute('src', cylinderData.src);
  cylinder.setAttribute('repeat', cylinderData.repeat);
  cylinder.setAttribute('shadow', 'cast: true; receive: true');
  pillarEntity.appendChild(cylinder);

  const topEntity = document.createElement('a-entity');
  topEntity.setAttribute('id', `${pillarData.id}_top`);
  topEntity.setAttribute('position', pillarData.components.top.position);
  pillarData.components.top.parts.forEach((part) => {
    const topPart = document.createElement(part.width ? 'a-box' : 'a-cylinder');
    for (const [key, value] of Object.entries(part)) {
      topPart.setAttribute(key, value);
    }
    topEntity.appendChild(topPart);
  });
  pillarEntity.appendChild(topEntity);

  const bottomEntity = document.createElement('a-entity');
  bottomEntity.setAttribute('id', `${pillarData.id}_bottom`);
  bottomEntity.setAttribute('position', pillarData.components.bottom.position);
  pillarData.components.bottom.parts.forEach((part) => {
    const bottomPart = document.createElement(part.width ? 'a-box' : 'a-cylinder');
    for (const [key, value] of Object.entries(part)) {
      bottomPart.setAttribute(key, value);
    }
    bottomEntity.appendChild(bottomPart);
  });
  pillarEntity.appendChild(bottomEntity);

  return pillarEntity;
}

AFRAME.registerComponent("cloud-generator", {
  init: function() {
    this.clouds = [];
    this.numClouds = 10; 
    const camera = document.querySelector("#camera");
    const cameraPosition = camera.getAttribute("position");

    for (let i = 0; i < this.numClouds; i++) {
      let x = this.getRandomX();
      let z = this.getRandomZ() + cameraPosition.z + 10; 
      this.createCloud(x, z);
    }
  },

  tick: function(time, delta) {
    this.clouds.forEach((cloud, index) => {
      let position = cloud.getAttribute("position");
      position.x += 0.08; 

      if (position.x > 150) { 
        position.x = this.getRandomX(); 
        position.z = this.getRandomZ() + position.z; 
        cloud.setAttribute("position", position);
        this.updateCloudSize(cloud);
      }
      cloud.setAttribute("position", position);
    });
  },

  createCloud: function(x, z) {
    let cloud = document.createElement("a-entity");

    let randomY = Math.random() * 20 + 30; 
    cloud.setAttribute("position", { x: x, y: randomY, z: z });

    this.updateCloudSize(cloud); 

    document.querySelector("#cloud-container").appendChild(cloud);
    this.clouds.push(cloud);
  },

updateCloudSize: function(cloud) {
  let sizes = [2.2, 1.7, 1.7]; 
  let offsets = [
    [0, 0.5, 0], 
    [2.5, -0.3, 0], 
    [-2.5, -0.3, 0.2]
  ]; 

  for (let i = 0; i < 3; i++) {
    let cloudPart = document.createElement("a-sphere");
    cloudPart.setAttribute("color", "white");
    cloudPart.setAttribute("radius", sizes[i]);
    cloudPart.setAttribute("position", `${offsets[i][0]} ${offsets[i][1]} ${offsets[i][2]}`);
    cloud.appendChild(cloudPart);
  }
},

  getRandomX: function() {
    return Math.random() * 200 - 100; 
  },

  getRandomZ: function() {
	return Math.random() * 120 - 120; 
  },

});

document.querySelector("#cloud-container").setAttribute("cloud-generator", "");


document.addEventListener("DOMContentLoaded", function() {
  scene = document.querySelector("a-scene");

  scene.addEventListener("loaded", function() {
    const radius = 20;
    const centerX = 0; 
    const centerZ = 10; 
    const numTrees = 20; 

    for (let i = 0; i < numTrees; i++) {
      let angle = Math.random() * (Math.PI - 0) + 0; 
      let x = centerX + radius * Math.cos(angle);
      let z = centerZ + radius * Math.sin(angle);
      let tree = new Tree(x, 0, z);
      tree.scale(rnd(4, 7));
    }

    const furtherCenterZ = -120; 
    const leftOffset = -12;
    for (let i = 0; i < numTrees; i++) {
      let angle = Math.random() * (Math.PI - 0) + 0 + Math.PI; 
      let x = (centerX + leftOffset) + radius * Math.cos(angle); 
      let z = furtherCenterZ + radius * Math.sin(angle); 
      let tree = new Tree(x, 0, z);
      tree.scale(rnd(4, 7)); 
    }
  });
});


