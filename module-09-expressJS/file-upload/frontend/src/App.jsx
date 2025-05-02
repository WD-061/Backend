import { useState } from 'react';
import Preview from './components/Preview';

const App = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', e.target[0].files[0]);
      const res = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      const data = await res.json();
      setImage(data.location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>File upload</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' />
      </form>
      {image && <Preview image={image} />}
    </div>
  );
};

export default App;
