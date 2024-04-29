import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { TimeField } from "@mui/x-date-pickers/TimeField";
import { Typography } from "@mui/material";

RHFTime.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTime({ name, helperText, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimeField
            value={value}
            label={other?.label}
            onChange={onChange}
            format="hh:mm"
            helperText={<Typography variant='caption' sx={{ color: 'red' }}>{error?.message}</Typography>}
          />
        </LocalizationProvider>
      )}
    />
  );
}
