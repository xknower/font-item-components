// 生成 DOM 元素并且添加事件
// ::String => ::Document (DOM 事件的 API 只有 DOM 结构才能用, 所有需要将模板HTML字符串, 先转换为 DOM 结构)
const createDOMFromString = (domString) => {
    const div = document.createElement('div')
    div.innerHTML = domString
    return div
}

// 模块化公共组件
class Component {
  constructor (props = {}) {
    this.props = props
  }

  setState (state) {
    const oldEl = this.el
    this.state = state
    this.el = this.renderDOM()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  renderDOM () {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}

// 把组件的 DOM 元素插入页面, 并且在 setState 的时候更新页面 
const mount = (wrapper, component) => {
  //
  wrapper.appendChild(component.renderDOM())
  //
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeChild(oldEl)
  }
}

// 重新定义组件
class AdLikeButton extends Component {
  constructor (props) {
    super(props)
    this.state = { isLiked: false }
  }

  onClick () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return `
      <button class='like-btn'>
        <span class='like-text'>${this.props.word || ''} ${this.state.isLiked ? '取消' : '点赞'}</span>
        <span>?</span>
      </button>
    `
  }
}

//
mount(document.querySelector('.wrapper'), new AdLikeButton({ word: 'h' }))