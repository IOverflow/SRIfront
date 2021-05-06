import React, { Component } from "react";
import "./document.styles.css";

const Title = (props) => <h3 className='doc-title'>{props.children}</h3>;
const Description = (props) => <p className='doc-descrp'>{props.children}</p>;
const Dismiss = () => <button className='doc-dismiss'>Dis</button>;

const Content = (props) => (
    <div className='doc-content' justify-content='left'>
        <h5>Symptoms</h5>
        <p>{props.children.symptoms}</p>
        <h5>Treatment</h5>
        <p>{props.children.treatment}</p>
    </div>
);

export const Document1 = (props) => {
    return (
        <div className='doc-container'>
            <Title>{props.doc.disease}</Title>
            <Description>{props.doc.description}</Description>
            <Dismiss></Dismiss>
        </div>
    );
};

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
                <Title>{this.state.docData.disease}</Title>
                <Description>{this.state.docData.description}</Description>
                <Dismiss></Dismiss>
                {this.state.showContent ? (
                    <Content>{this.state.docData}</Content>
                ) : null}
            </div>
        );
    }
}
export default Document;
