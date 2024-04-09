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
        }
    }
    // creates an array that holds all the positions of the game
    for (let i = 8; i >= 1; i--) {
        for (let e = 1; e <= 8; e++) {
            positionsArray.push(new Position(e, i))
        }
    }

    let htmlContentForGameContent = "";
    //create a string with the html content with all the div
    console.log(positionsArray)
    for (position of positionsArray) {
        // const `post${position.x}-${position.y} = document.getElementById(`post${position.x}x-${position.y}y`);
        htmlContentForGameContent = htmlContentForGameContent + `<div id="post${position.x}x-${position.y}y"></div>`
    }
    gameContent.innerHTML = htmlContentForGameContent + `<div class="displayNone" id="textContent"> </div>`;

    // do the same for the map ---------------------------------

    positionsArray = [];

    for (let i = 3; i >= 1; i--) {
        for (let e = 1; e <= 3; e++) {
            positionsArray.push(new Position(e, i))
        }
    }
    console.log(positionsArray)

    let htmlContentForMapContent = "";
    console.log(positionsArray)
    for (position of positionsArray) {
        htmlContentForMapContent = htmlContentForMapContent + `<div id="mapPost${position.x}x-${position.y}y"></div>`
    }
    mapContent.innerHTML = htmlContentForMapContent;

    // do the same for the inventory ---------------------------------

    positionsArray = [];

    for (let i = 4; i >= 1; i--) {
        for (let e = 1; e <= 4; e++) {
            positionsArray.push(new Position(e, i))
        }
    }
    console.log(positionsArray)

    let htmlContentForInventoryContent = "";
    console.log(positionsArray)
    for (position of positionsArray) {
        htmlContentForInventoryContent = htmlContentForInventoryContent + `<div id="inventoryPost${position.x}x-${position.y}y"></div>`
    }
    inventoryContent.innerHTML = htmlContentForInventoryContent;


    //Updates character postion and deletes the last character position
    function updateCharacterPostion() {
        document.getElementById(`post${lastPosition.x}x-${lastPosition.y}y`).innerHTML = ``;
        document.getElementById(`post${characterPosition.x}x-${characterPosition.y}y`).innerHTML = `<img src="detective.png" alt="">`;
        lastPosition.x = characterPosition.x;
        lastPosition.y = characterPosition.y;
    }

    function wall() {
        console.log("thats a wall")
    }
    function addInventory(id, item) {
        document.getElementById(`${id}`).innerHTML = `<img src="${item}" alt="">`
    }
    addInventory("inventoryPost1x-4y", "apple.png");
    //character movement 
    updateCharacterPostion();

    document.addEventListener(`keydown`, (key) => {
        switch (key.key) {
            case "s":
                characterPosition.y = characterPosition.y - 1;
                if (characterPosition.y == 0) {
                    characterPosition.y = characterPosition.y + 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                }
                break
            case "w":
                characterPosition.y = characterPosition.y + 1;
                if (characterPosition.y == 9) {
                    characterPosition.y = characterPosition.y - 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                }
                break
            case "d":
                characterPosition.x = characterPosition.x + 1;
                if (characterPosition.x == 9) {
                    characterPosition.x = characterPosition.x - 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                }
                break
            case "a":
                characterPosition.x = characterPosition.x - 1;
                if (characterPosition.x == 0) {
                    characterPosition.x = characterPosition.x + 1;
                    wall();
                }
                else {
                    updateCharacterPostion();
                }
                break
        }
    });

    //change to history/map inventory mode

    let mode = map; //I dont know if we need this
    let gameStart = false;

    document.getElementById("button").addEventListener(`click`, () => {

        document.getElementById("gameMap").classList.toggle("displayNone");
        document.getElementById("gameInventory").classList.toggle("displayNone");
        document.getElementById("gameTextInput").classList.toggle("displayNone");
        gameStart = true;
    });

    //start part

    document.getElementById("header").classList.toggle("displayNone");
    document.getElementById("main").classList.toggle("displayNone");


    document.getElementById("startButton").addEventListener(`click`, () => {

        document.getElementById("header").classList.toggle("displayNone");
        document.getElementById("main").classList.toggle("displayNone");
        document.getElementById("start").classList.toggle("displayNone");


        document.getElementById("textContent").classList.toggle("displayNone");
        updateText(0);
        startGame();

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
    let storyCar = [{ who: "Narrator", text: "The sound of your alarm fills the room as you awake from your slumber." }, { who: "Narrator", text: "You attempt to stop your alarm failing to hit the button multiple times." }, { who: name, text: "If only I weren't blinded in that freak accident back in 1996." }, { who: "Your Phone", text: "Ring Ring." }, { who: name, text: "Hello, who is it?" }, { who: "Guy on the phone", text: "Hello. I am here to tell you about a case but to be sure you're really who you say you are, tell us your name." }, { who: name, text: "I’m your name you can proceed." }, { who: "Guy on the phone", text: "There's some suspicious activity in a mansion down south. We want you to go and be sure that all is okay." }, { who: name, text: "Sorry, I don't really like mansions, my grandma died there a few years ago." }, { who: "Ghost", text: "AAAwaAWWawAAAAA  awawwaaAaAaaAAaa, hellowooow." }, { who: name, text: "G-G-G-Grandma is that you?" }, { who: "Ghost Grandma", text: "OOOooOooOoOoo I am a ghoooooooost now." }, { option1: "AHHh A ghost *grab your axe and you attack your grandma.*", option2: "Grandma You’ve returned YESSSS.", code1: `addAxe`, code2: "" }, { who: "Grandma Ghost", text: "Don't be scared. I am here to help you. You need to accept the mission, that mansion, that mansion is where I died that day. HE IS THERE. YOU NEED TO GO." }, { who: name, text: "*You turn your attention back to the phone* Hello, are you still there?" }, { who: "Guy on the phone", text: "Yes sir, what is going on?" }, { who: name, text: "Nothing, nothing. I changed my mind, I am going there right now." }, { who: "Guy on the phone", text: "Good luck. Bye, bye." }, { who: name, text: "Bye, bye." }, { who: "Narrator", text: "You prepare yourself for the adventure, after talking with your grandma your enthusiasm increases and you want to get there as fast as you can. This is your most important mission in your life, you need to know what happened that day at the mansion." }, { who: name, text: "I should probably take something for my adventure ahead." }, { option1: "Cat food.", option2: "Flashlight.", code1: `addCatfood`, code2: "addFlashlight", ifAxe: true }, { who: "Grandma", text: "Wait, how do you plan to get there?" }, { option1: "I don't know. Do you have an idea?", option2: " I am going to take my car, come with me.", option3: "I am going to take the bus, come with me.", code1: `Horse`, code2: "Car", code3: "Fortuneteller" }];
    let axe = false;
    function startGame() {



        document.getElementById("textRight").addEventListener(`click`, () => {
            console.log(number);
            number = number + 1;
            updateText(number);
            console.log(number);

        });


    };


    function updateText(number) {

        switch (true) {
            case Object.keys(storyCar[number]).includes("who"):
                document.getElementById("textContent").innerHTML = `                  
                <div id="textLeft">
                  <img src="apple.png" alt="">
                </div>
                <div id="textRight">
                  <h2>${storyCar[number].who}</h2>
                  <p>${storyCar[number].text}</p>
                </div>`;
                startGame();
                break
            case Object.keys(storyCar[number]).includes("option3"):
                document.getElementById("textContent").innerHTML = `  
                <h2 id="optionH2">Choose one option:</h2>             
                <div id="text1">
                <p>${storyCar[number].option1}</p>
    
                </div>
                <div id="text2">
                <p>${storyCar[number].option2}</p>
                </div>
                <div id="text3">
                <p>${storyCar[number].option3}</p>
                </div>`;
                optionLoader3(storyCar[number].code1, storyCar[number].code2, storyCar[number].code3);
                break

            case Object.keys(storyCar[number]).includes("ifAxe"):
                console.log("cats")
                if (storyCar[number].ifAxe == true) {
                    number = number + 1;
                    updateText(number);
                }
                else {
                    optionLoader(storyCar[number].code1, storyCar[number].code2);
                }
                break
            case Object.keys(storyCar[number]).includes("option1"):
                document.getElementById("textContent").innerHTML = `  
                <h2 id="optionH2">Choose one option:</h2>             
                <div id="textLeftO">
                <p>${storyCar[number].option1}</p>
    
                </div>
                <div id="textRightO">
                <p>${storyCar[number].option2}</p>
                </div>`;
                optionLoader2(storyCar[number].code1, storyCar[number].code2);
                break
        }

        // if(Object.keys(storyCar[number]).includes("who")){
        //     document.getElementById("textContent").innerHTML = `                  
        //     <div id="textLeft">
        //       <img src="apple.png" alt="">
        //     </div>
        //   <div id="textRight">
        //       <h2>${storyCar[number].who}</h2>
        //       <p>${storyCar[number].text}</p>
        //   </div>`;
        //   startGame();
        // }
        // else if (Object.keys(storyCar[number]).includes("ifAxe")){
        //     if(storyCar[number].ifAxe == true){
        //         number = number + 1;
        //         updateText(number);
        //     }
        //     else{
        //         optionLoader(storyCar[number].code1, storyCar[number].code2);
        //     }
        // }
        // else if(Object.keys(storyCar[number]).includes("option1")){
        //     document.getElementById("textContent").innerHTML = `  
        //     <h2 id="optionH2">Choose one option:</h2>             
        //     <div id="textLeftO">
        //     <p>${storyCar[number].option1}</p>

        //     </div>
        //   <div id="textRightO">
        //   <p>${storyCar[number].option2}</p>
        //   </div>`;
        //   optionLoader(storyCar[number].code1, storyCar[number].code2);
        // }

    };
    function optionLoader2(code1, code2) {
        document.getElementById("textLeftO").addEventListener(`click`, () => {

            if (code1 == "addAxe") {
                console.log("code1")
                axe = true;
            }
            else if (code1 == "addCatfood") {
                console.log("catfood")
            }
            number = number + 1;
            updateText(number);
        });
        document.getElementById("textRightO").addEventListener(`click`, () => {

            if (code1 == "addFlashlight") {
                console.log("code1")
            }
            number = number + 1;
            updateText(number);
        });

    }
    function optionLoader3(code1, code2, code3) {
        document.getElementById("textLeftO").addEventListener(`click`, () => {

            if (code1 == "addAxe") {
                console.log("code1")
                axe = true;
            }
            else if (code1 == "addCatfood") {
                console.log("catfood")
            }
            number = number + 1;
            updateText(number);
        });
        document.getElementById("textRightO").addEventListener(`click`, () => {

            if (code1 == "addFlashlight") {
                console.log("code1")
            }
            number = number + 1;
            updateText(number);
        });
        document.getElementById("textRightO").addEventListener(`click`, () => {

            if (code1 == "addFlashlight") {
                console.log("code1")
            }
            number = number + 1;
            updateText(number);
        });

    }

});



