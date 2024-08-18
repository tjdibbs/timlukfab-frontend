import React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import FacebookRounded from "@mui/icons-material/FacebookRounded";
import Twitter from "@mui/icons-material/Twitter";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

function Share() {
  const router = useRouter();
  return (
    <div className="share flex gap-x-2 items-center">
      <p className="text-sm font-semibold">Share</p>
      <Stack direction={"row"}>
        <a
          title="pauloxuries facebook link"
          target={"_blank"}
          rel={"noreferrer"}
          href={`https://www.facebook.com/sharer/sharer.php?u=https://pauloxuries.com${router.asPath};src=sdkpreparse`}
        >
          <IconButton>
            <FacebookRounded />
          </IconButton>
        </a>
        <a
          title="pauloxuries twitter link"
          href={
            "https://twitter.com/intent/tweet?text=" +
            "https://pauloxuries.com" +
            router.asPath
          }
        >
          <IconButton>
            <Twitter />
          </IconButton>
        </a>
        <a
          title="pauloxuries whatsapp link"
          href={
            "whatsapp://send?text=" + "https://pauloxuries.com" + router.asPath
          }
        >
          <IconButton>
            <Icon icon={"ic:outline-whatsapp"} />
          </IconButton>
        </a>
      </Stack>
    </div>
  );
}

export default Share;
