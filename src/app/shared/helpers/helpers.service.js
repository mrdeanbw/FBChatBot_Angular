class AppHelpers {
    
    deleteFromArray(array, item) {
        let index = array.indexOf(item);
        if (index != -1) {
            array.splice(index, 1);
        }
    };
    
    insertIntoArray(array, index, item){
        array.splice(index, 0, item);
    }

    swapArrayElements(array, i, j) {
        if (array.length === 1) return array;
        array.splice(j, 1, array.splice(i, 1, array[j])[0]);
        return array;
    };

}

export default AppHelpers;