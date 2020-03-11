
/*
    The goal of this exercise is to take a polygon defined by the points 'points', use the mouse
    events to draw a line that will split the polygon and then draw the two split polygons.
    In the start, you'll have the initial polygon (start.png)
    While dragging the mouse, the polygon should be shown along with the line you're drawing (mouseMove.png)
    After letting go of the mouse, the polygon will be split into two along that line (mouseUp.png)

    The code provided here can be used as a starting point using plain-old-Javascript, but it's fine
    to provide a solution using react/angular/vue/etc if you prefer.
*/
const content = document.getElementById("content");
var svgElement;
var splitLine;
let x1, x2, y1, y2


function onMouseDown(event) {

    //Add code here
    splitLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

    splitLine.setAttribute("stroke", "red");
    splitLine.setAttribute('x1', event.x);
    splitLine.setAttribute('y1', event.y);
    splitLine.setAttribute('x2', event.x);
    splitLine.setAttribute('y2', event.y);

    x1= event.x
    y1= event.y

    svgElement.setAttribute('height', "500"); 
    svgElement.setAttribute('width', "500");
    svgElement.setAttribute('style', 'position: absolute;');
    svgElement.setAttribute('fill', 'transparent');
    
    svgElement.appendChild(splitLine);
    content.appendChild(svgElement);
}


function onMouseMove(event) {
    //Add code here
    
    if (splitLine)
    {
        splitLine.setAttribute('x2', event.x);
        splitLine.setAttribute('y2', event.y);

        x2= event.x
        y2= event.y
    }
}

function onMouseUp(event) {
    const poly1 = [];
    const poly2 = [];

    svgElement.removeChild(splitLine);
    var found=0;

    //Generate the two sets of points for the split polygons
    //An algorithm for finding interceptions of two lines can be found in https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

    poly1.push(points[0])

    for(i=0; i<points.length-1; i++) {
        newPoint=intersection(points[i], points[i+1])
        
        if(newPoint){
            poly1.push(newPoint)
            poly2.push(newPoint)
            if(found==0){   
                poly2.push(points[i+1])
            }
            else if(found==1){   
                poly1.push(points[i+1])
            }
            found++}
        else{
            if(found==0||found==2){
                poly1.push(points[i+1])
            }
            else{
                poly2.push(points[i+1])
            }
        }
        if(found!=2 && (i+1)==points.length-1){
            newPoint=intersection(points[points.length-1],points[0])
                poly1.push(newPoint)
                poly2.push(newPoint)
        }
    }
    
        //Clear polygon & create new ones if no errors
        if(poly1.length>2 && poly2.length>2 && 
           poly1[poly1.length-1]!==false && 
           poly2[poly2.length-1]!==false){

            clearPoly();
            addPoly(poly1, 'blue');
            addPoly(poly2, 'green');
        }
}


function intersection(p1, p2){
    x3=p1.x
    y3=p1.y
    x4=p2.x
    y4=p2.y
        x=(((x1*y2-y1*x2)*(x3-x4))-((x1-x2)*(x3*y4-y3*x4)))/(((x1-x2)*(y3-y4))-((y1-y2)*(x3-x4)))
        y=(((x1*y2-y1*x2)*(y3-y4))-((y1-y2)*(x3*y4-y3*x4)))/(((x1-x2)*(y3-y4))-((y1-y2)*(x3-x4)))
    
        if ((x1>=x2 && !(x2<=x && x<=x1)) || (!(x1>=x2) && !(x1<=x && x<=x2)) )
            {return false;}
        if ((y1>=y2 && !(y2<=y && y<=y1)) || (!(y1>=y2) && !(y1<=y && y<=y2)) )
            {return false;}
        if ((x3>=x4 && !(x4<=x && x<=x3)) || (!(x3>=x4) && !(x3<=x && x<=x4)) ) 
            {return false;}
        if ((y3>=y4 && !(y4<=y && y<=y3)) || (!(y3>=y4) && !(y3<=y && y<=y4)) ) 
            {return false;}
    
    return {x: x, y: y}
    }

/*
	Code below this line shouldn't need to be changed
*/

//Draws a polygon from the given points and sets a stroke with the specified color
function addPoly(points, color = 'black') {
    if(points.length < 2) {
        console.error("Not enough points");
        return;
    }
    
    const content = document.getElementById('content');
    
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let path = 'M' + points[0].x + ' ' + points[0].y
    
    for(const point of points) {
        path += ' L' + point.x + ' ' + point.y;
    }
    path += " Z";
    svgPath.setAttribute('d', path);
    svgPath.setAttribute('stroke', color);
    
    svgElement.setAttribute('height', "500"); 
    svgElement.setAttribute('width', "500");
    svgElement.setAttribute('style', 'position: absolute;');
    svgElement.setAttribute('fill', 'transparent');
    
    svgElement.appendChild(svgPath);
    content.appendChild(svgElement);
}

//Clears the all the drawn polygons
function clearPoly() {
    const content = document.getElementById('content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

//Sets the mouse events needed for the exercise
function setup() {
    this.clearPoly();
    this.addPoly(points);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
}

const points = [
    { x : 100, y: 100 },
    { x : 200, y: 50 },
    { x : 300, y: 50 },
    { x : 400, y: 200 },
    { x : 350, y: 250 },
    { x : 200, y: 300 },
    { x : 150, y: 300 },
]

window.onload = () => setup()


























