import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { BiCopy } from "react-icons/bi";

function SocialShare({ currentUrl }) {
  const [copied, setCopied] = useState(false);

  function copyUrlToClipboard() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  return (
    <div className="flex gap-2">
      {" "}
      <FacebookShareButton
        url={currentUrl}
        quote={"Share on facebook"}
        hashtag={"#goodμποι"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={currentUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton url={currentUrl} title={"This Goodμποι need a hero"}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={currentUrl}
        title={"This Goodμποι need a hero!"}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <Tooltip
        placement="bottom"
        title="Copy"
        color={"#251B2F"}
        key={"#251B2F"}
      >
        <BiCopy
          color={copied ? "#e6669a" : null}
          className="cursor-pointer"
          size={32}
          onClick={copyUrlToClipboard}
        />
      </Tooltip>
    </div>
  );
}

export default SocialShare;
