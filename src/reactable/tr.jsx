import React from 'react';
import { Td } from './td';
import { toArray } from './lib/to_array';
import { filterPropsFrom } from './lib/filter_props_from';

export class Tr extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        let children = toArray(React.Children.children(this.props.children));

        if (this.props.data && this.props.columns && typeof this.props.columns.map === 'function') {
            if (typeof children.concat === 'undefined') { console.log(children); }

            children = children.concat(this.props.columns.map(({ props = {}, ...column}, i) => {
                if (this.props.data.hasOwnProperty(column.key)) {
                    let value = this.props.data[column.key];

                    if (typeof value !== 'undefined' && value !== null && value.__reactableMeta === true) {
                        props = value.props;
                        value = value.value;
                    }

                    return <Td column={column} key={column.key} {...props}>{value}</Td>;
                } else {
                    return <Td column={column} key={column.key} />;
                }
            }));
        }

        // Manually transfer props
        let props = filterPropsFrom(this.props);

            //TODO: Replace this factory
        //return React.DOM.tr(props, children);
        return (
            <tr {...props}>{children}</tr>
        );
    }
}

Tr.childNode = Td;
Tr.dataType = 'object';

