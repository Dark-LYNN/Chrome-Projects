// content.js

// Listen for a message from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkNsfw") {
      (async () => {
        // Assuming that request.imageUrl is the URL of the image to be checked
        const imageUrl = request.imageUrl;
  
        try {
          const resp = await deepai.callStandardApi("nsfw-detector", {
            image: imageUrl,
          });
  
          // Process the response to determine if the image is NSFW
          if (resp.output.nsfw_score > 0.7) {
            // Apply a blur effect to the image if it's considered NSFW
            // For example, you can select and blur the image using JavaScript and CSS
            const images = document.querySelectorAll("img[src='" + imageUrl + "']");
            images.forEach((image) => {
              image.style.filter = "blur(5px)";
            });
          }
        } catch (error) {
          console.error('Error processing image:', error);
        }
      })();
    }
  });
  