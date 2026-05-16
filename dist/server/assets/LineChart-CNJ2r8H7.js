import { o as generateCategoricalChart, X as XAxis, Y as YAxis, p as formatAxisMap } from "./generateCategoricalChart-wuWYSDUJ.js";
import { L as Line } from "./Line-DFRFjCv7.js";
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
export {
  LineChart as L
};
