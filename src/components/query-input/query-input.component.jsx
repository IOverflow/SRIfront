import React, { Component } from 'react';
import './query-input.styles.css';

export const QueryInput = () => (
    <div className='query-container'>
        {/* <label for='query-search' className='query-label'>
            Search
        </label> */}
        <InputLabel />
        <input
            type='search'
            name='query'
            id='query-search'
            className='query-input'
        ></input>
        {/* <button className='query-button'>Go</button> */}
        <GoButton />
    </div>
);

// const GoButton = () => <button className='query-button'>Buscar</button>;

const InputLabel = () => (
    <label className='query-label' align='justify'>
        Search
    </label>
);

class GoButton extends Component {
    render() {
        return <button className='query-button'>Buscar</button>;
    }
}
