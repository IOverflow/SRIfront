import React, { useState } from "react";
import "./document-list.styles.css";
import Document from "../document/document.component";
import { List, withStyles } from "@material-ui/core";

export const DocList = ({ docs, documentDeleteHandler }) => {
    // const [data, setData] = useState(docs);

    // const documentDeleteHandler = (docid) => {
    //     docs.filter((doc) => doc.id !== docid);
    // };
    return docs.length ? (
        <MyList>
            {docs.length ? <h2>Results</h2> : null}
            {docs.map((doc) => (
                <div>
                    <Document
                        iddoc={doc.id}
                        doc={doc}
                        handleDelete={documentDeleteHandler}
                    />
                </div>
            ))}
        </MyList>
    ) : null;
};

const MyList = withStyles({
    root: { width: "60%", alignSelf: "center" },
})(List);
