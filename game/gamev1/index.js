const board = document.querySelector('main');
const me = document.getElementById("me");
const BASE_READINESS = 1000;
const READY_POWERUP = 2;

let pos = 1;
let food = 0;
let counter = 0;
let time = 30;
let isNomming = true;
let nomClock;
let muffining;
let readiness = 0;

let soReady = BASE_READINESS;

function makeBoard()
{
    const cols = 10;
    const rows = 10;

    food = Math.floor(Math.random() * cols * rows) + 1;

    board.innerHTML = "";
    document.getElementById("fullTimer").innerHTML =
    'Nom time remaining: <span id="time">Go! Go! Go!</span>';

    document.getElementById("counter").textContent = 0;

    showReadiness();

    for (let row = 0; row < rows; row++)
    {
        let elmRow = document.createElement('div');
        elmRow.classList.add("rowContainer");
        board.appendChild(elmRow);
        
        for (let col = 0; col < cols; col++)
        {
            let id = (row * 10) + (col + 1);

            let elmCol = document.createElement('div');

            elmCol.classList.add("tile");
            elmCol.id = id;

            if (id == pos) { 
                characterStand(elmCol)
            }

            if (id == food) { 
                elmCol.classList.add('hasFood');
            }


            elmRow.appendChild(elmCol);
        }
    }

}

document.addEventListener('keydown', (event) =>
{  
    if(!isNomming) { return; };

    let curElm = document.getElementById(pos);

    let newPos = 0;

    if (event.key == "ArrowRight")
    {
        newPos = pos + 1;

        if (newPos % 10 == 1) {return;}
    }
    else if (event.key == "ArrowLeft")
    {
        newPos = pos - 1;

        if (newPos % 10 == 0) {return;}
    }
    else if (event.key == "ArrowUp")
    {
        newPos = pos - 10;
    }
    else if (event.key == "ArrowDown")
    {
        newPos = pos + 10;
    }

    if (newPos >= 1 && newPos <= 100)
    {
        pos = newPos;

        let nextElm = document.getElementById(pos);

        curElm.classList.remove('hasCharacter');
    
        characterStand(nextElm);
    }
});

//jakim & Okeanos - funk the bits

async function flipChar()
{
    clearTimeout(muffining);
    muffining = setTimeout(() => 
            {document.getElementById(pos).classList.toggle('flipX'); flipChar()}, 
        soReady);
}

function updateCounter()
{
    document.getElementById("counter")
        .textContent = `${++counter}`;
}

function characterStand(elm)
{
    elm.classList.add('hasCharacter');

    if (pos == food)
    {
        //soReady -= reddy * 100;

        document.getElementById(pos).classList.remove('hasFood');

        food = Math.floor(Math.random() * 10 * 10) + 1;
        updateCounter();

        let newReady = Math.floor(counter/READY_POWERUP);

        if (newReady > readiness)
        {
            soReady = BASE_READINESS - (newReady * 100);

            if (soReady < 100)
            {
                soReady = 100;
            }

            readiness = newReady;
            showReadiness();
        }
        document.getElementById(food).classList.add('hasFood');
    }

}

async function timer()
{
    clearTimeout(nomClock);

    nomClock = setTimeout(() => 
            {
                document.getElementById("time").textContent = --time; 

                if (time > 0)
                {
                    timer();
                }
                else
                {
                    document.getElementById("fullTimer").textContent = "Time's up!";
                    isNomming = false;

                    setAllTime();
                }
            }, 1000);
}

function setAllTime()
{
    
    if (localStorage.allTime == undefined || localStorage.allTime < counter)
    {
        localStorage.allTime = counter;
        document.getElementById("allTime").textContent = counter;
    }
}

function getAllTime()
{
    document.getElementById("allTime").textContent = localStorage.allTime;
}

function showReadiness()
{
    document.getElementById("readiness").textContent = readiness;
}

function goAgain()
{
    pos = 1;
    food = 0;
    counter = 0;
    time = 30;
    isNomming = true;
    soReady = 1000;
    readiness = 0;


    makeBoard();
    getAllTime();
    showReadiness();
    flipChar();
    timer(); 
}

goAgain();

