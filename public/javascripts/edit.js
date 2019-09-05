import { Element, ajax } from './lib/common'
import { markdown } from 'markdown'
let md_content = "## Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it."
let html_content = markdown.toHTML( md_content );
let aaa = '';
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
          input: function(val){
            aaa = this.value;
          }
        }
      },
      {
        tagName: 'div',
        children: [markdown.toHTML(aaa)]
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
];

let ele = new Element(e);
ele.render(document.getElementById('container'));

setTimeout(()=>{
  ele = new Element(e);
  ele.render(document.getElementById('container'));
},3000)

// ajax({
//   url: '/api/sendEssay',
//   data:{
//     title: 'bbb',
//     time: '2019-3-4',
//     tag: ['js', 'vue'],
//     content:'bbbbbbbbbbbbbbbbbbbbb'
//   },
//   method:'POST',
//   success:function(res){
//     console.log(res)
//   },
//   error: function(err){
//     console.log(err)
//   }
// })