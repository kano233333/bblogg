let isFormData = (v) => {
  return Object.prototype.toString.call(v) === '[object FormData]';
}
let isObject = (v) => {
  return Object.prototype.toString.call(v) === '[object Object]';
}

let isValueEmpty = (value) => {
  if(typeof value !== 'string'){
    return -1;
  }
  return value.length === 0;
}

let ajax = (obj) => {
  var ajaxRequest = new window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var method = obj.method.toUpperCase();
  var url = obj.url;
  var data = obj.data;

  if (method === "GET") {
    if (data) {
      url = url + "?";
      for (var i in data) {
        url = url + i + "=" + data[i] + "&";
      }
      url = url.substring(0, url.length - 1);
    }
    ajaxRequest.open(method, url);
    ajaxRequest.send();
  } else if (method === "POST") {
    ajaxRequest.open(method, url);
    if(isFormData(data)){
      ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    }else if(isObject(data)){
      ajaxRequest.setRequestHeader("Content-type","application/json; charset=utf-8");
      data = JSON.stringify(data)
    }
    ajaxRequest.send(data);
  }

  ajaxRequest.onreadystatechange = function () {
    if (ajaxRequest.readyState === 4) {
      if (ajaxRequest.status === 200) {
        let _res = JSON.parse(ajaxRequest.responseText) || console.error('reqeust json errror');
        if (obj.success !== undefined) {
          obj.success(_res);
        }
      } else {
        if (obj.fail !== undefined) {
          obj.fail(ajaxRequest.status);
        }
      }
    }
  }
}

let setCookie = (c_name,value,expireseconds) => {
  var exdate=new Date();
  exdate.setTime(exdate.getTime()+expireseconds * 1000);
  document.cookie=c_name+ "=" +escape(value)+
    ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
}

let getCookie = (c_name) => {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }

      return unescape(document.cookie.substring(c_start, c_end));
    }
  }

  return "";
}

let delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}