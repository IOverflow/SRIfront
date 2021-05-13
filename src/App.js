import "./App.css";
import React, { Component } from "react";
import { DocList } from "./components/document-list/document-list.component";
import { QueryInput } from "./components/query-input/query-input.component";
import { Grid } from "@material-ui/core";

class App extends Component {
    state = {
        docs: [],
        suggest: [],
        related: [],
    };

    componentDidMount() {
        this.getSuggestions();
    }

    render() {
        return (
            <div className='App'>
                <Grid container className='AppGrid'>
                    <Grid item xs={12}>
                        <header className='App-header'>Sickipedia</header>
                    </Grid>
                    <Grid item xs={12}>
                        <QueryInput
                            searchHandler={this.search}
                            resetHandler={() =>
                                this.setState({ docs: [], related: [] })
                            }
                            related={this.state.related}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        alignItems='center'
                        justify='center'
                    >
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
        this.setState({ docs: data.diseases, related: data.related }, () => {
            console.log("state docs updated");
            console.log(this.state.docs);
        });
    };

    docDelete = async (docId) => {
        const temp = this.state.docs;
        const filtered = temp.filter((doc) => doc.id !== docId);
        this.setState({ docs: filtered });
    };

    getSuggestions = () => {
        fetch("http://localhost:8000/search/vocabulary")
            .then((response) => response.json())
            .then((response) => {
                this.setState({ suggest: response });
            });
    };
}

export default App;
