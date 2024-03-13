import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import DisplayData from '../components/DataFetching';

test('renders DisplayData component', () => {
  const { asFragment } = render(<DisplayData />);
  expect(asFragment()).toMatchSnapshot();
});

describe('DisplayData Component', () => {
  it('renders without crashing', () => {
    render(<DisplayData />);
  });

  it('displays loading message when loading is true', () => {
    render(<DisplayData />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
