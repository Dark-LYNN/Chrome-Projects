deepai.setApiKey('be520f95-4d5e-4ef8-a008-6e5694e0bf73');
document.getElementById('imageInput').addEventListener('change', async function () {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
  
    if (file) {
      try {
        const resp = await deepai.callStandardApi("nsfw-detector", {
          image: file,
        });
  
        console.log(resp);
        // Process the response as needed, e.g., determine if the image is NSFW and take appropriate action.
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  });
  