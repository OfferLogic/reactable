import { stringable } from './stringable';

export function extractDataFrom(key, column) {
    let value = (typeof key !== 'undefined' && key !== null && key.__reactableMeta === true) ? key.data[column] : key[column];

    if (typeof value !== 'undefined' && value !== null && value.__reactableMeta === true) {
        value = (typeof value.props.value !== 'undefined' && value.props.value !== null) ? value.props.value : value.value;
    }

    return (stringable(value) ? value : '');
}
