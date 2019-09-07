import { Element, ajax } from './lib/common'
import { default as markdown } from 'markdown-it'
import * as hljs from 'highlightjs'
let md = new markdown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  }
})

class Edit extends Element {
  constructor(props){
    super(props)
    this.rootDOM = props
    this.data = {
      content:'## Hello'
    }
    this.renderer()
  }

  getInput(val){
    this.data.content = val.target.value
    // console.log(this.element)
    let oldTree = this.element;
    this.setElement();
    let newTree = this.element;
    this.diff(oldTree, newTree, this.dom);
  }

  setState(){

  }

  setElement(){
    let mainE = [
      {
        tagName:'div',
        children:[
          {
            tagName: 'p',
            children:['标题']
          },
          {
            tagName:'textarea',
            events:{
              input: this.getInput.bind(this)
            }
          },
          {
            tagName: 'div',
            innerHTML: {
              position: 'afterbegin',
              content: md.render(this.data.content)
            }
          }
        ]
      }
    ]

    let e = [
      {
        tagName: 'div',
        children: [
          {
            tagName: 'h2',
            children: ['在线编辑']
          },
          {
            tagName: 'div',
            children: mainE
          }
        ]
      }
    ]

    this.element = e
  }

  renderer(){
    this.setElement();
    this.render(this.rootDOM)
  }
}

new Edit(document.getElementById('container'));