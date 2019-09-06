import {markdown} from 'markdown'
import {Element} from './lib/common'
let md_content = "## Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it."
let html_content = markdown.toHTML( md_content );

class EssayDetail extends Element {
  constructor(props){
    super(props)
    this.rootDOM = props
    this.renderer()
  }
  renderer(){
    let ele = [
      {
        tagName: 'div',
        innerHTML: {
          position: 'afterbegin',
          content: html_content
        }
      }
    ]
    this.element = ele
    this.render(this.rootDOM)
  }
}

new EssayDetail(document.getElementById('container'));