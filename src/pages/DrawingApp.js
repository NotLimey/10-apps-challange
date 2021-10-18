import React, {useState, useEffect} from 'react'
import '../scss/drawingApp.scss';

const DrawingApp = () => {
    const [Color, setColor] = useState('green')
    const [PencilSize, setPencilSize] = useState(10)

    var canvas;
    var ctx;
    var start = 0;
    var end = Math.PI * 2;
    var dragging = false;
    var drawingboard;
    useEffect(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        drawingboard = window.document.getElementById('drawing-board')
        
        canvas.width = drawingboard.offsetWidth;
        canvas.height = drawingboard.offsetHeight;


        canvas.addEventListener('mousedown', engage);
        canvas.addEventListener('mousemove', putPoint);
        canvas.addEventListener('mouseup', disengage);
    }, [])

    useEffect(() => {
        console.log(PencilSize);
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = Color;
        ctx.fillStyle = Color;
        ctx.lineWidth = PencilSize * 2;
        canvas.addEventListener('mousedown', engage);
        canvas.addEventListener('mousemove', putPoint);
        canvas.addEventListener('mouseup', disengage);
    }, [Color, PencilSize])

    var putPoint = function(e){
        if(dragging){
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, PencilSize, start, end);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }
    }

    var engage = function(e){
        ctx.strokeStyle = Color;
        dragging = true;
        putPoint(e);
    }

    var disengage = function(){
        dragging = false;
        ctx.beginPath();
    }

    const ChangeColor = (color) => {
        console.log('Changed color to: ' + color)
        setColor(color);
    }

    const ClearCanvas = () => {
        drawingboard = window.document.getElementById('drawing-board')
        
        canvas.width = drawingboard.offsetWidth;
        canvas.height = drawingboard.offsetHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = PencilSize * 2;
        ctx.strokeStyle = Color;
        ctx.fillStyle = Color;
    }

    return (
        <div>
            <div className="drawing-board-colors">
                <div className="drawing-clrs">
                    <button style={{backgroundColor: 'red'}} onClick={() => ChangeColor('red')}></button>
                    <button style={{backgroundColor: '#fb8500'}} onClick={() => ChangeColor('#fb8500')}></button>
                    <button style={{backgroundColor: '#7f4f24'}} onClick={() => ChangeColor('#7f4f24')}></button>
                    <button style={{backgroundColor: '#ffd60a'}} onClick={() => ChangeColor('#ffd60a')}></button>
                    <button style={{backgroundColor: '#7cb518'}} onClick={() => ChangeColor('#7cb518')}></button>
                    <button style={{backgroundColor: '#56cfe1'}} onClick={() => ChangeColor('#56cfe1')}></button>
                    <button style={{backgroundColor: '#0077b6'}} onClick={() => ChangeColor('#0077b6')}></button>
                    <button style={{backgroundColor: '#7b2cbf'}} onClick={() => ChangeColor('#7b2cbf')}></button>
                    <button style={{backgroundColor: '#ff5d8f'}} onClick={() => ChangeColor('#ff5d8f')}></button>
                </div>
                <div className="drawing-clrs">
                    <button style={{backgroundColor: '#f8f9fa'}} onClick={() => ChangeColor('#f8f9fa')}></button>
                    <button style={{backgroundColor: '#e9ecef'}} onClick={() => ChangeColor('#e9ecef')}></button>
                    <button style={{backgroundColor: '#dee2e6'}} onClick={() => ChangeColor('#dee2e6')}></button>
                    <button style={{backgroundColor: '#ced4da'}} onClick={() => ChangeColor('#ced4da')}></button>
                    <button style={{backgroundColor: '#adb5bd'}} onClick={() => ChangeColor('#adb5bd')}></button>
                    <button style={{backgroundColor: '#495057'}} onClick={() => ChangeColor('#495057')}></button>
                    <button style={{backgroundColor: '#343a40'}} onClick={() => ChangeColor('#343a40')}></button>
                    <button style={{backgroundColor: '#212529'}} onClick={() => ChangeColor('#212529')}></button>
                    <button style={{backgroundColor: 'black'}} onClick={() => ChangeColor('black')}></button>
                </div>
                <div className="drawing-clrs">
                    <button style={{backgroundColor: '#fff'}} onClick={() => ChangeColor('#fff')}>Eraser</button>
                    <button className="clear-canvas" onClick={ClearCanvas}>Clear Canvas</button>
                </div>
                <div>
                    <input type="range" defaultValue={PencilSize} min="0" max="100" onChange={e => setPencilSize(e.target.value)} />
                </div>
            </div>
            <div class="drawing-board-container">
                <div id="drawing-board" className="drawing-board">
                    <canvas id="canvas" style={{display: 'block'}}>
                        Sorry, your browser is rubbish.
                    </canvas>
                </div>
            </div>
        </div>
        
    )
}

export default DrawingApp;