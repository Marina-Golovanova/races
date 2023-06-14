import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Group, Layer, Line, Stage } from "react-konva";
import { Cell } from "./cell";

import styles from "./game-field.module.scss";

export type ITool = "pen" | "erase";
const tools: ITool[] = ["pen", "erase"];

export const GameField: React.FC = () => {
  const rows = Array.from({ length: 25 }, (_, idx) => idx);
  const cols = Array.from({ length: 25 }, (_, idx) => idx);

  const cellSize = 30;

  const [tool, setTool] = React.useState<ITool>("pen");
  const [lines, setLines] = React.useState<any>([]);
  const [isRoadCompleted, setIsRoadCompleted] = React.useState(false);

  const isDrawing = React.useRef(false);

  const handleMouseDown = (e: any) => {
    if (isRoadCompleted) {
      return;
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const lineRef = React.useRef<any>(null);

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleChangeTool = (e: SelectChangeEvent<ITool>) => {
    setTool(e.target.value as ITool);
  };

  return (
    <div className={styles.stageLayout}>
      <Stage
        width={cols.length * cellSize}
        height={rows.length * cellSize}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {rows.map((row) => (
            <Group key={row}>
              {cols.map((col) => (
                <Cell
                  x={cellSize * col}
                  y={cellSize * row}
                  width={cellSize}
                  height={cellSize}
                  key={row + col}
                />
              ))}
            </Group>
          ))}
          {lines.map((line: any, i: any) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={120}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              ref={lineRef}
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>

      <div className={styles.controls}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-label">Tools</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tool}
            label="Age"
            onChange={handleChangeTool}
          >
            {tools.map((it) => (
              <MenuItem value={it} key={it}>
                {it}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={() => setIsRoadCompleted(true)}>
          Start
        </Button>
      </div>
    </div>
  );
};
