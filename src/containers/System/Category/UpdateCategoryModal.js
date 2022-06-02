import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter} from "../../../utils/emitter";
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ModalUpdateCategory extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            categoryName: '',
            categoryDescription: '',
            categoryOrdering: '',
            status: ''
        }
    }


    
    componentDidMount() {
        let category = this.props.currentCategory;
        if(category && !_.isEmpty(category))
        {
            this.setState({
                id: category.id,
                categoryName: category.categoryName,
                categoryDescription: category.categoryDescription,
                categoryOrdering: category.categoryOrdering,
                status: category.status
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, index) => {
        let prevState = {...this.state};
        prevState[index] = event.target.value;
        this.setState({
            ...prevState
        })
    }
    
    handleUpdateCategory = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
        this.props.updateCategoryFromReact(this.state);   
        }    
    }    
    checkValideInput = () => {
        let isValid = true;
        let i=0;
        let arrInput = ['categoryName','categoryDescription','categoryOrdering','parentId'];
        
        for(i = 0; i < arrInput.length; i++){
            //console.log('check inside loop', this.state[arrInput[i],arrInput[i]])
            if(!this.state[arrInput[i]]){
                isValid = false;
                toast.success('Thêm không thành công vì thiếu info' , {
                    position: "bottom-center",
                    width: 400,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                break;
            }
        }}
    render() {
        return (
            <Modal                 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}} 
                className={'modal-category-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Update Category</ModalHeader>
                <ModalBody>
                    <div className="modal-category-body">
                        <div className="input-container">
                            <label>Category name: <span class="required">*</span></label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "categoryName")}}
                                value={this.state.categoryName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Description: <span class="required">*</span></label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "categoryDescription")}}
                                value={this.state.categoryDescription}
                            />
                        </div>
                        <div className="input-container">
                            <label>Ordering: </label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "categoryOrdering")}}
                                value={this.state.categoryOrdering}
                            />
                        </div>
                        <div className="input-container">
                            <label>Status: <span class="required">*</span></label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "status")}}
                                value={this.state.status}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        className="px-3" 
                        onClick={()=>{this.handleUpdateCategory()}}>Update</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={()=>{this.toggle()}}>Cancel</Button>

                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateCategory);