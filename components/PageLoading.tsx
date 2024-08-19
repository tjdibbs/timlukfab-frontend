"use client";

import { Spin } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import JQuery from "jquery";

export default React.forwardRef(function PageLoading(props, ref) {
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({}), []);

  // React.useEffect(() => {
  //   Router.events.on("routeChangeStart", () => {
  //     JQuery("body").addClass("overflow-hidden");
  //     setOpen(true);
  //   });
  //   Router.events.on("routeChangeComplete", () => {
  //     JQuery("body").removeClass("overflow-hidden");
  //     setOpen(false);
  //   });
  // });

  useEffect(() => {
    JQuery("body").addClass("overflow-hidden");
    setOpen(true);
    return () => {
      JQuery("body").removeClass("overflow-hidden");
      setOpen(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed w-full h-full top-0 left-0 z-[999999]">
          <motion.div
            initial={{ opacity: 0 }}
            className="absolute w-full h-full bg-black/80"
            animate={{ opacity: 1 }}
          />
          <div className="loading-indicator h-full grid place-items-center">
            <Spin
              size="large"
              className="[&_.ant-spin-dot-item]:bg-primary-low"
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
});
