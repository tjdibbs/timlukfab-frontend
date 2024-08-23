"use client";

import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { CSSProperties } from "react";

const selectStyle: CSSProperties = { width: "100%" };

const Register = () => {
  return (
    <section>
      <div className="wrapper">
        <form className="mx-auto w-[90%] max-w-sm py-12">
          <div className="text-center">
            <h3 className="mb-4 text-3xl font-semibold max-md:text-2xl">
              Register
            </h3>
            <p className="">Please fill in the information below</p>
          </div>
          <div className="mt-8">
            <div className="mb-4 items-center justify-center gap-4 md:flex">
              <div className="flex-1 max-md:mb-4">
                <label htmlFor="firstName" className="mb-1 block">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full rounded border p-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="mb-1 block">
                  Last name
                </label>
                {/* <input
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded border p-2"
                /> */}
                <Input defaultValue={"Email"} />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="mb-1 block">
                Select gender
              </label>
              {/* <select
                id="gender"
                className="w-full rounded border p-2 focus:outline-none"
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select> */}
              <Select style={selectStyle}>
                <Select.Option value="male">male</Select.Option>
              </Select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Register;
