import {Element} from './lib/common'

const nav = [
  {
    name:'文章',
    link:'/essayTimeList'
  },
  {
    name: '文章标签',
    link:'/essayTagList'
  },
  {
    name:'作品',
    link:'/wordsTagList'
  },
  {
    name:'作品标签',
    link: '/wordsTagList'
  },
  {
    name:'在线编辑',
    link:'/edit'
  }
];

let liE = [];
nav.map((item, index)=>{
  liE.push({
    tagName: 'li',
    children: [
      {
        tagName:'a',
        props: {
          href: item.link
        },
        children:[item.name]
      }
    ]
  })
})

let essayE = [];

let mainEle = [
  {
    tagName: 'div',
    props: {
      class: 'left'
    },
    children: [
      {
        tagName: 'ul',
        children: liE
      }
    ]
  },
  {
    tagName: 'div',
    props: {
      class:'right'
    },
    children:essayE
  }
];

class EssayDetail extends Element {
  constructor(props){
    super(props)
    this.rootDOM = props
    this.renderer()
  }
  renderer(){
    this.element = mainEle
    this.render(this.rootDOM)
  }
}

new EssayDetail(document.getElementById('container'));