
//two separate windows

const {app, BrowserWindow} = require ("electron");

function createWindows(){
    const {screen} = require ("electron");
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    const win1 = new BrowserWindow({
        width: width/2,
        height: height,
        x: 0,
        y : 0,
    })

    const win2 = new BrowserWindow({
        width: width/2,
        height: height,
        x: width/2,
        y : 0,
    })

    win1.loadURL("https://www.youtube.com");
    win2.loadURL("https://www.google.com");
}

app.whenReady().then(createWindows);