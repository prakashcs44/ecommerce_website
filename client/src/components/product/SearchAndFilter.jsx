import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, Typography } from '@mui/material';
import Categories from './Categories';
import { categories } from '../../data/productCategories';
import PriceFilter from './PriceFilter';
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,setCategory,setPage,setPrice,setKeyword} from "../../redux/slices/productSlice";
function SearchAndFilter() {

    const {keyword,price,category} = useSelector(state=>state.product);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    

    const applyFilters = ()=>{
         dispatch(setPage(1));
         dispatch(getProducts({keyword,category,price,page:1}));
         setOpen(false);
    }

    const resetFilters = ()=>{
        dispatch(setPage(1));
        dispatch(setKeyword(""));
        dispatch(setPrice([100,40000]));
        dispatch(setCategory(""));
        dispatch(getProducts({}));
        setOpen(false);
    }

  return (
    <div className="flex flex-col items-center justify-center py-5 gap-10 sm:flex-row my-10">
      <div>
        <Button
          startIcon={<FilterAltIcon />}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          Filters
        </Button>
        <Dialog onClose={() => setOpen(false)} open={open}>
          <div className=" w-[30vw] py-5 h-[50vh] flex flex-col gap-9">
            <div className="flex flex-col items-center gap-3">
              <Typography variant="h5">Select Category</Typography>
              <Categories
                categories={categories}
                onChange={(ev) => dispatch(setCategory(ev.target.value))}
                value={category}
              />
            </div>

            <div>
              <PriceFilter
                max={40000}
                min={100}
                value={price}
                onChange={(value) => dispatch(setPrice(value))}
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button variant="contained" onClick={applyFilters}>Apply</Button>
              <Button variant="outlined" color="error" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
      <Search
        value={keyword}
        onChange={(ev) => dispatch(setKeyword(ev.target.value))}
        onSearch={()=>dispatch(getProducts({keyword,category,price,page:1}))}
       
      />
    </div>
  );
}

export default SearchAndFilter;
