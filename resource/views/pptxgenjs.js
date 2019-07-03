'use strict';
import '../css/album.css';
import DocumentTitle from'react-document-title';
var pptx = require("pptxgenjs");

class Pptxgenjs extends React.Component{

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  savePPT(){
    console.log('save')
    var currentPptx = new pptx();
    currentPptx.setLayout('LAYOUT_WIDE');

    var slide = currentPptx.addNewSlide();

    // LINE
    slide.addShape(currentPptx.shapes.LINE,      { x:4.15, y:4.40, w:5, h:0, line:'FF0000', lineSize:1 });
    slide.addShape(currentPptx.shapes.LINE,      { x:4.15, y:4.80, w:5, h:0, line:'FF0000', lineSize:2, line_head:'triangle' });
    slide.addShape(currentPptx.shapes.LINE,      { x:4.15, y:5.20, w:5, h:0, line:'FF0000', lineSize:3, line_tail:'triangle' });
    slide.addShape(currentPptx.shapes.LINE,      { x:4.15, y:5.60, w:5, h:0, line:'FF0000', lineSize:4, line_head:'triangle', line_tail:'triangle' });

    // DIAGONAL LINE
    slide.addShape(currentPptx.shapes.LINE,      { x:0, y:0, w:5.0, h:0, line:'FF0000', rotate:45 });

    // RECTANGLE
    slide.addShape(currentPptx.shapes.RECTANGLE, { x:0.50, y:0.75, w:5, h:3, fill:'FF0000' });

    // OVAL
    slide.addShape(currentPptx.shapes.OVAL,      { x:4.15, y:0.75, w:5, h:2, fill:{ type:'solid', color:'0088CC', alpha:25 } });

    // Adding text to Shapes:
    slide.addText('RIGHT-TRIANGLE', { shape:currentPptx.shapes.RIGHT_TRIANGLE, align:'c', x:0.40, y:4.3, w:6, h:3, fill:'0088CC', line:'000000', lineSize:3 });
    slide.addText('RIGHT-TRIANGLE', { shape:currentPptx.shapes.RIGHT_TRIANGLE, align:'c', x:7.00, y:4.3, w:6, h:3, fill:'0088CC', line:'000000', flipH:true });
    slide.addNotes('This is my favorite slide!');
    
    currentPptx.save('Demo-Shapes');
  }

  render(){

    return (
      <DocumentTitle title="">
        <div className="container">
          <button onClick={()=>{this.savePPT()}}>pptx</button>
        </div>
      </DocumentTitle>
    );
  }
};

export default Pptxgenjs;
