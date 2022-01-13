/// <reference types="cypress" />

describe("Standard user - ", () => {
  beforeEach(() => {
    cy.login(
      Cypress.env("email"),
      Cypress.env("password"),
      Cypress.env("username")
    );
  });

  it("can add and delete item from cart", () => {
    cy.get("#search_query_top").type("Faded Short Sleeve T-shirts{enter}");
    cy.get("#center_column")
      .find(".product-listing")
      .within((header) => {
        let headerText = header.text().trim();
        expect(headerText.startsWith("Search")).to.be.true;
        expect(headerText).contains("Faded Short Sleeve T-shirts");
        expect(headerText.endsWith("1 result has been found.")).to.be.true;
      });
    cy.get("#center_column")
      .find(".product_list")
      .find(">li")
      .first()
      .within((product) => {
        cy.contains("Add to cart").click();
      });
    cy.get("#layer_cart").then((dialog) => {
      let textContent = dialog.text();
      expect(textContent).contains(
        "Product successfully added to your shopping cart"
      );
      expect(textContent).contains("There is 1 item in your cart.");
    });
    cy.get("#layer_cart").find("[title='Close window']").click();
    cy.get("#layer_cart").should("not.be.visible");
    cy.get('[title="View my shopping cart"]').trigger("mouseover");
    cy.get('[data-id^="cart_block_product_"]')
      .find(".product-name")
      .contains("1 x Faded Shor...");
    cy.get("#button_order_cart").click();
    cy.get("#cart_summary")
      .find('[id^="product_1_"]')
      .within(() => {
        cy.get(".cart_description").contains("Faded Short Sleeve T-shirts");
        cy.get(".cart_avail").should("have.text", "In stock");
        cy.get(".cart_delete").click();
      });
    cy.contains("Your shopping cart is empty.").should("be.visible");
  });

  afterEach(() => {
    cy.logout();
  });
});
