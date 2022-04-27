import React from 'react';
const RC = require('rc-slider')
const RCTooltip = require('rc-tooltip')
const createSliderWithTooltip = RC.createSliderWithTooltip;
const Range = createSliderWithTooltip(RC.Range);
const Handle = RC.Handle;

const handle = (props) => {

  let value = new Date(props.value)
  return (
    <RCTooltip.default
      prefixCls="rc-slider-tooltip"
      overlay={""+value}
      visible={props.dragging}
      placement="top"
      key={props.index}
    >
      <Handle value={props.value}  disabled={props.disabled} index={props.index} offset={props.offset} max={props.max} min={props.min} ref={props.ref} prefixCls={props.prefixCls} className={props.className}/>
    </RCTooltip.default>
  );
};
//////////////////////////////////////////////
class Slider extends React.Component { //Conquest X, Day Y Underway since
      constructor(props) {
    super(props);
      this.state={      ///State
      slider:props.time,
      prevSlider:props.time
    }
     this.onChangeSlider= this.onChangeSlider.bind(this)
   }
    static getDerivedStateFromProps(props, state){

      if(props.time!=state.prevSlider){
      return {prevSlider:props.time,slider:props.time}
      }else return {}
      }
  
  shouldComponentUpdate(nextProps, nextState){
    //let checkstart = Date.now()

      if(this.state.slider!=nextState.slider){
        return true
      }
      if(JSON.stringify(this.props)==JSON.stringify(nextProps)){

        return false
      }
        return true
      }
  
  onChangeSlider(e){
    let value= e
    this.setState({
      slider:value})
    }
  
  render(){
    let max = Date.now()
    if(this.props.previous){
      max=this.props.EndTime
    }
    return <RC.default className="stats_timelapse_slider" onChange={this.onChangeSlider}    value={this.state.slider} min={this.props.timerStart} max={max} step={600000} onAfterChange={this.props.onChangeSlider} handle={handle}/>
  }
}

export default Slider