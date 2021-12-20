import PropTypes from "prop-types";

const ingredientTypeRuName = {
  "bun": "Булки",
  "sauce": "Соусы",
  "main": "Начинка"
};

const queryBurgerDataUrl = 'https://norma.nomoreparties.space/api';

const ingredientProperties = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
})).isRequired

export {ingredientTypeRuName, queryBurgerDataUrl, ingredientProperties};
