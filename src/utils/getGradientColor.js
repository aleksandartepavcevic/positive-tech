import colorBetween from "color-between";

const temps = {
  first: {
    value: -40,
    color: "#133888",
  },
  second: {
    value: -30,
    color: "#0F8FDA",
  },
  third: {
    value: -20,
    color: "#20A4EE",
  },
  fourth: {
    value: -10,
    color: "#5DC4FE",
  },
  fifth: {
    value: 0,
    color: "#97DBFF",
  },
  sixth: {
    value: 10,
    color: "#B2DFDC",
  },
  seventh: {
    value: 20,
    color: "#E8D88A",
  },
  eigth: {
    value: 30,
    color: "#FFC478",
  },
  ninth: {
    value: 40,
    color: "#FC9352",
  },
};

export const getGradientColor = (temp) => {
  const { first, second, third, fourth, fifth, sixth, seventh, eigth, ninth } =
    temps;
  let minColor;
  let maxColor;
  const gradientDegree = 0.5;
  const outputFormat = "hex";

  if (temp >= first.value && temp < second.value) {
    minColor = first.color;
    maxColor = second.color;
  } else if (temp >= second.value && temp < third.value) {
    minColor = second.color;
    maxColor = third.color;
  } else if (temp >= third.value && temp < fourth.value) {
    minColor = third.color;
    maxColor = fourth.color;
  } else if (temp >= fourth.value && temp < fifth.value) {
    minColor = fourth.color;
    maxColor = fifth.color;
  } else if (temp >= fifth.value && temp < sixth.value) {
    minColor = fifth.color;
    maxColor = sixth.color;
  } else if (temp >= sixth.value && temp < seventh.value) {
    minColor = sixth.color;
    maxColor = seventh.color;
  } else if (temp >= seventh.value && temp < eigth.value) {
    minColor = seventh.color;
    maxColor = eigth.color;
  } else if (temp >= eigth.value && temp <= ninth.value) {
    minColor = eigth.color;
    maxColor = ninth.color;
  }

  return colorBetween(minColor, maxColor, gradientDegree, outputFormat);
};
