// var element = [
//   {
//     tagName:'ul',
//     props:{
//       class:'box'
//     },
//     children:[
//       {
//         tagName: 'li',
//         children: ['item1'],
//         event:{
//           click:function a(){
//             alert('sss')
//           }
//         }
//       },
//       {
//         tagName: 'li',
//         children: ['item2']
//       },
//       {
//         tagName: 'li',
//         children: ['item3']
//       }
//     ]
//   }
// ]

var oldEle = [
  {
    tagName:'h1',
    children:['aaaa']
  },
  {
    tagName:'h2',
    children: ['bbbb']
  },
  {
    tagName: 'h3',
    children: ['cccc']
  }
];

var newEle = [
  {
    tagName:'h1',
    children:['aaaa']
  },
  {
    tagName:'h1',
    children: ['bbbb']
  },
  {
    tagName: 'h3',
    props:{
      class: 'aaa'
    },
    children: ['dddd']
  }
]

// var dom = document.getElementById('container');
// var a = new Element(oldEle);
// a.render(dom);
//
// setTimeout(()=>{
//   a.refresh(oldEle,newEle);
// },3000)

var patch = require('./const.js');
console.log(patch)
