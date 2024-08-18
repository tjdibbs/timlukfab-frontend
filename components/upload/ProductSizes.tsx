import { Badge, Button, Input, InputNumber } from "antd";
import _ from "lodash";
import React from "react";
import { SIZE_COLOR_TYPE } from "./SelectProductColors";
import dynamic from "next/dynamic";

function ProductSizes(
  props: {},
  ref: React.ForwardedRef<{ getSizes(): { [x: string]: number } }>
) {
  const [size, setSize] = React.useState<SIZE_COLOR_TYPE>({});

  const [sizes, setSizes] = React.useState<{ [x: string]: number }>({});
  React.useImperativeHandle(
    ref,
    () => ({
      getSizes: () => sizes,
      clear: () => setSizes({}),
    }),
    [sizes]
  );

  const addSize = () => {
    if (size.label && size.count) {
      setSizes({ ...sizes, [size.label]: size.count });
      setSize({});
    }
  };

  const removeSize = (key: string) => {
    setSizes(_.omit(sizes, key));
  };

  return (
    <div className="product-sizes">
      <div className="label font-bold">Select Sizes</div>
      <div className="form-group flex gap-x-2">
        <Input
          name="size-label"
          size="small"
          value={size.label}
          onChange={(ev) => setSize({ label: ev.target.value, count: 1 })}
        />
        <InputNumber
          name="size-number"
          type={"number"}
          min={1}
          value={size.count}
          onChange={(count) => setSize({ ...size, count: count ?? 1 })}
        />
        <Button
          className="bg-primary-low"
          disabled={!size?.label || !size?.count}
          onClick={addSize}
        >
          Add
        </Button>
      </div>

      <div className="sizes-wrapper flex flex-wrap gap-2 my-4">
        {Object.keys(sizes).map((size) => (
          <Badge key={size} count={sizes[size]}>
            <div
              onDoubleClick={() => removeSize(size)}
              className="size-label cursor-pointer select-none shadow-lg p-2 rounded-xl"
            >
              {size}
            </div>
          </Badge>
        ))}
      </div>
    </div>
  );
}

// export default React.memo(React.forwardRef(ProductSizes));
export default dynamic(async () => React.memo(React.forwardRef(ProductSizes)), {
  ssr: false,
});
