export const notReady = e => e === undefined;
export const notExist = e => e === null;
export const avail = e => !notReady(e) && !notExist(e);
export const notAvail = e => !avail(e);
