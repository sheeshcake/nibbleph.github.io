import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

function CardContainer({ title = '', subtitle = '', elevation = 0, custom, children }) {
  return (
    <Card sx={{ boxShadow: elevation }}>
      <CardContent>
        {
          custom ? (
            <Box>
              {custom}
            </Box>
          ) : (
            <>
              <Typography variant='subtitle1' sx={{ marginBottom: -0 }} color='slategray' gutterBottom>
                {title}
              </Typography>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                {subtitle}
              </Typography>
            </>
          )
        }

        <Box marginTop={1}>
        {children}
        </Box>
      </CardContent>
    </Card>
  );
}

CardContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  elevation: PropTypes.number,
  children: PropTypes.any,
};

export default CardContainer;
