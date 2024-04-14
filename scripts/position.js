document.addEventListener(`DOMContentLoaded`, () => {

    const gameContent = document.getElementById("gameContent");
    const mapContent = document.getElementById("map");
    const inventoryContent = document.getElementById("inventory");


    let positionsArray = [];

    let characterPosition = { x: 2, y: 2 }; // will change

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
                // document.getElementById(`post${position.x}x-${position.y}y`).classList = ""
                // document.getElementById(`post${position.x}x-${position.y}y`).classList.add(position.rotation);
            }
        }
        gameContent.innerHTML = htmlContentForGameContent + `<div class="displayNone" id="textContent"> </div>`;
    }

    gameContent.innerHTML = htmlContentForGameContent + `<div class="displayNone" id="textContent"> </div>`;

    // do the same for the map ---------------------------------

    positionsArray2 = [];

    for (let i = 3; i >= 1; i--) {
        for (let e = 1; e <= 3; e++) {
            positionsArray2.push(new Position(e, i))
        }
    }
    console.log(positionsArray)

    let htmlContentForMapContent = "";
    console.log(positionsArray)
    for (position of positionsArray2) {
        htmlContentForMapContent = htmlContentForMapContent + `<div id="mapPost${position.x}x-${position.y}y"></div>`
    }
    mapContent.innerHTML = htmlContentForMapContent;

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
                            inventoryArrayImages.push({ img: i.img, desc: i.desc, use: i.use });
                        }
                    }
                    inventoryArray = [];

                    for (let i = 4; i >= 1; i--) {
                        for (let e = 1; e <= 4; e++) {
                            inventoryArray.push(new Item(e, i))
                        }
                    }

                    for (img of inventoryArrayImages) {
                        addInventory(img.img, img.desc, img.use); // yes both
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
                    document.getElementById(`post${characterPosition.x}x-${characterPosition.y}y`).innerHTML = `<img src="detective.png" alt="">`;
                    break
                }
                else {
                    document.getElementById(`post${lastPosition.x}x-${lastPosition.y}y`).innerHTML = ``;
                    sparkItem();
                    document.getElementById(`post${characterPosition.x}x-${characterPosition.y}y`).innerHTML = `<img src="detective.png" alt="">`;
                    lastPosition.x = characterPosition.x;
                    lastPosition.y = characterPosition.y;
                }
            }
        }
    }

    let room = [];
    let itemsOnRoomCar = [{ name: `Red Door`, dx: 2, dy: 8, haveKey: false, next: "Kitchen" }, { name: `Normal Door`, dx: 1, dy: 2, haveKey: false, next: "Gallery" }, { name: `Normal Door`, dx: 1, dy: 7, haveKey: true, next: "GalleryUp" },  { name: `Cat`, x: 2, y: 6, text: "You find a cat, it looks hungry. Do you want to feed him?", textWithCatFood: "You give the cat the cat food, he smiles and jumps into your back. Now he is your new friend.", textIgnore: "You ignore the hungry little cat.", textWithOutCatFood: "The cat attacks you, he doesn't like the food that you given it to him.", option1: "You feed the cat with Cat Food", option2: "You feed the cat with food", option3: "You ignore the cat"}, { name: `Hihidden bookshelf`, x: 1, y: 1, push: true, there: true, text: "You push the bookshelf and find a door behind it" }, { name: `Medical kit`, text: `You open the drawer and you find some Medical Equipment. Seems a little old, you keep it in your inventory.`, desc: `An old Medical Equipment that can be used to restore one point of health.`, x: 7, y: 5, img: "sprites/MedicalKit.png", there: true, use: "Healing" }, { name: `Soup`, text: `On the top of the table you see a soup. You grab it and keep it for later.`, desc: `A beef stew . You can use it to recover stamina.`, x: 2, y: 3, img: "sprites/Soup.png", there: true, use: "Eat" }, { name: `Small key`, text: `You open a box and inside of it you find a small key. It seems to unlock a cabinet.`, desc: `A small key that can fit inside a cabinet.`, x: 6, y: 7, img: "sprites/SmallKey.png", there: true, key: "Red Key" }, { name: `Apple`, text: `You see an apple in a basket. Maybe it can be useful later.`, desc: `An apple. You can use it to recover stamina.`, x: 5, y: 5, img: "sprites/Apple.png", there: true, use: "Eat" }, { name: `Apple`, text: `You see an apple in a basket. Maybe it can be useful later.`, desc: `An apple. You can use it to recover stamina.`, x: 7, y: 7, img: "sprites/Apple.png", there: true, use: "Eat" }, { name: `Red key`, text: `You use the small key to open the cabinet and you find another key. So useful :D. You keep the key in your inventory.`, textWithOutKey: `The key to open this cabinet should be somewhere in this room.`, desc: `A brightness red key. It seems to be big enough to work in a door.`, x: 4, y: 2, img: "sprites/RedKey.png", there: true, haveKey: false, key: "Red Door" }];

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
    let itemOnRoomStatue = [ //remeber all items is the place where the character is when we  interefer but forrr DOOR IS NOT LIKE THAT
        new DoorInRoom(8, 2, "Normal Door", "StorageDown", true),
        new DoorInRoom(8, 7, "Normal Door", "StorageUp", true),

        // new ItemInRoom(3,5, "", "",""),
        // new ItemInRoom(3,5, "", "",""),
        // new ItemInRoom(3,5, "", "",""),
        // new ItemInRoom(3,5, "", "","")
    ]


    function sparkItem() {
        for (item of room) {
            if (Object.keys(item).includes("x") && item.there == true) {
                document.getElementById(`post${item.x}x-${item.y}y`).innerHTML = `<img src="sprites/Spark.png" alt="">`;
            }
        }
    }
    function unlock(name) {
        for (item of room) {
            if (item.name[6] == name[6]) {
                let index = room.indexOf(item);
                room[index].haveKey = true;
            }
        }
    }

    function catSearch(){
        for (item of room) {
            if (characterPosition.x == item.x && characterPosition.y == item.y && item.name == "Cat" ) {
                let itemCopy = item;
                document.addEventListener(`keydown`, (key) => {
                    if(key.key == "f"){
                        document.getElementById("textContent").classList.toggle("displayNone");
                        document.getElementById("textContent").innerHTML = `                  
                        <div id="textLeft">
                          <img src="NarratorIMG" alt="">
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
                                if(inventoryArray[0].img == "sprites/Cat.png"){
                                    document.getElementById("textContent").innerHTML = `                  
                                    <div id="textLeft">
                                      <img src="NarratorIMG" alt="">
                                    </div>
                                    <div id="textRight">
                                      <h2>Narrator</h2>
                                      <p>${itemCopy.textWithCatFood}</p>
                                      <img src="arrow.svg" alt="" id="imgSpark">             
                                    </div>`;
                                    deleteInventory("sprites/Cat.png"); 
                                    startGameForItem();
                                    room.splice(3, 1);
                                    
                                }
                                else{
                                    document.getElementById("textContent").innerHTML = `                  
                                    <div id="textLeft">
                                      <img src="NarratorIMG" alt="">
                                    </div>
                                    <div id="textRight">
                                      <h2>Narrator</h2>
                                      <p>Why did you give a cat cat food if you don't have any? DIE.</p>
                                      <img src="arrow.svg" alt="" id="imgSpark">             
                                    </div>`;
                                    setTimeout(() => {
                                        gameOver();
                                    }, 5000);
                                }
  
                            });
                            document.getElementById("text2").addEventListener(`click`, () => {
                                damage();
                                damage();//is more than one

                                document.getElementById("textContent").innerHTML = `                  
                                <div id="textLeft">
                                  <img src="NarratorIMG" alt="">
                                </div>
                                <div id="textRight">
                                  <h2>Narrator</h2>
                                  <p>${itemCopy.textWithOutCatFood}</p>
                                  <img src="arrow.svg" alt="" id="imgSpark">             
                                </div>`;   
                                console.log("attack")
                                startGameForItem();
        
                            });
                            document.getElementById("text3").addEventListener(`click`, () => {
                                document.getElementById("textContent").innerHTML = `                  
                                <div id="textLeft">
                                  <img src="NarratorIMG" alt="">
                                </div>
                                <div id="textRight">
                                  <h2>Narrator</h2>
                                  <p>${itemCopy.textIgnore}</p>
                                  <img src="arrow.svg" alt="" id="imgSpark">             
                                </div>`;
                                startGameForItem();              
                            });
                        });
                    }
                });
            }
        }
    }

    function searchItems() {
        for (item of room) {
            if (characterPosition.x == item.x && characterPosition.y == item.y) {
                let itemCopy = item;
                let index = room.indexOf(item);
                document.addEventListener(`keydown`, (key) => {
                    if (key.key == "f" && itemCopy.there == true && characterPosition.x == itemCopy.x && characterPosition.y == itemCopy.y) {
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
                        if (Object.keys(itemCopy).includes("push")) {
                            addMap("sprites/Bookshelf.png", 1, 4);
                            itemsOnRoomCar[1].haveKey = true;
                            addMap("sprites/NormalDoor.png", 1, 2);
                            updateMap();
                            updateCharacterPostion();
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
                            startGameForItem();
                            room[index].there = false;
                            return
                        }
                        if (Object.keys(itemCopy).includes("key")) {
                            unlock(itemCopy.key);
                        }
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
                });
            }
        }
    }

    let galleryRep = true;

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
                            break
                        case "Kitchen":
                            console.log("kitchen")
                            break
                    }

                }
            }
            else {

            }
        }
    }
    function touchFire() {
        for (block of positionsArray) {
            if (characterPosition.x == block.x && characterPosition.y == block.y) {
                if (block.block == "sprites/Fire.png") {
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
            itemsOnRoomCar = room; //change depending in the actual room
        });
    };
    function changeCharacterPostion(xCordinate, yCordinate) {
        characterPosition = { x: xCordinate, y: yCordinate };
    }
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
            document.getElementById("health").innerHTML = document.getElementById("health").innerHTML + `<img src="e.png">`
        }
    }
    //game over

    function gameOver() {
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
                }
                break
            case "w":
                if (movementAllowed == false) {
                    break
                }
                characterPosition.y = characterPosition.y + 1;
                if (characterPosition.y == 9) {
                    characterPosition.y = characterPosition.y - 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                    searchItems();
                    catSearch();
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
                }
                break
            case "p": {
                console.log("cats")
                deleteInventory("sprites/Apple.png");
                break
            }
            case "o": {
                healing();
                updateHealth();
                break
            }
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
    // console.log(gameStart);


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

    let number = 0;


    let storyStart = [{ who: "Narrator", text: "The sound of your alarm fills the room as you awake from your slumber." }, { who: "Narrator", text: "You attempt to stop your alarm failing to hit the button multiple times." }, { who: name, text: "If only I weren't blinded in that freak accident back in 1996." }, { who: "Your Phone", text: "Ring Ring." }, { who: name, text: "Hello, who is it?" }, { who: "Guy on the phone", text: "Hello. I am here to tell you about a case but to be sure you're really who you say you are, tell us your name." }, { who: name, text: "I’m your name you can proceed." }, { who: "Guy on the phone", text: "There's some suspicious activity in a mansion down south. We want you to go and be sure that all is okay." }, { who: name, text: "Sorry, I don't really like mansions, my grandma died there a few years ago." }, { who: "Ghost", text: "AAAwaAWWawAAAAA  awawwaaAaAaaAAaa, hellowooow." }, { who: name, text: "G-G-G-Grandma is that you?" }, { who: "Ghost Grandma", text: "OOOooOooOoOoo I am a ghoooooooost now." }, { option1: "AHHh A ghost *grab your axe and you attack your grandma.*", option2: "Grandma You’ve returned YESSSS.", code1: `addAxe`, code2: "" }, { who: "Grandma Ghost", text: "Don't be scared. I am here to help you. You need to accept the mission, that mansion, that mansion is where I died that day. HE IS THERE. YOU NEED TO GO." }, { who: name, text: "*You turn your attention back to the phone* Hello, are you still there?" }, { who: "Guy on the phone", text: "Yes sir, what is going on?" }, { who: name, text: "Nothing, nothing. I changed my mind, I am going there right now." }, { who: "Guy on the phone", text: "Good luck. Bye, bye." }, { who: name, text: "Bye, bye." }, { who: "Narrator", text: "You prepare yourself for the adventure, after talking with your grandma your enthusiasm increases and you want to get there as fast as you can." }, { who: "Narrator", text: "This is your most important mission in your life, you need to know what happened that day at the mansion." }, { who: name, text: "I should probably take something for my adventure ahead.", ifAxe: true }, { option1: "Cat food.", option2: "Flashlight.", code1: `addCatfood`, code2: "addFlashlight" }, { who: "Grandma", text: "Wait, how do you plan to get there?" }, { option1: "*You ask your grandma if she has any idea.*", option2: "*You take the bus*", option3: "*You get to your car*", code1: `Horse`, code2: "Fortuneteller", code3: "Car" }];
    let storyHorse = [{ who: name, text: "I don't know. Do you have an idea? " }, { who: "Grandma", text: "*Suddenly turns into horse*." }, { who: name, text: "Wow, Great idea gran gran." }, { who: "Narrator", text: "You hop on your grandma’s equine form and head to the mansion." }, { who: "Narrator", text: "As your horse grandma pulls into the driveway of the mansion you arrive and immediately rush through the front door with confidence." }, { who: "Narrator", text: "To your surprise no one is there." }, { who: "Narrator", text: "You look around the room and see a small desk in the corner and a small bookshelf to the north as well as a door to the east." }, { who: "Grandma", text: "We have arrived, go search for any clues relating to… suspicious activity. I recommend you to start in the right room. " }, { pause: true }]
    let storyCar = [{ who: name, text: " I am going to take my car, come with me." }, { who: "Narrator", text: "You grab your car keys and start driving hysterically." }, { who: name, text: "Man if only I wasn't blind. Why did I choose the car?" }, { who: "Narrator", text: "You say as you crash into the side of a building. BUMMM!" }, { who: name, text: "Oh no not again I CAN'T GO BACK TO PRISON." }, { who: " Narrator", text: "As you step out of your car you start to realize the room around you. You are in the mansion." }, { who: "Narrator", text: "You seem to be in a room used for storing various foods and supplies and also your car that crashed into the eastern wall." }, { who: "Grandma", text: "Ohoohhh you must find a way out of this room. Rocketo is near. I can feel it." }, { who: name, text: "But grandma, what should I do?" }, { who: "Grandma", text: "Keep going. Find the key to get to the next room. Good luck." }, { pause: true }, { who: "Narrator", text: "You enter a large room with a statue in the middle. There is a bookshelf to the west and three doors." }, { who: "Grandma", text: "Ohoohhh The statue… this is HIM Rocketoo he is the one who started all of this. You must defeat him." }, { who: "Narrator", text: "The statue in front of you is of a tall man with glasses and short black hair. He lovingly holds a chicken in his arms." }, { who: "Grandma", text: "You must find it in the back of the mansion. Keep going." }, { pause: true }, { who: " Narrator", text: "You enter back into the storage room through the back door and notice a cat sitting on the floor." }, { pause: true }]
    let storyFortuneteller = [{ who: name, text: "I am going to take the bus, come with me." }, { who: "Narrator", text: "You run out of your home. You get to the bus station and take the first bus. On the bus, a fortune teller talks with you." }, { who: "Fortune teller", text: `Hello, ${name}.` }, { who: name, text: "Wait, how do you know my detective name?" }, { who: "Fortune teller", text: "I know many things about you. When you venture to this mansion you must go to the back entrance through the garden." }, { who: name, text: "Ok wait who are you" }, { who: "Fortune teller", text: "Rocketo is in the mansion you must find him to complete your gran gran’s mission. He is the one that started all of this." }, { who: "Narrator", text: "You look down for a brief moment  as you look back up the fortune teller is gone." }, { who: "Narrator", text: "As you leave the bus you take the strange lady's advice and hop the fence in the back." }, { who: "Naractor", text: "As you enter the garden you see a large tree in the middle with a window leading into the mansion." }, { who: "Grandma", text: "Maybe you can find a way to break the window." }, { pause: true }]

    let story = storyCar;

    let axe = false;

    function startGame() {
        document.getElementById("textRight").addEventListener(`click`, () => {
            number = number + 1;
            updateText(number, story);
        });
    };

    let firstTime = true;
    function updateText(number, story) {
        console.log(number)
        switch (true) {
            case Object.keys(story[number]).includes("pause"):
                document.getElementById("textContent").classList.toggle("displayNone");
                movementAllowed = true;
                if (firstTime == true) {
                    switch (story) {
                        case storyHorse:
                            changeCharacterPostion(6, 4);
                            updateCharacterPostion();
                            firstTime = false;
                            break
                        case storyCar:
                            changeCharacterPostion(6, 4);
                            storageRoom();
                            updateCharacterPostion();
                            firstTime = false;
                            break
                        case storyFortuneteller:
                            changeCharacterPostion(3, 3);
                            updateCharacterPostion();
                            firstTime = false;
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
                      <img src="sprites/Apple.png" alt="">
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
                document.getElementById("textContent").innerHTML = `                  
                <div id="textLeft">
                  <img src="sprites/Apple.png" alt="">
                </div>
                <div id="textRight">
                  <h2>${story[number].who}</h2>
                  <p>${story[number].text}</p>
                  <img src="arrow.svg" alt="" id="imgSpark">             
                  </div>`;
                startGame();
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

    function optionLoader2(code1, code2) {
        document.getElementById("textLeftO").addEventListener(`click`, () => {

            if (code1 == "addAxe") {
                axe = true;
                addInventory("sprites/Axe.png", "Description");// no use
                UpdateInventory();
            }
            else if (code1 == "addCatfood") {
                addInventory("sprites/Catfood.png", "Description");// no use
                UpdateInventory();
            }
            number = number + 1;
            updateText(number, story);
        });
        document.getElementById("textRightO").addEventListener(`click`, () => {

            if (code2 == "addFlashlight") {
                addInventory("sprites/Flashlight.png", "Description");// no use
                UpdateInventory();
            }
            number = number + 1;
            updateText(number, story);
        });

    };
    function optionLoader3(code1, code2, code3) {
        document.getElementById("text1").addEventListener(`click`, () => {
            number = 0;
            story = storyHorse;
            updateText(number, story);
        });
        document.getElementById("text2").addEventListener(`click`, () => {
            number = 0;
            story = storyFortuneteller;
            updateText(number, story);
        });
        document.getElementById("text3").addEventListener(`click`, () => {
            number = 0;
            story = storyCar;
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
        addMap("sprites/Cat.png", 3, 6);
        if (itemsOnRoomCar[1].haveKey == true) {// do this for the cat
            addMap("sprites/Bookshelf.png", 1, 4);
            addMap("sprites/NormalDoor.png", 1, 2);
        }
        updateMap();
        room = itemsOnRoomCar;
        sparkItem();
    }
    function galleryRoom() {
        positionsArray = [];
        createPositionArray();
        addMap("sprites/NormalDoor.png", 8, 7);
        addMap("sprites/NormalDoor.png", 8, 2);
        addMap("sprites/NormalDoor.png", 1, 4);
        addMap("sprites/Bookshelf.png", 1, 2);
        addMap("sprites/Bookshelf.png", 1, 3);
        updateMap();
        room = itemOnRoomStatue;
        sparkItem();


    }

});


