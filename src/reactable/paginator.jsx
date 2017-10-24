import React from 'react';

export class Paginator extends React.Component {
    constructor (props) {
        super(props);

        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        //this.handlePageButton = this.handlePageButton.bind(this);
        this.renderPrevious = this.renderPrevious.bind(this);
        this.renderPageButton = this.renderPageButton.bind(this);
        this.pageHref = this.pageHref.bind(this);
    }

    pageHref(num) {
        return `#page-${num + 1}`
    }

    handlePrevious(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.currentPage - 1)
    }

    handleNext(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.currentPage + 1);
    }

    handlePageButton(page, e) {
        e.preventDefault();
        this.props.onPageChange(page);
    }

    renderPrevious() {
        if(this.props.currentPage > 0) {
            return (
                <a className='reactable-previous-page'
                    href={this.pageHref(this.props.currentPage - 1)}
                    onClick={this.handlePrevious}>
                    {this.props.previousPageLabel || 'Previous'}
                </a>
            );
        }
    }

    renderNext() {
        if(this.props.currentPage < this.props.numPages - 1) {
            return (
                <a className='reactable-next-page'
                    href={this.pageHref(this.props.currentPage + 1)}
                    onClick={this.handleNext}>
                    {this.props.nextPageLabel || 'Next'}
                </a>
            );
        }
    }

    renderPageButton(className, pageNum) {
        return (
            <a className={className}
                key={pageNum}
                href={this.pageHref(pageNum)}
                onClick={this.handlePageButton.bind(this, pageNum)}>
                {pageNum + 1}
            </a>
        );
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Paginator');
        }

        if (typeof this.props.numPages === 'undefined') {
            throw new TypeError('Must pass a non-zero numPages argument to Paginator');
        }

        if (typeof this.props.currentPage === 'undefined') {
            throw new TypeError('Must pass a currentPage argument to Paginator');
        }

        let pageButtons = [],
            pageButtonLimit = this.props.pageButtonLimit,
            currentPage = this.props.currentPage,
            numPages = this.props.numPages,
            lowerHalf = Math.round( pageButtonLimit / 2 ),
            upperHalf = (pageButtonLimit - lowerHalf);

        for (let i = 0; i < this.props.numPages; i++) {
            let pageNum = i,
                className = "reactable-page-button";
            if (currentPage === i) {
                className += " reactable-current-page";
            }
            pageButtons.push( this.renderPageButton(className, pageNum));
        }

        if(currentPage - pageButtonLimit + lowerHalf > 0) {
            if(currentPage > numPages - lowerHalf) {
                pageButtons.splice(0, numPages - pageButtonLimit)
            } else {
                pageButtons.splice(0, currentPage - pageButtonLimit + lowerHalf);
            }
        }

        if((numPages - currentPage) > upperHalf) {
            pageButtons.splice(pageButtonLimit, pageButtons.length - pageButtonLimit);
        }

        return (
            <tbody className="reactable-pagination">
                <tr>
                    <td colSpan={this.props.colSpan}>
                        {this.renderPrevious()}
                        {pageButtons}
                        {this.renderNext()}
                    </td>
                </tr>
            </tbody>
        );
    }
}

