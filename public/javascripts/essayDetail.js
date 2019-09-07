import {Element} from './lib/common'
import { default as markdown } from 'markdown-it'
import * as highlight from 'highlightjs'

let md = new markdown();
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
          content: md.render('## hello')
        }
      }
    ]
    this.element = ele
    this.render(this.rootDOM)
  }
}

new EssayDetail(document.getElementById('container'));