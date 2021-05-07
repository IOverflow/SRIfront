import React, { Component } from "react";
import "./document.styles.css";

const Title = (props) => <h3 className='doc-title'>{props.children}</h3>;
const Description = (props) => <p className='doc-descrp'>{props.children}</p>;
export const Dismiss = () => <button className='doc-dismiss'>Dis</button>;

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
    };

    constructor(props) {
        super();
        this.state.docData = props.doc;
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
            <div className='doc-container' onClick={() => this.handleClick()}>
                <Title>{this.state.docData.name}</Title>
                <Description>{this.state.docData.description}</Description>
                {this.state.showContent ? (
                    <Content>{this.state.docData}</Content>
                ) : null}
            </div>
        );
    }
}
export default Document;
