import React, { ChangeEvent } from "react";
import "@styles/Generator.scss";

export default function Generator() {
  const [outputUrl, setOutputUrl] = React.useState("sdlgkhfldskgjhdkjfghlkdfsjghlkjdshg");
  const copiedTooltipRef = React.useRef<HTMLDivElement>(null);

  const [showChannelName, setShowChannelName] = React.useState(true);

  function copy() {
    navigator.clipboard.writeText(outputUrl);

    if (copiedTooltipRef.current) {
      copiedTooltipRef.current.style.animation = "tooltipAnimation 200ms";
      copiedTooltipRef.current.style.opacity = "1";

      setTimeout(() => {
        if (copiedTooltipRef.current) {
          copiedTooltipRef.current.style.opacity = "0";
          copiedTooltipRef.current.style.animation = "";
        }
      }, 1000);
    }
  }

  return (
    <div className="generator">
      <div className="output">
        <p className="url">
          <code>{outputUrl}</code>
        </p>
        <button onClick={copy} className="copy">
          Copy
        </button>
        <div ref={copiedTooltipRef} className="copiedTooltip">
          Copied!
        </div>
      </div>
      <div className="configuration">
        <div className="options">
          <h1>Configurations</h1>

          <div className="option">
            <input
              type="checkbox"
              checked={showChannelName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowChannelName(e.target.checked);
              }}
            />
            <label>Show channelname</label>
          </div>

          <div className="option">
            <input
              type="checkbox"
              checked={showChannelName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowChannelName(e.target.checked);
              }}
            />
            <label>Hide non talking clients</label>
          </div>

          <div className="option">
            <input
              type="number"
              value={20}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowChannelName(e.target.checked);
              }}
            />
            <label>Client Limit</label>
          </div>
        </div>

        <div className="viewer">s</div>
      </div>
    </div>
  );
}
