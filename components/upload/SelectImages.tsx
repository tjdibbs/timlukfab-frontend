import React from "react";
import Box from "@mui/material/Box";
import { Divider, Typography, Zoom } from "@mui/material";
import useMessage from "@hook/useMessage";
import { Image } from "antd";

export type ProductImages =
  | {
      frontImage?: undefined;
      backImage?: undefined;
      additionalImages?: undefined;
    }
  | {
      frontImage: File;
      backImage: File;
      additionalImages: File[];
    };

function SelectImages(props: {}, ref: React.ForwardedRef<{}>) {
  const [imagesUrl, setImagesUrl] = React.useState<string[]>([]);
  const [images, setImages] = React.useState<FileList>();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const { alertMessage } = useMessage();

  React.useImperativeHandle(
    ref,
    () => ({
      getImages: () => {
        if (!images?.length) return {};
        let [frontImage, backImage, ...additionalImages] = images;
        return { frontImage, backImage, additionalImages };
      },
      clear: () => {
        setImages(undefined);
        setImagesUrl([]);
      },
    }),
    [images]
  );

  const displayFileList = (files: FileList) => {
    const getBlobUrl = (file: File, cb: (filename: string) => void) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const byteCharacters = window.atob(
          String(
            reader.result!.slice((reader.result as string).indexOf(",") + 1)
          )
        );
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: file.type });
        const filename = URL.createObjectURL(blob);

        return cb(filename);
      };
      reader.readAsDataURL(file);
    };

    let blobUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      getBlobUrl(files[i], (filename) => {
        blobUrls.push(filename);
        setTimeout(() => {
          if (i === files.length - 1) {
            setImagesUrl(blobUrls);
          }
        }, 400);
      });
    }

    setImages(files);
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let files = ev.target.files;
    if (!files?.length) return;

    if (files.length > 5) alertMessage("Images can't be more than 5", "error");
    displayFileList(files);
  };

  return (
    <Box mb={3} className="form-group">
      <div className="images-picker">
        <Box mb={2}>
          <p>
            <b>Product Images</b> - Please select in this form{" "}
            <i>((front image), (back image), (...additional images))</i>
          </p>
          <input
            type="file"
            style={{ display: "none" }}
            accept={".jpg,.png,.jpeg"}
            multiple={true}
            ref={inputRef}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={dropStyle}
          style={{
            borderColor: "grey",
            color: "inherit",
            borderRadius: "20px",
          }}
          // onDrop={handleDrop}
          // onDragOver={(e) => e.preventDefault()}
          // onDragLeave={handleLeaveAndEnter}
          // onDragEnter={handleLeaveAndEnter}
          onClick={() => inputRef.current?.click()}
        >
          <Typography
            variant={"subtitle2"}
            fontWeight={600}
            className="primary-text"
          >
            Drop image
          </Typography>
          <Divider sx={{ width: 100 }}>
            <Typography variant={"caption"} fontWeight={500}>
              OR
            </Typography>
          </Divider>
          <Typography
            className="secondary-text"
            color={"text.secondary"}
            variant={"subtitle2"}
            fontWeight={500}
          >
            Click to select image
          </Typography>
        </Box>
        <div className="images-selected flex gap-5 flex-wrap">
          {imagesUrl.map((url, index) => {
            let name = !index
              ? "Front Image"
              : index == 1
              ? "Back Image"
              : "Additional Image";

            return (
              <Zoom in={true} key={url}>
                <div className="card">
                  <Image
                    alt={url}
                    src={url}
                    className="!w-56 !h-40 max-w-full"
                  />
                  <div className="name w-max font-bold text-sm px-2 py-1 rounded-xl bg-primary-low/40">
                    {name}
                  </div>
                </div>
              </Zoom>
            );
          })}
        </div>
      </div>
    </Box>
  );
}

const dropStyle = {
  border: "1px dashed grey",
  borderRadius: "5px",
  width: "100%",
  height: "200px",
  mb: 2,
  display: "grid",
  placeItems: "center",
  placeContent: "center",
  cursor: "pointer",
};

export default React.memo(React.forwardRef(SelectImages));
