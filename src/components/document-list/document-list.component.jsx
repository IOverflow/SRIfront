import React from "react";
import "./document-list.styles.css";
import { MyDocument } from "../document/document.component";
import { List, withStyles } from "@material-ui/core";

export const DocList = ({ docs }) => {
    const MyList = withStyles({
        root: {
            width: "60%",
            alignSelf: "center",
            alignItems: "center",
        },
    })(List);

    return docs.length ? (
        <MyList>
            {docs.length ? (
                <h2 className='doc-result-header'>Results</h2>
            ) : null}
            {docs.map((doc) => (
                <div>
                    <MyDocument key={doc.id} doc={doc} />
                </div>
            ))}
        </MyList>
    ) : null;
};
