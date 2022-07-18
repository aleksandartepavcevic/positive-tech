import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "./components/Form";
import WeatherDetails from "./components/WeatherDetails";
import { getGradientColor } from "./utils/getGradientColor";

function App() {
  const [gradientColor, setGradientColor] = useState("#fff2e2");
  const [weatherDetails, setWeatherDetails] = useState(null);

  useEffect(() => {
    if (weatherDetails) {
      const color = getGradientColor(
        weatherDetails?.reduce(
          (previous, current) => previous + current.temp.day,
          0
        ) / weatherDetails?.length
      );
      setGradientColor(color);
    }
  }, [weatherDetails]);

  return (
    <Container color={gradientColor}>
      <AnimatePresence onExitComplete={true}>
        <LayoutGroup>
          <Form name="form" setWeatherDetails={setWeatherDetails} />
          {weatherDetails && (
            <WeatherDetails name="weatherDetails" data={weatherDetails} />
          )}
        </LayoutGroup>
      </AnimatePresence>
    </Container>
  );
}

export default App;

const Container = motion(styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background: linear-gradient(to bottom right, #d3e4f6, ${({ color }) => color})};
padding: 20px 40px;

@media (orientation: portrait) {
  min-height: 800px;
}

@media (max-width: 576px) {
  padding: 60px 30px;
}
`);
