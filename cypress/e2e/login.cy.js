describe('Instagram Tests', () => {

  // Cargar datos de usuario antes de cada prueba
  beforeEach(function () {
    cy.fixture('users').then(function (data) {
      this.data = data;
    });
  });

  // Tests de Login
  describe('Instagram Login Tests', () => {

    it('Should successfully log in with valid credentials', function () {
      cy.visit('https://www.instagram.com/accounts/login/?source=auth_switcher');
      
      cy.get('input[aria-label="Phone number, username, or email"]', { timeout: 10000 })
        .should('be.visible')
        .type(this.data.validUser.username);
  
      cy.get('input[aria-label="Password"]', { timeout: 10000 })
        .should('be.visible')
        .type(this.data.validUser.password);
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/home');
    });
  
    it('Should show error with invalid credentials', function () {
      cy.visit('https://www.instagram.com/accounts/login/?source=auth_switcher');
  
      cy.get('input[aria-label="Phone number, username, or email"]', { timeout: 10000 })
        .should('be.visible')
        .type(this.data.invalidUser.username);
  
      cy.get('input[aria-label="Password"]', { timeout: 10000 })
        .should('be.visible')
        .type(this.data.invalidUser.password);
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Sorry, your password was incorrect.').should('be.visible');
    });
  });

  // Tests de Registro
  describe('Instagram Signup Tests', () => {
  
    it('Should successfully create a new account', function () {
      cy.visit('https://www.instagram.com/accounts/emailsignup/');
      cy.get('input[name="emailOrPhone"]').type(this.data.newUser.email);
      cy.get('input[name="fullName"]').type(this.data.newUser.fullName);
      cy.get('input[name="username"]').type(this.data.newUser.username);
      cy.get('input[name="password"]').type(this.data.newUser.password);
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/welcome');
    });
  
    it('Should display error message for existing email', function () {
      cy.visit('https://www.instagram.com/accounts/emailsignup/');
      cy.get('input[name="emailOrPhone"]').type(this.data.existingUser.email);
      cy.get('input[name="fullName"]').type(this.data.existingUser.fullName);
      cy.get('input[name="username"]').type(this.data.existingUser.username);
      cy.get('input[name="password"]').type(this.data.existingUser.password);
      cy.get('button[type="submit"]').click();
      
      cy.contains('That email is already in use').should('be.visible');
    });
  });

  // Tests de Recuperación de Contraseña
  describe('Instagram Password Recovery Tests', () => {
  
    it('Should send password recovery email for valid email', function () {
      cy.visit('https://www.instagram.com/accounts/password/reset/');
      cy.get('input[name="emailOrUsername"]').type(this.data.validUser.email);
      cy.get('button[type="submit"]').click();
      
      cy.contains('We’ve sent you an email with a link to reset your password.').should('be.visible');
    });
  
    it('Should display error for non-existing email', function () {
      cy.visit('https://www.instagram.com/accounts/password/reset/');
      cy.get('input[name="emailOrUsername"]').type(this.data.nonExistentUser.email);
      cy.get('button[type="submit"]').click();
      
      cy.contains('No account found with that email.').should('be.visible');
    });
  });

  // Tests de Actualización de Perfil
  describe('Instagram Profile Update Tests', () => {
  
    it('Should update user profile successfully', function () {
      cy.visit('https://www.instagram.com/accounts/edit/');
      cy.get('input[name="name"]').clear().type('Updated User');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Profile updated successfully').should('be.visible');
    });
  
    it('Should display error for invalid email update', function () {
      cy.visit('https://www.instagram.com/accounts/edit/');
      cy.get('input[name="email"]').clear().type('invalid-email');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Please enter a valid email address.').should('be.visible');
    });
  });
});


