import { Label, Segment } from "semantic-ui-react";

export const VisualCategoriesScreen = ({
  categories,
  selectedCategory,
  handleSelectedCategoryChange,
}) => {
  return (
    <Segment>
      {categories.map((item) => (
        <Label
          key={item.toLowerCase()}
          size="large"
          color={item === selectedCategory ? "violet" : "grey"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleSelectedCategoryChange(item);
          }}
        >
          {item}
        </Label>
      ))}
    </Segment>
  );
};
