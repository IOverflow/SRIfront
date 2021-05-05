import React from 'react';
import { Document } from '../document/document.component';
import './document-list.styles.css';

export const DocList = (props) => (
    <div className='doc-list'>
        {props.docs.map((doc) => (
            <Document key={doc.id} doc={doc} />
        ))}
    </div>
);
