
/**
 * 获取Url参数值
 * @param {String} url 
 * @param {String} paramKey 
 * @returns {String} new url
 */
function _getUrlQueryString(url, paramKey) {
  let urlObj = new URL(url);
  var reg = new RegExp("(^|&)" + paramKey + "=([^&]*)(&|$)", "i");
  var r = urlObj.search.substr(1).match(reg);
  if (r != null) {
    return (r[2]);
  }
  return null;
}
 
/** 添加Url参数 */
function _addUrlParam(url, paramKey, paramValue) {
  var pattern = paramKey + '=([^&]*)';
  var replaceText = paramKey + '=' + paramValue;
  if (url.match(pattern)) {
    var tmp = '/(' + paramKey + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match('[\?]')) {
      return url + '&' + replaceText;
    } else {
      return url + '?' + replaceText;
    }
  }
}

/** 替换Url参数值 */
function _replaceUrlParamValue(url, paramKey, paramValue) {
  let oUrl = url.toString();
  let re = eval('/(' + paramKey + '=)([^&]*)/gi');
  let nUrl = oUrl.replace(re, paramKey + '=' + paramValue);
  return nUrl;
}

/** 删除Url参数 */
function _removeUrlParam(url, paramKey) {
  let str = "";
  if (url.indexOf('?') != -1) {
    str = url.substr(url.indexOf('?') + 1);
  }
  else {
    return url;
  }
  let arr = "";
  let returnurl = "";
  let setparam = "";
  if (str.indexOf('&') != -1) {
    arr = str.split('&');
    for (let i in arr) {
      if (arr[i].split('=')[0] != paramKey) {
        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
      }
    }
    return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
  }
  else {
    arr = str.split('=');
    if (arr[0] == paramKey) {
      return url.substr(0, url.indexOf('?'));
    }
    else {
      return url;
    }
  }
}
