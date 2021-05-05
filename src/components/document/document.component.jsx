import React from 'react';

export const Document = (props) => (
    <div>
        <h3>{props.doc.disease}</h3>
        <h5>{props.doc.description}</h5>
    </div>
);
