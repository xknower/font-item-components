// 实现点赞功能和取消点赞功能
const button = document.querySelector('.like-btn')
const buttonText = button.querySelector('.like-text')

//
let isLiked = false

//
button.addEventListener('click', function () {
  isLiked = !isLiked
  if (isLiked) {
    buttonText.innerHTML = '取消'
  } else {
    buttonText.innerHTML = '点赞'
  }
}, false)