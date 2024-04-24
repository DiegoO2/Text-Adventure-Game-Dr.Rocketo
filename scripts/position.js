document.addEventListener(`DOMContentLoaded`, () => {

    const gameContent = document.getElementById("gameContent");
    const mapContent = document.getElementById("map");
    const inventoryContent = document.getElementById("inventory");

    let positionsArray = [];

    let characterPosition = { x: 2, y: 2 }; // will change

    let rocketoPosition = { x: 2, y: 2 }; 
     
    let rocketoLastPosition = { x: 1, y: 1 }


    let lastPosition = { x: 1, y: 1 }; // hi

    // function delay(milliseconds){
    //     return new Promise(resolve => {
    //         setTimeout(resolve, milliseconds);
    //     });
    // } in case : async function 
    // await delay(1000);


    // a class to generate the position to create each block
    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.empty = true;
            this.block = "";
            this.rotation = "";
        }
    }
    // creates an array that holds all the positions of the game

    function createPositionArray() {
        for (let i = 8; i >= 1; i--) {
            for (let e = 1; e <= 8; e++) {
                positionsArray.push(new Position(e, i))
            }
        }
    }
    createPositionArray();

    let htmlContentForGameContent = "";
    //create a string with the html content with all the div
    console.log(positionsArray)
    for (position of positionsArray) {
        // const `post${position.x}-${position.y} = document.getElementById(`post${position.x}x-${position.y}y`);
        htmlContentForGameContent = htmlContentForGameContent + `<div id="post${position.x}x-${position.y}y"></div>`
    }

    function deleteMap(x, y) {
        for (item of positionsArray) {
            if (item.x == x && item.y == y) {
                item.empty = true;
            }
        }
    }
    function addMap(img, x, y, rotation) {
        for (item of positionsArray) {
            if (item.x == x && item.y == y) {
                item.block = img;
                item.empty = false;
                item.rotation = rotation;
            }
        }
    }
    function updateMap() {
        htmlContentForGameContent = "";
        for (position of positionsArray) {
            if (position.empty == true) {
                htmlContentForGameContent = htmlContentForGameContent + `<div id="post${position.x}x-${position.y}y"></div>`
            }
            else {
                htmlContentForGameContent = htmlContentForGameContent + `<div id="post${position.x}x-${position.y}y"><img src="${position.block}" alt="${position.block}" class="${position.rotation}"></div></div>`
            }
        }
        gameContent.innerHTML = htmlContentForGameContent + `<div class="displayNone" id="textContent"> </div>`;
    }

    gameContent.innerHTML = htmlContentForGameContent + `<div class="displayNone" id="textContent"> </div>`;

    // do the same for the map ---------------------------------
    let htmlContentForMapContent = "";

    let positionsArray2 = [];
    function miniMapCreate() {
        positionsArray2 = [];
        mapContent.innerHTML = "";
        htmlContentForMapContent = "";
        for (let i = 3; i >= 1; i--) {
            for (let e = 1; e <= 3; e++) {
                positionsArray2.push(new Position(e, i))
            }
        }
        for (position of positionsArray2) {
            htmlContentForMapContent = htmlContentForMapContent + `<div id="mapPost${position.x}x-${position.y}y"></div>`
        }
        mapContent.innerHTML = htmlContentForMapContent;

    }
    miniMapCreate();



    //function for mini map

    function miniMap(roomIn) {
        miniMapCreate();
        switch (roomIn) {
            case "Storage":
                document.getElementById(`mapPost3x-1y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Gallery":
                document.getElementById(`mapPost2x-1y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Kitchen":
                document.getElementById(`mapPost3x-2y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Dinning":
                document.getElementById(`mapPost2x-2y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Stairs":
                document.getElementById(`mapPost2x-3y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Garden":
                document.getElementById(`mapPost3x-3y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Entrance":
                document.getElementById(`mapPost1x-1y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Library":
                document.getElementById(`mapPost1x-2y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break
            case "Bedroom":
                document.getElementById(`mapPost1x-3y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                break

        }
    }
    // do the same for the inventory ---------------------------------


    class Item {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.empty = true;
            this.img = "";
            this.times = 0;
        }
    }


    let inventoryArray = [];

    for (let i = 4; i >= 1; i--) {
        for (let e = 1; e <= 4; e++) {
            inventoryArray.push(new Item(e, i))
        }
    }

    let htmlContentForInventoryContent = "";
    function deleteInventory(img) {
        for (item of inventoryArray) {

            if (item.img == img) {
                item.times = item.times - 1;

                if (item.times == 0) {
                    item.empty = true;
                    item.img = "";

                    let inventoryArrayImages = [];
                    for (i of inventoryArray) {
                        if (i.empty == false) {
                            inventoryArrayImages.push({ img: i.img, desc: i.desc, use: i.use, times: i.times});
                        }
                    }
                    inventoryArray = [];

                    for (let i = 4; i >= 1; i--) {
                        for (let e = 1; e <= 4; e++) {
                            inventoryArray.push(new Item(e, i))
                        }
                    }
                    let indexTimes = 0;

                    for (img of inventoryArrayImages) {

                        addInventory(img.img, img.desc, img.use); // yes both
                        if(img.times > 1){
                            inventoryArray[indexTimes].times = img.times;
                        }
                        indexTimes = indexTimes + 1;
                    }
                    UpdateInventory();
                }
                else {
                    UpdateInventory();
                    return
                }
                return
            }
        }
    }

    function addInventory(img, desc, use) {
        for (item of inventoryArray) {
            if (item.img == img) {
                item.times = item.times + 1;
                return
            }
        }
        for (item of inventoryArray) {
            if (item.empty == true) {
                item.img = img;
                item.times = item.times + 1;
                item.empty = false;
                item.desc = desc;
                item.use = use;
                return
            }
        }
    }
    let ids = [];

    function UpdateInventory() {
        ids = [];
        htmlContentForInventoryContent = "";
        for (item of inventoryArray) {
            if (item.empty == true) {
                htmlContentForInventoryContent = htmlContentForInventoryContent + `<div id="inventoryPost${item.x}x-${item.y}y"></div>`;


            }
            else {
                ids.push(item);
                if (item.use == "Healing" || item.use == "Eat") {
                    htmlContentForInventoryContent = htmlContentForInventoryContent + `<div id="inventoryPost${item.x}x-${item.y}y"><img src="${item.img}" alt="${item.img}"><p class="counter">x${item.times}</p> <div class="itemDesc" id="itemDesc${item.x}-${item.y}"> </div><a id="itemUse${item.x}-${item.y}" class="itemUse">Use</a></div>`;
                }
                else {
                    htmlContentForInventoryContent = htmlContentForInventoryContent + `<div id="inventoryPost${item.x}x-${item.y}y"><img src="${item.img}" alt="${item.img}"><p class="counter">x${item.times}</p> <div class="itemDesc" id="itemDesc${item.x}-${item.y}"> </div></div>`;
                }


            }

        }
        inventoryContent.innerHTML = htmlContentForInventoryContent;
        console.log(ids);
        for (item of ids) {
            itemHover(item);
            if (item.use == "Healing" || item.use == "Eat") {
                document.getElementById(`itemUse${item.x}-${item.y}`).classList.toggle("displayNone");
            }
        }
    }

    function itemHover(item) {
        let i = true;
        console.log(item, item.use == "Healing");
        document.getElementById(`inventoryPost${item.x}x-${item.y}y`).addEventListener("mouseover", () => {
            if (item.use == "Healing") {
                document.getElementById(`itemDesc${item.x}-${item.y}`).innerHTML = `<div><p>${item.desc}</p></div> `
                document.getElementById(`itemUse${item.x}-${item.y}`).classList.toggle("displayNone");
                if (i == true) {
                    itemUse(item);
                    i = false;
                }
            }
            else if (item.use == "Eat") {
                document.getElementById(`itemDesc${item.x}-${item.y}`).innerHTML = `<div><p>${item.desc}</p></div> `
                document.getElementById(`itemUse${item.x}-${item.y}`).classList.toggle("displayNone");
                if (i == true) {
                    itemUse(item);
                    i = false;
                }
            }
            else {
                document.getElementById(`itemDesc${item.x}-${item.y}`).innerHTML = `<div><p>${item.desc}</p></div>`
            }
        });
        document.getElementById(`inventoryPost${item.x}x-${item.y}y`).addEventListener("mouseout", () => {
            document.getElementById(`itemDesc${item.x}-${item.y}`).innerHTML = ``
            if (item.use == "Healing" || item.use == "Eat") {
                document.getElementById(`itemUse${item.x}-${item.y}`).classList.toggle("displayNone");
            }

        });

    }
    function itemUse(item) {
        document.getElementById(`itemUse${item.x}-${item.y}`).addEventListener("click", () => {
            if (item.use == "Healing") {
                deleteInventory(item.img);
                healing();
                updateHealth();
            }
            else if (item.use == "Eat") {
                deleteInventory(item.img);
                increaseStamina();
                updateStamina();
            }

        });

    }
    //Updates character postion and deletes the last character position
    function updateCharacterPostion() {

        for (block of positionsArray) {
            if (characterPosition.x == block.x && characterPosition.y == block.y) {
                if (block.empty == false) {
                    enterDoor();
                    touchFire();
                    characterPosition.x = lastPosition.x;
                    characterPosition.y = lastPosition.y;
                    document.getElementById(`post${characterPosition.x}x-${characterPosition.y}y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                    break
                }
                else {
                    document.getElementById(`post${lastPosition.x}x-${lastPosition.y}y`).innerHTML = ``;
                    sparkItem();
                    document.getElementById(`post${characterPosition.x}x-${characterPosition.y}y`).innerHTML = `<img src="sprites/detective.png" alt="">`;
                    lastPosition.x = characterPosition.x;
                    lastPosition.y = characterPosition.y;
                }
            }
        }
    }
    function updateRocketoPostion() {
        for (block of positionsArray) {
            if (rocketoPosition.x == block.x && rocketoPosition.y == block.y) {
                if (block.empty == false) {
                    rocketoPosition.x = rocketoLastPosition.x;
                    rocketoPosition.y = rocketoLastPosition.y;
                    document.getElementById(`post${rocketoPosition.x}x-${rocketoPosition.y}y`).innerHTML = `<img src="sprites/Rocketo.png" alt="">`;
                    break
                }
                else {
                    document.getElementById(`post${rocketoLastPosition.x}x-${rocketoLastPosition.y}y`).innerHTML = ``;
                    document.getElementById(`post${rocketoPosition.x}x-${rocketoPosition.y}y`).innerHTML = `<img src="sprites/Rocketo.png" alt="">`;
                    rocketoLastPosition.x = rocketoPosition.x;
                    rocketoLastPosition.y = rocketoPosition.y;
                }
            }
        }
    }
    function changeCharacterPostion(xCordinate, yCordinate) {
        characterPosition = { x: xCordinate, y: yCordinate };
    }
    function changeRocketoPostion(xCordinate, yCordinate) {
        rocketoPosition = { x: xCordinate, y: yCordinate };
    }


    let room = [];
    let roomIn = "";
    let itemsOnRoomCar = [{ name: `Red Door`, dx: 2, dy: 8, haveKey: false, next: "Kitchen" }, { name: `Normal Door`, dx: 1, dy: 2, haveKey: false, next: "Gallery" }, { name: `Normal Door`, dx: 1, dy: 7, haveKey: true, next: "GalleryUp" }, { name: `Cat`, x: 2, y: 6, text: "You find a cat, it looks hungry. Do you want to feed him?", textWithCatFood: "You give the cat the cat food, he smiles and jumps into your back. Now he is your new friend.", textIgnore: "You ignore the hungry little cat.", textWithOutCatFood: "The cat attacks you, he doesn't like the food that you given it to him.", option1: "You feed the cat with Cat Food", option2: "You feed the cat with food", option3: "You ignore the cat", thereC: true }, { name: `Hihidden bookshelf`, x: 1, y: 1, push: true, there: true, text: "You push the bookshelf and find a door behind it" }, { name: `Medical kit`, text: `You open the drawer and you find some Medical Equipment. Seems a little old, you keep it in your inventory.`, desc: `An old Medical Equipment that can be used to restore one point of health.`, x: 7, y: 5, img: "sprites/MedicalKit.png", there: true, use: "Healing" }, { name: `Soup`, text: `On the top of the table you see a soup. You grab it and keep it for later.`, desc: `A beef stew . You can use it to recover stamina.`, x: 2, y: 3, img: "sprites/Soup.png", there: true, use: "Eat" }, { name: `Small key`, text: `You open a box and inside of it you find a small key. It seems to unlock a cabinet.`, desc: `A small key that can fit inside a cabinet.`, x: 6, y: 7, img: "sprites/SmallKey.png", there: true, key: "Red Key" }, { name: `Apple`, text: `You see an apple in a basket. Maybe it can be useful later.`, desc: `An apple. You can use it to recover stamina.`, x: 5, y: 5, img: "sprites/Apple.png", there: true, use: "Eat" }, { name: `Apple`, text: `You see an apple in a basket. Maybe it can be useful later.`, desc: `An apple. You can use it to recover stamina.`, x: 7, y: 7, img: "sprites/Apple.png", there: true, use: "Eat" }, { name: `Red key`, text: `You use the small key to open the cabinet and you find another key. So useful :D. You keep the key in your inventory.`, textWithOutKey: `The key to open this cabinet should be somewhere in this room.`, desc: `A brightness red key. It seems to be big enough to work in a door.`, rx: 4, ry: 2, img: "sprites/RedKey.png", there: true, haveKey: false, key: "Red Door" }];

    class ItemInRoom {
        constructor(x, y, name, text, desc, img, use) { //remeber all items is the place where the character is when we intereafcts
            this.name = name;
            this.x = x;
            this.y = y;
            this.there = true;
            this.text = text;
            this.desc = desc;
            this.img = img;
            this.use = use;
        }
    };
    class DoorInRoom {
        constructor(dx, dy, name, next, haveKey) { //remeber all items is the place where the character is when we intereafcts
            this.name = name;
            this.dx = dx;
            this.dy = dy;
            this.haveKey = haveKey;
            this.next = next;
        }
    };

    let itemOnRoomRocketo = [

    ];
    let itemOnRoomBedroom = [
        new DoorInRoom(4, 1, "Purple Door", "LibraryDown", true),
        new DoorInRoom(8, 5, "Orange Door", "StairsLeft", false),
        new ItemInRoom(2, 7, "Medical Equipment", "You open the drawer and you find some Medical Equipment. Seems a little old, you keep it in your inventory.", "An old Medical Equipment that can be used to restore one point of health.", "sprites/MedicalKit.png", "Healing"),
        new ItemInRoom(4, 5, "Super Soup", "You find a can of soup under the bed.", "Give infinite stamina when eaten.", "sprites/SuperSoup.png", "Eat"), //change to better
        { name: `Orange key`, text: `Next to the bed you find a key that leads to Rocketo.`, desc: `An orange key that leads to the stairs in Rocketo’s basement.`, x: 6, y: 7, img: "sprites/OrangeKey.png", there: true, key: "Orange Door" }

    ]
    let itemOnRoomLibrary = [
        new DoorInRoom(4, 1, "BookShelf Door", "EntranceDown", true),
        new DoorInRoom(4, 8, "Purple Door", "Bedroom", false),
        new ItemInRoom(8, 7, "Soup", "On a bookshelf you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        new ItemInRoom(7, 1, "Medical Equipment", "On the bookshelf you find a Medical Equipment. Seems a little old, you keep it in your inventory.", "An old Medical Equipment that can be used to restore one point of health.", "sprites/MedicalKit.png", "Healing"),
        { name: `Cat`, x: 1, y: 5, text: "You find a cat, it looks hungry. Do you want to feed him?", textWithCatFood: "You give the cat the cat food, he smiles and jumps into your back. Now he is your new friend.", textIgnore: "You ignore the hungry little cat.", textWithOutCatFood: "The cat attacks you, he doesn't like the food that you given it to him.", option1: "You feed the cat with Cat Food", option2: "You feed the cat with food", option3: "You ignore the cat", thereC: true },
        { name: `Purple key`, text: `You take the key from a bookshelf. `, desc: `A key used to unlock the bedroom door.`, x: 1, y: 8, img: "sprites/PurpleKey.png", there: true, key: "Purple Door" }
    ]

    let itemOnRoomEntrance = [
        new DoorInRoom(8, 4, "NormalDoor", "GalleryLeft", true),
        new DoorInRoom(4, 8, "BookShelf Door", "Library", false),
        new ItemInRoom(7, 7, "Soup", "Inside of the drawer you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        new ItemInRoom(1, 5, "Medical Equipment", "On the bookshelf you find a Medical Equipment. Seems a little old, you keep it in your inventory.", "An old Medical Equipment that can be used to restore one point of health.", "sprites/MedicalKit.png", "Healing")


    ]

    let itemOnRoomGarden = [
        new DoorInRoom(7, 1, "Window Door", "KitchenUp", false),
        new ItemInRoom(2, 4, "Apple", "You see an apple in a tree. Maybe it can be useful later.", "An apple. You can use it to recover stamina.", "sprites/Apple.png", "Eat"),
        { name: `Hammer`, text: `You find a hammer in the bush. This can be useful.`, desc: `A hammer used for the destruction of mortal kind.`, x: 1, y: 8, img: "sprites/Hammer.png", there: true, key: "Window Door" },
        new ItemInRoom(8, 6, "Dog Food", "You find a bag of dog food sitting next to a flower.", "A bag of relatively new dog food used for feeding dogs.", "sprites/DogFood.png"),


    ];


    let itemOnRoomStairs = [
        new DoorInRoom(4, 7, "Stairs", "Rocketo", true),
        new DoorInRoom(5, 7, "Stairs", "Rocketo", true),
        new ItemInRoom(2, 2, "Soup", "On the top of the drawer you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        new ItemInRoom(6, 2, "Medical Equipment", "You open the drawer and you find some Medical Equipment. Seems a little old, you keep it in your inventory.", "An old Medical Equipment that can be used to restore one point of health.", "sprites/MedicalKit.png", "Healing"),
        new DoorInRoom(4, 1, "Green Door", "DinningDown", true) // needs to be the 5th

    ];


    let itemOnRoomDinning = [
        new DoorInRoom(8, 2, "Blue Door", "KitchenLeft", true),
        new DoorInRoom(4, 8, "Green Door", "StairsFromDown", false),
        new ItemInRoom(7, 5, "Soup", "On the top of the table you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        new ItemInRoom(7, 5, "Soup", "On the top of the table you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        { name: `Medical kit`, text: `You open the drawer and you find some Medical Equipment. Seems a little old, you keep it in your inventory.`, desc: `An old Medical Equipment that can be used to restore one point of health.`, x: 7, y: 8, img: "sprites/MedicalKit.png", there: true, use: "Healing" },
        new ItemInRoom(3, 5, "Soup", "On the top of the table you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        new ItemInRoom(3, 4, "Soup", "On the top of the table you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        { name: `Green key`, text: `You find a green key under the plant.`, desc: `A green key that helps you to get to the stairs.`, x: 1, y: 7, img: "sprites/GreenKey.png", there: true, key: "Green Door" }
    ];

    let itemOnRoomKitchen = [
        new DoorInRoom(2, 1, "Red Door", "StorageDownUp", true),//needs to be here
        new DoorInRoom(1, 2, "Blue Door", "Dinning", false),
        new ItemInRoom(3, 8, "Key in ice", "In a box inside the freezer you find a Key inside ice. You try to break but it is impossible.", "A key in ice, It might be a way to get the key.", "sprites/KeyInIce.png"),
        new ItemInRoom(8, 1, "Gasoline container", "You open a box, inside you find a gasoline container with a flammable etiquette.", "A gasoline container maybe can be used to turn on the oven.", "sprites/GasolineContainer.png"),
        new ItemInRoom(7, 6, "Soup", "On the top of the table you see a soup. You grab it and keep it for later.", "A beef stew . You can use it to recover stamina.", "sprites/Soup.png", "Eat"),
        { name: `Oven`, ox: 7, oy: 5, gasoline: false, text: "You find a oven. You need some gasoline to make it work.", work: false }, //need to be 6th
        new ItemInRoom(3, 6, "Frozen soup", "In one part of the freezer you find a frozen soup you take thinking that probably will be useful.", "A frozen soup. You can't eat it.", "sprites/SoupInIce.png"),
        // new ItemInRoom(3,5, "", "","",""),
    ];
    let itemOnRoomGallery = [ //remeber all items is the place where the character is when we  interefer but forrr DOOR IS NOT LIKE THAT
        new ItemInRoom(5, 7, "Medical Equipment", "Inside a drawer you find a Medical Equipment. Seems a little old, you keep it in your inventory.", "An old Medical Equipment that can be used to restore one point of health.", "sprites/MedicalKit.png", "Healing"),
        { name: `Book key`, text: `You find a mysterious book. That does not fit well in the bookshelf.`, desc: `A book that seems to be a key to Rocketo.`, x: 2, y: 7, img: "sprites/Book.png", there: true, key: "BookShelf Door" }

    ];



    function sparkItem() {
        for (item of room) {
            if (Object.keys(item).includes("x") && item.there == true) {
                document.getElementById(`post${item.x}x-${item.y}y`).innerHTML = `<img src="sprites/Spark.png" alt="">`;
            }
        }
        for (item of room) {
            if (Object.keys(item).includes("rx") && item.there == true) {
                document.getElementById(`post${item.rx}x-${item.ry}y`).innerHTML = `<img src="sprites/Spark.png" alt="">`;
            }

        }

    }
    function unlock(name) {
        if(name == "BookShelf Door"){
            for (item of itemOnRoomEntrance) {
                if (item.name[7] == name[7]) {
                    console.log(item.name);
                    let index = itemOnRoomEntrance.indexOf(item);
                    itemOnRoomEntrance[index].haveKey = true;
                    console.log("cat")
                    return
                }
            }
        }
        for (item of room) {
            if (item.name[7] == name[7]) {
                console.log(item.name);
                let index = room.indexOf(item);
                room[index].haveKey = true;
            }
        }
    }

    let repForUseOven2 = true;
    function useOven() { //add rep
        for (item of room) {
            if (characterPosition.x == item.ox && characterPosition.y == item.oy && item.name == `Oven` && item.work == true) {
                let itemCopy = item;

                if (repForUseOven2 == true) {
                    repForUseOven2 = false;
                    console.log(inventoryArray);

                    document.addEventListener(`keydown`, (key) => {
                        if (key.key == "f" && characterPosition.x == itemCopy.ox && characterPosition.y == itemCopy.oy && roomIn == "Kitchen") {
                            console.log("matthew is gay");
                            document.getElementById("textContent").classList.toggle("displayNone");
                            document.getElementById("textContent").innerHTML = `                  
                            <div id="textLeft">
                              <img src="sprites/Narrator.png" alt="">
                            </div>
                            <div id="textRight">
                              <h2>Narrator</h2>
                              <p>What item you want melt.</p>
                              <img src="arrow.svg" alt="" id="imgSpark">             
                            </div>`;
                            document.getElementById("textRight").addEventListener(`click`, () => {
                                document.getElementById("textContent").innerHTML = `  
                                <h2 id="optionH2">Choose one option:</h2>             
                                <div id="textLeftO">
                                <p>Melt key in ice</p>
                    
                                </div>
                                <div id="textRightO">
                                <p>Melt soup in ice</p>
                                </div>`;

                                document.getElementById("textLeftO").addEventListener(`click`, () => {
                                    for (item of inventoryArray) {
                                        if (item.img == 'sprites/KeyInIce.png') {
                                            document.getElementById("textContent").innerHTML = `                  
                                            <div id="textLeft">
                                              <img src="sprites/Narrator.png" alt="">
                                            </div>
                                            <div id="textRight">
                                              <h2>Narrator</h2>
                                              <p>You finally got the key for this room. You grab the key.</p>
                                              <img src="arrow.svg" alt="" id="imgSpark">             
                                            </div>`;
                                            document.getElementById("textRight").addEventListener(`click`, () => {
                                                deleteInventory("sprites/KeyInIce.png");
                                                addInventory("sprites/BlueKey.png", "A key that was in ice. Now it can be used to open a door.");
                                                UpdateInventory();
                                                unlock("Blue Door")
                                                document.getElementById("textContent").innerHTML = `                  
                                                <div id="textLeft">
                                                  <img src="sprites/Narrator.png" alt="">
                                                </div>
                                                <div id="textRight">
                                                  <h2>Narrator</h2>
                                                  <p>You finally got the key for this room. You grab the key.</p>
                                                  <img src="arrow.svg" alt="" id="imgSpark">             
                                                </div>`;
                                            });
                                            document.getElementById("textRight").addEventListener(`click`, () => {
                                                document.getElementById("textContent").classList.toggle("displayNone");
                                            });
                                            return

                                        }
                                    }
                                    document.getElementById("textContent").innerHTML = `                  
                                    <div id="textLeft">
                                      <img src="sprites/Narrator.png" alt="">
                                    </div>
                                    <div id="textRight">
                                      <h2>Narrator</h2>
                                      <p>You don't have that item.</p>
                                      <img src="arrow.svg" alt="" id="imgSpark">             
                                    </div>`;
                                    document.getElementById("textRight").addEventListener(`click`, () => {
                                        document.getElementById("textContent").classList.toggle("displayNone");
                                    });


                                });
                                document.getElementById("textRightO").addEventListener(`click`, () => {
                                    for (item of inventoryArray) {
                                        if (item.img == 'sprites/SoupInIce.png') {
                                            document.getElementById("textContent").classList.toggle("displayNone");
                                            deleteInventory("sprites/SoupInIce.png");
                                            addInventory("sprites/Soup.png", "A beef stew . You can use it to recover stamina.", "Eat");
                                            UpdateInventory();
                                            return
                                        }

                                    }
                                    document.getElementById("textContent").innerHTML = `                  
                                    <div id="textLeft">
                                      <img src="sprites/Narrator.png" alt="">
                                    </div>
                                    <div id="textRight">
                                      <h2>Narrator</h2>
                                      <p>You don't have that item.</p>
                                      <img src="arrow.svg" alt="" id="imgSpark">             
                                    </div>`;
                                    document.getElementById("textRight").addEventListener(`click`, () => {
                                        document.getElementById("textContent").classList.toggle("displayNone");
                                    });

                                });

                            });
                        }
                    });
                }

            }
        }
    }
    let repForOven = true;

    function oven() {
        for (item of room) {
            if (characterPosition.x == item.ox && characterPosition.y == item.oy && item.name == `Oven` && item.work == false) {
                let itemCopy = item;
                if (repForOven == true) {
                    repForOven = false;
                    document.addEventListener(`keydown`, (key) => {
                        if (key.key == "f" && characterPosition.x == itemCopy.ox && characterPosition.y == itemCopy.oy && itemCopy.work == false) {
                            document.getElementById("textContent").classList.toggle("displayNone");
                            document.getElementById("textContent").innerHTML = `                  
                            <div id="textLeft">
                              <img src="sprites/Narrator.png" alt="">
                            </div>
                            <div id="textRight">
                              <h2>Narrator</h2>
                              <p>${itemCopy.text}</p>
                              <img src="arrow.svg" alt="" id="imgSpark">             
                            </div>`;
                            document.getElementById("textRight").addEventListener(`click`, () => {
                                if (itemCopy.gasoline == true) {
                                    document.getElementById("textContent").innerHTML = `  
                                    <h2 id="optionH2">Choose one option:</h2>             
                                    <div id="textLeftO">
                                    <p>Use Gasoline Container</p>
                        
                                    </div>
                                    <div id="textRightO">
                                    <p>Leave</p>
                                    </div>`;
                                    document.getElementById("textLeftO").addEventListener(`click`, () => {
                                        deleteInventory("sprites/GasolineContainer.png");
                                        UpdateInventory();
                                        itemCopy.work = true;
                                        document.getElementById("textContent").innerHTML = `                  
                                        <div id="textLeft">
                                          <img src="sprites/Narrator.png" alt="">
                                        </div>
                                        <div id="textRight">
                                          <h2>Narrator</h2>
                                          <p>Now the oven is working</p>
                                          <img src="arrow.svg" alt="" id="imgSpark">             
                                        </div>`;
                                        document.getElementById("textRight").addEventListener(`click`, () => {
                                            useOven();
                                            document.getElementById("textContent").classList.toggle("displayNone");
                                        });

                                    });
                                    document.getElementById("textRightO").addEventListener(`click`, () => {
                                        useOven();
                                        document.getElementById("textContent").classList.toggle("displayNone");
                                    });
                                }
                                else {
                                    document.getElementById("textContent").classList.toggle("displayNone");
                                }
                            });

                        }
                    });
                    console.log(itemCopy.work);
                    item.work = itemCopy.work;
                    useOven();
                }
            }

        }
    }
    let CATTTTT = true;
    let repForCat = true;
    function catSearch() {
        for (item of room) {
            if (characterPosition.x == item.x && characterPosition.y == item.y && item.name == "Cat" && item.thereC == true){
                let itemCopy = item;

                if (repForCat == true) {
                    repForCat = false;
                    document.addEventListener(`keydown`, (key) => {
                        if (key.key == "f" && characterPosition.x == itemCopy.x && characterPosition.y == itemCopy.y && CATTTTT == true && roomIn != "Rocketo" && roomIn != "Stairs" && roomIn != "Dinning" && roomIn != "Bedroom") {
                            document.getElementById("textContent").classList.toggle("displayNone");
                            document.getElementById("textContent").innerHTML = `                  
                            <div id="textLeft">
                              <img src="sprites/Narrator.png" alt="">
                            </div>
                            <div id="textRight">
                              <h2>Narrator</h2>
                              <p>${itemCopy.text}</p>
                              <img src="arrow.svg" alt="" id="imgSpark">             
                            </div>`;
                            document.getElementById("textRight").addEventListener(`click`, () => {
                                document.getElementById("textContent").innerHTML = `  
                                <h2 id="optionH2">Choose one option:</h2>             
                                <div id="text1">
                                <p>${itemCopy.option1}</p>
                                </div>
                                <div id="text2">
                                <p>${itemCopy.option2}</p>
                                </div>
                                <div id="text3">
                                <p>${itemCopy.option3}</p>
                                </div>`;

                                document.getElementById("text1").addEventListener(`click`, () => {
                                    console.log(inventoryArray, inventoryArray[0].img == 'sprites/Narrator.png', inventoryArray[0].img);
                                    if (haveCatFood == true) {

                                        deleteInventory('sprites/Catfood.png');
                                        UpdateInventory();
                                        createHTMLForCat(itemCopy.textWithCatFood);
                                        startGameForCat(catX, catY);
                                        CATTTTT = false;
                                        itemCopy.thereC = false;
                                    }
                                    else {

                                        document.getElementById("textContent").innerHTML = `                  
                                        <div id="textLeft">
                                          <img src="sprites/Narrator.png" alt="">
                                        </div>
                                        <div id="textRight">
                                          <h2>Narrator</h2>
                                          <p>You don't have any cat food :c The cat scratches you and runs away.</p>
                                          <img src="arrow.svg" alt="" id="imgSpark">             
                                        </div>`;
                                        CATTTTT = false;
                                        startGameForCat(catX, catY);
                                        damage();
                                        updateHealth();
                                    }

                                });
                                document.getElementById("text2").addEventListener(`click`, () => {
                                    itemCopy.thereC = false;
                                    CATTTTT = false;
                                    document.getElementById("textContent").innerHTML = `                  
                                    <div id="textLeft">
                                      <img src="sprites/Narrator.png" alt="">
                                    </div>
                                    <div id="textRight">
                                      <h2>Narrator</h2>
                                      <p>${itemCopy.textWithOutCatFood}</p>
                                      <img src="arrow.svg" alt="" id="imgSpark">             
                                    </div>`;
                                    startGameForCat(catX, catY);
                                    damage();
                                    updateHealth();

                                });
                                document.getElementById("text3").addEventListener(`click`, () => {
                                    createHTMLForCat(itemCopy.textIgnore);
                                    startGameForItem();
                                });
                            });
                        }
                    });
                    item.thereC = itemCopy.thereC;
                    console.log(item.thereC);

                }

            }
        }
    }
    function callMap(x, y) {
        deleteMap(x, y);
        updateMap();
        updateCharacterPostion();
    }
    function createHTMLForCat(cat) {
        document.getElementById("textContent").innerHTML = `                  
        <div id="textLeft">
          <img src="sprites/Narrator.png" alt="">
        </div>
        <div id="textRight">
          <h2>Narrator</h2>
          <p>${cat}</p>
          <img src="arrow.svg" alt="" id="imgSpark">             
        </div>`;

    }
    let repSearchItemsRedKey = true;

    function searchItemsRedKey() {
        for (item of room) {
            if (characterPosition.x == item.rx && characterPosition.y == item.ry) {
                let itemCopy = item;
                let index = room.indexOf(item);
                if (repSearchItemsRedKey == true) {
                    repSearchItemsRedKey = false;
                    document.addEventListener(`keydown`, (key) => {
                        if (key.key == "f" && itemCopy.there == true && characterPosition.x == itemCopy.rx && characterPosition.y == itemCopy.ry) {

                            if (Object.keys(itemCopy).includes("haveKey") && itemCopy.haveKey == false) {
                                document.getElementById("textContent").innerHTML = `                  
                            <div id="textLeft">
                              <img src="${itemCopy.img}" alt="">
                            </div>
                            <div id="textRight">
                              <h2>Narrator</h2>
                              <p>${itemCopy.textWithOutKey}</p>
                              <img src="arrow.svg" alt="" id="imgSpark">             
                            </div>`;
                                document.getElementById("textContent").classList.toggle("displayNone");
                                startGameForItem();
                                return
                            }
                            else {
                                unlock(itemCopy.key);
                                console.log(itemCopy.key)
                                
                                addInventory(itemCopy.img, itemCopy.desc, itemCopy.use);
                                UpdateInventory();
                                document.getElementById("textContent").innerHTML = `                  
                                <div id="textLeft">
                                  <img src="${itemCopy.img}" alt="">
                                </div>
                                <div id="textRight">
                                  <h2>Narrator</h2>
                                  <p>${itemCopy.text}</p>
                                  <img src="arrow.svg" alt="" id="imgSpark">             
                                </div>`;
                                document.getElementById("textContent").classList.toggle("displayNone");
                                room[index].there = false;
                                startGameForItem();
    
                            }

                        }


                    });


                }
            }
        }
    }

    function searchItems() {
        searchItemsRedKey();
        for (item of room) {
            if (characterPosition.x == item.x && characterPosition.y == item.y) {
                let itemCopy = item;
                let index = room.indexOf(item);

                document.addEventListener(`keydown`, (key) => {
                    if (key.key == "f" && itemCopy.there == true && characterPosition.x == itemCopy.x && characterPosition.y == itemCopy.y) {
                        for (item of room) {
                            if (itemCopy.x == item.x && itemCopy.y == item.y && item.img == itemCopy.img ){

                                if (itemCopy.name == "Gasoline container") {
                                    room[5].gasoline = true;
                                }
                                // if (Object.keys(itemCopy).includes("haveKey") && itemCopy.haveKey == false) {
                                //     document.getElementById("textContent").innerHTML = `                  
                                //     <div id="textLeft">
                                //       <img src="${itemCopy.img}" alt="">
                                //     </div>
                                //     <div id="textRight">
                                //       <h2>Narrator</h2>
                                //       <p>${itemCopy.textWithOutKey}</p>
                                //       <img src="arrow.svg" alt="" id="imgSpark">             
                                //     </div>`;
                                //     document.getElementById("textContent").classList.toggle("displayNone");
                                //     startGameForItem();
                                //     return
                                // }
                                if (Object.keys(itemCopy).includes("haveKey") && itemCopy.haveKey == false) {
                                    return
                                }
        
                                if (Object.keys(itemCopy).includes("push")) {
                                    addMap("sprites/Bookshelf.png", 1, 4);
                                    itemsOnRoomCar[1].haveKey = true;
                                    addMap("sprites/NormalDoor.png", 1, 2);
                                    updateMap();
                                    updateCharacterPostion();
                                    document.getElementById("textContent").innerHTML = `                  
                                    <div id="textLeft">
                                      <img src="sprites/Narrator.png" alt="">
                                    </div>
                                    <div id="textRight">
                                      <h2>Narrator</h2>
                                      <p>${itemCopy.text}</p>
                                      <img src="arrow.svg" alt="" id="imgSpark">             
                                    </div>`;
                                    document.getElementById("textContent").classList.toggle("displayNone");
                                    startGameForItem();
                                    room[index].there = false;
                                    return
                                }
                                if (Object.keys(itemCopy).includes("key")) {
                                    unlock(itemCopy.key);
                                    console.log(itemCopy.key)
                                }
                                addInventory(itemCopy.img, itemCopy.desc, itemCopy.use);
                                UpdateInventory();
                                console.log(itemCopy.img, "repeat");
                                document.getElementById("textContent").innerHTML = `                  
                                <div id="textLeft">
                                  <img src="${itemCopy.img}" alt="">
                                </div>
                                <div id="textRight">
                                  <h2>Narrator</h2>
                                  <p>${itemCopy.text}</p>
                                  <img src="arrow.svg" alt="" id="imgSpark">             
                                </div>`;
                                document.getElementById("textContent").classList.toggle("displayNone");
                                itemCopy.there = false;
                                room[index].there = false;
                                startGameForItem();
        

                            }


                        }

                    }
                });
            }
        }
    }

    let galleryRep = true;
    let kitchenRep = true;
    let StorageUpRep = true;
    let DinningRep = true;
    let EntranceLeftRep = true;
    let LibraryRep = true;
    let galleryleftRep = true;
    let BedroomRep = true;
    let stairsRep = true;

    
    function enterDoor() {
        for (item of room) {
            if (characterPosition.x == item.dx && characterPosition.y == item.dy) {
                if (item.haveKey == true) {
                    switch (item.next) {
                        case "GalleryUp":
                            galleryRoom();
                            changeCharacterPostion(7, 7);
                            updateCharacterPostion();
                            break
                        case "Gallery":
                            galleryRoom();
                            changeCharacterPostion(7, 2);
                            updateCharacterPostion();
                            if (galleryRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                galleryRep = false;
                            }
                            break
                        case "StorageDown":
                            storageRoom();
                            changeCharacterPostion(2, 2);
                            updateCharacterPostion();

                            break
                        case "StorageUp":
                            storageRoom();
                            changeCharacterPostion(2, 7);
                            updateCharacterPostion();
                            if (StorageUpRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                StorageUpRep = false;
                            }
                            break
                        case "Kitchen":
                            kitchenRoom();
                            changeCharacterPostion(2, 2);
                            updateCharacterPostion();
                            if (kitchenRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                kitchenRep = false;
                            }
                            break
                        case "StorageDownUp":
                            storageRoom();
                            changeCharacterPostion(2, 7);
                            updateCharacterPostion();
                            break
                        case "Dinning":
                            dinningRoom();
                            changeCharacterPostion(7, 2);
                            updateCharacterPostion();
                            if (DinningRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                DinningRep = false;
                            }
                            break
                        case "KitchenLeft":
                            kitchenRoom();
                            changeCharacterPostion(2, 2);
                            updateCharacterPostion();
                            break
                        case "StairsFromDown":
                            stairsRoom();
                            changeCharacterPostion(4, 2);
                            updateCharacterPostion();
                            addMap("sprites/StairsBlock.png", 4, 7);//this also
                            updateMap();//this a prevention for the error
                            document.getElementById("post4x-6y").classList.toggle("Stairs");
                            document.getElementById("post5x-6y").classList.toggle("Stairs");
                            document.getElementById("post4x-5y").classList.toggle("Stairs");
                            document.getElementById("post5x-5y").classList.toggle("Stairs");
                    
                            document.getElementById("post4x-4y").classList.toggle("RedArrow");
                            document.getElementById("post5x-4y").classList.toggle("RedArrow");                    
                            if (stairsRep == true) {
                                story = storyEnd;
                                movementAllowed = false;
                                number = 0;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                stairsRep = false;
                            }
                            break
                        case "DinningDown":
                            if(roomIn == "Rocketo"){
                                console.log("rocketo no  a dinning")
                                return
                            }
                            console.log("rocketo is also a dinning")
                            dinningRoom();
                            changeCharacterPostion(4, 7);
                            updateCharacterPostion();
                            break
                        case "KitchenUp":
                            console.log("cacakithcen");
                            kitchenRoom();
                            changeCharacterPostion(7, 7);
                            updateCharacterPostion();
                            if (kitchenRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                kitchenRep = false;
                            }
                            break
                        case "Garden":
                            gardenRoom();
                            changeCharacterPostion(7, 2);
                            updateCharacterPostion();
                            break
                        case "GalleryLeft":
                            galleryRoom();
                            changeCharacterPostion(2, 4);
                            updateCharacterPostion();
                            if (galleryleftRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                galleryleftRep = false;
                            }

                            break
                        case "EntranceLeft":
                            entranceRoom();
                            changeCharacterPostion(7, 4);
                            updateCharacterPostion();
                            addMap("sprites/BookShelf.png", 2, 4);
                            updateMap();//problems with the generation
                            if (EntranceLeftRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                EntranceLeftRep = false;
                            }
                            break
                        case "Library":
                            libraryRoom();
                            changeCharacterPostion(4, 2);
                            updateCharacterPostion();
                            if (LibraryRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                LibraryRep = false;
                            }
                            break
                        case "EntranceDown":
                            entranceRoom();
                            changeCharacterPostion(4, 7);
                            updateCharacterPostion();
                            break
                        case "Bedroom":
                            bedroomRoom();
                            changeCharacterPostion(4, 2);
                            updateCharacterPostion();
                            addMap("sprites/BedMiddle.png", 4, 7);
                            updateMap();
                            if (BedroomRep == true) {
                                movementAllowed = false;
                                number = number + 1;
                                console.log(number);
                                console.log(story);
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                BedroomRep = false;
                            }
                            break
                        case "LibraryDown":
                            libraryRoom();
                            changeCharacterPostion(4, 7);
                            updateCharacterPostion();
                            break
                        case "StairsLeft":
                            stairsRoom();
                            changeCharacterPostion(2, 5);
                            updateCharacterPostion();
                            if (stairsRep == true) {
                                story = storyEnd;
                                movementAllowed = false;
                                number = 0;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                stairsRep = false;
                            }
                            break
                        case "BedroomLeft":
                            bedroomRoom();
                            changeCharacterPostion(7, 5);
                            updateCharacterPostion();
                            break
                        case "Rocketo":
                            console.log("going to rocketooo")
                            rocketoRoom();
                            movementAllowed = false;
                            changeCharacterPostion(4, 1);
                            updateCharacterPostion();
                            changeRocketoPostion(4, 7);
                            updateRocketoPostion();
                    
                            setTimeout(() => {
                                changeCharacterPostion(4, 1);
                                updateCharacterPostion();    
                            }, 1000);   
                            setTimeout(() => {
                                changeCharacterPostion(4, 2);
                                updateCharacterPostion();    
                            }, 2000);  
                            setTimeout(() => {
                                changeCharacterPostion(4, 3);
                                updateCharacterPostion();    
                            }, 3000);  
                            setTimeout(() => {
                                changeCharacterPostion(4, 4);
                                updateCharacterPostion();    
                            }, 4000);  
                            setTimeout(() => {
                                changeCharacterPostion(4, 5);
                                updateCharacterPostion();    
                            }, 5000);  
                            setTimeout(() => {
                                number = number + 1;
                                updateText(number, story);
                                document.getElementById("textContent").classList.toggle("displayNone");
                                }, 5500);  

                            break
                        case "End":
                            document.getElementById("textContent").classList.toggle("displayNone");
                            document.getElementById("header").classList.toggle("displayNone");
                            document.getElementById("main").classList.toggle("displayNone");
                            document.getElementById("start").classList.toggle("displayNone");
                            movementAllowed = false;
                            document.getElementById("start").innerHTML = `<img src="Images/End.png">`        
                            break
                    }
                }
            }
        }
    }
    function touchFire() {
        for (block of positionsArray) {
            if (characterPosition.x == block.x && characterPosition.y == block.y) {
                if (block.block == "sprites/Fire.png" || block.block == "sprites/Roses.png" || block.block == "sprites/RosesV.png") {
                    damage();
                    updateHealth();
                    document.getElementById("body").classList.add("fire");
                    document.querySelectorAll("#gameContent div").forEach((e) => e.classList.add("fire"));
                    setTimeout(() => {
                        document.querySelectorAll("#gameContent div").forEach((e) => e.classList.remove("fire"));
                        document.getElementById("body").classList.remove("fire");
                    }, 1000);
                }
            }
        }
    }

    function startGameForItem() {
        document.getElementById("textRight").addEventListener(`click`, () => {
            document.getElementById("textContent").classList.toggle("displayNone");
            switch (roomIn) {
                case "Storage":
                    itemsOnRoomCar = room;
                    break
                case "Gallery":
                    itemOnRoomGallery = room;
                    break
                case "Kitchen":
                    itemOnRoomKitchen = room;
                    break
                case "Dinning":
                    itemOnRoomDinning = room;
                    break
                case "Stairs":
                    itemOnRoomStairs = room;
                    break
                case "Garden":
                    itemOnRoomGarden = room;
                    break
                case "Entrance":
                    itemOnRoomEntrance = room;
                    break
                case "Library":
                    itemOnRoomLibrary = room;
                    break
                case "Bedroom":
                    itemOnRoomBedroom = room;
                    break
                case "Rocketo":
                    itemOnRoomRocketo = room;
                    break
            }
        });
    };
    function startGameForCat(x, y) {
        document.getElementById("textRight").addEventListener(`click`, () => {
            document.getElementById("textContent").classList.toggle("displayNone");
            callMap(x, y);
        });
    };
    function wall() {
        console.log("thats a wall")
    }
    UpdateInventory();
    //stamina 
    let stamina = 3;
    updateStamina();
    function consume() {
        stamina = stamina - 1;
        //do something
    }
    function increaseStamina() {
        stamina = stamina + 1;
    }
    function updateStamina() {
        document.getElementById("stamina").innerText = `Stamina left: ${stamina}`;
    }

    //health 

    let health = [1, 2, 3]
    updateHealth();

    function damage() {
        health.pop();
        console.log(health.length)
        if (health.length == 0) {
            gameOver();
        }
    }
    function healing() {
        health.push(health.length + 1);
    }
    function updateHealth() {
        document.getElementById("health").innerHTML = "";
        for (heart of health) {
            document.getElementById("health").innerHTML = document.getElementById("health").innerHTML + `<img src="sprites/Heart.png">`
        }
    }
    //game over

    function gameOver() {
        fighting = false;
        document.getElementById("header").classList.toggle("displayNone");
        document.getElementById("main").classList.toggle("displayNone");
        document.getElementById("start").classList.toggle("displayNone");
        movementAllowed = false;
        document.getElementById("start").innerHTML = `<img src="Images/gameOver.png">`
    }

    //character movement 
    updateCharacterPostion();

    let movementAllowed = false;


    document.addEventListener(`keydown`, (key) => {
        switch (key.key) {
            case "s":
                if (movementAllowed == false) {
                    break
                }
                characterPosition.y = characterPosition.y - 1;
                if (characterPosition.y == 0) {
                    characterPosition.y = characterPosition.y + 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                    searchItems();
                    catSearch();
                    oven();
                    useOven();
                }
                break
            case "w":
                if (movementAllowed == false) {
                    break
                }
                characterPosition.y = characterPosition.y + 1;
                let a = 9;
                if(fighting == true){
                    a = 8;
                }
                if (characterPosition.y == a) {
                    characterPosition.y = characterPosition.y - 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                    searchItems();
                    catSearch();
                    oven();
                    useOven();
                }
                break
            case "d":
                if (movementAllowed == false) {
                    break
                }
                characterPosition.x = characterPosition.x + 1;
                if (characterPosition.x == 9) {
                    characterPosition.x = characterPosition.x - 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                    searchItems();
                    catSearch();
                    oven();
                    useOven();
                }
                break
            case "a":
                if (movementAllowed == false) {
                    break
                }
                characterPosition.x = characterPosition.x - 1;
                if (characterPosition.x == 0) {
                    characterPosition.x = characterPosition.x + 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                    searchItems();
                    catSearch();
                    oven();
                    useOven();
                }
                break
            case "p":
                console.log("cats")
                deleteInventory("sprites/Apple.png");
                break

            case "o":
                healing();
                updateHealth();
                stamina = stamina + 1;
                updateStamina();
                break

            case "c":
                addInventory("sprites/Catfood.png", "Description");// no use
                UpdateInventory();
                break

        }
    });

    //change to history/map inventory mode



    document.getElementById("button").addEventListener(`click`, (e) => {
        document.getElementById("gameMap").classList.toggle("displayNone");
        document.getElementById("gameInventory").classList.toggle("displayNone");
        document.getElementById("gameTextInput").classList.toggle("displayNone");
        e.preventDefault();
    });

    //start part

    document.getElementById("header").classList.toggle("displayNone");
    document.getElementById("main").classList.toggle("displayNone");


    document.getElementById("startButton").addEventListener(`click`, () => {

        document.getElementById("header").classList.toggle("displayNone");
        document.getElementById("main").classList.toggle("displayNone");
        document.getElementById("start").classList.toggle("displayNone");


        document.getElementById("textContent").classList.toggle("displayNone");
        updateHealth();
        updateText(0, story);

    });


    //History start


    // const waitUntil = (condition, checkInterval=100) => {
    //     return new Promise(resolve => {
    //         let interval = setInterval(() => {
    //             if (!condition()) return;
    //             clearInterval(interval);
    //             resolve();
    //         }, checkInterval)
    //     })
    // }
    // await waitUntil(() => gameStart === true)
    let name = "Diego";
    document.getElementById("userName").innerText = name;

    let number = 0;


    let storyStart = [{ who: "Narrator", text: "The sound of your alarm fills the room as you awake from your slumber." }, { who: "Narrator", text: "You attempt to stop your alarm failing to hit the button multiple times." }, { who: name, text: "If only I weren't blinded in that freak accident back in 1996." }, { who: "Your Phone", text: "Ring Ring." }, { who: name, text: "Hello, who is it?" }, { who: "Guy on the phone", text: "Hello. I am here to tell you about a case but to be sure you're really who you say you are, tell us your name." }, { who: name, text: "I’m your name you can proceed." }, { who: "Guy on the phone", text: "There's some suspicious activity in a mansion down south. We want you to go and be sure that all is okay." }, { who: name, text: "Sorry, I don't really like mansions, my grandma died there a few years ago." }, { who: "Ghost", text: "AAAwaAWWawAAAAA  awawwaaAaAaaAAaa, hellowooow." }, { who: name, text: "G-G-G-Grandma is that you?" }, { who: "Ghost Grandma", text: "OOOooOooOoOoo I am a ghoooooooost now." }, { option1: "AHHh A ghost *grab your axe and you attack your grandma.*", option2: "Grandma You’ve returned YESSSS.", code1: `addAxe`, code2: "" }, { who: "Ghost Grandma", text: "Don't be scared. I am here to help you. You need to accept the mission, that mansion, that mansion is where I died that day. HE IS THERE. YOU NEED TO GO." }, { who: name, text: "*You turn your attention back to the phone* Hello, are you still there?" }, { who: "Guy on the phone", text: "Yes sir, what is going on?" }, { who: name, text: "Nothing, nothing. I changed my mind, I am going there right now." }, { who: "Guy on the phone", text: "Good luck. Bye, bye." }, { who: name, text: "Bye, bye." }, { who: "Narrator", text: "You prepare yourself for the adventure, after talking with your grandma your enthusiasm increases and you want to get there as fast as you can." }, { who: "Narrator", text: "This is your most important mission in your life, you need to know what happened that day at the mansion." }, { who: name, text: "I should probably take something for my adventure ahead.", ifAxe: true }, { option1: "Cat food.", option2: "Flashlight.", code1: `addCatfood`, code2: "addFlashlight" }, { who: "Grandma", text: "Wait, how do you plan to get there?" }, { option1: "*You ask your grandma if she has any idea.*", option2: "*You take the bus*", option3: "*You get to your car*", code1: `Horse`, code2: "Fortuneteller", code3: "Car" }];
    let storyHorse = [{ who: name, text: "I don't know. Do you have an idea? " }, { who: "Grandma", text: "*Suddenly turns into horse*." }, { who: name, text: "Wow, Great idea gran gran." }, { who: "Narrator", text: "You hop on your grandma’s equine form and head to the mansion." }, { who: "Narrator", text: "As your horse grandma pulls into the driveway of the mansion you arrive and immediately rush through the front door with confidence." }, { who: "Narrator", text: "To your surprise no one is there." }, { who: "Narrator", text: "You look around the room and see a small desk in the corner and a small bookshelf to the north as well as a door to the east." }, { who: "Grandma", text: "We have arrived, go search for any clues relating to… suspicious activity. I recommend you to start in the right room." }, { pause: true }, { who: "Narrator", text: "You enter a large room with a statue in the middle and some bookshelves." }, { who: "Grandma", text: "Ohoohhh The statue… this is HIM Rocketoo he is the one who started all of this." }, { who: "Narrator", text: "The statue in front of you is of a tall man with glasses and short black hair. He lovingly holds a chicken in his arms." }, { who: "Grandma", text: "You must find it in the back of the mansion. Keep going." }, { pause: true }, { who: "Grandma", text: "Good job. Use the book as a key. Keep going and defeat Rocketo!" }, { pause: true }, { who: "Narrator", text: "You enter a large secret library with many books you feel and an uneasy presence." }, { who: "Grandma", text: "Ah I can feel ROCKETO’S wrath somewhere in the room move with caution." }, { pause: true }, { who: "Narrator", text: "As you enter the bedroom you see a large bed and a drawer to the side there is a door to the left." }, { who: "Grandma", text: "Ohohh this must be where ROCKETO sleeps mayhaps there will be something of value here." }, { pause: true }]
    let storyCar = [{ who: name, text: " I am going to take my car, come with me." }, { who: "Narrator", text: "You grab your car keys and start driving hysterically." }, { who: name, text: "Man if only I wasn't blind. Why did I choose the car?" }, { who: "Narrator", text: "You say as you crash into the side of a building. BUMMM!" }, { who: name, text: "Oh no not again I CAN'T GO BACK TO PRISON." }, { who: "Narrator", text: "As you step out of your car you start to realize the room around you. You are in the mansion." }, { who: "Narrator", text: "You seem to be in a room used for storing various foods and supplies and also your car that crashed into the eastern wall." }, { who: "Grandma", text: "Ohoohhh you must find a way out of this room. Rocketo is near. I can feel it." }, { who: name, text: "But grandma, what should I do?" }, { who: "Grandma", text: "Keep going. Find the key to get to the next room. Good luck." }, { pause: true }, { who: "Narrator", text: "You enter a large room with a statue in the middle. There is a bookshelf to the west and three doors." }, { who: "Grandma", text: "Ohoohhh The statue… this is HIM Rocketoo he is the one who started all of this. You must defeat him." }, { who: "Narrator", text: "The statue in front of you is of a tall man with glasses and short black hair. He lovingly holds a chicken in his arms." }, { who: "Grandma", text: "You must find it in the back of the mansion. Keep going." }, { pause: true }, { who: "Narrator", text: "You enter back into the storage room through the back door and notice a cat sitting on the floor." }, { pause: true }, { who: "Narrator", text: "You enter back into the storage room through the back door and notice a cat sitting on the floor." }, { who: "Grandma", text: "Ohhoohh I sense it somewhere in this room. There is a key to Rocketo, you must find it." }, { pause: true }, { who: "Narrator", text: "You enter the dining hall. A large table is set in the middle of the room." }, { who: "Grandma", text: "Ohoohh I can feel it, we are near. In the next room we will find Rocketo. Find a way to open the door." }, { pause: true }]
    let storyFortuneteller = [{ who: name, text: "I am going to take the bus, come with me." }, { who: "Narrator", text: "You run out of your home. You get to the bus station and take the first bus. On the bus, a fortune teller talks with you." }, { who: "Fortune teller", text: `Hello, ${name}.` }, { who: name, text: "Wait, how do you know my detective name?" }, { who: "Fortune teller", text: "I know many things about you. When you venture to this mansion you must go to the back entrance through the garden." }, { who: name, text: "Ok wait who are you" }, { who: "Fortune teller", text: "Rocketo is in the mansion you must find him to complete your gran gran’s mission. He is the one that started all of this." }, { who: "Narrator", text: "You look down for a brief moment  as you look back up the fortune teller is gone." }, { who: "Narrator", text: "As you leave the bus you take the strange lady's advice and hop the fence in the back." }, { who: "Narrator", text: "As you enter the garden you see a large tree in the middle with a window leading into the mansion." }, { who: "Grandma", text: "Maybe you can find a way to break the window." }, { pause: true }, { who: "Narrator", text: "You break the window with the hammer. PUMMM!" }, { who: "Narrator", text: "As you carefully make your way through the window you find yourself in a large kitchen." }, { who: "Grandma", text: "Ohhoohh I sense it somewhere in this room. There is a key to Rocketo, you must find it." }, { pause: true }, { who: "Narrator", text: "You enter the dining hall. A large table is set in the middle of the room." }, { who: "Grandma", text: "Ohoohh I can feel it, we are near. In the next room we will find Rocketo. Find a way to open the door." }, { pause: true }]
    let storyEnd = [{who: "Narrator", text:"You enter the stairs."}, {who: "Grandma", text:"Here is where Rocketo lies."}, {who: name, text: "Gee thanks gran gran, boy I'm so glad to have a wise and knowledgeable mentor like you who was introduced so early in my travels."}, {who: "Grandma", text: "You are welcome :)"}, { pause: true }, {who: "Narrator", text: "You enter through the secret door in the stairs and find ROCKETO sitting menacingly in a chair, his fine hen sits in his lap."}, {who: "Rocketo", text: "Ah it is you I have been expecting your audience."}, {who: name, text: "Your evil ends here."}, {who: "Rocketo", text: "Wait, allow me to explain a few things."}, {who: name, text: "Alright I guess i'll hear you out."}, {who: "Rocketo", text: "Ahh for you see it, it all happened about 7 years ago. I needed people to experiment my ROCKETO’S BLINDING TONIC on."}, {who: "Rocketo", text: " I went down to the local park and staged a freak accident to trap someone."}, {who: "Rocketo", text: "You were the one who fell victim to it."}, {who: name, text: "WHAT THAT WAS YOU!"}, {who: "Rocketo", text: "OOOOOAHHAHAH. Yes and now I will end you."}, { fight : true }];
    let carEnding = [{who: "Narrator", text: "After defeating rocketo you begin to notice that the mansion is burning down."}, {who: "Grandma", text: "Ah yeah we maybe should have put that out."}, {who: "Narrator", text: "You try to find an exit but then you realize that the door is blocked."}, {who: "Narrator", text: "As you wake up you see your grandma in front of you."}, {who: name, text: "HelloOOoooo"}, {who: "Grandma", text: "Greeting grandson welcome to the world of the dead."}, {who: name, text: "Oh well, at least we get to spend more time together now."}, {who: "Grandma", text: "Yes indeed."}, { pause: true}];
    let horseEnding = [{who: "Narrator", text: "After a long and strenuous fight. You defeat Rocketo."}, {who: "Grandma", text: "Ah, finally ROCKETO has been defeated. Now I may rest in peace."}, {who: name, text: "Grandma don’t go. Please don’t leave me here."}, {who: "Grandma", text: "Sorry. But I can’t stay here any longer. Bye. Thank you for all your efforts."}, {who: name, text: "NOOOO GRANDMAAAA!"}, { pause: true}];
    let fortunetellerEnding = [{who: "Narrator", text: "After a long and strenuous fight. You defeat Rocketo."}, {who: "Narrator", text: "You remember one thing that the fortune teller told you. You grab Rocketo’s jacket and find a suspicious drink."}, {who: "Narrator", text: "You drink it and then you give it to your Grandma to try it too."}, {who: "Narrator", text: "You see your Grandma. You run and hug her."}, {who: name, text: "Gran gran I can see you and you are not a ghost."}, {who: "Grandma", text: "Yes, you did it, we are finally together."}, { pause: true }];    
    let story = storyStart;

    let axe = false;

    function startGame() {
        document.getElementById("textRight").addEventListener(`click`, () => {
            number = number + 1;
            updateText(number, story);
        });
    };
    let catX = 4;// cat position
    let catY = 1;
    let endFight = false;

    function endFightF(){
        if(endFight == true){
            clearInterval(fightTimer);
        }
    }
    let rockPosition = [];


    function rockTouch(index){
        let faste = 100;
        if(rockPosition[index].x == characterPosition.x && rockPosition[index].y == characterPosition.y){
            faste = 600;
        }
        setTimeout(() => {
            if(rockPosition[index].x == characterPosition.x && rockPosition[index].y == characterPosition.y){
                console.log("hit")
                damage();
                updateHealth();
                document.getElementById("body").classList.add("fire");
                document.querySelectorAll("#gameContent div").forEach((e) => e.classList.add("fire"));
                setTimeout(() => {
                    document.querySelectorAll("#gameContent div").forEach((e) => e.classList.remove("fire"));
                    document.getElementById("body").classList.remove("fire");
                }, 300);

            }
            if(clear == true){
                return
            }
            rockTouch(index);
        }, faste);    
    }
    function rocketoRockAttack(xA , yA){
        if(fighting == false){
            return
        }
        rockPosition.push({x: xA, y: yA });
        const indexOfRockPosition = rockPosition.length - 1;
        rockTouch(indexOfRockPosition);
        // rockPosition.x = rocketoPosition.x;
        // rockPosition.y = rocketoPosition.y;
        const long = yA;
        for(i = 0; i <= long - 1; i = i + 1){  
            if(i == 0){
                setTimeout(() => {
                    rockPosition[indexOfRockPosition].y = rockPosition[indexOfRockPosition].y - 1; 
                    document.getElementById(`post${rockPosition[indexOfRockPosition].x}x-${rockPosition[indexOfRockPosition].y}y`).classList.toggle("Rock");    
                }, 500 * i); 
            }
            else if(i == (long - 1)){
                setTimeout(() => {
                    document.getElementById(`post${rockPosition[indexOfRockPosition].x}x-${rockPosition[indexOfRockPosition].y}y`).classList.toggle("Rock");
                    rockPosition[indexOfRockPosition] = {};
                }, 500 * i);
            }
            else{
                setTimeout(() => {
                    rockPosition[indexOfRockPosition].y = rockPosition[indexOfRockPosition].y - 1; 
                    document.getElementById(`post${rockPosition[indexOfRockPosition].x}x-${rockPosition[indexOfRockPosition].y + 1}y`).classList.toggle("Rock");
                    document.getElementById(`post${rockPosition[indexOfRockPosition].x}x-${rockPosition[indexOfRockPosition].y}y`).classList.toggle("Rock");        
                }, 500 * i);
            }

        }
    }
    let laserPosition = [];
    function laserAttack(xA, yA){
        if(fighting == false){
            return
        }
        laserPosition.push({x: xA, y: yA });
        const indexOfLaserPosition = laserPosition.length - 1;
        // laserTouch(indexOfLaserPosition);
        const long = yA - 1;
        setTimeout(() => {
            for(i = 0; i <= long - 1; i = i + 1){ 
                laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y - 1; 
                document.getElementById(`post${laserPosition[indexOfLaserPosition].x}x-${laserPosition[indexOfLaserPosition].y}y`).classList.toggle("Alert");        
            } 
        }, 300);
        setTimeout(() => {
            laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y + long;
            for(i = 0; i <= long - 1; i = i + 1){ 
                laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y - 1; 
                document.getElementById(`post${laserPosition[indexOfLaserPosition].x}x-${laserPosition[indexOfLaserPosition].y}y`).classList.toggle("Alert");        
            } 
        }, 600);

        setTimeout(() => {
            laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y + long;
            for(i = 0; i <= long - 1; i = i + 1){ 
                setTimeout(() => {
                    laserTouch(indexOfLaserPosition, false);
                    laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y - 1; 
                    document.getElementById(`post${laserPosition[indexOfLaserPosition].x}x-${laserPosition[indexOfLaserPosition].y}y`).classList.toggle("Laser");        
                }, 50 * i);
            } 
            setTimeout(() => {
                laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y + long;
                for(i = 0; i <= long - 1; i = i + 1){ 
                    laserPosition[indexOfLaserPosition].y = laserPosition[indexOfLaserPosition].y - 1; 
                    document.getElementById(`post${laserPosition[indexOfLaserPosition].x}x-${laserPosition[indexOfLaserPosition].y}y`).classList.toggle("Laser");        
                } 
            }, 50 * long + 100);    
        }, 700);
    function laserTouch(index, work){
        if(fighting == false){
            return
        }
        let faste = 49;
        let working = work;
        if(laserPosition[index].x == characterPosition.x && laserPosition[index].y == characterPosition.y){
            faste = 1000;
        }
        console.log(faste)
        setTimeout(() => {
            if(laserPosition[index].x == characterPosition.x && laserPosition[index].y == characterPosition.y && working == false){
                console.log("hit")
                damage();
                updateHealth();
                document.getElementById("body").classList.add("fire");
                document.querySelectorAll("#gameContent div").forEach((e) => e.classList.add("fire"));
                setTimeout(() => {
                    document.querySelectorAll("#gameContent div").forEach((e) => e.classList.remove("fire"));
                    document.getElementById("body").classList.remove("fire");
                }, 300);
            }
            if(clear == true){
                return
            }
            working = true;
            laserTouch(index, working);
        }, faste);    
    }


    }
    let clear = false;
    function clearLag(){
        rockPosition = [];
        clear = true;
        setTimeout(() => {
            clear = false;
        }, 600);
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    function rocketoMovement(){
        if(fighting == false){
            return
        }
        setTimeout(() => {
            changeRocketoPostion(getRandomInt(8) + 1, 8);
            updateRocketoPostion();
            console.log(rocketoPosition);
            rocketoMovement()    
        }, 1000);
    }
    let fighting = false;
    function rocketoFight(){
        console.log(room, "before")
        fighting = true;
        rocketoFightRoom(); 
        changeCharacterPostion(4, 2);
        updateCharacterPostion();
        rocketoMovement();
        attackTouchRocketo();
        console.log(room, "after")
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(8, 8);
        }, 1000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 3000);
        setTimeout(() => {
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 4000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 5500);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 6000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 7000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 8500);
        setTimeout(() => {
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 10000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 12000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 16000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(8, 8);
        }, 18000);
        setTimeout(() => {
            laserAttack(2, 8);
            laserAttack(4, 8);
            laserAttack(6, 8);
            laserAttack(8, 8);
        }, 20000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(3, 8);
            laserAttack(5, 8);
            laserAttack(7, 8);
        }, 22000);
        setTimeout(() => {
            laserAttack(2, 8);
            laserAttack(4, 8);
            laserAttack(6, 8);
            laserAttack(8, 8);
        }, 24000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(3, 8);
            laserAttack(5, 8);
            laserAttack(7, 8);
        }, 25000);
        setTimeout(() => {
            laserAttack(1, 8);
        }, 26500);
        setTimeout(() => {
            laserAttack(2, 8);
        }, 27000);
        setTimeout(() => {
            laserAttack(3, 8);
        }, 27500);
        setTimeout(() => {
            laserAttack(4, 8);
        }, 28000);
        setTimeout(() => {
            laserAttack(5, 8);
        }, 28500);
        setTimeout(() => {
            laserAttack(6, 8);
        }, 29000);
        setTimeout(() => {
            laserAttack(7, 8);
        }, 29500);
        setTimeout(() => {
            laserAttack(8, 8);
        }, 30000);
        setTimeout(() => {
            laserAttack(8, 8);
        }, 30500);
        setTimeout(() => {
            laserAttack(7, 8);
        }, 31500);
        setTimeout(() => {
            laserAttack(6, 8);
        }, 32000);
        setTimeout(() => {
            laserAttack(5, 8);
        }, 32500);
        setTimeout(() => {
            laserAttack(4, 8);
        }, 33000);
        setTimeout(() => {
            laserAttack(3, 8);
        }, 33500);
        setTimeout(() => {
            laserAttack(2, 8);
        }, 34000);
        setTimeout(() => {
            laserAttack(1, 8);
        }, 34500);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(8, 8);
        }, 35000);
        setTimeout(() => {
            console.log("out side if 37000")
            console.log(fighting);
            if(fighting == false){
                console.log("inside if 37000")
                return
            }
            else{
                positionsArray = [];
                createPositionArray();    
                addMap("sprites/Fire.png", 3, 1);
                addMap("sprites/Fire.png", 3, 2);
                addMap("sprites/Fire.png", 3, 3);
                addMap("sprites/Fire.png", 3, 4);
                addMap("sprites/Fire.png", 3, 5);
                addMap("sprites/Fire.png", 3, 6);
                addMap("sprites/Fire.png", 3, 7);
                updateMap();
                updateCharacterPostion();    
            }
        }, 37000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(8, 8);
        }, 38000);
        setTimeout(() => {
            console.log("out side if 40000")
            if(fighting == false){
                console.log("inside if 40000")
                return
            }
            else{
                positionsArray = [];
                createPositionArray();    
                laserAttack(1, 8);
                laserAttack(2, 8);
                laserAttack(4, 8);
                laserAttack(5, 8);
                laserAttack(6, 8);
                laserAttack(8, 8);    
            }
        }, 40000);
        setTimeout(() => {
            if(fighting == false){
                console.log("inside if 40000")
                return
            }
            else{
                updateMap();
                updateCharacterPostion();    
            }
        }, 43000);
        setTimeout(() => {
            if(fighting == false){
                console.log("inside if 40000")
                return
            }
            else{
                updateMap();
                updateCharacterPostion();    
            }        }, 47000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 48500);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 50000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(8, 8);
        }, 52000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 53500);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 55000);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 57500);
        setTimeout(() => {
            laserAttack(1, 8);
            laserAttack(2, 8);
            laserAttack(3, 8);
            laserAttack(4, 8);
            laserAttack(5, 8);
            laserAttack(6, 8);
            laserAttack(7, 8);
            laserAttack(8, 8);
        }, 59000);
        setTimeout(() => {
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 62000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
        }, 63000);
        setTimeout(() => {
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 64000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 65000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 66000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 67000);
        setTimeout(() => {
            rocketoRockAttack(1, 8);
            rocketoRockAttack(2, 8);
            rocketoRockAttack(3, 8);
            rocketoRockAttack(4, 8);
            rocketoRockAttack(5, 8);
            rocketoRockAttack(6, 8);
            rocketoRockAttack(7, 8);
            rocketoRockAttack(8, 8);
        }, 68000);



        // add more here 




        // setTimeout(() => {
        //     // rocketoMovement();
        // }, 2500);
        // setTimeout(() => {
        //     // rocketoRockAttack(rocketoPosition.x, rocketoPosition.y);
        // }, 3000);
        // rocketoRockAttack();

        // let fightTimer = setInterval(() => {
        //     setTimeout(() => {
                
        //     }, 1000);

        //     }, 1000);  

    }
    characterAttack();
    let kunaiPosition = {};
    let attaking = false;
    function characterAttack(){
        
        document.addEventListener(`keydown`, (key) => {
            if(fighting == false){
                return
            }
            if(key.key == "f" && attaking == false && stamina > 0){
                consume();
                updateStamina();
                attaking = true;
                kunaiPosition = {x : characterPosition.x, y : characterPosition.y};
                const long = 9 - characterPosition.y;
                for(i = 0; i <= long - 1; i = i + 1){  
                    if(i == 0){
                        setTimeout(() => {
                            kunaiPosition.y = kunaiPosition.y + 1; 
                            document.getElementById(`post${kunaiPosition.x}x-${kunaiPosition.y}y`).classList.toggle("Kunai");    
                        }, 100 * i); 
                    }
                    else if(i == (long - 1)){
                        setTimeout(() => {
                            document.getElementById(`post${kunaiPosition.x}x-${kunaiPosition.y}y`).classList.toggle("Kunai");
                            kunaiPosition = {};
                            attaking = false;
                        }, 100 * i);
                    }
                    else{
                        setTimeout(() => {
                            kunaiPosition.y = kunaiPosition.y + 1; 
                            document.getElementById(`post${kunaiPosition.x}x-${kunaiPosition.y - 1}y`).classList.toggle("Kunai");
                            document.getElementById(`post${kunaiPosition.x}x-${kunaiPosition.y}y`).classList.toggle("Kunai");        
                        }, 100 * i);
                    }
        
                }
            }
        });
    }
    let endingStoryDid = false;
    let rocketoLife = 4;
    function checkRocketosLife(){
        if(fighting == false){
            return
        }
        if(rocketoLife == 0 && fighting == true){
            fighting = false;
            document.getElementById("textContent").classList.toggle("displayNone");
            document.getElementById("header").classList.toggle("displayNone");
            document.getElementById("main").classList.toggle("displayNone");
            document.getElementById("start").classList.toggle("displayNone");
            movementAllowed = false;
            document.getElementById("start").innerHTML = `<img src="Images/RocketoHasLost.png">`        
            setTimeout(() => {
                document.getElementById("header").classList.toggle("displayNone");
                document.getElementById("main").classList.toggle("displayNone");
                document.getElementById("start").classList.toggle("displayNone");
                movementAllowed = true;
            }, 3950);  
            setTimeout(() => {
                positionsArray = [];
                createPositionArray();
                addMap("sprites/DeadRocketo.png", 4, 5);
                addMap("sprites/EndingDoor.png", 4, 8);
                updateMap();
                itemOnRoomRocketo = [new DoorInRoom(4, 8, "Ending Door", "End", true)]
                console.log(itemOnRoomRocketo, "rocketo");
                room = itemOnRoomRocketo;
                console.log(room, "room");
                changeCharacterPostion(4, 1);
                updateCharacterPostion();

                switch (storyIn) {
                    case "Horse":
                        if(endingStoryDid == false){
                            endingStoryDid = true;
                            console.log("HORSEEEE"); 
                            number = 0;
                            story = horseEnding;
                            updateText(number, story);
                            document.getElementById("textContent").classList.toggle("displayNone");   
                            console.log(room, "room");
                        }
                        return
                        break
                    case "Fortuneteller":
                        if(endingStoryDid == false){
                            endingStoryDid = true;
                            console.log("FORUTNEEE"); 
                            number = 0;
                            story = fortunetellerEnding;
                            updateText(number, story);
                            document.getElementById("textContent").classList.toggle("displayNone");
                            console.log(room, "room");
                        }
                        return
                        break
                    case "Car":
                        if(endingStoryDid == false){
                            endingStoryDid = true;
                            positionsArray = [];
                            createPositionArray();        
                            addMap("sprites/DeadRocketo.png", 4, 5);
                            addMap("sprites/EndingDoor.png", 4, 8);
                            addMap("sprites/Fire.png", 1, 1);
                            addMap("sprites/Fire.png", 1, 3);
                            addMap("sprites/Fire.png", 1, 4);
                            addMap("sprites/Fire.png", 1, 6);
                            addMap("sprites/Fire.png", 2, 1);
                            addMap("sprites/Fire.png", 2, 2);
                            addMap("sprites/Fire.png", 2, 5);
                            addMap("sprites/Fire.png", 2, 7);
                            addMap("sprites/Fire.png", 2, 8);
                            addMap("sprites/Fire.png", 3, 1);
                            addMap("sprites/Fire.png", 3, 2);
                            addMap("sprites/Fire.png", 3, 4);
                            addMap("sprites/Fire.png", 3, 5);
                            addMap("sprites/Fire.png", 3, 7);
                            addMap("sprites/Fire.png", 6, 1);
                            addMap("sprites/Fire.png", 6, 3);
                            addMap("sprites/Fire.png", 6, 4);
                            addMap("sprites/Fire.png", 6, 6);
                            addMap("sprites/Fire.png", 7, 1);
                            addMap("sprites/Fire.png", 7, 2);
                            addMap("sprites/Fire.png", 7, 5);
                            addMap("sprites/Fire.png", 7, 7);
                            addMap("sprites/Fire.png", 7, 8);
                            addMap("sprites/Fire.png", 8, 1);
                            addMap("sprites/Fire.png", 8, 2);
                            addMap("sprites/Fire.png", 8, 4);
                            addMap("sprites/Fire.png", 8, 5);
                            addMap("sprites/Fire.png", 8, 7);
                            updateMap();
                            changeCharacterPostion(4, 1);
                            updateCharacterPostion();
                            number = 0;
                            story = carEnding;
                            updateText(number, story);
                            document.getElementById("textContent").classList.toggle("displayNone");    
                        }
                        return

                        break
                }
            }, 4000);
        }

    }
    function attackTouchRocketo(){
        if(fighting == false){
            return
        }
        let fastes = 100;
        if(rocketoPosition.x == kunaiPosition.x && rocketoPosition.y == kunaiPosition.y){
            fastes = 1000;
        }
        setTimeout(() => {
            if(fighting == false){
                return
            }
            if(rocketoPosition.x == kunaiPosition.x && rocketoPosition.y == kunaiPosition.y){
                console.log("ROCKETO AAAAAAAAAAAAAA")
                document.getElementById("body").classList.add("yellow");
                document.querySelectorAll("#gameContent div").forEach((e) => e.classList.add("yellow"));
                setTimeout(() => {
                    document.querySelectorAll("#gameContent div").forEach((e) => e.classList.remove("yellow"));
                    document.getElementById("body").classList.remove("yellow");
                }, 300);
                rocketoLife = rocketoLife - 1;
                checkRocketosLife();
            }
            attackTouchRocketo();
        }, fastes);    

    }
  


    let firstTime = true;
    function updateText(number, story) {
        console.log(number)
        switch (true) {
            case Object.keys(story[number]).includes("fight"):
                document.getElementById("textContent").classList.toggle("displayNone");
                document.getElementById("header").classList.toggle("displayNone");
                document.getElementById("main").classList.toggle("displayNone");
                document.getElementById("start").classList.toggle("displayNone");
                movementAllowed = false;
                document.getElementById("start").innerHTML = `<img src="Images/Fight.png">`        
                setTimeout(() => {
                    document.getElementById("header").classList.toggle("displayNone");
                    document.getElementById("main").classList.toggle("displayNone");
                    document.getElementById("start").classList.toggle("displayNone");
                    movementAllowed = true;
                }, 2000);  
                setTimeout(() => {
                    rocketoFight(); 
                }, 2500);
                break
            case Object.keys(story[number]).includes("pause"):
                document.getElementById("textContent").classList.toggle("displayNone");
                movementAllowed = true;
                if (firstTime == true) {
                    switch (story) {
                        case storyHorse:
                            changeCharacterPostion(4, 2);
                            entranceRoom();
                            updateCharacterPostion();
                            firstTime = false;
                            catX = 1;// cat position change
                            catY = 6;
                            itemOnRoomGallery.push(new DoorInRoom(1, 4, "Normal Door", "EntranceLeft", true));
                            itemOnRoomStairs.push(new DoorInRoom(1, 5, "Orange Door", "BedroomLeft", true));
                            itemOnRoomStairs[4].haveKey == false;

                            break
                        case storyCar:
                            changeCharacterPostion(6, 4);
                            storageRoom();
                            updateCharacterPostion();
                            firstTime = false;
                            catX = 3;// cat position
                            catY = 6;
                            itemOnRoomGallery.push(new DoorInRoom(8, 2, "Normal Door", "StorageDown", true));
                            itemOnRoomGallery.push(new DoorInRoom(8, 7, "Normal Door", "StorageUp", true));
                            // itemOnRoomStairs.push(new DoorInRoom(4, 1, "Green Door", "DinningDown", true)); 

                            break
                        case storyFortuneteller:
                            changeCharacterPostion(8, 8);
                            gardenRoom();
                            updateCharacterPostion();
                            itemOnRoomKitchen[0].haveKey = false;
                            console.log(itemOnRoomKitchen)
                            catX = 4;// cat position
                            catY = 1;
            
                            itemOnRoomKitchen.push({ name: `Cat`, x: 4, y: 2, text: "You find a cat, it looks hungry. Do you want to feed him?", textWithCatFood: "You give the cat the cat food, he smiles and jumps into your back. Now he is your new friend.", textIgnore: "You ignore the hungry little cat.", textWithOutCatFood: "The cat attacks you, he doesn't like the food that you given it to him.", option1: "You feed the cat with Cat Food", option2: "You feed the cat with food", option3: "You ignore the cat", thereC: true });
                            itemOnRoomKitchen.push(new DoorInRoom(7, 8, "Window", "Garden", true));
                            // itemOnRoomStairs.push(new DoorInRoom(4, 1, "Green Door", "DinningDown", true));

                            firstTime = false;// the item top is for the cat in the kitchen for fortuneteller ending
                            break
                    }
                }
                break
            case Object.keys(story[number]).includes("ifAxe"):
                if (axe == true) {
                    console.log("cats")
                    number = number + 1;
                    startGame();
                }
                else {
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/Detective.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                    </div>`;
                    startGame();
                }
                break
            case Object.keys(story[number]).includes("who"):
                console.log(story)
                if(story[number].who == name){
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/detective.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();
                }
                else if(story[number].who == "Fortune teller"){
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/FortuneTeller.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();
                }
                else if(story[number].who == "Your Phone"){
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/Phone.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();
                }
                else if(story[number].who == "Ghost"){
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/Grandma.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();
                }
                else if(story[number].who == "Guy on the phone"){
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/Phone.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();
                }
                else if(story[number].who == "Ghost Grandma"){
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/Grandma.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();
                }
                else {
                    document.getElementById("textContent").innerHTML = `                  
                    <div id="textLeft">
                      <img src="sprites/${story[number].who}.png" alt="">
                    </div>
                    <div id="textRight">
                      <h2>${story[number].who}</h2>
                      <p>${story[number].text}</p>
                      <img src="arrow.svg" alt="" id="imgSpark">             
                      </div>`;
                    startGame();    
                }
                break
            case Object.keys(story[number]).includes("option3"):
                document.getElementById("textContent").innerHTML = `  
                <h2 id="optionH2">Choose one option:</h2>             
                <div id="text1">
                <p>${story[number].option1}</p>
    
                </div>
                <div id="text2">
                <p>${story[number].option2}</p>
                </div>
                <div id="text3">
                <p>${story[number].option3}</p>
                </div>`;
                optionLoader3(story[number].code1, story[number].code2, story[number].code3);
                break
            case Object.keys(story[number]).includes("option1"):
                document.getElementById("textContent").innerHTML = `  
                <h2 id="optionH2">Choose one option:</h2>             
                <div id="textLeftO">
                <p>${story[number].option1}</p>
                
                </div>
                <div id="textRightO">
                <p>${story[number].option2}</p>
                </div>`;
                optionLoader2(story[number].code1, story[number].code2);
                break
        }
    };
    let haveCatFood = false;
    function optionLoader2(code1, code2) {
        document.getElementById("textLeftO").addEventListener(`click`, () => {

            if (code1 == "addAxe") {
                axe = true;
                addInventory("sprites/Axe.png", "A strong axe maybe can be useful.");// no use
                UpdateInventory();
            }
            else if (code1 == "addCatfood") {
                addInventory("sprites/Catfood.png", "Cat food, you can feed cats with food.");// no use
                UpdateInventory();
                haveCatFood = true;
            }
            number = number + 1;
            updateText(number, story);
        });
        document.getElementById("textRightO").addEventListener(`click`, () => {

            if (code2 == "addFlashlight") {
                addInventory("sprites/Flashlight.png", "Did you choose a flashlight while being blind?");// no use
                UpdateInventory();
            }
            number = number + 1;
            updateText(number, story);
        });

    };
    let storyIn = "";
    function optionLoader3(code1, code2, code3) {
        document.getElementById("text1").addEventListener(`click`, () => {
            number = 0;
            story = storyHorse;
            storyIn = "Horse";
            updateText(number, story);
        });
        document.getElementById("text2").addEventListener(`click`, () => {
            number = 0;
            story = storyFortuneteller;
            storyIn = "Fortuneteller";

            updateText(number, story);
        });
        document.getElementById("text3").addEventListener(`click`, () => {
            number = 0;
            story = storyCar;
            storyIn = "Car";
            updateText(number, story);
        });
    }

    //mapping 
    function storageRoom() {
        positionsArray = [];
        createPositionArray();
        addMap("sprites/Fire.png", 7, 4);
        addMap("sprites/Fire.png", 5, 3);
        addMap("sprites/Fire.png", 5, 2);
        addMap("sprites/Fire.png", 5, 1);
        addMap("sprites/Fire.png", 8, 1);
        addMap("sprites/Fire.png", 8, 2);
        addMap("sprites/Drawer.png", 8, 6);
        addMap("sprites/Drawer.png", 8, 5);
        addMap("sprites/Drawer.png", 8, 4);
        addMap("sprites/Bookshelf.png", 1, 3);
        addMap("sprites/Drawer.png", 6, 8);
        addMap("sprites/Drawer.png", 7, 8);
        addMap("sprites/Drawer.png", 8, 8);
        addMap("sprites/Drawer.png", 4, 1);
        addMap("box.png", 1, 5);
        addMap("box.png", 2, 5);
        addMap("box.png", 3, 5);
        addMap("box.png", 4, 5);
        addMap("box.png", 4, 6);
        addMap("box.png", 4, 7);
        addMap("box.png", 4, 8);
        addMap("sprites/NormalDoor.png", 1, 7);
        addMap("sprites/RedDoor.png", 2, 8);
        addMap("sprites/Bookshelf.png", 1, 2);
        if(CATTTTT == true){
            addMap("sprites/Cat.png", 3, 6);
        }
        if (itemsOnRoomCar[1].haveKey == true) {// do this for the cat
            addMap("sprites/Bookshelf.png", 1, 4);
            addMap("sprites/NormalDoor.png", 1, 2);
        }
        updateMap();
        room = itemsOnRoomCar;
        sparkItem();
        roomIn = "Storage"
        miniMap(roomIn);

    }
    function galleryRoom() {
        positionsArray = [];
        createPositionArray();
        addMap("sprites/NormalDoor.png", 8, 7);
        addMap("sprites/NormalDoor.png", 8, 2);
        addMap("sprites/NormalDoor.png", 1, 4);
        addMap("sprites/Bookshelf.png", 1, 2);
        addMap("sprites/Bookshelf.png", 1, 3);

        addMap("sprites/Bookshelf.png", 2, 8);
        addMap("sprites/Bookshelf.png", 3, 8);
        addMap("sprites/Bookshelf.png", 4, 8);
        addMap("sprites/Drawer.png", 5, 8);

        updateMap();
        room = itemOnRoomGallery;
        sparkItem();
        roomIn = "Gallery"
        miniMap(roomIn);


    }
    function kitchenRoom() {
        positionsArray = [];
        createPositionArray();
        addMap("sprites/FrezerWalls.png", 4, 8);
        addMap("sprites/FrezerWalls.png", 4, 7);
        addMap("sprites/FrezerWalls.png", 4, 6);
        addMap("sprites/FrezerWalls.png", 4, 5);
        addMap("sprites/FrezerWalls.png", 4, 4);
        addMap("sprites/FrezerWalls.png", 3, 4);
        addMap("sprites/FrezerWalls.png", 1, 4);
        addMap("sprites/RedDoor.png", 2, 1);
        addMap("sprites/BlueDoor.png", 1, 2);
        addMap("sprites/KitchenDrawer.png", 8, 6);
        addMap("sprites/KitchenOven.png", 8, 5);
        addMap("sprites/KitchenDrawer.png", 8, 4);
        addMap("sprites/KitchenDrawer.png", 5, 1);
        addMap("sprites/KitchenDrawer.png", 7, 1);
        addMap("sprites/KitchenSink.png", 6, 1);
        addMap("sprites/Window.png", 7, 8);
        if(CATTTTT == true && story == storyFortuneteller){
            addMap("sprites/Cat.png", 4, 1);
        }


        updateMap();
        room = itemOnRoomKitchen;
        sparkItem();
        roomIn = "Kitchen"
        miniMap(roomIn);
    }
    function dinningRoom() {
        positionsArray = [];
        createPositionArray();
        addMap("sprites/BlueDoor.png", 8, 2);
        addMap("sprites/Plant.png", 1, 1);
        addMap("sprites/Plant.png", 8, 8);
        addMap("sprites/Plant.png", 1, 8);
        addMap("sprites/Plant.png", 8, 1);
        addMap("sprites/Drawer.png", 8, 6);
        addMap("sprites/Drawer.png", 8, 5);
        addMap("sprites/Drawer.png", 8, 4);
        addMap("sprites/Table.png", 4, 5);
        addMap("sprites/Table.png", 5, 5, "an90");
        addMap("sprites/Table.png", 5, 4, "an180");
        addMap("sprites/Table.png", 4, 4, "an270");
        addMap("sprites/Chair.png", 4, 6);
        addMap("sprites/Chair.png", 5, 6);
        addMap("sprites/GreenDoor.png", 4, 8);
        updateMap();

        room = itemOnRoomDinning;
        sparkItem();
        roomIn = "Dinning"
        miniMap(roomIn);

    }
    function stairsRoom() {
        positionsArray = [];
        createPositionArray();

        addMap("sprites/GreenDoor.png", 4, 1);
        addMap("sprites/StairsBlock.png", 3, 8);
        addMap("sprites/StairsBlock.png", 4, 8);
        addMap("sprites/StairsBlock.png", 5, 8);
        addMap("sprites/StairsBlock.png", 6, 8);
        addMap("sprites/StairsBlock.png", 3, 7);
        addMap("sprites/StairsBlock.png", 4, 7);
        addMap("sprites/StairsBlock.png", 5, 7);
        addMap("sprites/StairsBlock.png", 6, 7);
        addMap("sprites/StairsBlock.png", 6, 6);
        addMap("sprites/StairsBlock.png", 6, 5);
        addMap("sprites/StairsBlock.png", 3, 6);
        addMap("sprites/StairsBlock.png", 3, 5);

        addMap("sprites/OrangeDoor.png", 1, 5);
        addMap("sprites/Drawer.png", 2, 1);
        addMap("sprites/Drawer.png", 6, 1);

        updateMap();
        document.getElementById("post4x-6y").classList.toggle("Stairs");
        document.getElementById("post5x-6y").classList.toggle("Stairs");
        document.getElementById("post4x-5y").classList.toggle("Stairs");
        document.getElementById("post5x-5y").classList.toggle("Stairs");

        document.getElementById("post4x-4y").classList.toggle("RedArrow");
        document.getElementById("post5x-4y").classList.toggle("RedArrow");

        room = itemOnRoomStairs;
        sparkItem();
        roomIn = "Stairs"
        miniMap(roomIn);
    }
    function gardenRoom() {
        positionsArray = [];
        createPositionArray();
        addMap("sprites/Window.png", 7, 1);
        addMap("sprites/Tree.png", 3, 5);
        addMap("sprites/Tree.png", 4, 5, "an90");
        addMap("sprites/Tree.png", 4, 4, "an180");
        addMap("sprites/Tree.png", 3, 4, "an270");
        addMap("sprites/Bush.png", 3, 8);
        addMap("sprites/Bush.png", 4, 8);
        addMap("sprites/Bush.png", 5, 8);
        addMap("sprites/Bush.png", 6, 8);
        addMap("sprites/Bush.png", 1, 7, "an270");
        addMap("sprites/Bush.png", 1, 6, "an270");
        addMap("sprites/Roses.png", 7, 6);
        addMap("sprites/Roses.png", 8, 4);
        addMap("sprites/Roses.png", 5, 1);
        addMap("sprites/RosesV.png", 8, 7);
        addMap("sprites/Tulip.png", 6, 1);
        addMap("sprites/RosesV.png", 6, 2);
        addMap("sprites/Roses.png", 4, 2);
        addMap("sprites/RosesV.png", 2, 3);
        addMap("sprites/RosesV.png", 4, 1);
        addMap("sprites/Tulip.png", 3, 1);
        addMap("sprites/RosesV.png", 1, 1);
        addMap("sprites/Tulip.png", 2, 1);
        addMap("sprites/Roses.png", 3, 1);
        addMap("sprites/Roses.png", 1, 5);
        addMap("sprites/RosesV.png", 3, 6);
        addMap("sprites/Tulip.png", 5, 7);
        addMap("sprites/Tulip.png", 6, 5);
        addMap("sprites/Roses.png", 5, 5);
        addMap("sprites/Roses.png", 6, 3);
        addMap("sprites/RosesV.png", 8, 3);

        updateMap();
        for (position of positionsArray) {
            document.getElementById(`post${position.x}x-${position.y}y`).classList.toggle("Grass");
        }
        room = itemOnRoomGarden;
        sparkItem();
        roomIn = "Garden"
        miniMap(roomIn);
    }
    function entranceRoom(){
        positionsArray = [];
        createPositionArray();
        addMap("sprites/BookShelfDoor.png", 4, 8);
        addMap("sprites/BookShelf.png", 5, 8);
        addMap("sprites/BookShelf.png", 2, 6);
        addMap("sprites/BookShelf.png", 2, 5);
        addMap("sprites/BookShelf.png", 2, 3);
        addMap("sprites/Drawer.png", 7, 8);
        addMap("sprites/Drawer.png", 8, 8);
        addMap("sprites/NormalDoor.png", 8, 4);
        addMap("sprites/EntranceDoor.png", 4, 1);
        addMap("sprites/EntranceDoor2.png", 5, 1);
        addMap("sprites/BookShelf.png", 2, 4);

        updateMap();
        room = itemOnRoomEntrance;
        sparkItem();
        roomIn = "Entrance"
        miniMap(roomIn);

    }
    function libraryRoom(){
        positionsArray = [];
        createPositionArray();
        addMap("sprites/BookShelf.png", 2, 8);
        addMap("sprites/BookShelf.png", 2, 7);
        addMap("sprites/BookShelf.png", 2, 6);
        addMap("sprites/BookShelf.png", 2, 4);
        addMap("sprites/BookShelf.png", 2, 3);
        addMap("sprites/BookShelf.png", 4, 6);
        addMap("sprites/BookShelf.png", 5, 6);
        addMap("sprites/BookShelf.png", 6, 6);
        addMap("sprites/BookShelf.png", 7, 6);
        addMap("sprites/BookShelf.png", 7, 5);
        addMap("sprites/BookShelf.png", 7, 4);
        addMap("sprites/BookShelf.png", 7, 3);
        addMap("sprites/BookShelf.png", 5, 4);
        addMap("sprites/BookShelf.png", 5, 3);
        addMap("sprites/BookShelf.png", 5, 2);
        addMap("sprites/BookShelf.png", 8, 8);
        addMap("sprites/BookShelf.png", 7, 8);
        addMap("sprites/BookShelf.png", 6, 8);
        addMap("sprites/BookShelf.png", 3, 1);
        addMap("sprites/BookShelf.png", 4, 1);
        addMap("sprites/BookShelf.png", 5, 1);
        addMap("sprites/BookShelf.png", 6, 1);
        addMap("sprites/PurpleDoor.png", 4, 8);
        addMap("sprites/PurpleDoor.png", 4, 8);
        if(CATTTTT == true){
            addMap("sprites/Cat.png", 1, 6);
        }
        updateMap();
        room = itemOnRoomLibrary;
        sparkItem();
        roomIn = "Library"
        miniMap(roomIn);

    }
    function bedroomRoom(){
        positionsArray = [];
        createPositionArray();
        addMap("sprites/Drawer.png", 2, 8);
        addMap("sprites/BookShelf.png", 1, 4);
        addMap("sprites/BookShelf.png", 1, 3);
        addMap("sprites/OrangeDoor.png", 8, 5);
        addMap("sprites/PurpleDoor.png", 4, 1);
        addMap("sprites/BedTop.png", 4, 8);
        addMap("sprites/BedTop.png", 5, 8);
        addMap("sprites/BedMiddle.png", 4, 7);
        addMap("sprites/BedMiddle.png", 5, 7);
        addMap("sprites/BedBottom.png", 4, 6);
        addMap("sprites/BedBottom.png", 5, 6);


        updateMap();
        room = itemOnRoomBedroom;
        sparkItem();
        roomIn = "Bedroom"
        miniMap(roomIn);
    }
    function rocketoRoom(){
        positionsArray = [];
        createPositionArray();



        updateMap();
        changeRocketoPostion(4, 7);
        updateRocketoPostion();

        document.getElementById("post4x-1y").classList.toggle("RedRug");
        document.getElementById("post4x-2y").classList.toggle("RedRug");
        document.getElementById("post4x-3y").classList.toggle("RedRug");
        document.getElementById("post4x-4y").classList.toggle("RedRug");
        document.getElementById("post4x-5y").classList.toggle("RedRug");
        document.getElementById("post4x-6y").classList.toggle("RedRug");
        document.getElementById("post4x-7y").classList.toggle("RedRug");
        document.getElementById("post4x-8y").classList.toggle("RedRug");
        document.getElementById("post5x-1y").classList.toggle("RedRug2");
        document.getElementById("post5x-2y").classList.toggle("RedRug2");
        document.getElementById("post5x-3y").classList.toggle("RedRug2");
        document.getElementById("post5x-4y").classList.toggle("RedRug2");
        document.getElementById("post5x-5y").classList.toggle("RedRug2");
        document.getElementById("post5x-6y").classList.toggle("RedRug2");
        document.getElementById("post5x-7y").classList.toggle("RedRug2");
        document.getElementById("post5x-8y").classList.toggle("RedRug2");

        room = itemOnRoomRocketo;
        sparkItem();
        roomIn = "Rocketo"
        miniMap(roomIn);

    }
    function rocketoFightRoom(){
        positionsArray = [];
        createPositionArray();

        updateMap();
        changeRocketoPostion(4, 7);
        updateRocketoPostion();

        room = itemOnRoomRocketo;
        sparkItem();
        roomIn = "Rocketo"
        miniMap(roomIn);
    }

    // rocketoRoom();
    // movementAllowed = false;
    // changeCharacterPostion(4, 1);
    // updateCharacterPostion();
    // setTimeout(() => {
    //     changeCharacterPostion(4, 1);
    //     updateCharacterPostion();    
    // }, 1000);   
    // setTimeout(() => {
    //     changeCharacterPostion(4, 2);
    //     updateCharacterPostion();    
    // }, 2000);  
    // setTimeout(() => {
    //     changeCharacterPostion(4, 3);
    //     updateCharacterPostion();    
    // }, 3000);  
    // setTimeout(() => {
    //     changeCharacterPostion(4, 4);
    //     updateCharacterPostion();    
    // }, 4000);  
    // setTimeout(() => {
    //     changeCharacterPostion(4, 5);
    //     updateCharacterPostion();    
    // }, 5000);  
    // setTimeout(() => {
    //     number = number + 1;
    //     updateText(number, story);
    //     document.getElementById("textContent").classList.toggle("displayNone");
    //     }, 5500);  

});


