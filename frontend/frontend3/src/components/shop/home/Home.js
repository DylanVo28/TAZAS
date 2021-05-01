import { React } from 'react';
const MenuHome=()=>{
    return (
       <div className="sticky-wrapper">
         <div className="header sticky-header row">
           <div className="header-left col-2"><button className="mobile-menu-toggler"><span className="sr-only">Toggle mobile menu</span><i className="fas fa-search" /></button><div className="header-search header-search-extended header-search-visible d-none d-lg-block"><form action="#" method="get"><div className="header-search-wrapper search-wrapper-wide"><label htmlFor="q" className="sr-only">Search</label><input type="search" className="form-control" name="q" id="q" placeholder="Search product..." required /><a href="#" className="search-toggle" role="button"><i className="icon-search" /></a></div></form></div></div><div className="header-center text-center col-8"><p>Free Delivery For Members</p></div><div className="header-right col-2"><div className="account"><a href="dashboard.html" title="My account"><i className="far fa-user" /></a></div><div className="wishlist"><a href="wishlist.html" title="Wishlist"><i className="far fa-heart" /><span className="wishlist-count badge">3</span></a></div><div className="dropdown cart-dropdown"><div className="dropdown-link"><a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static"><i className="fas fa-shopping-cart" /><span className="cart-count badge">2</span></a></div><div className="dropdown-menu dropdown-menu-right"><div className="dropdown-cart-products"><div className="product"><div className="product-cart-details"><h4 className="product-title"><a href="product.html">Beige knitted elastic runner shoes</a></h4><span className="cart-product-info"><span className="cart-product-qty">1</span>x $84.00</span></div><figure className="product-image-container"><a href="product.html" className="product-image"><img src="assets/images/products/cart/product-1.jpg" alt="product" /></a></figure><a href="#" className="btn-remove" title="Remove Product"><i className="icon-close" /></a></div><div className="product"><div className="product-cart-details"><h4 className="product-title"><a href="product.html">Blue utility pinafore denim dress</a></h4><span className="cart-product-info"><span className="cart-product-qty">1</span>x $76.00</span></div><figure className="product-image-container"><a href="product.html" className="product-image"><img src="assets/images/products/cart/product-2.jpg" alt="product" /></a></figure><a href="#" className="btn-remove" title="Remove Product"><i className="icon-close" /></a></div></div><div className="dropdown-cart-total"><span>Total</span><span className="cart-total-price">$160.00</span></div><div className="dropdown-cart-action"><a href="cart.html" className="btn btn-primary">View Cart</a><a href="checkout.html" className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right" /></a></div></div></div><p className="price">$ 164,00</p></div></div></div>

    )
}
const Home =()=>{
    return (
        <div className={'page-wrapper home'}>
            <div className={'container page-container'}>
                <MenuHome/>
            </div>
        </div>
    )
}
export default Home