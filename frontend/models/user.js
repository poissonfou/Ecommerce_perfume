class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.cart = [];
    this.loggedIn = false;
  }

  addToCart(product) {
    this.cart.push(product);
  }

  setLogStatus(value) {
    this.loggedIn = value;
    localStorage.setItem("isLoggedIn", JSON.stringify(value));
  }
}

module.exports = User;
