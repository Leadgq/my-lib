export const isAbleArray = arr => arr && Array.isArray(arr) && arr.length > 0
export const isAbleObject = obj => obj && Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0
export const isAbleString = str => str && typeof str === 'string' && str.length > 0
export const isAbleNumber = num => num && typeof num === 'number' && !isNaN(num)
/** 
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 广度优先遍历、非递归
 */
export const flattenTree = (tree) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        throw new Error('tree is not a array or object');
    }
    const result = [];
    const queue = isAbleObject(tree) ? [tree] : [...tree];
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        if (isAbleArray(node?.children)) {
            queue.push(...node.children);
        }
    }
    return result;
}
/**
 * @param {Array} tree
 * @description 递归
 * @returns {Array} 压平的树
*/
export const reduceFlattenTree = (tree) => {
    return tree.reduce((prev, cur) => {
        return isAbleArray(cur?.children) ? prev.concat(cur, reduceFlattenTree(cur.children)) : prev.concat(cur)
    }, [])
}
/**
 * @param {Array} flatTree 压平的树
 * @param {String} key 要查找的key
 * @param {String | Number} value 要查找的value
 */
export const findTree = (flatTreeData, key, value) => flatTreeData.find(item => item[key] === value)
/**
 * @param {Array} tree 树数组
 * @param {String} parentId  当前节点的父节点id、这个节点parentId应来来自于点击时候的parentId
 * @returns {Array} 路径
 * @description 记录当前节点的路径
*/
export const savePath = (tree, parentId) => {
    if (!isAbleArray(tree)) throw new Error('tree is not a array');
    const treeData = flattenTree(tree);
    let ids = [];
    let parent = treeData.find(item => item.id === parentId);
    while (parent) {
        ids = [parent.id, ...ids];
        parent = treeData.find(item => item.id === parent.parentId);
    }
    return ids;
}