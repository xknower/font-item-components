// 03 状态改变 -> 构建新的 DOM 元素
// 一旦状态发生改变，就重新调用 render 方法，构建一个新的 DOM 元素

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

  setState (state) {
    const oldEl = this.el
    this.state = state
    this.el = this.render()
    // 组件发生了改变, 则更新 DOM 元素到页面当中, 实例化后初始化方法
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  changeLikeText () {
    this.setState({
    isLiked: !this.state.isLiked
    })
  }

  render () {
    this.el = createDOMFromString(`
    <button class='like-btn'>
        <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
        <span>?</span>
    </button>
    `)

    //
    this.el.addEventListener('click', this.changeLikeText.bind(this), false)
    return this.el
  }
}

const wrapper = document.querySelector('.wrapper')

const likeButton = new AdLikeButton()
// 实例化以后时候被设置的, 所以你可以自定义 onStateChange 的行为
// 每当 setState 的时候, 就会把插入新的 DOM 元素，然后删除旧的元素，页面就更新了
likeButton.onStateChange = (oldEl, newEl) => {
  // 插入新的元素
  wrapper.insertBefore(newEl, oldEl)
  // 删除旧的元素
  wrapper.removeChild(oldEl)
}

// 第一次插入 DOM 元素
wrapper.appendChild(likeButton.render())