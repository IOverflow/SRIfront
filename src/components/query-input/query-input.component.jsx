import React, { useState } from "react";
import {
    ButtonGroup,
    Button,
    withStyles,
    IconButton,
    Grid,
} from "@material-ui/core";
import "./query-input.styles.css";
import { ArrowBackIosRounded, SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CustomTextField = withStyles({
    root: {
        backgroundColor: "lightGray",
        borderRadius: "8pt",
        borderColor: "grey",
        outlineColor: "grey",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "rgb(70, 85, 117)",
                borderWidth: "1.5pt",
                borderRadius: "8pt",
            },
            "&:hover fieldset": {
                borderColor: "rgb(91, 113, 161)",
                borderWidth: "2.5pt",
                borderRadius: "8pt",
            },
            "&.Mui-focused fieldset": {
                borderColor: "rgb(91, 113, 161)",
                borderWidth: "2.5pt",
            },
        },
    },
})(TextField);

export const QueryInput = ({ searchHandler, resetHandler }) => {
    const [vocab, setVocab] = useState([]);

    const [query, setQuery] = useState([]);

    const [endpoint, setEndpoint] = useState("");

    const [searchSympt, setSymptSearch] = useState(false);

    const [search, setSearchActive] = useState(false);

    const executeSearch = () => {
        let temp = "";
        query.map((word) => (temp += word + " "));
        const q = temp.slice(0, temp.length - 1);
        const endquery = endpoint + q;
        searchHandler(endquery);
    };

    const handleEnter = (event) => {
        if (event.charCode === 13) {
            executeSearch();
        }
    };

    function getSuggestions() {
        fetch("http://localhost:8000/search/vocabulary")
            .then((response) => response.json())
            .then((response) => {
                setVocab(response);
            });
    }

    const reset = () => {
        setQuery([]);
        setEndpoint("");
        setSymptSearch(false);
        setSearchActive(false);
        resetHandler();
    };

    return (
        <div className='query-container'>
            {search ? (
                <Grid
                    container
                    alignItems='center'
                    spacing={0}
                    justify='center'
                >
                    <Grid
                        item
                        xs={1}
                        container
                        alignItems='center'
                        justify='center'
                    >
                        <ButtonBackAndSearch
                            style={{ marginTop: 7 }}
                            onClick={() => reset()}
                        >
                            <ArrowBackIosRounded fontSize='large' />
                        </ButtonBackAndSearch>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        container
                        alignItems='center'
                        justify='center'
                    >
                        <Autocomplete
                            freeSolo
                            multiple
                            autoComplete={true}
                            id='custom-autocomplete'
                            disableClearable
                            className='query-input'
                            options={vocab}
                            filterSelectedOptions={true}
                            onChange={(e, v, r) => {
                                setQuery(v);
                            }}
                            renderInput={(params) => (
                                <CustomTextField
                                    {...params}
                                    placeholder={
                                        query.length === 0
                                            ? searchSympt
                                                ? "Enter symptoms here"
                                                : "Enter disease name here"
                                            : null
                                    }
                                    margin='normal'
                                    variant='outlined'
                                    onKeyPress={(e) => {
                                        handleEnter(e);
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: "text",
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={1}
                        container
                        alignItems='center'
                        justify='center'
                    >
                        <ButtonBackAndSearch
                            onClick={() => executeSearch()}
                            style={{ marginTop: 7 }}
                        >
                            <SearchRounded fontSize='large' />
                        </ButtonBackAndSearch>
                    </Grid>
                </Grid>
            ) : (
                <div className='selector-group'>
                    <h3 className='welcome-message'>
                        What are you searching for?
                    </h3>
                    <ButtonGroup name='search-selector'>
                        <Button1
                            onClick={() => {
                                setSearchActive(true);
                                setEndpoint("disease");
                            }}
                        >
                            Disease
                        </Button1>
                        <Button1
                            onClick={() => {
                                setSearchActive(true);
                                setSymptSearch(true);
                                setEndpoint("search/?query=");
                                getSuggestions();
                            }}
                        >
                            Symptoms
                        </Button1>
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
};

const ButtonBackAndSearch = withStyles({
    root: {
        color: "darkGrey",
        width: "fit-content",
        alignSelf: "center",
        borderStyle: "ridge",
        justifyItems: "center",
    },
})(IconButton);

const Button1 = withStyles({
    root: {
        color: " rgb(34, 40, 53)",
        backgroundColor: "darkGrey",
    },
})(Button);
