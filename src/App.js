import './App.css';
import React, { Component } from 'react';
import { DocList } from './components/document-list/document-list.component';
import { QueryInput } from './components/query-input/query-input.component';
import DummyData from './components/dummydata.json';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Hello</h1>
//         <DocList name='docList'>
//           Here goes documents
//         </DocList>
//       </header>
//     </div>
//   );
// }
class App extends Component {
    constructor() {
        super();

        this.state = { docs: [] };
    }

    componentDidMount() {
        this.setState({ docs: DummyData });
    }

    render() {
        return (
            <div className='App'>
                <QueryInput />
                <DocList docs={this.state.docs} />
            </div>
        );
    }
}

export default App;
