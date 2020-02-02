// 02 实现可复用性 - 结构可复用性

// 定义类 LikeButton , 实现 render 方法, 返回 HTML 结构字符串
class LikeButton {
  render () {
    return `
      <button class='like-btn'>
        <span class='like-text'>赞</span>
        <span>?</span>
      </button>
    `
  }
}

// 使用类 LikeButton 构建不同的点赞功能的实例, 并把它们插到页面中
// 使用了 innerHTML ，把两个按钮粗鲁地插入了 wrapper 当中, 简单实现 结构可复用性
const wrapper = document.querySelector('.wrapper')
//
const likeButton = new LikeButton()
wrapper.innerHTML = likeButton.render()
