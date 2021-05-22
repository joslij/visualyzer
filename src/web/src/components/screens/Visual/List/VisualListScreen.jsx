import { Card } from "semantic-ui-react";
import { VisualCategoriesScreen } from "../Categories/VisualCategoriesScreen";
import { VisualItemScreen } from "../Item/VisualItemScreen";

export const VisualListScreen = ({
  type,
  categories,
  data,
  selectedCategory,
  handleSelectedCategoryChange,
  handleSelectedVisualChange,
}) => {
  return (
    <>
      <VisualCategoriesScreen
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectedCategoryChange={handleSelectedCategoryChange}
      />
      <Card.Group>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <VisualItemScreen
              key={item.id}
              type={type}
              item={item}
              handleSelectedVisualChange={handleSelectedVisualChange}
            />
          ))}
        {(!data || data.length === 0) && (
          <Card fluid header="No visuals found!" />
        )}
      </Card.Group>
    </>
  );
};
