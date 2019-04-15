import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'






// React部分
// 门店组件
class CounterApp extends Component {
  render() {
    const { numberAtShop, onClickIncrease, colorAtShop, onClickRed } = this.props
    return (
      <div>
        <h1 style={{ color: colorAtShop }}> {numberAtShop} </h1>
        <button onClick={onClickIncrease}> +1 </button>
        <button onClick={onClickRed}> Red </button>
      </div>
    )
  }
}
CounterApp.propTypes = {
  numberAtShop: PropTypes.number.isRequired,
  onClickIncrease: PropTypes.func.isRequired,
  colorAtShop: PropTypes.string.isRequired,
  onClickRed: PropTypes.func.isRequired,
}






// Redux部分
// 工厂组件

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
// 物流组件

// 将物料从工厂发至门店
function factoryToShop(material) {
  return {
    numberAtShop: material.number,
    colorAtShop: material.color,
  }
}

// 将重制从门店发至工厂
function shopToFactory(redo) {
  return {
    onClickIncrease: () => redo(increase),
    onClickRed: () => redo(red),
  }
}

// 链接
export default CounterApp = connect(factoryToShop, shopToFactory)(CounterApp);






// 开店
ReactDOM.render(
  <Provider store={store}>
    <CounterApp />
  </Provider>,
  document.getElementById('root')
)

