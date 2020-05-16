import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  const header = getByText(/checkout form/i);
  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
  const {
    getByLabelText,
    findByTestId,
    queryByTestId,
    getByText,
    queryByText,
  } = render(<CheckoutForm />);
  const firstNameInputLabel = getByLabelText(/first Name:/i);
  fireEvent.change(firstNameInputLabel, {
    target: { name: "firstName", value: "Tatiana" },
  });
  expect(firstNameInputLabel.value).toEqual("Tatiana");

  const lastNameInputLabel = getByLabelText(/last name:/i);
  fireEvent.change(lastNameInputLabel, {
    target: { name: "lastName", value: "Zhizhimontova" },
  });
  const addressInputLabel = getByLabelText(/address:/i);
  fireEvent.change(addressInputLabel, {
    target: { name: "address", value: "1111 Central Blvd" },
  });

  const cityInputLabel = getByLabelText(/city:/i);
  fireEvent.change(cityInputLabel, {
    target: { name: "city", value: "Santa Barbara" },
  });

  const stateInputLabel = getByLabelText(/state:/i);
  fireEvent.change(stateInputLabel, {
    target: { name: "state", value: "CA" },
  });

  const zipInputLabel = getByLabelText(/zip:/i);
  fireEvent.change(zipInputLabel, {
    target: { name: "zip", value: "99999" },
  });

  const checkoutButton = queryByTestId(/checkoutBtn/i);
  //queryByTestId(/checkoutBtn/i).click();
  await waitFor(() => {
    fireEvent.click(checkoutButton);
  });

  const hasFirstNameText = queryByText(/Tatiana/i);
  expect(hasFirstNameText).toBeInTheDocument();

  const hasLastNameText = queryByText(/zhizhimontova/i);
  expect(hasLastNameText).toBeInTheDocument();

  const hasStateText = queryByText(/ca/i);
  expect(hasStateText).toBeInTheDocument();

  const hasFormText = queryByTestId(/successMessage/i);
  expect(hasFormText).toBeInTheDocument();

  const successMessage = queryByTestId(/successMessage/i);
  expect(successMessage.textContent).toBe(
    "You have ordered some plants! Woo-hoo! 🎉Your new green friends will be shipped to:Tatiana Zhizhimontova1111 Central BlvdSanta Barbara, CA 99999"
  );
});
