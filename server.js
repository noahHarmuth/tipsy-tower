var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var io = socketIO(server);
app.set('port', process.env.PORT || 5000);
app.use('/static', express.static(__dirname + '/static'));
app.use('/images', express.static(__dirname + '/static/images'))

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/static', 'index.html'));
});

// Starts the server.
server.listen( process.env.PORT || 5000, function () {
    console.log('Starting server on port 5000');
});
// Add the WebSocket handlers


setInterval(function () {
    io.sockets.emit('message', 'hi!');
}, 1000);
var players = {};
var dPoints = {};
var board = {
    1: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
    },
    2: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
    },
    3: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
    },
    4: {
        1: true,
        2: true,
        3: true,
    },
    5: {
        1: true,
        2: true,
        3: true,
    },
    6: {
        1: true,
        2: true,
        3: true,
    },
    7: {
        1: true,
        2: true,
        3: true,
    },
    8: {
        1: true,
        2: true,
        3: true,
    },
    9: {
        1: true,
        2: true,
        3: true,
    },
    10: {
        1: true,
        2: true,
        3: true,
    },
    11: {
        1: true,
        2: true,
        3: true,
    },
    12: {
        1: true,
        2: true,
        3: true,
    },
    13: {
        1: true,
        2: true,
        3: true,
    },
    14: {
        1: true,
        2: true,
        3: true,
    },
    15: {
        1: true,
        2: true,
        3: true,
    },
    16: {
        1: true,
        2: true,
        3: true,
    },
    17: {
        1: true,
        2: true,
        3: true,
    },
    18: {
        1: true,
        2: true,
        3: true,
    },
}
io.on('connection', function (socket) {
    socket.on('new player', function () {
        console.log("DOPE");
        dPoints[socket.id] = {
            x: 100,
            y: 100,
            red: getRandomInt(255),
            green: getRandomInt(255),
            blue: getRandomInt(255)
        };
    });

    // socket.on('mouse', function (data) {
    //     var dPoint = dPoints[socket.id] || {};
    //     dPoint.x = data.x;
    //     dPoint.y = data.y;
    //     dPoint.pId = socket.id
    //     console.log(dPoints);
    // });
    socket.on('click', function (data) {
        let checkX = Math.ceil(data.x/40);
        let checkY = Math.ceil(data.y/24);
        console.log(`x:${checkX} y:${checkY}`)
        board[checkX][checkY] = false;
    });

});

// setInterval(function () {
//     io.sockets.emit('mouse', dPoints);
// }, 1000 / 60);
setInterval(function () {
    io.sockets.emit('board', board);
}, 1000 / 12);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }