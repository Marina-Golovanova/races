import { Group, Layer, Stage } from "react-konva";
import { Cell } from "./cell";

export const GameField: React.FC = () => {
  const rows = Array.from({ length: 25 }, (_, idx) => idx);
  const cols = Array.from({ length: 25 }, (_, idx) => idx);

  const cellSize = 30;

  return (
    <Stage width={cols.length * cellSize} height={rows.length * cellSize}>
      <Layer>
        {rows.map((row) => (
          <Group key={row}>
            {cols.map((col) => (
              <Cell
                x={cellSize * col}
                y={cellSize * row}
                width={cellSize}
                height={cellSize}
              />
            ))}
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};
