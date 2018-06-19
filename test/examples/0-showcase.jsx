import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const hours = 24;
const daysInMounth = 30;
const totalBreakPoints = hours * daysInMounth;

const itemStatics = {
  // calc position based on current breakpoints
  x: () => {

  },
  y: 0,
  w: 2,
  minH: 2,
  maxH: 2,
  h: 2,
};

const items = [
  {
    id: 1,
    i: 1, // delete later id = i in loop map
    x: (_.random(0, 120)),
    y: 0,
    w: 8,
    minH: 2,
    maxH: 2,
    h: 2,
    static: false,
    hehe: 'lol',
  },
];

class ShowcaseLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    margin: [0, 10],
    rowHeight: 35,
    onLayoutChange: function() {},
    cols: { lg: totalBreakPoints, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout()
  };

  state = {
    items: [],
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.initialLayout }
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function(l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">
              {JSON.stringify(l)}
            </span>
          )}
        </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical" ? null : "horizontal";
    this.setState({ compactType });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: generateLayout() }
    });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
            columns)
          </div>
          <div>
            Compaction type:{" "}
            {_.capitalize(this.state.compactType) || "No Compaction"}
          </div>
          <button onClick={this.onNewLayout}>Generate New Layout</button>
          <button onClick={this.onCompactTypeChange}>
            Change Compaction Type
          </button>
        </div>
        <div style={{ position: 'relative', height: `100px`, width: `100%`, overflowY: 'hidden', overflowX: 'scroll' }}>
          <div style={{ width: `${totalBreakPoints * 20}px` }}>
            <ResponsiveReactGridLayout
              {...this.props}
              layouts={this.state.layouts}
              preventCollision={true}
              containerPadding={[0,0]}
              resizableAxis="x"
              maxRows={1}
              onBreakpointChange={this.onBreakpointChange}
              onLayoutChange={this.onLayoutChange}
              // WidthProvider option
              measureBeforeMount={false}
              // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
              // and set `measureBeforeMount={true}`.
              useCSSTransforms={this.state.mounted}
              compactType={this.state.compactType}
            >
              {this.generateDOM()}
            </ResponsiveReactGridLayout>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ShowcaseLayout;

function generateLayout() {
  return _.map(_.range(0, 3), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 120)),
      y: 0,
      w: 2,
      minH: 2,
      maxH: 2,
      h: 2,
      i: i.toString(),
      static: Math.random() < 0.05,
      hehe: 'lol' + i.toString(),
    };
  });
}

if (require.main === module) {
  require("../test-hook.jsx")(module.exports);
}
