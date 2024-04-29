import PropTypes from "prop-types";
import "react-phone-input-2/lib/material.css";
// form
import { useFormContext, Controller } from "react-hook-form";
// PhoneInput
import PhoneInput from "react-phone-input-2";
// MUI

import { 
  Box,
  Typography
} from '@mui/material'

// ----------------------------------------------------------------------

RHFPhoneNumber.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFPhoneNumber({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <PhoneInput
            country={"us"}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            inputStyle={{ borderColor: error ? "red" : "", width: '100%' }}
            {...other}
            {...field}
          />
          {
            error && (
              <Box paddingX={2}>
                <Typography color='error' variant='caption'>{ error?.message }</Typography>
              </Box>
            )
          }
        </>
      )}
    />
  );
}
