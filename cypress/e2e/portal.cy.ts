describe('Portal', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should load correctly', () => {
        cy.get('[data-cy="portal"]')
    })
})

// This makes is a module!
export {}
