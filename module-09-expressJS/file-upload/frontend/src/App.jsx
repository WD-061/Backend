import { useState } from 'react';
import Preview from './components/Preview';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('displayImage', event.target[0].files[0]);

    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setImageUrl(data.location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>File upload</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' />
        <button>Submit</button>
      </form>
      {imageUrl && <Preview image={imageUrl} />}
    </div>
  );
};

export default App;
