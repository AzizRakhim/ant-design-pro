import React, { useEffect, useState } from 'react';

import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import { Pie, Line } from '@ant-design/plots';
import { Responsive, WidthProvider } from 'react-grid-layout';

import users from './users.json';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Welcome: React.FC = () => {
  // PIE CHART

  const homme = users.filter((u) => u.genre === 'M');
  const femme = users.filter((u) => u.genre === 'F');

  const data = [
    {
      type: 'Homme',
      value: homme.length,
    },
    {
      type: 'Femme',
      value: femme.length,
    },
  ];

  const config = {
    appendPadding: 20,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  // LINE CHART

  const [dataLine, setDataLine] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setDataLine(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const configLine = {
    data: dataLine,
    padding: 50,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  // STEP

  const dataStep = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
    {
      year: '1999',
      value: 8,
    },
  ];
  const configStep = {
    data: dataStep,
    padding: 50,
    xField: 'year',
    yField: 'value',
    stepType: 'vh',
  };

  // MULTI

  const [dataMulti, setDataMulti] = useState([]);

  useEffect(() => {
    asyncFetchMulti();
  }, []);

  const asyncFetchMulti = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setDataMulti(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const configMulti = {
    data: dataMulti,
    xField: 'year',
    yField: 'value',
    padding: 50,
    seriesField: 'category',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  // GRID-LAYOUT

  const layout = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 3, h: 8 },
      { i: 'b', x: 3, y: 0, w: 3, h: 8 },
      { i: 'c', x: 6, y: 0, w: 3, h: 8 },
      { i: 'd', x: 9, y: 0, w: 3, h: 8 },
    ],
    md: [
      { i: 'a', x: 0, y: 0, w: 3, h: 8 },
      { i: 'b', x: 3, y: 0, w: 3, h: 8 },
      { i: 'c', x: 6, y: 0, w: 3, h: 8 },
      { i: 'd', x: 0, y: 3, w: 3, h: 8 },
    ],
    sm: [
      { i: 'a', x: 0, y: 0, w: 4, h: 8 },
      { i: 'b', x: 4, y: 0, w: 4, h: 8 },
      { i: 'c', x: 0, y: 3, w: 4, h: 8 },
      { i: 'd', x: 4, y: 3, w: 4, h: 8 },
    ],
    xs: [
      { i: 'a', x: 0, y: 0, w: 6, h: 8 },
      { i: 'b', x: 0, y: 6, w: 6, h: 8 },
      { i: 'c', x: 0, y: 6, w: 6, h: 8 },
      { i: 'd', x: 0, y: 6, w: 6, h: 8 },
    ],
  };

  // LOCALSTORAGE

  const getLayouts = () => {
    const savedLayouts = localStorage.getItem('grid-layout');

    return savedLayouts
      ? JSON.parse(savedLayouts)
      : { lg: layout.lg, md: layout.md, sm: layout.sm, xs: layout.xs };
  };

  const handleLayoutChange = (layout: any, layouts: any) => {
    localStorage.setItem('grid-layout', JSON.stringify(layouts));
  };

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            'radial-gradient(circle at 97% 10%, #EBF2FF 0%, #F5F8FF 28%, #EBF1FF 124%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#1A1A1A',
            }}
          >
            欢迎使用 Ant Design Pro
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.65)',
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
            的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
          </p>
          <ResponsiveGridLayout
            className="layout"
            layouts={getLayouts()}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 9, sm: 8, xs: 6, xxs: 4 }}
            rowHeight={30}
            onLayoutChange={handleLayoutChange}
            width={1200}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 25,
            }}
          >
            <div
              key={'a'}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              <Pie {...config} />
            </div>
            <div
              key={'b'}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              <Line {...configLine} />
            </div>
            <div
              key={'c'}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              <Line {...configStep} />
            </div>
            <div
              key={'d'}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              <Line {...configMulti} />
            </div>
          </ResponsiveGridLayout>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
