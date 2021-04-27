# Visualyzer

The application will give visual insights of popular places, animals, emotions, _and more_.

# **Disclaimer**

The application uses [Microsoft Azure Cognitive Services - Computer Vision](https://docs.microsoft.com/en-gb/azure/cognitive-services/computer-vision/) to analyze the images. According to Microsoft, they do not store your uploaded images or videos after they are analyzed:

```
Microsoft automatically deletes your images and videos after processing and doesn’t train on your data to enhance the underlying models. Video data doesn’t leave your premises, and video data isn’t stored on the edge where the container runs.
```

It is recommended that you read their [privacy policy](https://azure.microsoft.com/en-gb/support/legal/cognitive-services-compliance-and-privacy/).

# Image requirements

- The image must be presented in JPEG, PNG, GIF, or BMP format
- The file size of the image must be less than 4 megabytes (MB)
- The dimensions of the image must be greater than 50 x 50 pixels

# References and issues with bicep

1. ["type object 'datetime.datetime' has no attribute 'fromisoformat'"](https://github.com/Azure/bicep/issues/2243#issuecomment-818914668)

   [**Issue details in GitHub of Bicep**](https://github.com/Azure/bicep/issues/2243)

   **Temporaray Solution**: Azure CLI nowadays ships with a standalone Python executable, so you may need to use the virtual environment

   ```
   <path_to_python_38/Python> -m pip install --upgrade pip
    pip install azure-cli
    az --version
    env\Scripts\activate.bat
   ```

# Developer notes

## Authentication

- The application has two types of users
  - **`public`** users are those who can access all public aspects of the website. They do not need to registered and can view public aspects like shared images, reactions and comments on them. They do not have permissions to upload visuals, react or comment on visuals unless they are registered.
  - **`user`** role users are those who have registered. They can upload own images to get insights on it and share them with the `public` users.
  - **`admin`** role users are configured in database directly. In addition to `user` role users, they have permission to manage all users and their images.

## Testing

The front-end application covers the following test types:

![4 types of JavaScript Tests](/docs/images/FourTypesOfTests.png){ width=5px; height: 5px }

**Credits**: [Testing JavaScript](https://testingjavascript.com/)

## Static Testing

### Linting

```
Linting is the process of running a program that will analyse code for potential errors.
```

Tools that are used and their purposes are described below.

1. [ESLint](https://eslint.org/docs/user-guide/getting-started)

   - **Setup**: `npm install eslint --save-dev`
   - **Configure**: `npx eslint --init` - it will create a `.eslintrc.js` file if you prefer to save it as `js` file.
   - **Configure** - add `.eslintignore` to avoid _paths_ to be ignored from _linting_. This normally includes **node_modules**
   - **Analyze** -

     - **Advantages**: fsdfsdfs
     - **Disadvantages**: dfsdfsdfs

   - Can identify "non-standard" patterns used in JavaScript
   - Can be used with CI pipelines (TODO:// CLARIFY PLEASE)

## Unit Testing

TODO://

## Integration Testing

TODO://

## End to End Testing

TODO://

# References

1. [State of JavaScript Testing](https://2020.stateofjs.com/en-US/technologies/testing/)
