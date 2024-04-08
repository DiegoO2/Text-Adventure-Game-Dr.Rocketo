document.addEventListener(`DOMContentLoaded`, () => {

    const gameContent = document.getElementById("gameContent");
    const mapContent = document.getElementById("map");
    const inventoryContent = document.getElementById("inventory");


    let positionsArray = [];

    let characterPosition = {x : 2, y : 2}; // will change

    let lastPosition = {x : 1, y : 1}; // hi

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
    for(let i = 8; i >= 1; i--) {
        for(let e = 1; e <= 8; e++){
            positionsArray.push(new Position(e,i))
        }
    }
    
    let htmlContentForGameContent = "";
    //create a string with the html content with all the div
    console.log(positionsArray)
    for(position of positionsArray){
        // const `post${position.x}-${position.y} = document.getElementById(`post${position.x}x-${position.y}y`);
        htmlContentForGameContent = htmlContentForGameContent + `<div id="post${position.x}x-${position.y}y"></div>`
    }
    gameContent.innerHTML = htmlContentForGameContent;

    // do the same for the map ---------------------------------

    positionsArray = [];

    for(let i = 3; i >= 1; i--) {
        for(let e = 1; e <= 3; e++){
            positionsArray.push(new Position(e,i))
        }
    }
    console.log(positionsArray)
    
    let htmlContentForMapContent = "";
    console.log(positionsArray)
    for(position of positionsArray){
        htmlContentForMapContent = htmlContentForMapContent + `<div id="mapPost${position.x}x-${position.y}y"></div>`
    }
    mapContent.innerHTML = htmlContentForMapContent;

    // do the same for the inventory ---------------------------------

    positionsArray = [];

    for(let i = 4; i >= 1; i--) {
        for(let e = 1; e <= 4; e++){
            positionsArray.push(new Position(e,i))
        }
    }
    console.log(positionsArray)
    
    let htmlContentForInventoryContent = "";
    console.log(positionsArray)
    for(position of positionsArray){
        htmlContentForInventoryContent = htmlContentForInventoryContent + `<div id="inventoryPost${position.x}x-${position.y}y"></div>`
    }
    inventoryContent.innerHTML = htmlContentForInventoryContent;


    //Updates character postion and deletes the last character position
    function updateCharacterPostion (){
        document.getElementById(`post${lastPosition.x}x-${lastPosition.y}y`).innerHTML = ``;
        document.getElementById(`post${characterPosition.x}x-${characterPosition.y}y`).innerHTML = `<img src="detective.png" alt="">`;
        lastPosition.x = characterPosition.x;
        lastPosition.y = characterPosition.y;
    }

    function wall (){
        console.log("thats a wall")
    }
    function addInventory (id, item){
        document.getElementById(`${id}`).innerHTML = `<img src="${item}" alt="">`
    }
    addInventory("inventoryPost1x-4y", "apple.png");
    //character movement 
    updateCharacterPostion();
    
    document.addEventListener(`keydown`, (key)=>{
        switch(key.key){
            case "s":
                characterPosition.y = characterPosition.y - 1;
                if(characterPosition.y == 0){
                    characterPosition.y = characterPosition.y + 1;
                    wall();
                }
                else{
                    updateCharacterPostion();
                }
                break
            case "w":
                characterPosition.y = characterPosition.y + 1;
                if(characterPosition.y == 9){
                    characterPosition.y = characterPosition.y - 1;
                    wall();
                }
                else{
                    updateCharacterPostion();
                }
                break
            case "d":
                characterPosition.x = characterPosition.x + 1;
                if(characterPosition.x == 9){
                    characterPosition.x = characterPosition.x - 1;
                    wall();
                }
                else{
                    updateCharacterPostion();
                }
                break
            case "a":
                characterPosition.x = characterPosition.x - 1;
                if(characterPosition.x == 0){
                    characterPosition.x = characterPosition.x + 1;
                    wall();
                }
                else{
                    updateCharacterPostion();
                }
                break
            }
    });

    //change to history/map inventory mode

    let mode = map; //I dont know if we need this
    let gameStart = false;

    document.getElementById("button").addEventListener(`click`, ()=>{

        document.getElementById("gameMap").classList.toggle("displayNone");
        document.getElementById("gameInventory").classList.toggle("displayNone");
        document.getElementById("gameTextInput").classList.toggle("displayNone");
        gameStart = true;
    });

    //start part

    document.getElementById("header").classList.toggle("displayNone");
    document.getElementById("main").classList.toggle("displayNone");


    document.getElementById("startButton").addEventListener(`click`, ()=>{

    document.getElementById("header").classList.toggle("displayNone");
    document.getElementById("main").classList.toggle("displayNone");
    document.getElementById("start").classList.toggle("displayNone");

    
    });


    //History start
    console.log(gameStart);
 

    const waitUntil = (condition, checkInterval=100) => {
        return new Promise(resolve => {
            let interval = setInterval(() => {
                if (!condition()) return;
                clearInterval(interval);
                resolve();
            }, checkInterval)
        })
    }
    // await waitUntil(() => gameStart === true)

    console.log("cats");

    

    let name = "Diego";

    let storyCar = [{who: "Narrator", text: "The sound of your alarm fills the room as you awake from your slumber."}, {who: name, text: ""},];


 

    console.log();


});
