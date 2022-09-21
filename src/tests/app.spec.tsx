import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("TodoApp", () => {

  it("It renders the app", () => {
    const app = render(<App />);
    expect(app).not.toBeUndefined();
  });

  it("It renders the initial items", () => {
    render(<App />);

    expect(screen.getByText("Buy milk")).toBeDefined();
    const buyMilkBox = screen.getByTestId("toggle0");
    const buyMilkMain = screen.getByTestId("todo0");
    expect(buyMilkBox).toBeChecked();
    expect(buyMilkMain).toHaveClass('todo_done')

    expect(screen.getByText("Buy bread")).toBeDefined();
    const buyBreadBox = screen.getByTestId("toggle1");
    const buyBreadMain = screen.getByTestId("todo1");
    expect(buyBreadBox).not.toBeChecked();
    expect(buyBreadMain).not.toHaveClass('todo_done')

  });
  

  it("The complete button works", () => {
    render(<App />);

    const buyBreadMain = screen.getByTestId("todo1");
    const buyBreadBox = screen.getByTestId("toggle1");

    expect(buyBreadBox).not.toBeChecked();
    expect(buyBreadMain).not.toHaveClass('todo_done')

    fireEvent.click(buyBreadBox)

    expect(buyBreadBox).toBeChecked();
    expect(buyBreadMain).toHaveClass('todo_done')
  });

  it("New items can be added", () => {
    render(<App />);

    const inputText = screen.getByTestId("new-input");
    const inputButton = screen.getByTestId("new-submit");

    fireEvent.change(inputText, {target: {value: "New todo"}});
    fireEvent.click(inputButton);

    expect(screen.getByText("New todo")).toBeDefined();

  });

  it("New items must have a unique name a warning will show if they don't", () => {
    render(<App />);

    const inputText = screen.getByTestId("new-input");
    const inputButton = screen.getByTestId("new-submit");

    fireEvent.change(inputText, {target: {value: "Buy bread"}});
    fireEvent.click(inputButton);

    expect(screen.getByText("This Todo already exists in the list!")).toBeDefined();

  });

  it("Items can be deleted", () => {
    render(<App />);

    const buyMilk = screen.queryByText("Buy milk")
    expect(buyMilk).toBeInTheDocument;
    const deleteButton = screen.getByTestId("todoDelete0");

    fireEvent.click(deleteButton);

    expect(buyMilk).not.toBeInTheDocument;

  });

  it("For editing save and cancel buttons as well as the input, should only show when activated", () => {
    render(<App />);

    const editButton = screen.getByTestId("todoEditStart0");
    const saveButton = screen.queryByTestId("todoEditSubmit0");
    const cancelButton = screen.queryByTestId("todoEditCancel0");
    const input = screen.queryByTestId("todoEditInput0");

    expect(saveButton).not.toBeInTheDocument;
    expect(cancelButton).not.toBeInTheDocument;
    expect(input).not.toBeInTheDocument;

    fireEvent.click(editButton);

    expect(saveButton).toBeInTheDocument;
    expect(cancelButton).toBeInTheDocument;
    expect(input).toBeInTheDocument;

  });

  it("Items can be edited", () => {
    render(<App />);

    const newText = screen.queryByText("New Item");
    const editButton = screen.getByTestId("todoEditStart0");

    expect(newText).not.toBeInTheDocument;

    fireEvent.click(editButton);

    const saveButton = screen.getByTestId("todoEditSubmit0");
    const input = screen.getByTestId("todoEditInput0");

    fireEvent.change(input, {target: {value: "Buy bread"}});
    fireEvent.click(saveButton);

    expect(newText).toBeInTheDocument;

  });

  it("Duplicate names in editing should show an error and not work", () => {
    render(<App />);

    const currentText = screen.queryByText("Buy milk");
    const editButton = screen.getByTestId("todoEditStart0");

    expect(currentText).toBeInTheDocument;

    fireEvent.click(editButton);

    const saveButton = screen.getByTestId("todoEditSubmit0");
    const input = screen.getByTestId("todoEditInput0");

    fireEvent.change(input, {target: {value: "Buy milk"}});
    fireEvent.click(saveButton);

    expect(currentText).not.toBeInTheDocument;
    expect(screen.getByText("This Todo already exists in the list!")).toBeDefined();

  });


});
