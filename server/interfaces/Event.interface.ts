// Local imports
import Recipe from "./Recipe.interface"

export default interface Event {
  type: string;
  allergens: string[];
  members: string[];
  date: string;
  menu: Recipe[];
}