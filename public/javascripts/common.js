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
      let tagName = item.tagName;
      let props = item.props;
      let children = item.children || [];
      let event = item.event || {};
      createEle = document.createElement(item.tagName);
      createEle = this.setAttr(props,createEle);

      for(let child in children){
        let ele = this.createEle(children[child]);
        createEle.appendChild(ele);
      }

      for(let e in event){
        createEle.addEventListener(e, event[e]);
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

  //没有考虑顺序替换情况（太难想了...） 全部都replace 后面再说吧
  diffNode(oldNode, newNode){
    let oldLen = oldNode.length;
    let newLen = newNode.length;
    let len = oldLen>oldLen ? oldLen : oldLen;
    let difference = [];
    for(let i =0;i<len;i++){
      if( oldNode[i].tagName !== newNode[i].tagName ){
        difference.push({
          type:'_replace',
          // tagName: newNode[i].tagName
          node: newNode[i]
        })
      }else {//非全部替换
        if( oldNode[i].props !== newNode[i].props ){
          difference.push({
            type: '_props',
            props: this.diffProps(oldNode[i].props, newNode[i].props)
          })
        }

        if(
          //children[0]要改
          _isString(oldNode[i].children[0]) &&
          _isString(newNode[i].children[0]) &&
          oldNode[i].children[0] !== newNode[i].children[0]
        ){
          difference.push({
            type: '_text',
            children: newNode[i].children
          })
        }
      }
    }
    console.log(difference);
    return difference;
  }

  //没有考虑 删除
  diffProps(oldProps, newProps){
    let diffProps = [];
    if(oldProps === undefined){
      return newProps;
    }
    for(let props in newProps){
      if(oldProps[props] === undefined){
        diffProps.push({
          [props]: newProps[props]
        })
      }else if(oldProps[props] !== newProps[props]){
        diffProps.push({
          [props]: newProps[props]
        })
      }
    }
    return diffProps;
  }

  refresh(oldEle, newEle){//好像必须要加标记。。。
    let difference = this.diffNode(oldEle,newEle);
    difference.map((item, index)=>{
      switch (item.type) {
        case '_replace':
          this.dom.removeChild(this.dom.childNodes[1]);
          this.dom.appendChild(this.createEle(item.node));
          break;
        case '_props':
          this.setAttr(item.props, this.dom.childNodes[2])
          break;
        case '_text':
          this.dom.childNodes[2].innerText = item.children[0]
          break;
        default:

      }
    })
  }

  render(dom){
    this.dom = dom;
    this.element.map((item,index)=>{
      let createEle = this.createEle(item);
      dom.appendChild(createEle);
      console.log('sss')
    })
  }
}
//8.19：只能一层，我想想。。好像留了一堆坑