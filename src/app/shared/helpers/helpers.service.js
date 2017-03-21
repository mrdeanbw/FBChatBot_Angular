class AppHelpers {

    deleteFromArray(array, item) {
        let index = array.indexOf(item);
        if (index != -1) {
            array.splice(index, 1);
        }
    };

    insertIntoArray(array, index, item) {
        array.splice(index, 0, item);
    }

    swapArrayElements(array, i, j) {
        if (array.length === 1) return array;
        array.splice(j, 1, array.splice(i, 1, array[j])[0]);
        return array;
    };

    tablize(arr, colCount = 3) {
        let ret = [];
        let row = [];
        for (let i = 0; i < arr.length; i++) {
            if (i % colCount == 0) {
                if (row.length) {
                    ret.push(row);
                }
                row = [];
            }
            row.push(arr[i]);
        }
        if (row.length) {
            ret.push(row);
        }
        return ret;
    }
}

export default AppHelpers;