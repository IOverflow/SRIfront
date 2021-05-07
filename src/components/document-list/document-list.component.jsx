import React from "react";
import "./document-list.styles.css";
import Document, { Dismiss } from "../document/document.component";

export const DocList = ({ docs }) => {
    return docs.length ? (
        <div className='doc-list'>
            {docs.length ? <h2>Results</h2> : null}
            {docs.map((doc) => (
                <Document key={doc.id} doc={doc} />
            ))}
        </div>
    ) : null;
};
