import React from 'react';
import { isPropertySignature } from 'typescript';
import {
  Chart as ChartJS,
  ChartData
} from 'chart.js';
interface Props {
  height?: string,
  width?: string;
  margin?: string;
}
interface State{
  data: ChartData<"scatter">;

}
class ScatterplotCard extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);

  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World!
      </header>
    </div>
  );
}

export default App;
