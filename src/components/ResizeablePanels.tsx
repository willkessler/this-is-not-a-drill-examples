import { FC, useEffect, useState, ReactNode } from 'react';
import classes from '../css/ResizablePanels.module.css';

interface PanelProps {
    url?: string;
    iframeId?: string,
    content?: ReactNode;
    minWidth?: number;
    maxWidth?: number;
}

interface ResizablePanelsProps {
  topPanel: PanelProps;
  leftPanel: PanelProps;
  rightPanel: PanelProps;
}

const ResizablePanels: FC<ResizablePanelsProps> = ({ topPanel, leftPanel, rightPanel }) => {
  const [dividerPosition, setDividerPosition] = useState<number>(500);
  const [ isDragging, setIsDragging ] = useState<boolean>(false); // track if currently dragging

  useEffect(() => {
    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!isDragging) return;
      setDividerPosition(mouseMoveEvent.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const onMouseDown = () => {
    setIsDragging(true);
    document.body.style.pointerEvents = 'none';
  };

 useEffect(() => {
    if (!isDragging) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [isDragging]);

  console.log(`ResizablePanels ${leftPanel.url}, ${rightPanel.url}`);
  return (
    <div className={classes.container}>
      <div className={classes.topPanel}>{topPanel.content}</div>
      <div className={classes.panelsContainer}>
        <iframe
          id={leftPanel.iframeId}
          src={leftPanel.url}
          style={{
            minWidth:(leftPanel.minWidth ? leftPanel.minWidth : 500),
            maxWidth:(leftPanel.maxWidth ? leftPanel.maxWidth: 800),
            width: `${dividerPosition}px`,
          }}
          className={classes.panel}
          title="Left Panel" />
        <div className={classes.divider} onMouseDown={onMouseDown}></div>
        <iframe
          id={rightPanel.iframeId}
          src={rightPanel.url}
          style={{
            minWidth: (rightPanel.minWidth ? rightPanel.minWidth : '100vw'),
            width: `calc(100% - ${dividerPosition}px - 5px)`
          }}
          className={classes.panel}
          title="Right Panel" />
      </div>
    </div>
  );
};

export default ResizablePanels;
