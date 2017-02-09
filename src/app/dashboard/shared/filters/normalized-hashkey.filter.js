let normalizedHashkeyFilter = ()=> {
    return (input) => input ? input.replace(':', '_') : '';
};


export default normalizedHashkeyFilter;