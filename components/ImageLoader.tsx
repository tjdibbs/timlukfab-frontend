import axios from "axios";
import React from "react";

function ImageLoader(props: { url: string; className: string; alt?: string }) {
  const [fetching, setFetching] = React.useState(false);
  const [imageSource, setImageSource] = React.useState<string | undefined>();

  const [progress, setProgress] = React.useState<number>(20);

  const getImageSource = async (imageURL: string) => {
    const req = await axios.get(
      "http://localhost:8000/image/pauloxuries-logo.png",
      {
        onDownloadProgress: console.log,
        responseType: "arraybuffer",
      }
    );

    const imageSource = await req.data;
    const image = new Blob(imageSource);

    console.log({ imageSource });
  };

  React.useEffect(() => {
    getImageSource(props.url);
  }, [props.url]);

  if (fetching) {
    return (
      <div className="loader w-full h-full relative ">
        <div
          style={{ width: `${progress}%` }}
          className={"h-full w-full bg-black/50" + (props.className ??= "")}
        />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <React.Fragment></React.Fragment>;
}

export default ImageLoader;
