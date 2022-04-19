const checkBranchCompletion = (branches) => {
  let status = true;
  for (const item of branches) {
    if (item.city === '' || item.name === '' || item.notes === '') {
      status = false;
      break;
    }
  }
  return status;
};

const utils = { checkBranchCompletion };

export default utils;