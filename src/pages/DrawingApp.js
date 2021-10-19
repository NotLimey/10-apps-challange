import React, {useState, useEffect, useRef} from 'react'
import '../scss/drawingApp.scss';

const DrawingApp = () => {
    const [Color, setColor] = useState()
    const [PencilSize, setPencilSize] = useState(10)
    const ctx = useRef();

    var canvas;
    var drawingboard;
    var start = 0;
    var end = Math.PI * 2;
    var dragging = false;

    useEffect(() => {
        ctx.current = canvas.getContext('2d');
        
        canvas.width = drawingboard.offsetWidth;
        canvas.height = drawingboard.offsetHeight;

        canvas.addEventListener('mousedown', engage);
        canvas.addEventListener('mousemove', putPoint);
        document.addEventListener('mouseup', disengage);
    }, [])

    useEffect(() => {
        ctx.current.lineWidth = PencilSize * 2;
    }, [Color, PencilSize])


    var putPoint = function(e){
        if(dragging){
            ctx.current.lineTo(e.offsetX, e.offsetY);
            ctx.current.stroke();
            ctx.current.beginPath();
            ctx.current.arc(e.offsetX, e.offsetY, PencilSize / 42, start, end);
            ctx.current.fill();
            ctx.current.stroke();
            ctx.current.beginPath();
            ctx.current.moveTo(e.offsetX, e.offsetY);
        }
    }

    var engage = function(e){
        dragging = true;
        putPoint(e);
    }

    var disengage = function(){
        dragging = false;
        ctx.current.beginPath();
    }

    const ChangeColor = (color) => {
        setColor(color);
        ctx.current.strokeStyle = color;
        ctx.current.fillStyle = color;
    }

    const ClearCanvas = () => {
        canvas.width = drawingboard.offsetWidth;
        canvas.height = drawingboard.offsetHeight;
        ctx.current.clearRect(0, 0, canvas.width, canvas.height);
        ctx.current.lineWidth = PencilSize * 2;
        ctx.current.strokeStyle = Color;
        ctx.current.fillStyle = Color;
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
                <div ref={drawingboardElement => drawingboard = drawingboardElement} id="drawing-board" className="drawing-board">
                    <canvas ref={canvasElement => canvas = canvasElement} id="canvas" style={{display: 'block'}}>
                        Sorry, your browser is rubbish.
                    </canvas>
                </div>
            </div>
        </div>
        
    )
}

export default DrawingApp;