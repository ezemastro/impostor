interface Category {
  id: string;
  name: string;
  cards: Card[];
}
interface CategoryInfo {
  id: string;
  name: string;
}
interface SelectableCategoryInfo extends CategoryInfo {
  selected: boolean;
}
type Card = string;

interface Player {
  id: string;
  name: string;
}
