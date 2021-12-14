// Узел двоичного дерева
const TreeNode = function (value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
};


function arrayToTree(array) {
    if (!Array.isArray(array) || array.length < 1)
        return null;

    const reducer = (prev, current) => {

    }

    return new TreeNode(0); // TODO: implementation 
};





//####################################################################################
const array = [17, 0, -4, 3, 15];
console.log(arrayToTree(array));