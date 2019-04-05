import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'






// React部分

// 计数器组件
class Fashion extends Component {
  render() {
    const { numberAtShop, onClickIncrease, colorAtShop, onClickRed } = this.props
    return (
      <div>
        <h1 style={ {color: colorAtShop} }> {numberAtShop} </h1>
        <button onClick={onClickIncrease}> +1 </button>
        <button onClick={onClickRed}> Red </button>
      </div>
    )
  }
}
Fashion.propTypes = {
  numberAtShop: PropTypes.number.isRequired,
  onClickIncrease: PropTypes.func.isRequired,
  colorAtShop: PropTypes.string.isRequired,
  onClickRed: PropTypes.func.isRequired,
}






// Redux部分

// 重做什么 whatToRedo
const increase = { type: 'increase' }
const red = { type: 'red' }

// 如何重做 howToRedo
function howToRedo(material = { number: 0, color: 'blue' }, whatToRedo) {
  const number = material.number
  const color = material.color
  if (!material) {
    material = { number, color }
  }
  switch (whatToRedo.type) {
    case 'increase':
      return { number: number + 1, color }
    case 'red':
      return { number, color: 'red' }
    default:
      return material
  }
}

// 建仓
const store = createStore(howToRedo)






// React-Redux部分

// 将原料从仓库发至门店
function storeToShop(material) {
  return {
    numberAtShop: material.number,
    colorAtShop: material.color,
  }
}

// 将重做从门店发至仓库
function shopToStore(redo) {
  return {
    onClickIncrease: () => redo(increase),
    onClickRed: () => redo(red),
  }
}

// 链接
const App = connect(storeToShop, shopToStore)(Fashion)

// 开店
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
