import React from 'react';
//Props: PanRegion(index) - moves the camera to the selected region
export class RegionPan extends React.Component {
 render(){
  return (  <div className="dropdown pan-card" >
  <div id="filter_panheader" className="cardheader" data-toggle="dropdown" /*data-target="#filter_panbody"*/><img className="leaflet_pan_icon" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdad-9.png"/></div>
      
    <div className="dropdown-menu dropdown-menu-right" id="filter_panbody">
<div className="btn-group btn-group-sm region_pan_btn_group">
    <div className="btn-group-vertical region_pan_btn_group_vertical">
	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(29)}>Nevish <br />Line</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(16)}>Oarbreaker <br />Isles</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(15)}>Fishermans<br />Row</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(42)}>Origin</button>

</div> 
  <div className="btn-group-vertical region_pan_btn_group_vertical">
      <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(32)}>Callum's <br />Cape</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(12)}>Stonecradle</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(13)}>Farranac Coast</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(14)}>Westgate</button>
      <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(41)}>Ash Fields</button>
</div> 
    <div className="btn-group-vertical region_pan_btn_group_vertical">
	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(33)}>Speaking <br />Woods</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(7)}>Moors</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(10)}>Linn of Mercy</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(9)}>Loch Mor</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(8)}>Heartlands</button>
  	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(31)}>Red River</button>
</div> 
      <div className="btn-group-vertical region_pan_btn_group_vertical">
	  	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(34)}>Basin <br />Sionnach</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(11)}>Reaching Trail</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(4)}>Callahan's<br />Passage</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(3)}>Deadlands</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(6)}>Umbral Wildwood</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(17)}>Great March</button>
  	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(40)}>Kalokai</button>
</div> 
      <div className="btn-group-vertical region_pan_btn_group_vertical">
	  	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(35)}>Howl County</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(25)}>Viper Pit</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(5)}>Marban Hollow</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(23)}>Drowned Vale</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(24)}>Shackled Chasm</button>
  	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(30)}>Acritha</button>
</div> 
    <div className="btn-group-vertical region_pan_btn_group_vertical">
		    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(36)}>Clanshead <br />Valley</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(22)}>Weathered Expanse</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(20)}>Endless Shore</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(21)}>Allod's Bight</button>
	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(39)}>Terminus</button>
</div> 
      <div className="btn-group-vertical region_pan_btn_group_vertical">
	  	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(37)}>Morgen's <br />Crossing</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(19)}>Godcrofts</button>
  <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(18)}>Tempest Island</button>
	    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(38)}>The Fingers</button>
</div> 
  </div>
    </div>
    </div>);
 } 
}
