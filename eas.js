let mouseDown = 0;  
let paletteChoice = "flashy";
let isResetting = false;
let isLoading = false;
let isSaving = false;
const pLoad = document.getElementById("load");

const pUnicorn = document.getElementById("nunicorn");
const pRainbow = document.getElementById("nainbow");
const pEraser = document.getElementById("eraser");


window.onpointerdown = () => 
{  
  ++mouseDown;   
}  

window.onpointerup = () => {  
  mouseDown = 0;  
}


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
    paletteChoice = "black";
})


function saveState()
{
    if (isResetting || isLoading) { return false; }

    isSaving = true;

    enableDisableButtons(false);
    console.log("saving doodle...");
    let lastDrawing = {};

    for(let i = 1; i <= 7100; i++)
    {
        let classes = {...document.getElementById(i).classList};
        lastDrawing[i] = classes;
    }

    localStorage.lastDrawing = JSON.stringify(lastDrawing);

    isSaving = false;
    enableDisableButtons(true);
    console.log("saved doodle!");
}


async function loadState()
{
    if (isSaving || isResetting) { console.log("can't load, saving."); return false;}

    isLoading = true;

    enableDisableButtons(false);

    console.log("loading doodle...");
    let lastDrawing = JSON.parse(localStorage.lastDrawing) ?? {};

    for(let i = 1; i <= 7100; i++)
    {
        var classList = document.getElementById(i).classList;

        classList.remove(classList.item(1));
        classList.add(lastDrawing[i][1]);
    }

    isLoading = false;
    enableDisableButtons(true);
    console.log("loaded doodle!");
}

function enableDisableButtons(enable)
{
    if (enable)
    {
        document.getElementById("reset").disabled = false;
        document.getElementById("save").disabled = false;
        document.getElementById("load").disabled = false;
    }
    else
    {
        document.getElementById("reset").disabled = true;
        document.getElementById("save").disabled = true;
        document.getElementById("load").disabled = true;
    }
}

function resetState()
{
    if (isLoading || isSaving) { return false;}

    enableDisableButtons(false);

    isResetting = true;

    for(let i = 1; i <= 7100; i++)
    {
        var classList = document.getElementById(i).classList;

        classList.remove(classList.item(1));
        classList.remove(classList.item(0));

        classList.add('boxy');
        classList.add('black');
    }

    enableDisableButtons(true);
    isResetting = false;
}

function addEvent(elm)
{
    elm.addEventListener('pointerover', (e) => 
    {
        if (mouseDown > 0)
        {
            e.target.classList.remove("black");
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
        square.classList.add('boxy');
        square.classList.add('black');
        square.draggable = false;
        square.id = (i * 100) + peg;

        pegRow.appendChild(square);
    
        addEvent(square);
    }

    grid.appendChild(pegRow);
}




