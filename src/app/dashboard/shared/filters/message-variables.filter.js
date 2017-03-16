let messageVariables = () => input => {
    return input.replace(/({{first_name}}|{{last_name}}|{{full_name}})/g, '<span class="blue" ng-non-bindable>$1</span>');
};

export default messageVariables;