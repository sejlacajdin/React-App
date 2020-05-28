class Auth {
    constructor() {
      this.authenticated = false;
      this.token = null;
  
      if (localStorage.getItem("jwtToken") != null) {
        this.token = String(localStorage.getItem("jwtToken"));
        this.authenticated = true;
      }else{
        this.authenticated = false;

      }
    }
  
    login(token, redirectDasboard) {
      this.authenticated = true;
      this.token = token;
      localStorage.setItem("jwtToken", token);
      redirectDasboard();
    }
  
    logout(redirectLogin) {
      this.authenticated = false;
      localStorage.removeItem("jwtToken");
      redirectLogin();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  