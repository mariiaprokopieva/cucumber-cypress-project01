const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import InventoryPage from '../../pages/InventoryPage'

const inventoryPage = new InventoryPage()

Given(/^the user is on "([^"]*)"$/, function(url) {
	cy.visit(url)
});


Then(/^the user should see the "([^"]*)" heading$/, function(heading) {
	inventoryPage.getInventoryHeading().should('be.visible').and('have.text', heading)
});


Then(/^the user should see the table with the headers below$/, function(dataTable) {
	const expectedHeaders = dataTable.rawTable.flat()
	
	inventoryPage.getTableHeaders().each((header, index) => {
		cy.wrap(header).should('have.text', expectedHeaders[index])
	})
});

Then(/^the user should see the table with the rows below$/, function(dataTable) {
	const expectedRows = dataTable.rawTable

	

	inventoryPage.getTableRows().each((row, rowIndex) => {

		cy.wrap(row).find('td').each((cell, cellIndex) => {
			cy.wrap(cell).invoke('text').then((text) => {
				expect(text.trim()).to.equal(expectedRows[rowIndex][cellIndex])
			})
		})
	})
});


Then(/^the user should see the "([^"]*)" button is enabled$/, function(buttonText) {
	inventoryPage.getButtonLocator(buttonText).should('be.enabled')
});

Then(/^the user should see the "([^"]*)" text displayed$/, function(totalText) {
	inventoryPage.getTotal().should('be.visible').and('have.text', totalText)
});


When(/^the user clicks on the "([^"]*)" button$/, function(buttonText) {
	inventoryPage.clickButton(buttonText)
});


Then(/^the user should see the "([^"]*)" modal with its heading$/, function(modalHeading) {
	inventoryPage.getModal().should('be.visible')
	inventoryPage.getModalHeading().should('have.text', modalHeading)
});


Then(/^the user should see the "([^"]*)" label$/, function(labelText) {
	inventoryPage.getLabelByText(labelText).should('be.visible').and('have.text', labelText)
});


Then(/^the user should see the "([^"]*)" input box is enabled$/, function(purpose) {
	inventoryPage.getInputBox(purpose).should('be.enabled')
});


Then(/^the user should not see the "([^"]*)" modal$/, function(modalHeading) {
	inventoryPage.getModal().should('not.exist')
});


When(/^the user enters the quantity as "([^"]*)"$/, function(quantity) {
	inventoryPage.getInputBox('Quantity').type(quantity)
});


When(/^the user enters the product as "([^"]*)"$/, function(product) {
	inventoryPage.getInputBox('Product').type(product)
});

When(/^the user enters the price as "([^"]*)"$/, function(price) {
	inventoryPage.getInputBox('Price').type(price)
});


Then(/^the user should see the table with the new row below$/, function(dataTable) {
	const expectedData = dataTable.rawTable.flat()
	
	inventoryPage.getTableRows().last().find('td').each((cell, cellIndex) => {
			cy.wrap(cell).invoke('text').then((text) => {
				expect(text.trim()).to.equal(expectedData[cellIndex])
			})
		})
});












