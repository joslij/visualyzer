const { unescape } = require("html-escaper");
const getModelFromDatabaseItem = (
  user,
  {
    id,
    url,
    isPublic,
    description,
    categories,
    people,
    landmarks,
    reactions,
    metadata,
  }
) => {
  const model = {
    id,
    url,
    isPublic,
    description,
    categories,
    people,
    landmarks,
    reactions,
    metadata,
    user: {
      displayName: user.displayName,
    },
  };

  model.reactions.comments = model.reactions.comments.map((item) => {
    return {
      ...item,
      text: unescape(item.text),
    };
  });

  return model;
};

const getModelFromAnalysisData = (
  userId,
  url,
  isPublic,
  { categories, description, requestId, metadata }
) => {
  let model = null;
  try {
    model = {
      id: requestId,
      userId: userId,
      url,
      isPublic,
      description: {
        text: "",
        tags: description.tags,
      },
      categories: [],
      people: [],
      landmarks: [],
      reactions: {
        likes: [],
        dislikes: [],
        comments: [],
      },
      metadata,
    };

    const descriptionCaption = description.captions?.reduce(
      (accumulator, item) => {
        return Math.max(accumulator, item.confidence);
      }
    );
    model.description.text = descriptionCaption?.text ?? "";

    categories.forEach((item) => {
      if (item.name) {
        const categoryName = item.name.slice(0, item.name.indexOf("_"));
        if (!model.categories.includes(categoryName)) {
          model.categories.push(categoryName);
        }
      }

      const landmarkDetails = item.detail?.landmarks;
      const peopleDetails = item.detail?.celebrities;
      if (landmarkDetails && landmarkDetails.length > 0) {
        model.landmarks = landmarkDetails.map((element) => element.name);
      }
      if (peopleDetails && peopleDetails.length > 0) {
        model.people = peopleDetails.map((element) => element.name);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return model;
};

module.exports = {
  getModelFromAnalysisData,
  getModelFromDatabaseItem,
};
