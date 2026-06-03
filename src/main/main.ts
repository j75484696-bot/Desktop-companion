import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { Logger } from '@/common/logger';

const logger = new Logger('Main');
let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../renderer/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  logger.log('Window created');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('system:show', () => {
  if (mainWindow) mainWindow.show();
});

ipcMain.on('system:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('system:close', () => {
  if (mainWindow) mainWindow.close();
});

logger.log('Electron initialized');
