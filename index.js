const { app, BrowserWindow } = require('electron');

let win;
app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    useContentSize: true,
    backgroundColor: '#000',
  });
  win.setMenu(null);
  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', () => {
    win = null;
  });
});
app.on('window-all-closed', () => {
  app.quit();
});
