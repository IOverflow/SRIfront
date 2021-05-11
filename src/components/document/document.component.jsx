import {
    Collapse,
    Grid,
    IconButton,
    Paper,
    Slide,
    withStyles,
} from "@material-ui/core";
import { Delete, ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import "./document.styles.css";

const Title = (props) => <h3 className='doc-title'>{props.children}</h3>;
const Description = (props) => <p className='doc-descrp'>{props.children}</p>;

const Content = (props) => (
    <div className='doc-content' justify-content='left'>
        {props.children.symptoms.length ? (
            <h4 className='doc-section-title'>Symptoms</h4>
        ) : null}
        <p className='doc-content-parag'>{props.children.symptoms}</p>
        {props.children.treatment.length ? (
            <h4 className='doc-section-title'>Treatment</h4>
        ) : null}
        <p className='doc-content-parag'>{props.children.treatment}</p>
    </div>
);

const MyPaper = withStyles({
    root: {
        backgroundColor: "lightGrey",
        alignItems: "center",
    },
})(Paper);

export const MyDocument = ({ doc }) => {
    const [thisState, setThisState] = useState({
        notDeleted: true,
        showContent: false,
    });

    const handleClick = () => {
        if (thisState.showContent) {
            setThisState({
                notDeleted: thisState.notDeleted,
                showContent: false,
            });
        } else {
            setThisState({
                notDeleted: thisState.notDeleted,
                showContent: true,
            });
        }
    };

    return (
        <Slide
            id='slide'
            direction='up'
            in={thisState.notDeleted}
            unmountOnExit={true}
            timeout={{ enter: 500, exit: 500 }}
        >
            <Grid container spacing={7} alignItems='center' justify='center'>
                <Grid item xs={12}>
                    <MyPaper variant='elevation' elevation={3}>
                        <Grid container>
                            <Grid item xs={11}>
                                <Title>{doc.name}</Title>
                            </Grid>
                            <Grid item xs={1} container justify='flex-end'>
                                <IconButton
                                    onClick={() => {
                                        setThisState({
                                            notDeleted: false,
                                            showContent: thisState.showContent,
                                        });
                                    }}
                                >
                                    <Delete htmlColor='grey' />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton onClick={() => handleClick()}>
                                    {thisState.showContent ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Description>{doc.description}</Description>
                            </Grid>
                            <Grid item xs={12}>
                                <Collapse in={thisState.showContent}>
                                    <Content>{doc}</Content>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </MyPaper>
                </Grid>
            </Grid>
        </Slide>
    );
};
