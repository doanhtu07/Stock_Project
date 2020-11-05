import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import themeObj from "../../theme/themeObj";

const styles = (theme) => ({
  radialChart: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    transition: "all 0.3s ease-in",
  },
  noProgress: {
    opacity: "0",
  },
  radialChartTotal: {
    opacity: "0.3",
  },
  radialChartProgress: {
    transform: "rotate(90deg)",
    transformOrigin: "center",
    transition: "all 0.6s cubic-bezier(0.58, 0.16, 0.5, 1.14)",
    transitionDelay: "0.3",
  },
  text: {
    transform: "translateY(0.25em)",
  },
  totalPortfolio: {
    fontSize: "30px",
    fontWeight: "bold",
    lineHeight: "1",
    textAnchor: "middle",
    transform: "translateY(-15px)",
  },
  label: {
    fontSize: "16px",
    fontWeight: "normal",
    textAnchor: "middle",
  },
  cashLabel: {
    transform: "translateY(19px)",
  },
  sharesLabel: {
    transform: "translateX(7px) translateY(43px)",
  },
});
const CASH_COLOR = themeObj.palette.donutChart.cash;
const SHARES_COLOR = themeObj.palette.donutChart.shares;
const TEXT_COLOR = themeObj.palette.donutChart.text;

class DonutChart extends React.Component {
  getStrokeDashArray(progress) {
    const { scale } = this.props;
    return `${progress * scale} ${(100 - progress) * scale}`;
  }

  render() {
    const {
      classes,
      scale,
      progress,
      strokeWidth,
      totalPortfolio,
    } = this.props;

    const circleRadius = 15.91549430918954 * scale; // magic number to get a circle with a circumference of 100
    return (
      <svg
        viewBox="0 0 180 180"
        preserveAspectRatio="xMinYMin meet"
        className={classes.radialChart}
      >
        <Tooltip title="Shares" aria-label="Shares" placement="top" leaveDelay={200}>
          <circle
            className={classes.radialChartProgress}
            stroke={SHARES_COLOR}
            strokeWidth={strokeWidth}
            strokeDasharray={this.getStrokeDashArray(100 - progress)}
            strokeDashoffset={(50 - progress) * scale}
            strokeLinecap="round"
            fill="none"
            cx="90"
            cy="90"
            r={circleRadius}
          />
        </Tooltip>
        <Tooltip title="Cash" aria-label="Cash" placement="top" leaveDelay={200}>
          <circle
            className={clsx(classes.radialChartProgress, {
              [classes.noProgress]: progress === 0
            })}
            stroke={CASH_COLOR}
            strokeWidth={strokeWidth}
            strokeDasharray={this.getStrokeDashArray(progress)}
            strokeDashoffset={50 * scale}
            strokeLinecap="round"
            fill="none"
            cx="90"
            cy="90"
            r={circleRadius}
          />
        </Tooltip>
        <rect
          x={"58"}
          y={"128"}
          rx={"1"}
          ry={"1"}
          width={"5.5"}
          height={"5.5"}
          fill={"none"}
          stroke={SHARES_COLOR}
          strokeWidth={"5.5"}
        />
        <rect
          x={"58"}
          y={"104"}
          rx={"1"}
          ry={"1"}
          width={"5.5"}
          height={"5.5"}
          fill={"none"}
          stroke={CASH_COLOR}
          strokeWidth={"5.5"}
        />
        <g className={classes.text}>
          <text
            x={"50%"}
            y={"50%"}
            fill={TEXT_COLOR}
            className={classes.totalPortfolio}
          >
            {"$" + totalPortfolio}
          </text>
          <text
            x={"50%"}
            y={"50%"}
            fill={TEXT_COLOR}
            className={clsx(classes.label, classes.cashLabel)}
          >
            {"Cash"}
          </text>
          <text
            x={"50%"}
            y={"50%"}
            fill={TEXT_COLOR}
            className={clsx(classes.label, classes.sharesLabel)}
          >
            {"Shares"}
          </text>
        </g>
      </svg>
    );
  }
}

DonutChart.defaultProps = {
  progress: 100,
  strokeWidth: 10,
  scale: 5,
};
DonutChart.propTypes = {
  strokeWidth: PropTypes.number,
  progress: PropTypes.number,
  scale: PropTypes.number,
  totalPortfolio: PropTypes.number,
};

export default withStyles(styles)(DonutChart);
