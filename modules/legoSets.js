const setData = require("../data/setData");
const themeData = require("../data/themeData");
let sets = [];

// Function to initialize the sets array
function initialize() 
{  
  return new Promise((resolve, reject) => {
    try {
      setData.forEach(set => {
        const objThem = themeData.find(theme => theme.id === set.theme_id);
        if (objThem) {
          const nS = { ...set, theme: objThem.name };
          sets.push(nS);
        }
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

// Function to get all sets
function getAllSets() {
  return new Promise((resolve, reject) => 
  {
    try {
      resolve(sets);
    } catch (err) {
      reject(err);
    }
  });
}

// Function to get a set by set_num
function getSetByNum(setNum) 
{
  return new Promise((resolve, reject) => 
  {
    try {
      const setBuild = sets.find(set => set.set_num === setNum);
      if (setBuild) 
      {
        resolve(setBuild);
      } 
      else 
      {
        reject(`Unable to find set with set_num: ${setNum}`);
      }
    } catch (err) {
      reject(err);
    }
  });
}
function getSetsByTheme(theme) 
{
  return new Promise((resolve, reject) => 
  {
    try 
    {
      const caseLo = theme.toLowerCase();
      const sameSet = sets.filter(set => set.theme.toLowerCase().includes(caseLo));
      resolve(sameSet);
    }
     catch (err) 
    {
      reject(err);
    }
  });
}
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
initialize()
  .then(() => 
  {
    return getAllSets();
  })
  .then(setList => 
    {
    console.log("All Sets:", setList);
    return getSetByNum("001-1");
  })    
  .then(uniqSet => 
    {
    console.log("Specific Set:", uniqSet);
    return getSetsByTheme("tech");
  })
  .then(setThem => 
    {
    console.log("Sets by Theme:", setThem);
  })
  .catch(err => 
    {
    console.log("error:", err);
  });