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

- Register the `visualyzer` application in Azure AD. See [documentation](https://docs.microsoft.com/en-gb/azure/active-directory/develop/quickstart-register-app) for registering application.
  Reference for this specific applicaiton can be found here [here](https://github.com/Azure-Samples/ms-identity-node#register-the-application)

- Run bicep
- Setup app - https://github.com/Azure-Samples/ms-identity-node#register-the-application
