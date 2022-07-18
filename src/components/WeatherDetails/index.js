import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import styled, { css } from "styled-components";

const WeatherDetails = ({ data }) => {
  const currentDay = data[0];
  const week = data.filter((el) => el !== data[0]);

  const getAverageTemp = (min, max) => (min + max) / 2;

  const list = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
    },
  };
  const item = {
    initial: { opacity: 0 },
    animate: { y: -10, opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Container
      key="details"
      layout
      initial={{
        y: 150,
        x: 0,
        opacity: 0,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Date>
        {moment().format("MMM D")} - {moment().add(5, "days").format("D YYYY")}
      </Date>
      <AverageTemp>
        {Math.round(getAverageTemp(currentDay.temp.min, currentDay.temp.max))}
      </AverageTemp>
      <Temperatures
        initial="initial"
        animate="animate"
        exit="exit"
        variants={list}
      >
        {week?.map((el, i) => (
          <Day key={i} variants={item}>
            <DayName>
              {moment()
                .add(i + 1, "days")
                .format("dddd")}
            </DayName>
            <DayTemp animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {Math.round(getAverageTemp(el.temp.min, el.temp.max))}
            </DayTemp>
          </Day>
        ))}
      </Temperatures>
    </Container>
  );
};

export default WeatherDetails;

const Container = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`);

const SharedDateStyle = css`
  font-size: 14px;
  font-weight: 800;
  color: #6a8e8e;
  text-transform: uppercase;
`;

const Date = styled.span`
  ${SharedDateStyle}
`;

const SharedTempStyle = css`
  position: relative;
  color: #fff;

  &:after {
    content: "°C";
    position: absolute;
    left: 100%;
  }
`;

const AverageTemp = styled.h1`
  ${SharedTempStyle}
  font-size: 90px;

  &:after {
    font-size: 20px;
    top: 25px;
  }
`;

const Temperatures = motion(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`);

const Day = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px;
  flex: 1;
`);

const DayName = styled.span`
  ${SharedDateStyle}
`;

const DayTemp = styled.h4`
  ${SharedTempStyle}
  font-size: 24px;

  &:after {
    font-size: 12px;
    top: 4px;
  }
`;
