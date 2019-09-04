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

var ele = new Element(wrapEle);
ele.render(document.getElementById('container'));