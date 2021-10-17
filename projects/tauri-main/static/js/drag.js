const containers = document.querySelectorAll('.dd-cont')

const droppable = new Draggable.Droppable(containers, {
  //register dropzones as containers
  draggable: '.draggable',
  dropzone: '.dropzone',
  mirror: {
    constrainDimensions: true, //prevent element from shrinking while being dragged
  },
})

let droppableOrigin
// --- Draggable events --- //
droppable.on('drag:start', (evt) => {
  //If drag then:
  console.log('dragging!')
  droppableOrigin = evt.originalSource.parentNode.dataset.dropzone
})

droppable.on('drag:move', (evt) => {
  //If drag then:
  droppableOrigin = evt.originalSource.parentNode.dataset.dropzone
  document.body.style.backgroundColor = 'red'
})

droppable.on('droppable:dropped', (evt) => {
  if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
    //if dropped into wrong container then:
    evt.cancel()
  }
})

droppable.on('droppable:returned', (evt) => {
  if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
    //if dropped into wrong container then:
    evt.cancel()
  }
})

// const containers = document.querySelectorAll('body')

// const draggable = new Draggable.default(containers, {
//   draggable: 'div.draggable',
//   dropzone: '.dropzone',
//   mirror: {
//     constrainDimensions: true, //prevent element from shrinking while being dragged
//   },
// })

// draggable.on('drag:start', () => console.log('drag:start'))
// draggable.on('drag:move', () => console.log('drag:move'))
// draggable.on('drag:stop', () => console.log('drag:stop'))

// // const droppable = new Draggable.Droppable(containers, {
// //   //register dropzones as containers
// //   draggable: '.draggable',
// //   dropzone: '.dropzone',
// //   mirror: {
// //     constrainDimensions: true, //prevent element from shrinking while being dragged
// //   },
// // })

// // let droppableOrigin;
// // // --- Draggable events --- //
// // droppable.on('drag:start', (evt) => {
// //   //If drag then:
// //   droppableOrigin = evt.originalSource.parentNode.dataset.dropzone;
// // });

// // droppable.on('droppable:dropped', (evt) => {
// //   if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
// //     //if dropped into wrong container then:
// //     evt.cancel();
// //   }
// // });

// // droppable.on('droppable:returned', (evt) => {
// //   if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
// //     //if dropped into wrong container then:
// //     evt.cancel();

// //   }
// // });
