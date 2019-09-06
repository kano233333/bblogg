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

const essays = [
  {
    title:'aaa',
    id:'0',
    content:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  },
  {
    title:'bbb',
    id:'1',
    content:'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
  },
  {
    title:'ccc',
    id:'2',
    content:'ccccccccccccccccccccccccccccccccccccccccc'
  },
  {
    title:'ddd',
    id:'3',
    content:'ddddddddddddddddddddddddddd'
  }
]

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
essays.map((item,index)=>{
  essayE.push({
    tagName: 'div',
    props: {
      class: 'essay'
    },
    events:{
      click: function(){
        window.location.href = '/essayDetail/' +item.id
      }
    },
    children:[
      {
        tagName: 'h2',
        children: [item.title]
      },
      {
        tagName: 'p',
        children: [item.content]
      }
    ]
  })
})

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