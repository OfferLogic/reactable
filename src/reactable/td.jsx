import React from 'react';
import { isReactComponent } from './lib/is_react_component';
import { stringable } from './lib/stringable';
import { isUnsafe } from './unsafe';
import { filterPropsFrom } from './lib/filter_props_from';

export class Td extends React.Component {
    constructor (props) {
        super(props);

        this.stringifyIfNotReactComponent = this.stringifyIfNotReactComponent.bind(this);
    }

    stringifyIfNotReactComponent(object) {
        if(!isReactComponent(object) && stringable(object) && typeof object !== 'undefined') {
            return object.toString()
        }
        return null;
    }

    render() {
        // Attach any properties on the column to this Td object to allow things like custom event handlers
        let mergedProps = filterPropsFrom(this.props);
        if (typeof this.props.column === 'object') {
            for (let key in this.props.column) {
                if (key !== 'key' && key !== 'name') {
                    mergedProps[key] = this.props.column[key];
                }
            }
        }
        // handleClick aliases onClick event
        mergedProps.onClick = this.props.handleClick;

        let stringifiedChildProps;

        if (typeof this.props.data === 'undefined') {
            stringifiedChildProps = this.stringifyIfNotReactComponent(this.props.children)
        }

        if (isUnsafe(this.props.children)) {
            return <td {...mergedProps} dangerouslySetInnerHTML={{__html: this.props.children.toString()}}/>
        } else {
            return (
                <td {...mergedProps}>
                    {stringifiedChildProps || this.props.children}
                </td>
            );
        }
    }
}
