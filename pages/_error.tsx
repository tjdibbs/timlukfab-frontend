/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import { Card, Typography } from "@mui/material";
import { NextPage, NextPageContext } from "next";

const Error: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="page_text">
            <h1>{statusCode ?? "Client Side"} Page Error</h1>
            <Typography variant={"subtitle2"}>
              {statusCode
                ? `An error ${statusCode} occurred on server`
                : "An error occurred on client"}
            </Typography>
          </div>
          <div className="ag-page-404">
            <div className="ag-toaster-wrap">
              <div className="ag-toaster">
                <div className="ag-toaster_back"></div>
                <div className="ag-toaster_front">
                  <div className="js-toaster_lever ag-toaster_lever"></div>
                </div>
                <div className="ag-toaster_toast-handler">
                  <div className="js-toaster_toast ag-toaster_toast js-ag-hide"></div>
                </div>
              </div>

              <canvas id="canvas-404" className="ag-canvas-404"></canvas>
              <img
                className="ag-canvas-404_img"
                src="https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png"
                alt={"Error smoke"}
              />
            </div>
          </div>
        </div>
      </div>
      <script id={"jquery"} src="/js/jquery.min.js" />
      <script
        id={"errorjs"}
        src="/js/error_page.js"
        onError={(e) => console.error(e)}
      />
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? (err.statusCode as number)
    : 404;
  return { statusCode };
};

export default Error;
