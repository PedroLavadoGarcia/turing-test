describe("Test BotList", () => {
  it("go all pages", () => {
    cy.visit("/");
    cy.contains("a", "Bot Management").click();
    cy.contains("a", "Analysis").click();
    cy.contains("a", "User Management").click();
    cy.contains("a", "Configuration").click();
  });

  it("go Bot Management and create new bot", () => {
    cy.visit("/");
    cy.contains("a", "Bot Management").click();
    cy.contains("span", "New Bot").click();
    cy.get(".dialog-card")
      .find("input")
      .eq(0)
      .type("New text")
      .should("have.value", "New Text");
    cy.get(".dialog-card")
      .find("input")
      .eq(1)
      .type("New Text")
      .should("have.value", "New Text");
    cy.get(".dialog-card")
      .find("textarea")
      .type("New Text")
      .should("have.value", "New Text");
    cy.get(".dialog-card").find(".v-select").eq(0).click();
    cy.get(".v-list-item").contains("Formality").click();
    cy.get(".dialog-card").click();
    cy.get(".dialog-card").find(".v-select").eq(1).click();
    cy.get(".v-list-item").contains("Customer Service").click();
    cy.get(".dialog-card").click();
    cy.get(".dialog-card").find(".v-select").eq(2).click();
    cy.get(".v-list-item").contains("Inactive").click();
    cy.get(".dialog-card").click();

    cy.contains("span", "Save").click();
    cy.contains("span", "Confirm").click();
  });

  it("go Bot Management and edit  bot", () => {
    cy.visit("/");
    cy.contains("a", "Bot Management").click();
    cy.wait(1000);
    cy.get(".table-container").find(".mdi-pencil").eq(0).click();
    cy.get(".dialog-card").find("input").eq(0).type("Text Edit");

    cy.contains("span", "Edit").click();
    cy.contains("span", "Confirm").click();
  });

  it("delete bot", () => {
    cy.visit("/");
    cy.contains("a", "Bot Management").click();
    cy.wait(1000);
    cy.get(".table-container").find(".mdi-delete").eq(0).click();
    cy.contains("span", "Confirm").click();
  });
});
