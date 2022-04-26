import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            
            productName: '',
            productPrice: '',
            productImage: '',
            productDescription: '',
            productShortDescription: '',
            productCategoryId: '',
            productSaleOff: '',
          
        }
    }

    componentDidMount() {
       

    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        //bad code
        // this.state[id]=event.target.value;
        // this.setState({
        //      ...this.state
        // }, ()=> {
        //     console.log('check bad state: ',this.state)
        // })
        //good code
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        //console.log(event.target.value, id)
    }

    checkValideInput = () => {
        let isValid = true;
        let i=0;
        let arrInput = ['productName','productPrice','productImage','productDescription','productShortDescription','productCategoryId','productSaleOff'];
        
        for(i = 0; i < arrInput.length; i++){
            //console.log('check inside loop', this.state[arrInput[i],arrInput[i]])
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewProduct = () => {
        window.location.reload();
        let isValid = this.checkValideInput();
        if(isValid === true){
            //call api create modal
            this.props.createNewProduct(this.state);
        }
        
    }
    
    handleEditProduct = () => {
        let isValid = this.checkValideInput();
        if(isValid === true){
            //call api create modal
            this.props.editProduct(this.state);
        }
        
    }    

    render() {
        return (
            <Modal 
                
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}} 
                className={'modal-news-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Create product</ModalHeader>
                <ModalBody>
                    <div className="modal-news-body">
                        <div className="input-container">
                            <label>productName</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productName")}}
                                value={this.state.productName}
                            />
                        </div>
                        <div className="input-container">
                            <label>productPrice</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productPrice")}}
                                value={this.state.productPrice}
                            />
                        </div>
                        <div className="input-container">
                            <label>productImage</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productImage")}}
                                value={this.state.productImage}
                            />
                        </div>
                        <div className="input-container">
                            <label>productDescription</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productDescription")}}
                                value={this.state.productDescription}
                            />
                        </div>
                        <div className="input-container">
                            <label>productShortDescription</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productShortDescription")}}
                                value={this.state.productShortDescription}
                            />
                        </div>
                        <div className="input-container">
                            <label>productCategoryId</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productCategoryId")}}
                                value={this.state.productCategoryId}
                            />
                        </div>
                        <div className="input-container">
                            <label>productSaleOff</label>
                            <input 
                                type="text" 
                                onChange={(event)=> {this.handleOnChangeInput(event, "productSaleOff")}}
                                value={this.state.productSaleOff}
                            />
                        </div>
                       
           
                    </div>
                </ModalBody>
                <ModalFooter                 
                    // isCreate={this.props.isCreate}
                    // isEdit={this.props.isEdit}

                >
                    
                    <Button 
                        color="primary" 
                        className="px-3" 
                        onClick={()=>{this.handleAddNewProduct()}}>Create</Button>{' '}
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
