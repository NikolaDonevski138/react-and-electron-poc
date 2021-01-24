const path = require("path");

const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const isDev = require("electron-is-dev");


let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });


  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );


  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

function showNotification (text) {
  const notification = {
    title:'Notification about your blog post',
    body: `${text}`
  }

  new Notification(notification).show()

}


app.whenReady().then(() => {
  createWindow();

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`));
  }
});

ipcMain.on('catch_main',(event,arg) => {
  console.log('here 001',arg)
})

ipcMain.on("close_me",(evt,arg) => {
  app.quit()
})




ipcMain.on("send_message",(evt,arg) => {
  showNotification(arg)
})


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

