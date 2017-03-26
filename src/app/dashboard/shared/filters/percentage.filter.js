let percentageFilter = ($filter) => {
    'ngInject';

    return (input, decimals = 2) => {
        if (isNaN(input)) {
            return 'N/A';
        }
        return $filter('number')(input * 100, decimals) + '%';
    };
};

export default percentageFilter;