const repo = "http://hq.mreboy.com/img/"
import React from 'react';
import store from "../../../../redux/store";
import A from "../../../../redux/actions.js";
import socket from "../../../../_static/socket";

export class IconPanel extends React.Component {
    constructor(props) {
      super(props);
      this.SpawnIcon = this.SpawnIcon.bind(this);
    }

    ToggleMenu() {
      store.dispatch(A.selectObject("artypanel", ""));
    }

    SpawnIcon(index) {
      let center = this.props.worldmap.refs.worldmap.viewport.center;
      let packet = {
        position: { x: center[1], y: center[0] },
        notes: "",
        type: index,
        lastupdate: new Date()
      };
      let key = center[1] + center[0];
      store.dispatch(A.updateObject("misc_icon", packet, key));
      socket.emit("updateObject", {
        type: "misc_icon",
        object: packet,
        key: key
      });
    }

    GetIcon(index, src) {
      return (
        <button className="map_artycontrol_btn2" onClick={() => this.SpawnIcon(index)}>
          <img className="map_artycontrol_img" src={ repo + src } />
        </button>
      );
    }

    render() {
      return (
        <React.Fragment>
          <div id="map_artycontrol_dropdown" className="collapse width">
            <div id="map_artycontrol_innerdiv">
              {this.GetIcon(25, 'ListeningKitIcon.png')}
              {this.GetIcon(26, 'ObservationBunkerT2ItemIcon.png')}
              {this.GetIcon(27, 'ArtilleryIcon.png')}
              {this.GetIcon(28, 'StaticArtilleryStructureIcon.png')}
              {this.GetIcon(34, 'LongRangedArtilleryIcon.png')}
            </div>
          </div>
          <button
            id="map_artycontrol_btn"
            onClick={() => this.ToggleMenu()}
            data-toggle="collapse"
            data-target="#map_artycontrol_dropdown"
          >
            <img
              id="map_artycontrol_main_img"
              src={repo + 'StaticArtilleryStructureIcon.png'}
            />
          </button>
        </React.Fragment>
      );
    }
  }
