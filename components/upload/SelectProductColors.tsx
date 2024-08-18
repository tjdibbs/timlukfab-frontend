import { Label } from "@mui/icons-material";
import { Badge, Button, Input, InputNumber } from "antd";
import _ from "lodash";
import dynamic from "next/dynamic";
import React from "react";

export type SIZE_COLOR_TYPE = {
  label?: string;
  count?: number;
};

function ProductColors(
  props: {},
  ref: React.ForwardedRef<{ getColors(): { [x: string]: number } }>
) {
  const [color, setColor] = React.useState<SIZE_COLOR_TYPE>({});

  const [colors, setColors] = React.useState<{ [x: string]: number }>({});
  React.useImperativeHandle(
    ref,
    () => ({ getColors: () => colors, clear: () => setColors({}) }),
    [colors]
  );

  const addColor = () => {
    if (color.label && color.count) {
      setColors({ ...colors, [color.label]: color.count });
      setColor({});
    }
  };

  const removeColor = (key: string) => {
    setColors(_.omit(colors, key));
  };

  console.log({ color });

  return (
    <div className="product-colors">
      <div className="label font-bold">Select Colors</div>
      <div className="form-group flex gap-x-2">
        <Input
          type="color"
          name="color-label"
          value={color.label ?? "#000000"}
          onChange={(ev) => setColor({ label: ev.target.value, count: 1 })}
        />
        <InputNumber
          name="color-number"
          min={1}
          type={"number"}
          value={color.count}
          onChange={(count) => setColor({ ...color, count: count ?? 1 })}
        />
        <Button
          disabled={!color?.label || !color.count}
          color="primary"
          onClick={addColor}
        >
          Add
        </Button>
      </div>

      <div className="sizes-wrapper flex flex-wrap gap-2 my-4">
        {Object.keys(colors).map((color) => (
          <Badge key={color} count={colors[color]}>
            <div
              className="color-label shadow-lg p-2 rounded-xl h-6 w-10 cursor-pointer"
              style={{ background: color }}
              onDoubleClick={() => removeColor(color)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default dynamic(
  async () => React.memo(React.forwardRef(ProductColors)),
  { ssr: false }
);
