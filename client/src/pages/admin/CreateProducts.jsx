import React, { useEffect, useState } from "react";
import { Avatar, TextField } from "@mui/material";
import Metadata from "../../components/layout/MetaData";
import toast from "react-hot-toast";
import { createProduct } from "../../api/productsAdmin";
import { useNavigate } from "react-router-dom";
import Categories from "../../components/product/Categories";
import Form from "../../components/Form";
import { categories } from "../../data/productCategories";

function CreateProduct() {

  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading,setLoading] = useState(false);
   
  const createProductSubmitHandler =async (e) => {
    e.preventDefault();
   setLoading(true);
    
    const myData={
      name,
      price,
      description,
      category,
      stock,
      images,
    }
   

   
    
     try{
         await createProduct(myData);
          toast.success("Product created successfully");
     }
     catch(err){
       toast.error(err.message);
     }
      setName("");
      setPrice(0);
      setStock(0);
      setCategory("");
      setDescription("");
      setLoading(false);
  };



  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Metadata title="Product - create" />
      <Form
        onSubmit={createProductSubmitHandler}
        buttonText={"Create"}
        title={"Create Product"}
        buttonDisable={loading}
      >
       
          <TextField
            
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            fullWidth
          />
       

        <div className="mb-4">
          <Categories
            categories={categories}
            onChange={(v) => setCategory(v)}
            value={category}
          />
        </div>

      
          <TextField
           
            type="number"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            label = "Stock"
            fullWidth
          />
        

        
          <TextField
          
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label = "Price"
            fullWidth
          />
       

      
          <textarea
            id="description"
            name="description"
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Description"
          />
       

        <div className="mb-4 flex gap-3 items-center flex-col">
          <input
            id="images"
            name="images"
            type="file"
            onChange={createProductImagesChange}
            placeholder="images"
            accept="image/*"
            multiple
          />

          <label htmlFor="images" className="flex gap-2 flex-wrap">
            {imagesPreview.map((image) => {
              return <Avatar src={image} alt="u" key={image} />;
            })}
          </label>
        </div>
      </Form>
    </>
  );
}

export default CreateProduct;
