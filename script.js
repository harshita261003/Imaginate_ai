document.getElementById('generateBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  if (!prompt) {
      alert('Please enter a prompt.');
      return;
  }

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('imageContainer').innerHTML = ''; // Clear previous image

  try {
      const response = await fetch('/generate_image', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt })
      });
      const data = await response.json();
      
      if (data.error) {
          alert('Error: ' + data.error);
      } else {
          const imgElement = document.createElement('img');
          imgElement.src = data.image_url;
          document.getElementById('imageContainer').appendChild(imgElement);
      }
  } catch (error) {
      alert('Error generating image');
  } finally {
      document.getElementById('loading').classList.add('hidden');
  }
});
