import React, { Component, Fragment } from 'react';

import Modal from './../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null,
        }
    
        confirmError = () => {
            this.setState({error: null})
        }

        componentDidMount () {
            axiosInstance.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });

            axiosInstance.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            });
        }
    
        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error}
                        closeModal={this.confirmError}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;