import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchAndAd from '../SearchAndAd'; 
import Comments from '../Comments';

describe('<SearchAndAd />', () => {
  it('should render the SearchAndAd component', () => {
    render(<SearchAndAd />);
    const element = screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === 'Oi!';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });

    expect(element).toBeInTheDocument();
  });
});