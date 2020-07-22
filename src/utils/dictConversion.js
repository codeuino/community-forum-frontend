
function converttodict(data) {
  return data.reduce((a, x) => ({ ...a, [x._id]: x }), {});
}


  export default converttodict;