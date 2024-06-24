import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Duplicate Task" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  fireEvent.click(element); // Try adding the same task again
  const tasks = screen.getAllByText(/Duplicate Task/i);
  expect(tasks.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const task = screen.queryByText(new RegExp(dueDate, "i"));
  expect(task).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const element = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: "No Due Date Task" } });
  fireEvent.click(element);
  const task = screen.queryByText(/No Due Date Task/i);
  expect(task).not.toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "To be deleted"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const task = screen.queryByText(new RegExp("To be deleted", "i"));
  expect(task).toBeInTheDocument();
  const checkbox = screen.getByTestId('checkbox');
  fireEvent.click(checkbox);
  expect(task).not.toBeInTheDocument();
 });

 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Overdue Task" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const taskCard = screen.getByTestId(/Overdue Task/i).closest('.MuiPaper-root');
  expect(taskCard).toHaveStyle(`background-color: #ffcccc`);
 });