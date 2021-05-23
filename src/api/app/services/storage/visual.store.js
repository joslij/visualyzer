const path = require("path");
const fs = require("fs");
const bent = require("bent");
const { v4: uuid } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");

const { getConfigValue } = require("../../helpers/config.helper");

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

let connectionString = null;
let blobServiceClient = null;
let containerClient = null;
const containerName = "images";

const initialize = async () => {
  if (!connectionString) {
    connectionString = await getConfigValue("StorageConnectionString");
  }
  blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  containerClient = blobServiceClient.getContainerClient(containerName);
};

const saveImageToLocalStorage = async (url) => {
  const fileInfo = path.parse(url);
  const destFileName = `${uuid()}${fileInfo.ext}`;
  const destFilePath = path.join(path.resolve("uploads"), destFileName);

  const getBuffer = bent("buffer");
  let buffer = await getBuffer(url);
  fs.writeFile(destFilePath, buffer, (err) => {});
  return {
    fileName: destFileName,
    filePath: destFilePath,
  };
};

const saveImageToAzureStorage = async (
  fileName,
  filePath,
  removeLocalFile = false
) => {
  await initialize();

  const blobClient = containerClient.getBlockBlobClient(fileName);

  await blobClient.uploadStream(
    fs.createReadStream(filePath),
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers
  );

  if (removeLocalFile) {
    fs.unlink(filePath, (err) => {});
  }

  return blobClient.url;
};

const deleteImageFromAzureStorage = async (fileName) => {
  await initialize();

  const blobClient = containerClient.getBlockBlobClient(fileName);
  const deleteResponse = await blobClient.delete();

  return deleteResponse;
};

module.exports = {
  saveImageToLocalStorage,
  saveImageToAzureStorage,
  deleteImageFromAzureStorage,
};
