const { StatusCodes } = require("http-status-codes");

const { response: responseModel } = require("../../models/response.model");

const allCategories = [
  {
    name: "emtpy",
    id: "empty_",
    categories: [],
  },
  {
    name: "others",
    id: "others_",
    categories: [],
  },
  {
    name: "abstract",
    id: "abstract_",
    categories: [
      "abstract_net",
      "abstract_nonphoto",
      "abstract_rect",
      "abstract_shape",
      "abstract_texture",
    ],
  },
  {
    name: "animal",
    id: "animal_",
    categories: [
      "animal_bird",
      "animal_cat",
      "animal_dog",
      "animal_horse",
      "animal_panda",
    ],
  },
  {
    name: "building",
    id: "building_",
    categories: [
      "building_arch",
      "building_brickwall",
      "building_church",
      "building_corner",
      "building_doorwindows",
      "building_pillar",
      "building_stair",
      "building_street",
    ],
  },
  {
    name: "dark",
    id: "dark_",
    categories: ["dark_fire", "dark_fireworks", "dark_light"],
  },
  {
    name: "drink",
    id: "drink_",
    categories: ["drink_can"],
  },
  {
    name: "sky",
    id: "sky_",
    categories: ["sky_object", "sky_cloud", "sky_sun"],
  },
  {
    name: "food",
    id: "food_",
    categories: ["food_bread", "food_fastfood", "food_grilled", "food_pizza"],
  },
  {
    name: "indoor",
    id: "indoor_",
    categories: [
      "indoor_churchwindow",
      "indoor_court",
      "indoor_doorwindows",
      "indoor_marketstore",
      "indoor_room",
      "indoor_venue",
    ],
  },
  {
    name: "outdoor",
    id: "outdoor_",
    categories: [
      "outdoor_city",
      "outdoor_field",
      "outdoor_grass",
      "outdoor_house",
      "outdoor_mountain",
      "outdoor_oceanbeach",
      "outdoor_playground",
      "outdoor_railway",
      "outdoor_road",
      "outdoor_sportsfield",
      "outdoor_stonerock",
      "outdoor_street",
      "outdoor_water",
      "outdoor_waterside",
      "outdoor_pool",
    ],
  },
  {
    name: "object",
    id: "object_",
    categories: ["object_screen", "object_sculpture"],
  },
  {
    name: "people",
    id: "people_",
    categories: [
      "people_baby",
      "people_crowd",
      "people_group",
      "people_hand",
      "people_many",
      "people_portrait",
      "people_show",
      "people_tattoo",
      "people_young",
      "people_swimming",
    ],
  },
  {
    name: "plant",
    id: "plant_",
    categories: [
      "plant_branch",
      "plant_flower",
      "plant_leaves",
      "plant_tree",
      "people_many",
      "people_portrait",
      "people_show",
      "people_tattoo",
      "people_young",
    ],
  },
  {
    name: "text",
    id: "text_",
    categories: ["text_mag", "text_map", "text_menu", "text_sign"],
  },
  {
    name: "trans",
    id: "trans_",
    categories: [
      "trans_bicycle",
      "trans_bus",
      "trans_car",
      "trans_trainstation",
    ],
  },
];

const excludedCategories = [
  "emtpy",
  "others",
  "abstract",
  "dark",
  "object",
  "text",
  "trans",
];

const supportedCategories = [
  "animal",
  "building",
  "drink",
  "food",
  "indoor",
  "outdoor",
  "people",
  "plant",
  "sky",
];

const getSupportedCategories = () => {
  const categories = supportedCategories.sort();
  return responseModel({
    data: categories,
    statusCode: StatusCodes.OK,
  });
};

module.exports = {
  getSupportedCategories,
};
