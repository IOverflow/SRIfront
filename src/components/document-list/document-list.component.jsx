import React from "react";
import "./document-list.styles.css";
import Document from "../document/document.component";

export const DocList = (props) => (
    <div className='doc-list'>
        <h2>Results</h2>
        {props.docs.map((doc) => (
            <Document key={doc.id} doc={doc} />
        ))}
    </div>
);
