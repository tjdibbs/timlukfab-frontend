import React from "react";
import { OrderType } from "@lib/types";
import {
  Control,
  Controller,
  ControllerRenderProps,
  useForm,
} from "react-hook-form";
import { Input } from "antd";

function useInputController() {
  const {
    control,
    formState: { errors },
  } = useForm<OrderType>();

  const ControllerComp = (props: {
    required?: boolean;
    name: keyof OrderType;
    id: string;
    placeholder?: string;
    content?: (
      field: ControllerRenderProps<OrderType, keyof OrderType>
    ) => React.ReactElement;
  }) => {
    return (
      <Controller
        name={props.name}
        control={control}
        rules={{ required: props.required ?? false }}
        render={({ field }) =>
          props.content ? (
            props.content(field)
          ) : (
            // @ts-ignore
            <Input
              className={"form-control"}
              size="large"
              id={props.id}
              status={errors[props.name] && "error"}
              {...field}
              placeholder={props.placeholder ?? "----- ... ----"}
            />
          )
        }
      />
    );
  };
  return <div>useInputController</div>;
}

export default useInputController;
