var swapArrayElements = function (a, x, y) {
    if (a.length === 1) return a;
    a.splice(y, 1, a.splice(x, 1, a[y])[0]);
    return a;
};

var normaliseHashKey = function (hashKey) {
    return hashKey.replace(':', '_');
};

var removeParent = function (node) {
    if (node._parent) {
        node._parent = undefined;
    }
    if (node.message_blocks) {
        angular.forEach(node.message_blocks, function (child) {
            removeParent(child);
        });
    }
    if (node.template) {
        removeParent(node.template);
    }
};

var removeId = function (node) {
    if (node.id) {
        node.id = undefined;
    }
    if (node.message_blocks) {
        angular.forEach(node.message_blocks, function (child) {
            removeId(child);
        });
    }
    if (node.template && !node.template.is_explicit) {
        removeId(node.template);
    }
};

var addParent = function (node, parent) {
    if (parent) {
        node._parent = parent;
    }
    if (node.message_blocks) {
        angular.forEach(node.message_blocks, function (child) {
            addParent(child, node);
        });
    }
    if (node.template) {
        addParent(node.template);
    }
};

