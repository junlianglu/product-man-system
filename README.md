authController.js  
loginUserController()  
signupUserController()  // need to create a new cart  
sendResetLinkController()

authService.js  
loginUser({ email, password })  
signupUser({ email, password, isAdmin })  
sendResetLink({ userId, email })

productController.js  
createProductController()  
getProductByIdController()  
getAllProductsController()  
updateProductByIdController()  
deleteProductByIdController()

productService.js  
createProduct({ userId, productData })  
getProductById({ productId })  
getAllProducts()  
updateProductById({ userId, productId, productData })  
deleteProductById({ userId, productId})

cartController.js  
getCartWithSummaryController()  
addToCartController()  
updateItemQuantityController()  
applyDiscountCodeController()

cartService.js:  
DISCOUNT\_CODES \= {  
  ‘20 DOLLAR OFF’: {  
    type: 'amount',  
    value: 20  
  },  
  ‘20 PERCENT OFF’: {  
    type: 'percentage',  
    value: 0.2  
  },  
}

const isObjectIdValid \= id \=\> mongoose.Types.ObjectId.isValid(id);

getCartWithSummary({ userId })  // return object: { cart, summary: { subtotal, discount, tax, total } }  
addToCart({ userId, productId, quantity })  
updateItemQuantity({ userId, productId, quantity })  
applyDiscountCode({ userId, discountCode })

product\_management/  
└── backend/  
    ├── controllers/  
    │   └── authController.js  
    │   └── productController.js  
    │   └── cartController.js  
    ├── services/  
    │   └── authService.js  
    │   └── productService.js  
    │   └── cartService.js  
    ├── routes/  
    │   └── authRoutes.js  
    │   └── productRoutes.js  
    │   └── cartRoutes.js  
    ├── models/  
    │   └── User.js  
    │   └── Product.js  
    │   └── Cart.js  
    ├── middlewares/  
    │   └── authMiddleware.js
    ├── utils/  
    │   └── hashPassword.js
    ├── config/  
    │   └── db.js
    ├── app.js
    ├── server.js
    └── .env

Models: 

* User  
  * email: { String, unique, required, lowercase, trim, match: /.+@.+\\..+/ }  
  * password: { String, required, minlength: 6 }  
  * isAdmin: { Boolean, default: false}  
  * products: \[{ type: mongoose.Schema.Types.ObjectId, ref: ‘Product’, required }\], default: \[\]  
  * cart: { type: mongoose.Schema.Types.ObjectId, ref: ‘Cart’ }  
* Product  
  * name: { String, required }  
  * description: { String, required }  
  * category: { String, enum: \['electronics', 'clothing', 'books', 'beauty', 'home', 'sports'\], required, default 'electronics' }  
  * price: { Number (non-positive), required }  
  * stock: { Number (non-positive integer), required }  
  * imageURL: { String, required }  
  * admin: { type: mongoose.Schema.Types.ObjectId, ref: ‘User’, required }  
* Cart: TAX\_RATE\_BUCKETS \= \[0, 0.05, 0.1\];  
  * items: \[{ 

    { product: type: mongoose.Schema.Types.ObjectId, ref: ‘Product’, required },

    	{ quantity: Number (positive integer), min: 1, required: true }

    }\], default: \[\]

  * taxRate: { Number, enum: TAX\_RATE\_BUCKETS, required, default random }  
  * discountCode: { String, default: null } updated when applied valid discount code  
  * user: { type: mongoose.Schema.Types.ObjectId, ref: ‘User’, required }

