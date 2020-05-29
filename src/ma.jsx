// import React from 'react'
import {Button, Collapse, Breadcrumb} from 'antd';
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Fm extends React.Component {
    constructor(){
        super()
    }
    componentDidMount(){
        document.onkeydown = function(e){
            console.log(e)
        }
    }
    render(){

        return <div>
            <Collapse defaultActiveKey={['1']} onChange={callback}>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" disabled>
      <p>{text}</p>
    </Panel>
  </Collapse>
            <Button>我哦我的发VB地方吧深V cnn的</Button>

            {this.props.children}
        </div>
       
    }
}
export {
    Fm
}