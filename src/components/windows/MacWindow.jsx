import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import "./window.scss";

const MAXIMIZED_BOUNDS = {
  x: 12,
  y: 12,
  width: "calc(100vw - 24px)",
  height: "calc(100vh - 96px)",
};

const MacWindow = ({
  children,
  width = "40vw",
  height = "50vh",
  windowName,
  setWindowsState,
}) => {
  const rndRef = useRef(null);
  const boundsRef = useRef({ x: 200, y: 100, width, height });
  const [isMaximized, setIsMaximized] = useState(false);

  const close = () =>
    setWindowsState((state) => ({ ...state, [windowName]: false }));

  const toggleMaximize = () => {
    const rnd = rndRef.current;
    if (!rnd) return;

    if (isMaximized) {
      const { x, y, width: w, height: h } = boundsRef.current;
      rnd.updateSize({ width: w, height: h });
      rnd.updatePosition({ x, y });
    } else {
      rnd.updateSize({
        width: MAXIMIZED_BOUNDS.width,
        height: MAXIMIZED_BOUNDS.height,
      });
      rnd.updatePosition({ x: MAXIMIZED_BOUNDS.x, y: MAXIMIZED_BOUNDS.y });
    }
    setIsMaximized((prev) => !prev);
  };

  const trackBounds = (x, y, w, h) => {
    if (isMaximized) return;
    boundsRef.current = { x, y, width: w, height: h };
  };

  return (
    <Rnd
      ref={rndRef}
      default={{ width, height, x: 200, y: 100 }}
      onDragStop={(e, data) =>
        trackBounds(data.x, data.y, boundsRef.current.width, boundsRef.current.height)
      }
      onResizeStop={(e, dir, elementRef, delta, position) =>
        trackBounds(position.x, position.y, elementRef.style.width, elementRef.style.height)
      }
    >
      <div className="window">
        <div className="nav">
          <div className="dots">
            <div onClick={close} className="dot red" title="Close"></div>
            <div onClick={close} className="dot yellow" title="Minimize"></div>
            <div
              onClick={toggleMaximize}
              className="dot green"
              title={isMaximized ? "Restore" : "Maximize"}
            ></div>
          </div>

          <div className="title">
            <p>ankitpaul - zhs</p>
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </Rnd>
  );
};

export default MacWindow;
