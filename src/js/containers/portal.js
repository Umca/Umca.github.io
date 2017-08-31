import React from 'react';
import { render } from 'react-dom';
import '../../styles/portal.css'

export default class Portal extends React.Component {
    constructor() {
        super();
        this.portalElement = null
    }

    componentDidMount() {
        var p = this.props.portalId && document.getElementById(this.props.portalId);
        if (!p) {
            var p = document.createElement('div');
            p.id = this.props.portalId;
            document.body.querySelector('#portal').appendChild(p);
        }
        this.portalElement = p;
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    componentDidUpdate() {
        render(
            <div {...this.props}>{this.props.children}</div>,
            this.portalElement
        );
    }

    render() {
        return null;
    }
};