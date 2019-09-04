import {markdown} from 'markdown'
import {Element} from './lib/common'
let md_content = "## Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it."
let html_content = markdown.toHTML( md_content );

let ele = [
  {
    tagName: 'div',
    innerHTML: {
      position: 'afterbegin',
      content: html_content
    }
  }
]

let a = new Element(ele);
a.render(document.getElementById('container'));