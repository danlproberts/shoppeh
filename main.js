'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 720,
        width: 1280
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
