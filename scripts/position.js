document.addEventListener(`DOMContentLoaded`, () => {

    const gameContent = document.getElementById("gameContent");

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

    //put an image in a cordenate
    const post2x2y = document.getElementById("post2x-2y");

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
});
