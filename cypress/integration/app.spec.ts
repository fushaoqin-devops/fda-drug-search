/// <reference types="cypress" />
import { v4 as uuid } from "uuid";
describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should get the document object", () => {
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
  });

  it("should get the title", () => {
    cy.title().should("include", "Home - FDA Drug Alternative");
  });

  it("should default to light theme icon", () => {
    cy.get(".theme-icon")
      .invoke("attr", "src")
      .then((src) => {
        expect(src).to.includes("sun.svg");
      });
  });

  it("should change to dark theme", () => {
    cy.get(".theme-icon").click();
    cy.get(".theme-icon")
      .invoke("attr", "src")
      .then((src) => {
        expect(src).to.includes("moon.svg");
      });
    cy.get("html").should("have.class", "dark");
  });

  it("should correctly filter input suggestions", () => {
    const id = uuid();
    cy.visit("/", {
      onBeforeLoad: (win) => {
        let nextData;

        Object.defineProperty(win, "__NEXT_DATA__", {
          set(o) {
            o.props.pageProps.productList = [
              {
                id: id,
                name: "abc",
                ingredients: "test-ingredients",
              },
              {
                id: "test-id-2",
                name: "ab",
                ingredients: "test-ingredients",
              },
              {
                id: "test-id-3",
                name: "xyz",
                ingredients: "test-ingredients",
              },
            ];
            nextData = o;
          },
          get() {
            return nextData;
          },
        });
      },
    });
    cy.get("input").type("a b");
    cy.get("ul > li:first").contains("ab");
    cy.get("ul > li").should("have.length", 2);
    cy.get("ul > li:last").click();
    cy.url().should("include", `/product/${id}`); // fake uuid for testing purpose
  });
});
