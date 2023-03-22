"use strict";

function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < 3; i++) 
        {
                for (let j=0; j < 3; j++) 
            { 
                ctx.fillStyle=`rgb(${Math.floor(255 - 85 * i)},${Math.floor( 255 - 85 * j )}, 0)`;
                ctx.fillRect(j * 25, i * 25, 25, 25); 
                ctx.strokeStyle = `rgb(0, ${Math.floor(255 - 85 * i)}, ${Math.floor(255 - 85 * j)})`;
                ctx.beginPath();
                ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
                ctx.stroke();
            }
        }
        ctx.fillStyle = `rgb(60, 60, 60)`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(75, 75);
        ctx.lineTo(75, 0);
        ctx.fill();
    } 
} 
draw();