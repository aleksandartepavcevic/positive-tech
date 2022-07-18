import React, { useCallback, useEffect, useState } from "react";
import { TiWeatherShower } from "react-icons/ti";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Select from "../Inputs/Select";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import styled, { css } from "styled-components";
import { useDebounce } from "../../hooks/useDebounce";
import { motion } from "framer-motion";

const API_KEY = "51ecf6712221f490e1b9dea4d5bda391";

const Form = ({ setWeatherDetails }) => {
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [locationOptions, setLocationOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedLocation = useDebounce(location);
  const countryOptions = [
    { id: "1", value: "RS", label: "Serbia" },
    { id: "2", value: "GB", label: "Great Britain" },
    { id: "3", value: "CA", label: "Canada" },
  ];

  const getWeatherDetails = async (lat, lon) => {
    try {
      setLoading(true);
      const units = "metric";
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=3&units=${units}&appid=${API_KEY}`;
      const res = await axios.get(url);
      setWeatherDetails(res.data.daily);
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getOptions = useCallback(async (location, country, limit = 5) => {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location},${country}&limit=${limit}&appid=${API_KEY}`;
      const res = await axios.get(url);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  const handleOptionClick = (e, options, callback) => {
    const { id } = e.target;
    const element = options.filter((option) => option.id === id)[0];
    callback(element);
  };

  useEffect(() => {
    if (debouncedLocation) {
      setLoading(true);
      getOptions(debouncedLocation, country)
        .then((res) => {
          setLoading(false);
          const options = res.data.map((el, i) => ({
            id: `${el.name}-${i}`,
            lat: el.lat,
            lon: el.lon,
            value: `${el.name}`,
            label: `${el.name}`,
          }));
          setLocationOptions(options);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      setLoading(false);
      setLocationOptions(null);
    }
  }, [debouncedLocation, getOptions, country]);

  const locationSelectEndAdornment = loading ? (
    <Oval
      ariaLabel="loading-indicator"
      height={20}
      width={20}
      strokeWidth={5}
      strokeWidthSecondary={5}
      color="#000"
      secondaryColor="#fff"
      wrapperStyle={{ margin: "0 15px" }}
    />
  ) : (
    <SearchIcon />
  );

  return (
    <Container layout>
      <WeatherIcon />
      <Select
        styles={CountrySelectStyling}
        placeholder="Country"
        value={country}
        options={countryOptions}
        handleChange={handleCountryChange}
        handleOptionClick={(e) =>
          handleOptionClick(e, countryOptions, (el) => setCountry(el.value))
        }
        endAdornment={<CarretIcon />}
      />
      <Select
        isSearchable
        placeholder="Please enter your location..."
        value={location}
        options={locationOptions}
        handleChange={handleLocationChange}
        handleOptionClick={(e) =>
          handleOptionClick(e, locationOptions, (el) => {
            setLocation(el.label);
            getWeatherDetails(el.lat, el.lon);
          })
        }
        endAdornment={locationSelectEndAdornment}
        disabled={!country}
      />
    </Container>
  );
};

export default Form;

const CountrySelectStyling = css`
  max-width: 140px;

  @media (max-width: 576px) {
    max-width: unset;
    margin-bottom: 15px;
  }
`;

const Container = motion(styled.div`
  position: relative;
  width: clamp(250px, 38.042vw, 500px);
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px 15px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`);

const WeatherIcon = styled(TiWeatherShower)`
  position: absolute;
  top: -30px;
  left: -30px;
  font-size: 30px;
  background-color: #fff;
  padding: 15px;
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const SearchIcon = styled(BiSearch)`
  font-size: 20px;
  margin: 5px 15px 0;
  cursor: pointer;
`;

const CarretIcon = styled(BsFillCaretDownFill)`
  font-size: 12px;
  margin: 5px 15px 0;
  cursor: pointer;
`;
