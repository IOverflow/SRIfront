import "./App.css";
import React, { Component } from "react";
import { DocList } from "./components/document-list/document-list.component";
import { QueryInput } from "./components/query-input/query-input.component";
import { Grid } from "@material-ui/core";

class App extends Component {
    state = {
        docs: [],
    };

    render() {
        return (
            <div className='App'>
                <Grid container className='AppGrid' spacing={10}>
                    <Grid item>
                        <QueryInput
                            searchHandler={this.search}
                            resetHandler={() => this.setState({ docs: [] })}
                        />
                    </Grid>
                    <Grid item container alignItems='center' justify='center'>
                        <DocList docs={this.state.docs} />
                    </Grid>
                </Grid>
            </div>
        );
    }

    search = async (endpointQuery) => {
        const url = "http://localhost:8000/" + endpointQuery;
        const response = await fetch(url, {
            method: "GET",
        });
        const textData = await response.text();
        const data = textData ? JSON.parse(textData) : {};
        this.setState({ docs: data }, () => {
            console.log("state docs updated");
        });
    };

    docDelete = async (docId) => {
        const temp = this.state.docs;
        const filtered = temp.filter((doc) => doc.id !== docId);
        this.setState({ docs: filtered }, () => console.log(this.state.docs));
    };
}

export default App;
