export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your Username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "tops", label: "Top" },
      { id: "bottoms", label: "Bottom" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "saya", label: "Saya" },
      { id: "bonanza", label: "Bonanza" },
      { id: "miniso", label: "Miniso" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (discounted)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "tops",
    label: "Tops",
    path: "/shop/listing?category=tops",
  },
  {
    id: "bottoms",
    label: "Bottoms",
    path: "/shop/listing?category=bottoms",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing?category=footwear",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing?category=accessories",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];


export const categoryOptionsMap = {
  tops:"Top",
  bottoms:"Bottom",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  saya: "Saya",
  bonanza: "Bonanza",
  miniso: "Miniso",
};

export const filterOptions = {
  category: [
    { id: "tops", label: "Top" },
    { id: "bottoms", label: "Bottom" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "saya", label: "Saya" },
    { id: "bonanza", label: "Bonanza" },
    { id: "miniso", label: "Miniso" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Ascending" },
  { id: "title-ztoa", label: "Descending" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
