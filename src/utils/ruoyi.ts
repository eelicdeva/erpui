/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 * 日期格式化
 * @const parseTime = (time: string | number | Date, pattern: string) => {	
 * ...return const formatObj = { y, m, d, h,	i, s, a }   }
 * @const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string, key: string) => {...return time_str;}
 * //||表单重置
 * @function resetForm(this: any, refName) {}: void
 * //||添加日期范围
 * @function addDateRange(params, dateRange, propName) {...return search}
 * //|| 回显数据字典
 * @function selectDictLabel(datas: { [x: string]: { label: any; }; }, value: string | undefined){...returns }
 * @return "" | true | actions.push(value) | actions.join('')
 * // ||回显数据字典（字符串数组）
 * @function selectDictLabels(datas, value, separator) { ...returns }
 * @return "" | actions.join('').substring(0, actions.join('').length - 1)
 * // || 字符串格式化(%s )
 * @function sprintf(str) {...returns '' | arg |  flag ? str : '' } 
 * str: string ||转换字符串，undefined,null等转化为""
 * // ||转换字符串，undefined,null等转化为""
 * @function parseStrEmpty(str: string | undefined | null): string {}
 * //||数据合并
 * @function mergeRecursive(source, target) { ...return source}
 * //||构造树型结构数据
 * @function handleTree(data, id, parentId, children) {...return tree}
 * //||参数处理
 * @function tansParams(params: { [x: string]: any }){...return result}
 * //||返回项目路径
 * @function getNormalPath(p: string ) { ...return res}
 * //||验证是否为blob格式
 * @const blobValidate = async (data: any )=> { ...return boolean }
 */

/**
 * 日期格式化
 *
 * @param {string} time 日期
 * @param {string} pattern 格式化类型
 * @returns
 */
 export const parseTime = (time: string | number | Date, pattern: string) => {
	if (!time) {
		return null;
	}
	const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
	let date;
	if (typeof time === "object") {
		date = time;
	} else {
		if (typeof time === "string" && /^[0-9]+$/.test(time)) {
			time = parseInt(time);
		} else if (typeof time === "string") {
			time = time.replace(new RegExp(/-/gm), "/");
		}
		// prettier-ignore
		if (typeof time === "number" && time.toString().length === 10) {
            time = time * 1000;
        }
		date = new Date(time);
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	};
	// prettier-ignore
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string, key: string) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value || 0;
    });
	return time_str;
};

// ||to-do check resetForm no need to use in typescript 表单重置 
export function resetForm(this, refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// to-do check any ||添加日期范围
export function addDateRange(params: any, dateRange: any[], propName?: string) {
  let search = params;
  search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof (propName) === 'undefined') {
    search.params['beginTime'] = dateRange[0];
    search.params['endTime'] = dateRange[1];
  } else {
    search.params['begin' + propName] = dateRange[0];
    search.params['end' + propName] = dateRange[1];
  }
  return search;
}

// ||回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return "";
  }
  var actions = [] as string[];
  Object.keys(datas).some((key) => {
    if (datas[key].value == ('' + value)) {
      actions.push(datas[key].label);
      return true;
    }
  })
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join('');
}

// to-do not yet use?
// ||回显数据字典（字符串数组）
export function selectDictLabels( datas, value: string | undefined, separator: undefined ) {
  //debugger
  if (value === undefined || value.length ===0) {
    return "";
  }
  if (Array.isArray(value)) {
    value = value.join(",");
  }
  var actions = [] as string[];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false;
    Object.keys(datas).some((key) => {
      if (datas[key].value == ('' + temp[val])) {
        actions.push(datas[key].label + currentSeparator);
        match = true;
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator);
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1);
}

// ||字符串格式化(%s )
export function sprintf(str: string) {
  var args = arguments, flag = true, i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 
/**
 * @function str: string | undefined | null => str: string ||转换字符串，undefined,null等转化为""
 * @param  {string|undefined|null} str;
 * @return str: string;
 */
export function parseStrEmpty(str: string | number | number[] | undefined | null): string {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str.toString();
}

// 数据合并
export function mergeRecursive(source: { [x: string]: any; }, target: { [x: string]: any; }) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p]);
      } else {
        source[p] = target[p];
      }
    } catch (e) {
      source[p] = target[p];
    }
  }
  return source;
};

/**
 * 构造树型结构数据
 * @param {Object[]} data 数据源
 * @param {string} id id字段 默认 'id'
 * @param {string} parentId 父节点字段 默认 'parentId'
 * @param {string} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: Object[], id: string, parentId?:string, children?: string) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [] as Object[];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: Object) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params: { [x: string]: any }) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}


// ||返回项目路径
/**
 * @param  {string} p
 * @return string: '' | p.replace('//', '/')
 */
export function getNormalPath(p: string ): string {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  };
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res;
}


// 验证是否为blob格式

export const blobValidate = async (data: any )=> {
  let isBlob = false;
  try {
    const text = await data.text();
    JSON.parse(text);
    return isBlob;
  } catch (error) {
    isBlob = true;
  }
    return isBlob;
}