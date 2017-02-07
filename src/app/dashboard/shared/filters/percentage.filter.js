let percentageFilter = ($filter) => {
    'ngInject';

    return (input, decimals) => {
        if (isNaN(input)) {
            return 'N/A';
        }
        decimals = decimals || 2;
        return $filter('number')(input * 100, decimals) + '%';
    };
};

export default percentageFilter;