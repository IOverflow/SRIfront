import React, { Component } from "react";
import { ButtonGroup, Button, Input } from "@material-ui/core";
import "./query-input.styles.css";

export const QueryInput1 = () => (
    <div className='query-container'>
        <InputLabel />
        <input
            type='search'
            name='query'
            id='query-search'
            className='query-input'
        ></input>
        <GoButton />
    </div>
);

export class QueryInput extends Component {
    state = {
        query: "",
        endpoint: "",
        searchDisease: false,
        searchSymptoms: false,
        searchSelected: false,
    };
    constructor({ searchHandler, resetHandler }) {
        super();
        this.handleSearch = searchHandler;
    }

    render() {
        return (
            <div className='query-container'>
                {this.state.searchSelected ? (
                    <div className='query-container'>
                        <Button onClick={() => this.reset()}>Go Back</Button>
                        <Input
                            type='search'
                            name='query'
                            id='query-search'
                            className='query-input'
                            placeholder={
                                this.state.searchSymptoms
                                    ? "Enter symptoms here"
                                    : "Enter disease name here"
                            }
                            onChange={(e) =>
                                this.setState({ query: e.target.value })
                            }
                            onKeyPress={(e) => {
                                this.handleEnter(e);
                            }}
                        ></Input>
                        <Button
                            className='query-button'
                            onClick={() => this.executeSearch()}
                        >
                            Buscar
                        </Button>
                    </div>
                ) : (
                    <div className='selector-group'>
                        <h3>What are you searching for?</h3>
                        <ButtonGroup name='search-selector'>
                            <Button
                                onClick={() =>
                                    this.setState({
                                        searchDisease: true,
                                        searchSelected: true,
                                        endpoint: "disease",
                                    })
                                }
                            >
                                Disease
                            </Button>
                            <Button
                                onClick={() =>
                                    this.setState({
                                        searchSymptoms: true,
                                        searchSelected: true,
                                        endpoint: "search/?query=",
                                    })
                                }
                            >
                                Symptoms
                            </Button>
                        </ButtonGroup>
                    </div>
                )}
            </div>
        );
    }

    executeSearch() {
        const endquery = this.state.endpoint + this.state.query;
        this.handleSearch(endquery);
    }

    handleEnter(event) {
        if (event.charCode === 13) {
            this.executeSearch();
        }
    }

    reset() {
        this.setState({ searchSelected: false });
        this.props.resetHandler();
    }
}

const InputLabel = () => (
    <label className='query-label' align='justify'>
        Search
    </label>
);

class GoButton extends Component {
    render() {
        return <button className='query-button'>Buscar</button>;
    }
}
