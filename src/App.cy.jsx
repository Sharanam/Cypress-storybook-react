import React from 'react'
import { composeStories } from "@storybook/testing-react";
import * as stories from "./App.stories";
const {  Default } = composeStories(stories);

describe("<Default />", () => {
	it("renders", () => {
		cy.mount(<Default />);

    expect(cy.get('button').should('be.visible'))

    // click button to increase count;
    cy.get('button').click()
    cy.get('button').click()
    cy.get('button').click()

    // check count
    cy.get('button').contains('3')
  })
});
