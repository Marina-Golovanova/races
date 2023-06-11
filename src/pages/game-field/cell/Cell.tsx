import { Rect } from "react-konva";

export type ICellProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Cell: React.FC<ICellProps> = (props) => {
  return <Rect {...props} stroke="#000" />;
};
