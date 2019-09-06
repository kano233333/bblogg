import { Element, ajax } from './lib/common'
import { markdown } from 'markdown'
let md_content = "## Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it."
let html_content = markdown.toHTML( md_content );

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
    this.renderer()
  }

  renderer(){
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
              content: markdown.toHTML(this.data.content)
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
    this.render(this.rootDOM)
  }
}

new Edit(document.getElementById('container'));