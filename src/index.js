/**
 * @param {Array} arr 
 * @returns  {Boolean} 当前数组是否可用
 * @example isAbleArray([]) // false
 * @example isAbleArray(null) // false
 * @example isAbleArray(undefined) // false
 * @example isAbleArray([1]) // true
 * @example isAbleArray([1,2]) // true
 */
export const isAbleArray = arr => arr && Array.isArray(arr) && arr.length > 0
/**
 * @param {Object} obj 
 * @returns  {Boolean} 当前对象是否可用
 * @example isAbleObject({}) // false
 * @example isAbleObject(null) // false
 * @example isAbleObject(undefined) // false
 * @example isAbleObject({a:1}) // true
 */
export const isAbleObject = obj => obj && Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0
/**
 * @param {String} str
 * @returns  {Boolean} 当前字符串是否可用
 * @example isAbleString('') // false
 * @example isAbleString(null) // false
 * @example isAbleString(undefined) // false
 * @example isAbleString('1') // true
 */
export const isAbleString = str => str && typeof str === 'string' && str.length > 0
/**
 * @param {Number} num
 * @returns  {Boolean} 当前数字是否可用
 * @description 用于判断数字是否可用
 * @example isAbleNumber(0) // true
 * @example isAbleNumber('') // false
 * @example isAbleNumber(null) // false
 * @example isAbleNumber(undefined) // false
 * @example isAbleNumber(NaN) // false
 * @example isAbleNumber(1) // true
 * @example isAbleNumber(-1) // true
 * @example isAbleNumber(1.1) // true
*/
export const isAbleNumber = num => num && typeof num === 'number' && !isNaN(num)
/** 
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 广度优先遍历、非递归
 */
export const flattenTree = (tree) => {
    if (!isAbleArray(tree))  throw new Error('tree is not a able array or tree is empty');
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
 * @param {Array} flatTreeData 压平的树
 * @param {String} key 要查找的key
 * @param {String | Number} value 要查找的value
 */
export const findTreeByFlatArray = (flatTreeData, key, value) => flatTreeData.find(item => item[key] === value)
/**
 * @param {Array} tree 树数组
 * @param {String} parentId  当前节点的父节点id、这个节点parentId应来来自于点击时候的parentId
 * @returns {Array} 路径
 * @description 记录当前节点的路径id集合
*/
export const savePathIds = (tree, parentId) => {
    if (!isAbleArray(tree)) throw new Error('tree is not a array or arr is empty');
    const treeData = flattenTree(tree);
    let ids = [];
    let parent = treeData.find(item => item.id === parentId);
    while (parent) {
        ids = [parent.id, ...ids];
        parent = treeData.find(item => item.id === parent.parentId);
    }
    return ids;
}
/**
 * @param {Array} tree  树数组(正常树)
 * @param {String} key 要查找的key
 * @param {String | Number} value 要查找的value
 * @return 返回当前节点对象
 * @description 广度优先遍历、非递归
*/
export const findTreeByTreeData = (tree, key, value) => { 
    if (!isAbleArray(tree)) throw new Error('tree is not a array or arr is empty');
    let result = null;
    const treeData = [...tree];
    while (treeData.length > 0) {
        const node = treeData.shift();
        if (node[key] === value) { 
            result = node;
            break;
        }
        if (isAbleArray(node?.children)) {
            treeData.push(...node.children);
        }
    }
    return result;
}
/**
 * 
 * @param {Array} tree 树数组(正常树) 
 * @param {String} key 
 * @param {String | Number} value 
 * @returns {Array} 返回当前节点的所有子节点
 * @description 深度优先遍历、非递归
 * @example findChildrenList([{id:1,children:[{id:2,children:[{id:3}]}]}],'id',1)  [{id:2},{id:3}]
 */
export const findChildrenList = (tree, key,value) => { 
    if (!isAbleArray(tree)) throw new Error('tree is not a array or arr is empty');
    let result = [];
    const treeData = [...tree];
    while (treeData.length > 0) {
        const node = treeData.shift();
        if (node[key] === value) { 
            result = [...flattenTree(node.children)];
            break;
        }
        if (isAbleArray(node?.children)) {
            treeData.unshift(...node.children);
        }
    }
    return result;
}