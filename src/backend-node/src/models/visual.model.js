const getModelFromAnalysisData = (
  isPublic,
  { categories, tags, description, requestId, metadata }
) => {
  let model = null;
  try {
    model = {
      id: requestId,
      isPublic,
      description: {
        text: "",
        tags: description.tags,
      },
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

    categories.forEach((item, index) => {
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
    console.log(error);
  }
  return model;
};

module.exports = {
  getModelFromAnalysisData,
};
