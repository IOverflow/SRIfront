import React, { Component, useState } from "react";
import {
    ButtonGroup,
    Button,
    Input,
    withStyles,
    IconButton,
    Grid,
} from "@material-ui/core";
import "./query-input.styles.css";
import { ArrowBackIosRounded, SearchRounded } from "@material-ui/icons";

// export const QueryInput = ({ searchHandler, resetHandler }) => {
//     const [data, setData] = useState({
//         query: "",
//         endpoint: "",
//         searchDisease: false,
//         searchSymptoms: false,
//         searchSelected: false,
//     });

//     const executeSearch = () => {
//         const endquery = data.endpoint + data.query;
//         searchHandler(endquery);
//     };

//     const handleEnter = (event) => {
//         if (event.charCode === 13) {
//             executeSearch();
//         }
//     };

//     const reset = () => {
//         setData({
//             query: "",
//             endpoint: "",
//             searchDisease: false,
//             searchSymptoms: false,
//             searchSelected: false,
//         });
//         resetHandler();
//     };

//     return (
//         <div className='query-container'>
//             {data.searchSelected ? (
//                 <div className='query-container'>
//                     <Button onClick={() => reset()}>Go Back</Button>
//                     <Input
//                         type='search'
//                         name='query'
//                         id='query-search'
//                         className='query-input'
//                         placeholder={
//                             data.searchSymptoms
//                                 ? "Enter symptoms here"
//                                 : "Enter disease name here"
//                         }
//                         onChange={(e) => {
//                             //const val = e.target.value;
//                             //console.log(val);
//                             //data.query = e.target.value;
//                             setData({
//                                 query: e.target.value,
//                                 endpoint: data.endpoint,
//                                 searchDisease: data.searchDisease,
//                                 searchSymptoms: data.searchSymptoms,
//                                 searchSelected: data.searchSelected,
//                             });
//                             console.log(data.query);
//                         }}
//                         onKeyPress={(e) => {
//                             handleEnter(e);
//                         }}
//                     ></Input>
//                     <Button
//                         className='query-button'
//                         onClick={() => executeSearch()}
//                     >
//                         Buscar
//                     </Button>
//                 </div>
//             ) : (
//                 <div className='selector-group'>
//                     <h3>What are you searching for?</h3>
//                     <ButtonGroup name='search-selector'>
//                         <Button
//                             onClick={() =>
//                                 setData({
//                                     searchSelected: true,
//                                     endpoint: "disease",
//                                 })
//                             }
//                         >
//                             Disease
//                         </Button>
//                         <Button
//                             onClick={() => {
//                                 setData({
//                                     searchSymptoms: true,
//                                     searchSelected: true,
//                                     endpoint: "search/?query=",
//                                 });
//                                 console.log(data);
//                             }}
//                         >
//                             Symptoms
//                         </Button>
//                     </ButtonGroup>
//                 </div>
//             )}
//         </div>
//     );
// };

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
                    <Grid container alignItems='center' spacing={0}>
                        <Grid item xs={1}>
                            <MyButton onClick={() => this.reset()}>
                                <ArrowBackIosRounded />
                            </MyButton>
                        </Grid>
                        <Grid item xs={10} container alignItems='center'>
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
                        </Grid>
                        <Grid item xs={1}>
                            <MyButton onClick={() => this.executeSearch()}>
                                <SearchRounded />
                            </MyButton>
                        </Grid>
                    </Grid>
                ) : (
                    <div className='selector-group'>
                        <h3 className='welcome-message'>
                            What are you searching for?
                        </h3>
                        <ButtonGroup name='search-selector'>
                            <Button1
                                onClick={() =>
                                    this.setState({
                                        searchDisease: true,
                                        searchSelected: true,
                                        endpoint: "disease",
                                    })
                                }
                            >
                                Disease
                            </Button1>
                            <Button1
                                onClick={() =>
                                    this.setState({
                                        searchSymptoms: true,
                                        searchSelected: true,
                                        endpoint: "search/?query=",
                                    })
                                }
                            >
                                Symptoms
                            </Button1>
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

const MyButton = withStyles({
    root: {
        color: "darkGrey",
        width: "fit-content",
        alignSelf: "flex-start",
        borderStyle: "ridge",
    },
})(IconButton);

const Button1 = withStyles({
    root: {
        color: " rgb(34, 40, 53)",
        backgroundColor: "darkGrey",
    },
})(Button);
