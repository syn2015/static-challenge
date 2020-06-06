/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  // match() 方法检索返回一个字符串匹配正则表达式的的结果。
  // 如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
  // 如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
