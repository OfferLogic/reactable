import React from 'react';

export class FiltererInput extends React.Component {
    constructor (props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(evt) {
        this.props.onFilter(evt.target.value);
    }

    render() {
        return (
            <input
                type="text"
                className={this.props.className}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onKeyUp={this.onChange}
                onChange={this.onChange}
            />
        );
    }
}

export class Filterer extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Filterer');
        }

        return (
            <tr className="reactable-filterer">
                <td colSpan={this.props.colSpan}>
                    <FiltererInput
                        onFilter={this.props.onFilter}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        className={this.props.className ? 'reactable-filter-input ' + this.props.className : 'reactable-filter-input'}
                    />
                </td>
            </tr>
        );
    }
}

