function addEvent(elm)
{
    elm.addEventListener('mouseover', (e) => 
    {
        let red = Math.floor(Math.random() * 250 + 0);
        let green = Math.floor(Math.random() * 250 + 0);
        let blue = Math.floor(Math.random() * 250 + 0);

        e.target.classList.remove("square");
        e.target.classList.add("flashy");
    });
}

// Create a grid element
const grid = document.createElement('div');
grid.classList.add('grid');

document.body.appendChild(grid);


for (i = 0; i < 30000; i++)
{
    let square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);

    addEvent(square);
}




