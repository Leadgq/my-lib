<h1>swb-lib方法树方法</h1>
<h2>新增 findTreeByFn、findChildrenListByFn </h2>
<h2> findTreeByFn方法接受函数、在函数中根据你返回的结果，决定节点的返回结果、将控制权全部交给你 </h2>
<h2>异常抛出不在使用error、关键点保留报错机制 </h2>

```js
/**
 * @param {Array} arr 
 * @returns  {Boolean} 当前数组是否可用
 * @example isAbleArray([]) // false
 * @example isAbleArray(null) // false
 * @example isAbleArray(undefined) // false
 * @example isAbleArray([1]) // true
 * @example isAbleArray([1,2]) // true
 */
isAbleArray(arr)
```

```js
/**
 * @param {Object} obj 
 * @returns  {Boolean} 当前对象是否可用
 * @example isAbleObject({}) // false
 * @example isAbleObject(null) // false
 * @example isAbleObject(undefined) // false
 * @example isAbleObject({a:1}) // true
 */
isAbleObject(obj);
```

```js


/**
 * @param {String} str 
 * @returns  {Boolean} 当前字符串是否可用
 * @example isAbleString('') // false
 * @example isAbleString(null) // false
 * @example isAbleString(undefined) // false
 * @example isAbleString('1') // true
 */

isAbleString(str);
```

```js
/**
 * @param { Number } num 
 * @returns  {Boolean} 当前数字是否可用
 * @example isAbleNumber(0) // false
 * @example isAbleNumber(null) // false
 * @example isAbleNumber(undefined) // false
 * @example isAbleNumber(1) // true
 */
isAbleNumber(num);
```

```js
/** 
 * @param { Array | Object } tree  树数组或者树对象
 * @returns { Array } 压平的树
 * @description 广度优先遍历、非递归
 * @example flattenTree({id: 1, name: '1', children: [{ id:2 ,name:'2'}]})
 * @returns [{id: 1, name: '1', children: [{ id:2 ,name:'2'}]}, { id:2 ,name:'2'}]
 */
flattenTree(arr)
```

```js
/** 
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 前序遍历 ==> 深度遍历、非递归
 */
flattenTreeByDepth(arr)
```

```js
/** 
 * @param {Array | Object} tree  树数组或者树对象
 * @returns {Array} 压平的树
 * @description 后序遍历 ==> 深度遍历、非递归
 */
flattenTreeByPostOrder(arr)
```

```js
/**
 * @param { Array } tree
 * @description 递归
 * @example flattenTree({id: 1, name: '1', children: [{ id:2 ,name:'2'}]})
 * @returns [{id: 1, name: '1', children: [{ id:2 ,name:'2'}]}, { id:2 ,name:'2'}]
*/
reduceFlattenTree(arr)
```

```js
/**
 * @param {Array} flatTreeData 压平的树
 * @param {String} key 要查找的key
 * @param {String | Number} value 要查找的value
 * @description 返回当前节点对象
 * @example findTreeByFlatArray(flatTreeData, 'id', 5)
 * @returns {id: 5, name: '部门', children: []}
 */
findTreeByFlatArray(flatTreeData, key, value);
```

```js
/**
 * @param {Array} tree 树数组
 * @param {String} parentId  当前节点的父节点id、这个节点parentId应来来自于点击时候的parentId
 * @param showDetail 是否返回当前节点的详细信息
 * @returns {Array} 路径
 * @description 默认情况下记录当前节点的路径id集合 、showDetail为true时候返回当前节点的详细信息
 */
findParent(tree, parentId,showDetail);
```


```js
/**
 * @param {Array} tree  树数组(正常树)
 * @param {String} key 要查找的key
 * @param {String | Number} value 要查找的value
 * @description 返回当前节点对象、 广度优先遍历、非递归
 * @example findTreeByTreeData(tree, 'id', 1)
 * @returns {id: 1, name: '1', children: []}
*/
findTreeByTreeData(tree, key, value);
```

```js
/**
 * @param {Array} tree  树数组(正常树)
 * @param {callback} callback 回调函数
 * @return Array<node>
 * @description 返回节点数
 * @example findTreeByFn([{id:1,children:[{id:2,check:true,children:[{id:3}]}]}],(node)=>{return node.id === 2 && item.check})  [{id:3}]
 */
findTreeByFn(tree,callback);
```

```js
/**
 * @param {Array} tree 树数组(正常树) 
 * @param {String} key 
 * @param {String | Number} value 
 * @returns {Array} 返回当前节点的所有子节点
 * @description 深度优先遍历、非递归
 * @example findChildrenList([{id:1,children:[{id:2,children:[{id:3}]}]}],'id',1)  [{id:2},{id:3}]
 */
findChildrenList(tree, key,value)
```

```js
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
handlerLinkage(treeData, item, indeterminate, checked, rootParentId, key)
```

```js
/**
 * @param {Array} 
 * @param {String} key
 * @returns {Number} 返回数组中key的和
 * @ description 数组中的key所对应的值如果是undefined、null、''、NaN、' '，会先转换为0，然后再相加
 * @example sumArrayValue([{a:1},{a:2},{a:'3'},{a:null}, {a:undefined}],'a') // 6
 */
sumArrayValue(arr, key)
```


```js
/**
* @param {Number} value
* @param {Number} total
* @param {Number} dots 保留小数点位数
* @returns {Number} 返回百分比
* @description 计算百分比
* @example calculatePercentage(1, 2, 2) // 50.00
*/
 calculatePercentage(value, total, dots = 2)
```
