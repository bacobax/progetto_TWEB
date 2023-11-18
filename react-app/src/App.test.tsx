import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import useFetch from "./hooks/useFetch";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test("useFetch", () => {
  const {fetchData, loading, error} = useFetch<[{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }]>()

  fetchData({url: "https://jsonplaceholder.typicode.com/todos/"} , (data) => {
    console.log(data)
  });

  expect(loading).toBe(true)
  expect(error).toBe(false)
})