document.addEventListener(`DOMContentLoaded`, () => {

    
    const gameContent = document.getElementById("gameContent");


    // a class to generate the position to create each block
    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    let positionsArray = [];
    // creates an array that holds all the positions of the game
    for(let i = 8; i >= 1; i--) {
        for(let e = 1; e <= 8; e++){
            positionsArray.push(new Position(e,i))
        }
    }
    let htmlContentForGameContent = "";
    //create a string with the html content with all the div
    for(position of positionsArray){
        htmlContentForGameContent = htmlContentForGameContent + `<div id="post${position.x}x-${position.y}y"></div>`
    }
    gameContent.innerHTML = htmlContentForGameContent;
    console.log(positionsArray);

    const post2x2y = document.getElementById("post2x-2y");
    post2x2y.innerHTML = `<img src="detective.png" alt="">`;


});
