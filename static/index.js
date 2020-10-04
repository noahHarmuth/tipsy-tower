var soocket;
var pId;
let bg;

let width;
let height;
let length;
function preload() {
    width = 40;
    height = 24;
    length = 120;
}
function setup() {
    socket = io.connect();
    socket.on('connect', function () {
        pId = socket.id;
    })
    createCanvas(1200, 1200);
    strokeWeight(1);
    stroke(51);
    fill("#E8BA75");
    for (let index = 0; index < 3; index++) {
        for (let yy = 0; yy < 18; yy++) {
            if (yy % 2 === 1) {
                rect(0, (yy) * (height), length, height);
            } else {
                rect(index * width, yy * height, width, height);
            }
        }
    }
    for (let index = 0; index < 3; index++) {
        for (let yy = 0; yy < 18; yy++) {
            if (yy % 2 === 0) {
                rect(180, (yy) * (height), length, height);
            } else {
                rect(index * width + 180, yy * height, width, height);
            }
        }
    }

    socket.emit('new player');
    // socket.on('mouse',
    //     function (data) {
    //         console.log(data);
    //         // Draw a blue circle
    //         //clear();
    //         //background(bg);
    //         Object.keys(data).forEach(element => {
    //             fill(data[element].red, data[element].green, data[element].blue);
    //         noStroke();
    //         ellipse(data[element].x, data[element].y, 20, 20);
    //         });
    //         // fill(data[pId].red, data[pId].green, data[pId].blue);
    //         // noStroke();
    //         // ellipse(data[pId].x, data[pId].y, 20, 20);
    //     }
    // );
    socket.on('board', function (data) {
        console.log(data);

        for (let index = 0; index < 3; index++) {
            for (let yy = 0; yy < 18; yy++) {
                if (yy % 2 === 1) {
                    strokeWeight(1);
                    stroke(51);
                    fill("#E8BA75");
                    rect(0, (yy) * (height), length, height);
                } else if (!data[index + 1][yy + 1]) {
                    strokeWeight(1);
                    fill(255);
                    stroke(255);
                    rect(index * width, yy * height, width, height);
                }
            }
        }
        // for (let index = 0; index < 3; index++) {
        //     for (let yy = 0; yy < 18; yy++) {
        //         if (yy % 2 === 0) {
        //             rect(180, (yy) * (height), length, height);
        //         } else {
        //             rect(index * width + 180, yy * height, width, height);
        //         }
        //     }
        // }
    });

}
function draw() {

}
// function mouseMoved() {
//     // Make a little object with mouseX and mouseY
//     let data = {
//         x: mouseX,
//         y: mouseY
//     };
//     // Send that object to the socket
//     socket.emit('mouse', data);
// }
function mouseClicked() {
    let data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('click', data);
}