const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isMac = process.platform === "darwin";
let mainWindow;
let todoWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
});
//When varable closed, assign it to null to reclaim ram


const template = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click: () => {
          todoWindow = new BrowserWindow({
            webPreferences: {
              nodeIntegration: true
            },
            width: 300,
            height: 200
          });
          todoWindow.loadURL(`file://${__dirname}/todo.html`);
        }
      },
      {
        label: "Clear Todo",
        click: () => {
          mainWindow.webContents.send('clear', 'clear message send');
          console.log('clear message send');
        }
      },
      {
        role: "quit"

      }
    ]
  },
  {
    label: "Developer",
    submenu: [{
      role: "toggledevtools"

    }]
  }
]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

ipcMain.on('message', (event, message) => {
  console.log('received in main');
  console.log(message);
  mainWindow.webContents.send('message2', message);
  todoWindow.close();
  todoWindow = null;
  console.log('send to main html');

})