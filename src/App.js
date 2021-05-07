import "./App.css";
import React, { Component } from "react";
import { DocList } from "./components/document-list/document-list.component";
import { QueryInput } from "./components/query-input/query-input.component";
import Document from "./components/document/document.component";
import DummyData from "./components/dummydata.json";

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
    state = {
        docs: [],
    };

    render() {
        const docsFound = this.state.docs;
        console.log("---------------");
        console.log(docsFound);
        return (
            <div className='App'>
                <QueryInput searchHandler={this.search} />
                <DocList docs={this.state.docs} />
            </div>
        );
    }

    search = async (endpointQuery) => {
        const url = "http://localhost:8000/" + endpointQuery;
        //console.log(url);
        const response = await fetch(url, {
            method: "GET",
        });
        //console.log(response);
        const textData = await response.text();
        const data = textData ? JSON.parse(textData) : {};
        //console.log(data);
        console.log("+++++++++++++++++");
        this.setState({ docs: data }, () => {
            console.log("state docs updated");
            console.log(this.state.docs);
        });
        console.log("search executed");
    };
}

export default App;

const DocList1 = ({ docs }) => {
    return (
        <div className='doc-list'>
            {docs.length ? <h2>Results</h2> : null}
            {docs.map((doc) => (
                <Document key={doc.id} doc={doc} />
            ))}
        </div>
    );
};
