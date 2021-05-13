import React, { useState, useRef, useEffect } from "react";
import {
    ButtonGroup,
    Button,
    withStyles,
    IconButton,
    Grid,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import "./query-input.styles.css";
import { ArrowBackIosRounded, SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EventBus from "./../event-bus/event-bus.component";
import reactDom from "react-dom";

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

export function QueryInput({ searchHandler, resetHandler, related }) {
    const [vocab, setVocab] = useState([]);

    const [query, setQuery] = useState([]);

    const [endpoint, setEndpoint] = useState("");

    const [search, setSearchActive] = useState(false);

    const [aisearch, setAISearch] = useState(false);

    const [interValue, setInterValue] = useState([]);

    const [notSel, setNotSel] = useState([]);

    const testRef = useRef(null);

    const relatedRef = useRef(null);

    const [count, setCount] = useState(0);

    const executeSearch = () => {
        let temp = "";
        setCount(0);
        query.map((word) => (temp += word + " "));
        const q = temp.slice(0, temp.length - 1);
        const endquery = endpoint + q;
        console.log("------Executing Search------");
        console.log(q);
        searchHandler(endquery);
        setNotSel(related);
        console.log(notSel);
        console.log("----------------------------");
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
        setSearchActive(false);
        setAISearch(false);
        resetHandler();
    };

    return (
        <div className='query-container'>
            {search ? (
                <Grid
                    className='search-grid'
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
                            onClick={() => {
                                reset();
                            }}
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
                            value={query}
                            freeSolo
                            multiple
                            autoComplete={true}
                            id='custom-autocomplete'
                            className='query-input'
                            options={vocab}
                            filterSelectedOptions={true}
                            onChange={(e, v, r) => {
                                console.log(query);
                                console.log(v);
                                const t = query.filter((w) => !v.includes(w));
                                if (related.includes(t[0])) {
                                    setCount(count - 1);
                                    console.log("decreasing count");
                                }
                                console.log("t: ", t);
                                setQuery(v);
                                setInterValue(query);
                                console.log(r);
                            }}
                            renderInput={(params) => (
                                <CustomTextField
                                    ref={testRef}
                                    {...params}
                                    placeholder={
                                        query.length === 0
                                            ? aisearch
                                                ? "Enhanced search"
                                                : "Regular search"
                                            : null
                                    }
                                    margin='normal'
                                    variant='outlined'
                                    onKeyPress={(e) => {
                                        handleEnter(e);
                                    }}
                                    onClick={(e) => {
                                        console.log("clicked text", query);
                                        const temp = related.filter(
                                            (t) => !query.includes(t)
                                        );
                                        setNotSel(temp);
                                        console.log("not selected", notSel);
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: "text",
                                        value: interValue,
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
                    {related.length > count ? (
                        <Grid
                            item
                            container
                            alignItems='center'
                            justify='center'
                            ref={relatedRef}
                        >
                            <Grid
                                item
                                xs={10}
                                container
                                style={{
                                    backgroundColor: "darkgrey",
                                    alignItems: "center",
                                    borderRadius: "5pt",
                                    borderBottomLeftRadius: "1pt",
                                    borderBottomRightRadius: "1pt",
                                    marginTop: "3%",
                                }}
                            >
                                <Grid item>
                                    <label
                                        style={{
                                            fontStyle: "italic",
                                            color: "darkslategray",
                                            fontSize: "13pt",
                                            width: "100%",
                                            padding: "7pt",
                                            lineHeight: "25pt",
                                        }}
                                    >
                                        You might also be looking for:
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item xs={10} container>
                                <List
                                    style={{
                                        backgroundColor: "darkGrey",
                                        borderRadius: "5pt",
                                        borderTopLeftRadius: "1pt",
                                        borderTopRightRadius: "1pt",
                                        width: "100%",
                                        marginTop: "4px",
                                    }}
                                >
                                    {related.map((term) =>
                                        !interValue.includes(term) ||
                                        !query.includes(term) ? (
                                            <ListItem
                                                button
                                                onClick={() => {
                                                    console.log(
                                                        testRef.current
                                                            .innerText
                                                    );
                                                    console.log(query);
                                                    const temp = query;
                                                    temp.push(term);
                                                    setInterValue(temp);
                                                    testRef.current.click();
                                                    setCount(count + 1);
                                                }}
                                            >
                                                {term}
                                            </ListItem>
                                        ) : null
                                    )}
                                </List>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            ) : (
                <div className='selector-group'>
                    <header className='welcome-message'>
                        How would like to search?
                    </header>
                    <ButtonGroup name='search-selector'>
                        <Button1
                            onClick={() => {
                                setSearchActive(true);
                                setEndpoint("search/?query=");
                                getSuggestions();
                            }}
                        >
                            Regular
                        </Button1>
                        <Button1
                            onClick={() => {
                                setSearchActive(true);
                                setAISearch(true);
                                setEndpoint("search/ranked?query=");
                                getSuggestions();
                            }}
                        >
                            Enhanced
                        </Button1>
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
}

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
