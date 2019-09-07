import { Element } from './lib/common'

let mainEle = [
  {
    tagName: 'div',
    props: {
      class: 'box'
    },
    children:　[
      {
        tagName: 'p',
        children: ['blog']
      },
      {
        tagName: 'button',
        children: ['click'],
        events: {
          click: function(){
            console.log('sss');
            window.location.href = '/essayTimeList';
          }
        }
      }
    ]
  }
]

let wrapEle = [
  {
    tagName:'div',
    props:{
      class:'full-screen bg-primary center'
    },
    children:　mainEle
  }
]
class EssayDetail extends Element {
  constructor(props){
    super(props) 
    this.rootDOM = props
    this.renderer()
  }
  renderer(){
    this.element = wrapEle
    this.render(this.rootDOM)
  }
}

new EssayDetail(document.getElementById('container'));