import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import axios from "axios";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    price : 5,
    class: '',
    category: '',
    quantity: 6,
    picture: false,
    src: false,
    options1 : [
                          { value: 'Ladies', label: 'Ladies' },
                          { value: 'Men', label: 'Men' },
                          { value: 'Kids', label: 'Kids' },
                          { value: 'All', label: 'All' }

                        ],
    options2:[
                                      { value: 'All', label: 'All' }

                                    ],
    files: [],
    pic:""
  };

  handleChange1 = (selectedOption1) => {
    this.setState({
      class: selectedOption1.value
    });
       if(selectedOption1.value === 'Ladies'){
         this.setState({options2:[
                       { value: 'Dresses', label: 'Dresses' },
                       { value: 'Tops', label: 'Tops' },
                       { value: 'Shoes', label: 'Shoes' },
                       { value: 'Skirts', label: 'Skirts' },
                       { value: 'Trousers', label: 'Trousers' },
                       { value: 'Shirts & Blouses', label: 'Shirts & Blouses' },
                       { value: 'All', label: 'All' }
                     ]});
       }
       if(selectedOption1.value === 'Men'){
 this.setState({options2:[
                           { value: 'Tops & T-Shirts', label: 'Tops & T-Shirts' },
                       { value: 'Shoes', label: 'Shoes' },
                       { value: 'Jeans & Trousers', label: 'Jeans & Trousers' },
                       { value: 'Shirts', label: 'Shirts' },
                       { value: 'Jackets & Coats', label: 'Jackets & Coats' },
                       { value: 'Socks', label: 'Socks' },
                       { value: 'Blazers & Suits', label: 'Blazers & Suits' },
                       { value: 'All', label: 'All' }
                     ]});
       }
       if(selectedOption1.value === 'Kids'){
 this.setState({options2:[                        { value: 'Newborn', label: 'Newborn' },
                       { value: 'Girls 1 1/2 To 10 years', label: 'Girls 1 1/2 To 10 years' },
                       { value: 'Boys 1 1/2 To 10 years', label: 'Boys 1 1/2 To 10 years' },
                       { value: 'Girls 8 To 14+ years', label: 'Girls 8 To 14+ years' },
                       { value: 'Boys 8 To 14+ years', label: 'Boys 8 To 14+ years' },
                       { value: 'All', label: 'All' }
                     ]});
       }
   }
  handleChange2 = (selectedOption2) => {
    this.setState({
      category: selectedOption2.value
    });
    console.log(this.state.files);

   }

  handlePictureSelected(event) {
      var picture = event.target.files[0];
      var src = URL.createObjectURL(picture);

      this.setState({
        picture: picture,
        src: src
      });
      var formData = new FormData();

       formData.append("file", picture)
       formData.append("upload_preset","insta-clone")
       formData.append("cloud_name","nada2020")
       formData.append("api_key",'466459189789469');
       axios
         .post('https://api.cloudinary.com/v1_1/nada2020/image/upload', formData, {headers: {
             'Content-Type': 'multipart/form-data'
           }})
         .then(response =>{
           console.log(response);
           this.setState({
             src: response.data.url
           });
           console.log(this.state.src);

         }
         )
         .catch(error => console.log(error));

    }

    renderPreview() {

      if (this.state.src) {
        return <img className="preview-img" alt="Preview"src={this.state.src} width="200" height="200" />;
      } else {
        this.setState({ src: "http://simpleicon.com/wp-content/uploads/account.png" });
        return <img className="preview-img" src="http://simpleicon.com/wp-content/uploads/account.png" alt="Preview" width="200" height="200"/>;
      }
    }
    fileSelectedHandler = (e) => {
        this.setState({ files: [...this.state.files, ...e.target.files] });
          for (let i = 0; i < e.target.files.length; i++) {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", e.target.files[i]);
    formData.append("upload_preset","insta-clone")
    formData.append("cloud_name","nada2020")
    formData.append("api_key",'466459189789469');
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
     axios.post('https://api.cloudinary.com/v1_1/nada2020/image/upload', formData).then(response => {
       this.setState({ pic : this.state.pic + " "+ response.data.url });
      const data = response.data;
      const fileURL = data.secure_url // You should store this URL for future references in your app

      console.log(this.state.pic );
    }).catch(error => console.log(error));
  }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      price : this.state.price,
      class: this.state.class,
      category: this.state.category,
      quantity: this.state.quantity,
      mainPic: this.state.src,
      Pic: this.state.pic
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    const animatedComponents = makeAnimated();

    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>

            <div className="preview form-group text-center">
            {this.renderPreview()}
                    <div className="browse-button">
                        <i className="fa fa-pencil-alt"></i>
                        <input className="browse-input file-upload" type="file"  name="file"
                        data-cloudinary-field="image_id" accept="image/*"
                       data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
                        id="UploadedFile"
                        onChange={this.handlePictureSelected.bind(this)}/>
                    </div>
                    <span className="Error"></span>
                </div>

              <FormGroup>
                <Label for="itemName">Item name</Label>
                <Input
                  type="text"
                  name="name"
                  id="itemName"
                  placeholder="Add shopping item name"
                  onChange={this.onChange}
                />
                <input type="file" multiple onChange={this.fileSelectedHandler} accept="image/*" />

                <Label for="itemClass">Item class</Label>

                <Select
              onChange={this.handleChange1}
              id = "exampleFormControlSelect1"
              components={animatedComponents}
              placeholder="Select Class"
              name="colors"
              options={this.state.options1}
              className="form-control search-slt"
              classNamePrefix="select"
              />
                <Label for="itemCategory">Item category</Label>

                <Select
onChange={this.handleChange2}
id = "exampleFormControlSelect2"
components={animatedComponents}
placeholder="Select Category"
name="colors"
options={this.state.options2}
className="form-control search-slt"
classNamePrefix="select"
/>
                <Label for="itemPrice">Item price</Label>
                <Input
                  type="number" pattern="[0-9]*"
                  name="price"
                  id="itemPrice"
                  placeholder="Item price (number)"
                  onChange={this.onChange}
                />

                <Label for="itemquantity">Item quantity</Label>
                <Input
                  type="number" pattern="[0-9]*"
                  name="quantity"
                  id="itemquantity"
                  placeholder="Add shopping item quantity"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
