import React from 'react';
import ReactDOM from 'react-dom';
import CanvasXpressReact from 'canvasxpress-react';
class Bar extends React.Component {
 
  render() {

    var target = "canvas";
     
    var data =  {
      "y" : {
        "vars" : ["Variable1"],
        "smps" : ["Sample1", "Sample2", "Sample3"],
        "data" : [[33, 48, 55]]
      }
    };

    var config = {
      "graphOrientation": "vertical",
      "graphType": "Bar",
      "theme": "CanvasXpress",
      "title": "Simple Bar graph"
    };
   
    return (
      <CanvasXpressReact target={target} data={data} config={config} width={500} height={500} />
    )
     
  }
 
}
var reactapp = document.createElement("div");
document.body.appendChild(reactapp);
ReactDOM.render(<Bar />, reactapp)