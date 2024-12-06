import { dealyRequest } from "./common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

type VersionData = {
  version: string;
  users: number;
};

type BrowserData = {
  browser: string;
  color: string;
  users: number;
  marketshare: number;
  versionData: VersionData[];
};

const fetchChartData = () => {
  let data: BrowserData[];
  let promise = fetch("http://localhost:3000/bar-chart-data-2")
    // artificially adding delay to the fetched data
    .then(dealyRequest(3000))
    .then((response: Response) => response.json())
    .then((json) => {
      data = json;
    });

  return {
    read() {
      if (!data) {
        throw promise;
      }
      return data;
    },
  };
};

const chartResource = fetchChartData();

export const BarChartComponent2 = () => {
  const browserData = chartResource.read();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coordinates = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const chartJSData = {
    datasets: [
      {
        label: "Market Share of Browsers",
        data: browserData,
        backgroundColor: [
          browserData[0].color,
          browserData[1].color,
          browserData[2].color,
        ],
        borderColor: [
          browserData[0].color,
          browserData[1].color,
          browserData[2].color,
        ],
        borderWidth: 1,
      },
    ],
  };

  // resetButton plugin
  const resetButtonPlugin = {
    id: "resetButton",
    beforeDraw: (chart: any, args: any, plugin: any) => {
      if (chart.config.data.datasets[0].label !== "Market Share of Browsers") {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;
        ctx.save();
        const text = "Back";
        const borderThickness = 3;
        const padding = 10;
        const textWidth = ctx.measureText(text).width;

        // draw background
        ctx.fillStyle = "hsl(216, 12.2%, 83.9%)";
        // ctx.fillRect(left, top, width, height)
        ctx.fillRect(
          right - (textWidth + Math.ceil(borderThickness / 2) + padding),
          5,
          textWidth + padding,
          20
        );

        // draw text
        ctx.fillStyle = "hsl(215, 13.8%, 34.1%)";
        ctx.font = "12px Arial";
        // ctx.fillText(textContent, left, top)
        ctx.fillText(
          text,
          right - (textWidth + Math.ceil(borderThickness / 2) + padding / 2),
          15
        );

        // draw border
        ctx.lineWidth = borderThickness + "px";
        ctx.strokeStyle = plugin.borderColor ?? "hsl(215, 13.8%, 34.1%) ";
        // ctx.strokeRect(left, top, width, height)
        ctx.strokeRect(
          right - (textWidth + Math.ceil(borderThickness / 2) + padding),
          5,
          textWidth + padding,
          20
        );

        coordinates.top = 5;
        coordinates.bottom = 25;
        coordinates.left =
          right - (textWidth + Math.ceil(borderThickness / 2) + padding);
        coordinates.right = right;

        // save changes
        ctx.restore();
      }
    },
  };

  useEffect(() => {
    const ctx = canvasRef.current;
    if (ctx !== null && ctx.style.display === "") {
      // config for creating myChart
      const config: any = {
        type: "bar",
        data: chartJSData,
        options: {
          onHover: (event: any, chartElement: any) => {
            const canvasEl: any = event.native?.target;
            if (
              myChart.config.data.datasets[0].label ===
              "Market Share of Browsers"
            ) {
              canvasEl.style.cursor = chartElement[0] ? "pointer" : "default";
            } else {
              canvasEl.style.cursor = "default";
            }
          },
          parsing: {
            xAxisKey: "browser",
            yAxisKey: "marketshare",
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            resetButton: {
              // borderColor: "red",
            },
          },
        },
      };

      // myChart
      const myChart = new Chart(ctx, config);

      // update chart based on the browser that is clicked
      const changeChart = (browser: number) => {
        if (myChart.config.options?.parsing) {
          const parsingValue: any = myChart.config.options?.parsing;
          parsingValue.xAxisKey = "versionData.version";
          parsingValue.yAxisKey = "versionData.users";

          const vColor: any[] = [];
          const vUsers: any[] = [];
          const vLabels: any[] = [];
          browserData[browser].versionData.map((versionInfo) => {
            vColor.push(browserData[browser].color);
            vUsers.push(versionInfo.users);
            vLabels.push(versionInfo.version);
          });
          myChart.config.data.datasets[0].data = vUsers;
          myChart.config.data.labels = vLabels;
          myChart.config.data.datasets[0].backgroundColor = vColor;
          myChart.config.data.datasets[0].borderColor = vColor;
          myChart.config.data.datasets[0].label = browserData[browser].browser;
          myChart.update();
        }
      };

      // function triggered on clicking the back button
      const resetChart = () => {
        if (myChart.config.options?.parsing) {
          const parsingValue: any = myChart.config.options?.parsing;
          parsingValue.xAxisKey = "browser";
          parsingValue.yAxisKey = "marketshare";

          const bColors: any[] = [];
          const bMarketShare: any[] = [];
          const bLabels: any[] = [];
          browserData.map((browser) => {
            bColors.push(browser.color);
            bMarketShare.push(browser.marketshare);
            bLabels.push(browser.browser);
          });
          myChart.config.data.datasets[0].backgroundColor = bColors;
          myChart.config.data.datasets[0].borderColor = bColors;
          myChart.config.data.labels = bLabels;
          myChart.config.data.datasets[0].data = bMarketShare;
          myChart.config.data.datasets[0].label = "Market Share of Browsers";
          myChart.update();
        }
      };

      // check if back button is clicked
      const handleButtonClick = (ctx: any, event: any) => {
        const x = event.offsetX;
        const y = event.offsetY;
        if (
          x > coordinates.left &&
          x < coordinates.right &&
          y > coordinates.top &&
          y < coordinates.bottom
        ) {
          resetChart();
        }
      };

      // click eventlistener on the canvas
      ctx.addEventListener("click", (event) => {
        if (
          myChart.config.data.datasets[0].label === "Market Share of Browsers"
        ) {
          const bar = myChart.getElementsAtEventForMode(
            event,
            "nearest",
            { intersect: true },
            true
          );
          if (bar.length) {
            changeChart(bar[0].index);
          }
        }
        handleButtonClick(ctx, event);
      });

      const handleMouseMove = (ctx: any, mousemoveEvent: any) => {
        const x = mousemoveEvent.offsetX;
        const y = mousemoveEvent.offsetY;
        if (
          myChart.config.data.datasets[0].label !== "Market Share of Browsers"
        ) {
          if (
            x > coordinates.left &&
            x < coordinates.right &&
            y > coordinates.top &&
            y < coordinates.bottom
          ) {
            ctx.style.cursor = "pointer";
          } else {
            ctx.style.cursor = "default";
          }
        }
      };

      // mousemove eventlistener on the canvas
      ctx.addEventListener("mousemove", (event) => {
        handleMouseMove(ctx, event);
        myChart.resize();
      });

      Chart.register(resetButtonPlugin);
    }
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Browser Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <canvas ref={canvasRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};
