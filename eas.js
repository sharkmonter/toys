let mouseDown = 0;  
let paletteChoice = "flashy";

window.onmousedown = () => 
{  
  ++mouseDown;   
}  

window.onmouseup = () => {  
  mouseDown = 0;  
}

const pUnicorn = document.getElementById("nunicorn");
const pRainbow = document.getElementById("nainbow");

pUnicorn.addEventListener('click', (e) =>
{
    paletteChoice = "flashy";
});

pRainbow.addEventListener('click', (e) =>
{
    paletteChoice = "rainbow";
});


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

document.body.appendChild(grid);


for (i = 0; i < 20000; i++)
{
    let square = document.createElement('div');
    square.classList.add('square');
    square.classList.add('boxy');
    grid.appendChild(square);

    addEvent(square);
}




