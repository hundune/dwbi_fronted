import { listChartByPageUsingPost } from '@/services/dwbi/chartController';
import { useModel } from '@@/exports';
import {Avatar, Button, Card, List, message, Result, Space} from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import {getLoginUserUsingGet} from "@/services/dwbi/userController";
import login from "@/pages/User/Login";
import {Link} from "react-router-dom";

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {


  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [chartList, setChartList] = useState<API.Chart>();
  const [total, setTotal] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(true);
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField:'createTime',
    sortOrder:'desc',
    userId:currentUser.id ?? 0,
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams});
  const loadData = async () => {

    setLoading(true);
    try {
      const res = await listChartByPageUsingPost(searchParams);
      if (res.data) {
        if (res.data.records) {
          //用于删除 JSON 代码中的 title 避免出现在图表中
          res.data.records.forEach((data) => {
            if(data.status === 'succeed'){
              console.log('id',data);
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);

            }
          });
        }
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      }
    } catch (e) {
      message.error('获取我的图表失败' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);
  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="请输入图表名称"
          enterButton
          loading={loading}
          onSearch={(value) => {
            //设置搜索条件
            setSearchParams({
              ...initSearchParams,
              name: value,
            });
          }}
        />
      </div>
      <div className="margin-16"/>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={currentUser?.userAvatar} />}
                title={item.name}
                description={item.chartType ? '图表类型' + item.chartType : undefined}
              />
              <div style={{position:'absolute',right:'10px'}}>
                <Space wrap >
                  <Button>
                    <Link to={'/chart/info/'+item.id}>查看</Link>
                  </Button>
                </Space>
              </div>
              <>
                {
                  item.status === 'wait' &&<>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? "系统繁忙，请耐心等待"}/>
                  </>
                }
              {
                item.status === 'succeed' &&<>
                  <div style={{ marginBottom: 16 }} />
                  <p>{'分析目标' + item.goal}</p>
                  <div style={{ marginBottom: 16 }} />
                  <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
                </>
              }
                {
                  item.status === 'running' &&<>
                    <Result
                      status="info"
                      title="图表生成中"
                      subTitle={item.execMessage}/>
                  </>
                }
              {
                item.status === 'failed' &&<>
                  <Result
                    status="error"
                    title="图表生成失败"
                    subTitle={item.execMessage}/>
                </>
              }
                </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;
