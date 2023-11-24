/** @jsx jsx */
import React, { useCallback } from 'react';
import { jsx } from '@emotion/core';
import { useIsFetching } from 'react-query';
import { useAddBeachToForecast, useForecast, useBeaches } from '../utils/forecast-hooks';
import { useAsync } from '../utils/use-async';
import { ListForecast } from '../components/list-forecast';
import { Map } from '../components/map';
import { Button, BeachFormField, BeachFormInput, BeachFormSelect, Flag, FullPageLoading, MapWrapper } from '../components/lib';

const containerStyles = {
  boxSizing: 'border-box',
  margin: '20px',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyles = {
  backgroundColor: '#eee',
  padding: '1em',
};

const RegisterBeachForm = ({ onSubmit, submitButton, styles }) => {
  const { isLoading, isError, error, run } = useAsync();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const { beachname, latitude, longitude, position } = event.target.elements;

    run(
      onSubmit({
        name: beachname.value,
        lat: parseFloat(latitude.value),
        lng: parseFloat(longitude.value),
        position: position.value,
      })
    );

    if (!isLoading && !isError) {
      event.target.reset();
    }
  }, [onSubmit, isLoading, isError, run]);

  return (
    <div css={{ ...containerStyles, ...styles }}>
      <form onSubmit={handleSubmit} autoComplete="off" css={formStyles}>
        <BeachFormField label="Beach name" block>
          <BeachFormInput label="Beach name" type="text" placeholder="Barra da Tijuca" />
        </BeachFormField>
        <BeachFormField label="Latitude">
          <BeachFormInput
            label="Latitude"
            type="text"
            placeholder="-23.000372"
            pattern="^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$"
          />
        </BeachFormField>
        <BeachFormField label="Longitude">
          <BeachFormInput
            label="Longitude"
            type="text"
            placeholder="-43.365894"
            pattern="^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$"
          />
        </BeachFormField>
        <BeachFormField label="Position">
          <BeachFormSelect label="Position" options={['North', 'South', 'East', 'West']} />
        </BeachFormField>

        <div css={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {React.cloneElement(submitButton, { type: 'submit', isLoading, disabled: isLoading })}
        </div>
        {isError && <Flag type="error" message={error.message} />}
      </form>
    </div>
  );
};

const ForecastScreen = () => {
  const beaches = useBeaches();
  const [handleAddBeach] = useAddBeachToForecast();
  const { forecast, status, error } = useForecast();
  const isFetching = useIsFetching();
  const isError = status === 'error';

  if (status === 'loading') {
    return (
      <FullPageLoading
        caption="Fetching beaches..."
        styles={{ backgroundColor: '#fff', zIndex: '10', ...containerStyles }}
      />
    );
  }

  return (
    <div css={containerStyles}>
      <RegisterBeachForm onSubmit={handleAddBeach} submitButton={<Button>Add beach</Button>} />
      {isError ? (
        <Flag message={error.message} type="text" />
      ) : forecast.length ? (
        <ListForecast
          forecast={forecast}
          isLoading={isFetching}
          filterListItems={(li) => new Date(li.time).getHours() % 6 === 0 && new Date(li.time).getHours() !== 0}
        />
      ) : (
        <Flag type="alert" message="No beaches added yet, let's start!" />
      )}
      <MapWrapper>
        <Map beaches={beaches} />
      </MapWrapper>
    </div>
  );
};

export { ForecastScreen, RegisterBeachForm };
