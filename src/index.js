/**
 * @param {Array} arr
 * @returns  {Boolean} 当前数组是否可用
 * @example isAbleArray([]) // false
 * @example isAbleArray(null) // false
 * @example isAbleArray(undefined) // false
 * @example isAbleArray([1]) // true
 * @example isAbleArray([1,2]) // true
 */
export const isAbleArray = arr => Array.isArray(arr) && arr.length > 0
/**
 * @param {Object} obj
 * @returns  {Boolean} 当前对象是否可用
 * @example isAbleObject({}) // false
 * @example isAbleObject(null) // false
 * @example isAbleObject(undefined) // false
 * @example isAbleObject({a:1}) // true
 */
export const isAbleObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0
/**
 * @param {String} str
 * @returns  {Boolean} 当前字符串是否可用
 * @example isAbleString('') // false
 * @example isAbleString(null) // false
 * @example isAbleString(undefined) // false
 * @example isAbleString('1') // true
 */
export const isAbleString = str => typeof str === 'string' && str.length > 0
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
export const isAbleNumber = num => typeof num === 'number' && !isNaN(num)
/**
 * @param {Number} num
 * @returns  {Number} 修正后的数字
 * @description 用于修正数字
 * @example reviseNumber(0) // 0
 * @example reviseNumber('') // 0
 * @example reviseNumber(null) // 0
 * @example reviseNumber(undefined) // 0
*/
export const reviseNumber = num => {
    if (!num) return 0;
    return num;
}
/**
 * @param {String} str
 * @returns  {Number} 转换后的数字
 *  @description 用于转换字符串为数字
 * @example stringToNumber('') // 0
 * @example stringToNumber(null) // 0
 * @example stringToNumber(undefined) // 0
 * @example stringToNumber('1') // 1
 */
export const stringToNumber = (str) => {
    if (!str) return 0
    return Number(str);
}
/**
 * @param fn
 * @return {boolean}
 */
export const isAbleFn = fn => typeof fn === 'function'

export const numberIsNaN = num => isNaN(num) ? 0 : num

/**
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 前序遍历 ==> 广度优先遍历、非递归
 */
export const flattenTree = (tree) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('tree is not a able array or a object or tree is empty');
        return [];
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
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 前序遍历 ==> 深度遍历、非递归
 */
export const flattenTreeByDepth = (tree) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('tree is not a able array or a object or tree is empty');
        return [];
    }
    const result = [];
    const queue = isAbleObject(tree) ? [tree] : [...tree];
    while (queue.length > 0) {
        const node = queue.pop();
        result.push(node);
        if (isAbleArray(node?.children)) {
            queue.push(...node.children);
        }
    }
    return result;
}
/**
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 后序遍历、非递归
 */
export const flattenTreeByPostOrder = (tree) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('tree is not a able array or a object or tree is empty');
        return [];
    }
    const stack = isAbleObject(tree) ? [tree] : [...tree];
    let result = []
    while (stack.length > 0) {
        const node = stack.pop();
        result.unshift(node)
        if (node.children) {
            stack.push(...node.children)
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
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('tree is not a able array or a object or tree is empty');
        return [];
    }
    const  treeData = isAbleObject(tree) ? [tree] : [...tree];
    return treeData.reduce((prev, cur) => {
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
 * @param {Boolean} showDetail 是否返回当前节点的详细信息
 * @returns {Array} 路径
 * @description 默认情况下记录当前节点的路径id集合 、showDetail为true时候返回当前节点的详细信息
 */
export const findParent = (tree, parentId, showDetail = false) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn(`tree  is not a array or arr is empty`);
        return [];
    }
    if(!parentId) throw new Error( `parentId is not a able value`);
    const treeData = flattenTree(tree);
    let container = [];
    let parent = treeData.find(item => item.id === parentId);
    while (parent) {
        showDetail ? container = [parent, ...container] : container = [parent.id, ...container];
        parent = treeData.find(item => item.id === parent.parentId);
    }
    return container;
}
/**
 * @param {Array} tree  树数组(正常树)
 * @param {String} key 要查找的key
 * @param {String | Number} value 要查找的value
 * @return 返回当前节点对象
 * @description 广度优先遍历、非递归
 * @example [{id:1,children:[{id:2}] }] findTreeByTreeData(tree,'id',2) ==> {id:2}
*/
export const findTreeByTreeData = (tree, key, value) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('tree is not a array or arr is empty');
        return null;
    }
    let result = null;
    const treeData = isAbleObject(tree) ? [tree] : [...tree];
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
 * @param {Array} tree  树数组(正常树)
 * @param {function(*): boolean} callback 回调函数
 * @return Array<node>
 * @description 返回节点数组
 * @example [{id:1,children:[{id:2}]}]
 * @example findTreeByFn(tree,(node)=>node.id === 2) ==> [{id:2}]
 */
export const findTreeByFn = (tree, callback) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
         console.warn('tree is not a able array or tree is empty');
         return [];
    }
    if (!callback || !isAbleFn(callback)) throw new Error(` ${callback} is not a function`);
    const queue = isAbleObject(tree) ? [tree] : [...tree];
    const result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        if (callback(node)) result.push(node);
        if (isAbleArray(node?.children)) {
            queue.push(...node.children);
        }
    }
    return result;
}
/**
 * @param {Array} tree 树数组(正常树)
 * @param {String} key
 * @param {String | Number} value
 * @param {Boolean} showDetail 是否返回当前节点的详细信息 默认true
 * @returns {Array} 返回当前节点的所有子节点
 * @description 深度优先遍历、非递归
 * @example findChildrenList([{id:1,children:[{id:2,children:[{id:3}]}]}],'id',1)  [{id:2},{id:3}]
 */
export const findChildrenList = (tree, key, value, showDetail = true) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('current node is not a able array or tree is empty or not children')
        return [];
    }
    if (!isAbleString(key)) {
        console.warn('key is not a able value');
        return [];
    }
    if (!value && value !==0 ) {
        console.warn('value is not a able value');
        return [];
    }
   return findChildListResult({ tree, key, value,showDetail });
}
/**
 * @param {Array} tree 树数组(正常树)
 * @param {callBack} callBack 回调函数
 * @description 深度优先遍历、非递归
 * @example findChildrenListByFn(tree, (item) =>  item.check === false && (item.key === '1'))
 * @returns {Array} 返回当前节点的所有子节点
 */
export const findChildrenListByFn = (tree, callBack) => {
    if (!isAbleArray(tree) && !isAbleObject(tree)) {
        console.warn('current node is not a able array or tree is empty or not children')
        return [];
    }
    if (!isAbleFn(callBack)) {
        console.warn('callBack is not a able function');
        return [];
    }
    return findChildListResult({ tree, callBack });
}
const findChildListResult = ({tree, key, value, callBack, showDetail = true}) => {
    let result = [];
    const treeData = isAbleObject(tree) ? [tree] : [...tree];
    while (treeData.length > 0) {
        const node = treeData.shift();
        if (key && value) {
            if (node[key] === value && isAbleArray(node?.children)) {
                if (showDetail) {
                    result = [...flattenTree(node.children)];
                } else {
                    result = flattenTree(node.children).map(item => item[key]);
                }
                break;
            }
        } else if (callBack) {
            if (callBack(node) && isAbleArray(node?.children)) result = [...flattenTree(node.children)];
        }
        if (isAbleArray(node?.children)) treeData.unshift(...node.children);
    }
    return result;
}
/**
 * @description 用于处理联动
 * @param {Array} tree 树数组(正常树)
 * @param {Object} item 当前节点
 * @param {string} indeterminate 你的半选状态的key
 * @param {string} checked 你的选中状态的key
 * @param {string | undefined | null } rootId 根节点的parentId
 * @param {string} key 你的唯一标识key
 * @description rootParentId 用于判断当前节点是否是根节点
 * @detail 一棵树必须包含主键（id）、parentId、children三个字段 否则无法使用
 */
export const handlerLinkage = (treeData, item, indeterminate, checked, rootParentId, key) => {
    if (!isAbleArray(treeData)) throw new Error('treeData is not a array or treeData is empty');
    if (!isAbleObject(item)) throw new Error('item is not a object or item is empty');
    if (!isAbleString(indeterminate)) throw new Error('indeterminate is not a string or indeterminate is empty');
    if (!isAbleString(checked)) throw new Error('checked is not a string or checked is empty');
    if (!isAbleString(key)) throw new Error('key is not a string or key is empty');
    // 无子节点、并且不是根节点
    if (!isAbleArray(item.children) && item.parentId) {
        handlerParentTreeNodeState(treeData, item, indeterminate, checked, key);
    } else if (item.parentId !== rootParentId && isAbleArray(item.children)) {
        // 如果不是根节点
        handlerAllChildrenNode(treeData, item, indeterminate, checked, key);
        handlerParentTreeNodeState(treeData, item, indeterminate, checked, key);
    } else if (item.parentId === rootParentId && isAbleArray(item.children)) {
        // 如果是根节点
        handlerAllChildrenNode(treeData, item, indeterminate, checked, key);
    }
}
// 处理所有子节点
const handlerAllChildrenNode = (treeData, item, indeterminate, checked, key) => {
    item[indeterminate] = false;
    const childrenList = findChildrenList(treeData, key, item[key]);
    childrenList.forEach(tree => {
        if (tree[indeterminate]) tree[indeterminate] = false;
        tree[checked] = item[checked];
    });
}
// 处理父节点
const handlerParentTreeNodeState = (treeData, item, indeterminate, checked, key) => {
    let parentNodes = findParent(treeData, item.parentId, true).sort((a, b) => b[key] - a[key]);
    if (isAbleArray(parentNodes)) {
        parentNodes.forEach(item => {
            const childrenNode = findChildrenList(treeData, key, item[key]);
            const state = childrenNode.every(tree => tree[checked]);
            const indeterminateState = childrenNode.some(tree => tree[checked]);
            if (indeterminateState) {
                item[checked] = false;
                item[indeterminate] = true;
            }
            //  如果全部选择
            if (state) {
                item[indeterminate] = false;
                item[checked] = true;
            }
            // 如果一个没选
            if (!indeterminateState && !state) {
                item[indeterminate] = false;
                item[checked] = false;
            }
        });
    }
}
const deps = (obj, path, target, key) => {
    let result = '';
    function dfs(obj, path, target, key) {
        if (!obj) return;
        if (obj[key] === target) {
            path += obj[key];
            result += path;
            return;
        }
        path += obj[key] + '->';
        obj.children && obj.children.forEach((ele) => {
            dfs(ele, path, target, key);
        })
    }
    dfs(obj, path, target, key)
    if (result) return result;
}
/**
 * @param {Array} treeArray 树数组(正常树)
 * @param {string} target  节点的值
 * @param {string} key 你的唯一标识key
 * @param {boolean} showDetail 是否显示路径的详细信息
 * @description  递归
 * @example findPath([{a:1,children:[{a:2,children:[{a:3}]}]}],3,'a') => [1,2]
 * @example findPath([{a:1,children:[{a:2,children:[{a:3}]}]}],3,'a',true) => [{a:1},{a:2}]
 * @returns {Array} 返回路径
 */
export const findPath = (treeArray, target, key,showDetail) => {
    if (!isAbleArray(treeArray)) {
        console.warn('treeArray is not a array or treeArray is empty');
        return;
    }
    let res = '';
    for (const ele of treeArray) {
        res = deps(ele, '', target, key);
        if (res)  break;
    }
    //  处理结果
    if (res) {
        let middle = res.split('->');
        const length = middle.length;
        if (length === 1) {
            res = middle[0];
        } else {
            middle.pop();
            res = middle;
        }
        if (showDetail) {
            res = findTreeByFn(treeArray, (item) => res.includes(item[key]))
        }
    } else {
        res = '没有找到该节点';
    }
    return res;
}

/**
 *
 * @param {Object} node
 * @returns {Boolean}
 * @description 返回当前节点在树中是否是父节点
 */
export const isParentNode = (node) => {
    if (!isAbleObject(node)) {
        console.warn(`${node} is not a object`);
        return false;
    }
    const isHaveChildrenList = node.children && node.children.length > 0;
    return !!isHaveChildrenList;
}
/**
 * @param {Array | Object}  treeData
 * @param {Object} node
 * @param { String } key
 * @returns {Boolean}
 * @description 返回当前节点在树中是否是子节点
 */
export const isChildNode = (treeData,node,key) => {
    if (!isAbleArray(treeData) && !isAbleObject(treeData)) { 
        console.warn(`${treeData} is not a array or ${treeData} is empty`);
        return false;
    }
    const tree = isAbleObject(treeData) ? [treeData] : [...treeData];
    const isParentListOrRoot = findPath(tree, node[key], key);
    // 如果根节点、返回的是字符串
    const isRoot = isAbleString(isParentListOrRoot)
    const isHaveChildrenList = node.children && node.children.length > 0;
    if (isRoot) { 
        return false;
    }
    if (isHaveChildrenList || isParentListOrRoot) { 
        return true;
    }
}
/**
 * @param {Array}
 * @param {String} key
 * @returns {Number} 返回数组中key的和
 * @description 数组中的key所对应的值如果是undefined、null、''、NaN、' '，会先转换为0，然后再相加
 * @example sumArrayValue([{a:1},{a:2},{a:'3'},{a:null}, {a:undefined}],'a') // 6
 */
export const sumArrayValue = (arr, key) => {
    if (!isAbleArray(arr)) throw new Error(`${arr} is not a array or arr is empty`);
    let data = [...arr];
    // 如果数组中有字符串，先转换为数字
    let flag = data.some(item => isAbleString(item[key]));
    if (flag) {
        data.forEach(item => item[key] = stringToNumber(item[key]));
        // 判断是否都是数字
        const isSum = data.every(item => isAbleNumber(item[key]));
        // 如果不是数字，抛出错误
        if (!isSum) throw new Error('key is not a able sum key');
    }
    return data.reduce((prev, cur) => prev + reviseNumber(cur[key]), 0);
}
/**
* @param {Number} value
* @param {Number} total
* @param {Number} dots 保留小数点位数
* @returns {Number} 返回百分比
* @description 计算百分比
* @example calculatePercentage(1, 2, 2) // 50.00
*/
export const calculatePercentage = (value, total, dots = 2) => {
    if (!value) value = reviseNumber(value);
    if (!total) total = reviseNumber(total);
    if (isAbleString(value)) value = stringToNumber(value);
    if (isAbleString(total)) total = stringToNumber(total);
    if (total === 0) { 
        if (dots > 0) {
            // 根据dot的位数，在后面补0
            return '0.'.padEnd(dots + 2, '0');
        } else { 
            return '0';
        }
    }
    if (!isAbleNumber(value) || !isAbleNumber(total)) throw new Error('value or total is not a able number or  a  able string');
    return parseInt(value / total * 100).toFixed(dots);
}
/**
 * @param {Array} queue
 * @param {number} controlCount
 * @returns {Promise} 返回整个队列的最终结果
 */
export const controlNetWorkConcurrency = (queue, controlCount = 2) => {
    let result = [];
    if (!isAbleArray(queue)) {
        throw new Error('queue not able  array or queue is empty');
    }
    return new Promise((resolve) => {
        let index = 0;
        let finishCount = 0;
        if (queue.length === 0) {
            resolve(result);
            return;
        }

        function _run() {
            const task = queue[index];
            index++;
            task.then((res) => {
                finishCount++;
                result.push(res);
                if (index < queue.length) {
                    _run();
                } else if (finishCount === queue.length) {
                    resolve(result);
                }
            })
        }

        for (let i = 0; i < queue.length && i < controlCount; i++) {
            _run();
        }
    })
}
const rad = (d) => {
    return d * Math.PI / 180.0;
}
/**
 * @param {Array} from [lat1:纬度 , lng1:经度]
 * @param {Array} to   [lat2:维度, lng2:经度]
 * @example getDistance([38.8626430801, 121.5300857178],[38.831994, 121.502954])
 * @returns 返回两个经纬度之前的距离,单位m
 */
export const getDistance = (from,to) => {
    if (!isAbleArray(from) || !isAbleArray(to)) {
        throw new Error("from or to is not able array");
    }
    let lat1 = stringToNumber(from[0]);
    let lng1 = stringToNumber(from[1]);
    let lat2 = stringToNumber(to[0]);
    let lng2 = stringToNumber(to[1]);
    const EARTH_RADIUS = 6378.137;
    let radLat1 = rad(lat1);
    let radLat2 = rad(lat2);
    let a = radLat1 - radLat2;
    let b = rad(lng1) - rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = (s * 10000) / 10;
    return Math.round(s);
}