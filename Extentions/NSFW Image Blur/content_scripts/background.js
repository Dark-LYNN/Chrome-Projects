// content_scripts/background.js

// Load and initialize the NSFW detection model (using a pre-trained model)
async function loadModel() {
  const model = await nsfw.load(); // Import the nsfw.js library
  return model;
}

let nsfwModel;

loadModel()
  .then((model) => {
    nsfwModel = model;
  })
  .catch((error) => {
    console.error("Error loading NSFW model:", error);
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkNsfw") {
    if (nsfwModel) {
      nsfwModel.classify(request.imageUrl).then((predictions) => {
        const isNsfw = checkIfNsfw(predictions);
        sendResponse({ isNsfw });
      });
    } else {
      console.error("NSFW model not loaded yet.");
    }
    return true;
  }
});

function checkIfNsfw(predictions) {
  // Implement your NSFW classification logic here
}
