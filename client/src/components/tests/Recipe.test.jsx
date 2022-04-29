// Package imports
import { render, screen } from '@testing-library/react';

// Local imports
import Recipe from '../Recipe';

describe('Recipe component', () => {
  const mockRecipe = {
    "title": "Fried Anchovies with Sage",
    "readyInMinutes": "45",
    "image": "https://spoonacular.com/recipeImages/1-556x370.jpg",
    "ingredients": "anchovies,baking powder,egg,flour,sage leaves,salt,seltzer water,vegetable oil",
  };

  test('should match the snapshot', () => {
    const { container } = render(<Recipe recipe={mockRecipe} />);
    expect(container).toMatchSnapshot();
  });

  test('should render the recipe', () => {
    render(<Recipe recipe={mockRecipe} />);
    screen.getByText(mockRecipe.title);
    screen.getByText(`Prep-time: ${mockRecipe.readyInMinutes} minutes`);
    screen.getByText(`${mockRecipe.ingredients.split(',')[1]},`);
  });
});