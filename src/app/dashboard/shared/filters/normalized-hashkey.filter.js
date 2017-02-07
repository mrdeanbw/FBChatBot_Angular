/**
 * For jquery selectors
 * @param input {string}
 * @returns {string}
 */
let normalizedHashkeyFilter = ()=> {
    return (input) => input.replace(':', '_');
};


export default normalizedHashkeyFilter;