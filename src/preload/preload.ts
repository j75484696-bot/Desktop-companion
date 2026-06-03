import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPC_CHANNELS } from '@/common/ipc-channels';

const electronAPI = {
  system: {
    minimize: () => ipcRenderer.send(IPC_CHANNELS.SYSTEM.MINIMIZE),
    close: () => ipcRenderer.send(IPC_CHANNELS.SYSTEM.CLOSE),
    show: () => ipcRenderer.send(IPC_CHANNELS.SYSTEM.SHOW),
  },
  character: {
    updateState: (state: any) => ipcRenderer.invoke(IPC_CHANNELS.CHARACTER.UPDATE_STATE, state),
    setPosition: (x: number, y: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.CHARACTER.SET_POSITION, { x, y }),
    getState: () => ipcRenderer.invoke(IPC_CHANNELS.CHARACTER.GET_STATE),
  },
  habit: {
    create: (name: string) => ipcRenderer.invoke(IPC_CHANNELS.HABIT.CREATE, name),
    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.HABIT.GET_ALL),
    complete: (habitId: string) => ipcRenderer.invoke(IPC_CHANNELS.HABIT.COMPLETE, habitId),
  },
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, callback);
  },
  once: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.once(channel, callback);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

declare global {
  interface Window {
    electronAPI: typeof electronAPI;
  }
}
