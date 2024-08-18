import React from "react";
import {
  Box,
  Collapse,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function BankDetails() {
  return (
    <Paper sx={{ p: 1, mb: 1 }}>
      <Typography variant={"subtitle2"}>Transfer to this account</Typography>
      <ul>
        <li>
          <Typography variant={"caption"}>Bank name - Gt Bank</Typography>
        </li>
        <li>
          <Typography variant={"caption"}>Account no - 0561649884</Typography>
        </li>
        <li>
          <Typography variant={"caption"}>
            Account name - Pauloxuries Store
          </Typography>
        </li>
        <li>
          <Typography variant={"caption"}>
            Note: Goods will be delivered after transaction is confirmed and
            verified.
          </Typography>
        </li>
        <li>
          <Typography variant={"subtitle2"}>
            Please copy and paste the transaction as the transfer description
            for unique identification
          </Typography>
        </li>
      </ul>
    </Paper>
  );
}

export default BankDetails;
