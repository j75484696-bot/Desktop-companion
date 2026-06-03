export const IPC_CHANNELS = {
  CHARACTER: {
    UPDATE_STATE: 'character:update-state',
    SET_POSITION: 'character:set-position',
    GET_STATE: 'character:get-state',
  },
  HABIT: {
    CREATE: 'habit:create',
    GET_ALL: 'habit:get-all',
    COMPLETE: 'habit:complete',
    DELETE: 'habit:delete',
  },
  FOCUS: {
    START: 'focus:start',
    STOP: 'focus:stop',
  },
  SYSTEM: {
    MINIMIZE: 'system:minimize',
    CLOSE: 'system:close',
    SHOW: 'system:show',
  },
};
