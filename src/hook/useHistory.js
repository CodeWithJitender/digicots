// history.js
let prevPath = null;

export const getPrevPath = () => prevPath;

export const setPrevPath = (path) => {
  prevPath = path;
};
