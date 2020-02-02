// 02 实现可复用性 - 生成 DOM 元素并且添加事件

// 生成 DOM 元素并且添加事件
// ::String => ::Document (DOM 事件的 API 只有 DOM 结构才能用, 所有需要将模板HTML字符串, 先转换为 DOM 结构)
const createDOMFromString = (domString) => {
  const div = document.createElement('div')
  div.innerHTML = domString
  return div
}

// 重新定义类
class AdLikeButton {
  constructor () {
    // 保存按钮点赞状态
    this.state = { isLiked: false }
  }
  
  changeLikeText () {
    const likeText = this.el.querySelector('.like-text')

    this.state.isLiked = !this.state.isLiked
    if (this.state.isLiked) {
      likeText.innerHTML = '取消'
    } else {
      likeText.innerHTML = '点赞'
    }
  }

  render () {
    //
    this.el = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>点赞</span>
        <span>?</span>
      </button>
    `)

    // 添加事件
    this.el.addEventListener('click', this.changeLikeText.bind(this), false)
    return this.el
  }
}

const wrapper = document.querySelector('.wrapper')

const likeButton = new AdLikeButton()
wrapper.appendChild(likeButton.render())
