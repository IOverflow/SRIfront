import {
    Collapse,
    Grid,
    IconButton,
    Paper,
    Slide,
    withStyles,
} from "@material-ui/core";
import { Delete, ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { Component } from "react";
import "./document.styles.css";

const Title = (props) => <h3 className='doc-title'>{props.children}</h3>;
const Description = (props) => <p className='doc-descrp'>{props.children}</p>;

const Content = (props) => (
    <div className='doc-content' justify-content='left'>
        {props.children.symptoms.length ? <h5>Symptoms</h5> : null}
        <p>{props.children.symptoms}</p>
        {props.children.treatment.length ? <h5>Treatment</h5> : null}
        <p>{props.children.treatment}</p>
    </div>
);

class Document extends Component {
    state = {
        docData: [],
        showContent: false,
        deleted: false,
        unmount: false,
    };

    constructor({ iddoc, doc, handleDelete }) {
        super();
        this.docId = iddoc;
        this.state.docData = doc;
        this.deleteDoc = handleDelete;
    }

    handleClick() {
        if (this.state.showContent) {
            this.setState({ showContent: false });
        } else {
            this.setState({ showContent: true });
        }
    }

    render() {
        return (
            <Slide
                id='slide'
                direction='left'
                in={!this.state.deleted}
                unmountOnExit={true}
                timeout={{ appear: 0, enter: 0, exit: 700 }}
            >
                <Grid
                    container
                    spacing={7}
                    alignItems='center'
                    justify='center'
                >
                    <Grid item xs={12}>
                        <Paper
                            variant='elevation'
                            elevation={3}
                            alignItems='center'
                        >
                            <Grid container>
                                <Grid item xs={11}>
                                    <Title>{this.state.docData.name}</Title>
                                </Grid>
                                <Grid item xs={1} container justify='flex-end'>
                                    <IconButton
                                        onClick={() =>
                                            this.setState({ deleted: true })
                                        }
                                    >
                                        <Delete htmlColor='grey' />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <IconButton
                                        onClick={() => this.handleClick()}
                                    >
                                        {this.state.showContent ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Description>
                                        {this.state.docData.description}
                                    </Description>
                                </Grid>
                                <Grid item xs={12}>
                                    <Collapse in={this.state.showContent}>
                                        <Content>{this.state.docData}</Content>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12} container justify='flex-end'>
                        <IconButton
                            onClick={() => this.setState({ deleted: true })}
                        >
                            <Delete htmlColor='grey' />
                        </IconButton>
                    </Grid> */}
                </Grid>
            </Slide>
        );
    }
}
export default Document;
