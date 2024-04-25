class ApiFeatures {
  constructor(products,query) {
    this.query = query;
   this.products = products;
  }

  search() {
    if (!this.query.keyword||this.query.keyword?.trim()==="") return this;

    const keyword = this.query.keyword.toLowerCase();
    this.products = this.products.filter(product => product?.name?.toLowerCase().includes(keyword));
    return this;
    
  }

  filter() {
    if (!this.query.category||this.query.category?.trim()==="") return this;
  const category = this.query.category;
   
   this.products = this.products.filter(product=>product?.category===category);
  
   const maxPrice = parseInt(this.query.max_price);
   const minPrice = parseInt(this.query.min_price);
   if(typeof(maxPrice)==="number"&&typeof(minPrice)==="number"){
   this.products = this.products.filter(product=>{
    return product?.price<=maxPrice&&product.price>=minPrice
   })
  }

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.query.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
   
    this.products = this.products.slice(skip, skip + resultPerPage);
    return this;
  }
}

module.exports = ApiFeatures;