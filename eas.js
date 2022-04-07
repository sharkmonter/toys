let mouseDown = 0;  
let paletteChoice = "flashy";
const pLoad = document.getElementById("load");

window.onpointerdown = () => 
{  
  ++mouseDown;   
}  

window.onpointerup = () => {  
  mouseDown = 0;  
}

window.ondragstart = () => {
    mouseDown = 0;  
}

const pUnicorn = document.getElementById("nunicorn");
const pRainbow = document.getElementById("nainbow");
const pEraser = document.getElementById("eraser");

pUnicorn.addEventListener('click', (e) =>
{
    paletteChoice = "flashy";
});

pRainbow.addEventListener('click', (e) =>
{
    paletteChoice = "rainbow";
});

pEraser.addEventListener('click', (e) =>
{
    paletteChoice = "square";
})


function saveState()
{
    console.log("saving doodle...");
    let lastDrawing = {};

    for(let i = 1; i <= 7100; i++)
    {
        let classes = document.getElementById(i).classList;
        lastDrawing[i] = classes;
    }

    localStorage.lastDrawing = JSON.stringify(lastDrawing);
    console.log("saved doodle!");
}


async function loadState()
{
    console.log("loading doodle...");
    let lastDrawing = JSON.parse(localStorage.lastDrawing) ?? {};

    for(let i = 1; i <= 7100; i++)
    {
        document.getElementById(i).classList.remove("square");
        document.getElementById(i).classList.remove("rainbow");
        document.getElementById(i).classList.remove("flashy");

        if (lastDrawing[i][1] != 'boxy')
        {
            document.getElementById(i).classList.add(lastDrawing[i][1]);
            await new Promise(r => setTimeout(r, 2));
        }
        else
        {
            document.getElementById(i).classList.add("square");
            document.getElementById(i).classList.add('boxy'); 
        }
    }
    console.log("loaded doodle!");
}

function resetState()
{

    for(let i = 1; i <= 7100; i++)
    {
        document.getElementById(i).classList = {};
        document.getElementById(i).classList.add('square');
        document.getElementById(i).classList.add('boxy');
    }
}

function addEvent(elm)
{
    elm.addEventListener('pointerover', (e) => 
    {
        if (mouseDown > 0)
        {
            e.target.classList.remove("square");
            e.target.classList.remove("rainbow");
            e.target.classList.remove("flashy");
            e.target.classList.add(paletteChoice);
        }
    });
}

// Create a grid element
const grid = document.createElement('div');
grid.classList.add('grid');
grid.draggable = false;

document.getElementById("gridtainer").appendChild(grid);


for (i = 0; i <= 70; i++)
{
    let pegRow = document.createElement('div');
    pegRow.classList.add('pegRow');
    pegRow.draggable = false;
    
    for(let peg = 1; peg <= 100; peg++)
    {
        let square = document.createElement('div');
        square.classList.add('square');
        square.classList.add('boxy');
        square.draggable = false;
        square.id = (i * 100) + peg;

        pegRow.appendChild(square);
    
        addEvent(square);
    }

    grid.appendChild(pegRow);
}




