describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('user can login', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
    cy.get('#login-button').click()
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.localhost.com')
      //cy.contains('create').click()
      cy.get('#addBlog').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cypress',
          url: 'www.localhost.com',
        })
      })

      it('it can be liked', function () {
        cy.contains('another blog cypress').contains('view').click()

        cy.contains('another blog cypress').contains('like').click()
        cy.contains('another blog cypress').contains('likes 1')
      })

      it('it can be deleted by the creater', function () {
        cy.contains('another blog cypress').contains('view').click()

        cy.contains('another blog cypress').contains('remove').click()

        cy.get('#blogs').should('not.contain', 'another blog cypress')
      })

      it('it can NOT be deleted by a random user', function () {
        const randomUser = {
          name: 'John Doe',
          username: 'johnny',
          password: 'donny',
        }

        cy.request('POST', 'http://localhost:3003/api/users/', randomUser)
        cy.login({ username: 'johnny', password: 'donny' })

        cy.contains('another blog cypress').contains('view').click()

        cy.get('#blogs').should('not.contain', 'remove')
      })
    })

    describe('and multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cypress',
          url: 'www.localhost.com',
        })
        cy.createBlog({
          title: 'another blog cypress2',
          author: 'cypress',
          url: 'www.localhost.com',
        })
        cy.createBlog({
          title: 'another blog cypress3',
          author: 'cypress',
          url: 'www.localhost.com',
        })
      })

      it('it shows the blogs according to likes (most to least)', function () {
        cy.contains('another blog cypress').contains('view').click()
        cy.contains('another blog cypress').contains('like').click()
        cy.contains('another blog cypress').contains('likes 1')

        cy.contains('another blog cypress2').contains('view').click()
        cy.contains('another blog cypress2').contains('like').click()
        cy.contains('another blog cypress2').contains('like').click()
        cy.contains('another blog cypress2').contains('like').click()
        cy.contains('another blog cypress2').contains('likes 3')

        cy.contains('another blog cypress3').contains('view').click()
        cy.contains('another blog cypress3').contains('likes 0')

        cy.visit('http://localhost:3000')
        cy.get('.blogContent').eq(0).should('contain', 'another blog cypress2')
        cy.get('.blogContent').eq(1).should('contain', 'another blog cypress')
        cy.get('.blogContent').eq(2).should('contain', 'another blog cypress3')
      })
    })
  })
})
