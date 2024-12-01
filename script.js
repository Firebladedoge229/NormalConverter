document.getElementById('convertButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const conversionType = document.getElementById('conversionType').value;

    if (!fileInput.files[0]) {
        alert("Please upload a normal map.");
        return;
    }

    const canvas = document.getElementById('outputCanvas');
    const context = canvas.getContext('2d');

    const image = new Image();
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
        image.src = e.target.result;
    };

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (conversionType === 'dx-to-gl') {
                data[i + 1] = 255 - data[i + 1]; // Invert the green channel
            } else {
                data[i + 1] = 255 - data[i + 1]; // Invert the green channel
            }
        }

        context.putImageData(imageData, 0, 0);
    };

    fileReader.readAsDataURL(fileInput.files[0]);
});
