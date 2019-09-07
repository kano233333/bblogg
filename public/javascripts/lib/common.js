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

let _type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

let _isString = function isString (list) {
  return _type(list) === 'String'
}

class Element {
  constructor(element){
    this.diffType = {

    };
    this.element = element;
  }
  createEle(item){
    let createEle = null;
    if(typeof item == 'string'){
      createEle = document.createTextNode(item);
    }else{
      let tagName = item.tagName || 'div';
      let props = item.props || [];
      let children = item.children || [];
      let events = item.events || {};
      let innerHtml = item.innerHTML || {}; 
      createEle = document.createElement(tagName);
      createEle = this.setAttr(props,createEle);
      createEle = this.setEvent(events,createEle);
      createEle.insertAdjacentHTML(innerHtml.position || 'afterbegin', innerHtml.content || '');
      for(let child in children){
        let ele = this.createEle(children[child]);
        createEle.appendChild(ele);
      }
    }
    return createEle;
  }

  setAttr(props,createEle){
    for(let prop in props){
      createEle.setAttribute(prop, props[prop]);
    }
    return createEle;
  }

  setEvent(events,createEle){
    for(let event in events){
      createEle.addEventListener(event,events[event]);
    }
    return createEle;
  }

  diff(oldNode, newNode, dom){
    let oldLen = oldNode.length;
    let newLen = newNode.length;
    if(oldLen == newLen){
      newNode.map((item, index)=>{
        if(_isString(item) && _isString(oldNode[index]) && item!==oldNode[index]){
          this.diffRefresh('_text', dom, index, item);
        }else if(item.tagName !== oldNode[index].tagName){
          this.diffRefresh('_replace', dom, index, item);
        }else if(item.props !== oldNode[index].props){
          this.diffRefresh('_props', dom, index, item);
        }else if(item.innerHTML && oldNode[index].innerHTML && item.innerHTML.content!==oldNode[index].innerHTML.content){
          this.diffRefresh('_innerHTML', dom, index, item);
        }
        let oldChild = oldNode[index].children || [];
        let newChild = item.children || [];
        let domChild = oldChild == [] ? dom : dom.childNodes[index];
        if(oldChild!==[] || newChild!==[]){
          this.diff(oldChild, newChild, domChild);
        }
      })
    }
  }

  diffRefresh(type, dom, index, change){
    switch(type){
      case '_replace':
        dom.removeChild(dom.childNodes[index]);
        dom.appendChild(this.createEle(change));
        break;
      case '_props':
        // this.setAttr(item.props, this.dom.childNodes[2])
        break;
      case '_text':
        if(_isString(dom.innerText)){
          dom.innerText = change;
        }else{
          dom.childNodes[index] = change;
        }
        break;
      case '_innerHTML':
        dom.childNodes[index].innerHTML = change.innerHTML.content;
        break;
    }
  }

  render(dom){
    this.dom = dom;
    this.element.map((item,index)=>{
      let createEle = this.createEle(item);
      dom.appendChild(createEle);
    })
  }
}

export {isFormData, isObject, ajax, setCookie, getCookie, delCookie, Element}

//8.19：只能一层，我想想。。好像留了一堆坑
//9.5:虚拟dom改变部分。emmm...一个节点遍历的时候同时更新吧，后面再说吧