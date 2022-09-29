import React from 'react';
import ReactDOM from 'react-dom';

function getContainer (): HTMLDivElement {
    let container = document.getElementById('modals-container') as HTMLDivElement;
    if (!container) {
        container = document.createElement('div');
        container.id = 'modals-container';
        document.body.appendChild(container);
    }
    return container;
}

export class Portal extends React.Component {
    element = document.createElement('div');

    componentDidMount() {
        const modalContainer = getContainer();
        modalContainer.appendChild(this.element);
    }

    componentWillUnmount() {
        const modalContainer = getContainer();

        if (modalContainer) {
            modalContainer.removeChild(this.element);

            if (modalContainer.children.length === 0 && modalContainer.parentElement) {
                modalContainer.parentElement.removeChild(modalContainer);
            }
        }
    }

    render() {
        return (
            ReactDOM.createPortal(this.props.children, this.element)
        );
    }
}
