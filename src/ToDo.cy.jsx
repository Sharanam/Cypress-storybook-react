import React from "react";
import ToDo from "./ToDo";

import { composeStories } from "@storybook/testing-react";

import * as TaskListStories from "./ToDo.stories";

const { Default, WithPreviousItems } = composeStories(TaskListStories);

describe("<Default />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Default />);

    // check the title
    cy.contains("To Do List");
    cy.get("input").should("have.value", "");

    // add a todo
    cy.get("input").type("write tests{enter}");
    cy.get("input").should("have.value", "");

    // add another todo
    cy.get("input").type("write more tests{enter}");
    cy.get("input").should("have.value", "");

    // check the first todo
    cy.contains("write tests").click();
    cy.contains("write tests").should("have.class", "completed");

    // edit the second todo
    cy.contains("write more tests").click();
    cy.get(".todo").should("have.length", 2); // there are two todos
    cy.get(".todo div").contains("write more tests").click(); // marked as incomplete

    const selected = cy.get(".todo div").contains("write more tests");

    // selected.get(".todo button.edit").click();// not this, rather choose next sibling of div

    selected.next().next().click(); // this works

    // cy.get(".todo button.edit").click();
    cy.get(".edit-input").should("have.value", "write more tests");
    cy.get(".edit-input").clear().type("write even more tests{enter}"); // edit the todo
  });
});

describe("<WithPreviousItems />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WithPreviousItems />);

    // check the title
    cy.contains("To Do List");
    cy.get("input").should("have.value", "");

    // add a todo
    cy.get("input").type("write tests{enter}");
    cy.get("input").should("have.value", "");

    // add another todo
    cy.get("input").type("write more tests{enter}");
    cy.get("input").should("have.value", "");

    // check the first todo
    cy.contains("write tests").click();
    cy.contains("write tests").should("have.class", "completed");

    // edit the second todo
    cy.contains("write more tests").click();
    cy.get(".todo").should("have.length", 2); // there are two todos
    cy.get(".todo div").contains("write more tests").click(); // marked as incomplete

    const selected = cy.get(".todo div").contains("write more tests");

    // selected.get(".todo button.edit").click();// not this, rather choose next sibling of div

    selected.next().next().click(); // this works

    // cy.get(".todo button.edit").click();
    cy.get(".edit-input").should("have.value", "write more tests");
    cy.get(".edit-input").clear().type("write even more tests{enter}"); // edit the todo
  });
});
