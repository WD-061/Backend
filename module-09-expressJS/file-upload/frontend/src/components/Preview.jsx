const Preview = ({ image }) => {
  return (
    <figure>
      <img src={image} alt='User submitted image preview' />
      <figcaption>Image location: {image}</figcaption>
    </figure>
  );
};

export default Preview;
