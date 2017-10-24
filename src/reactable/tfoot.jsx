import React from 'react';

export class Tfoot extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return <tfoot {...this.props} />;
    }
}

