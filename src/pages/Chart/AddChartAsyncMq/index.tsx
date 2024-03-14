import {
  genChartByAiAsyncMqUsingPost,
  genChartByAiAsyncUsingPost,
  genChartByAiUsingPost,
  listChartByPageUsingPost
} from '@/services/dwbi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {Alert, Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Spin, Upload} from 'antd';
import { createStyles } from 'antd-style';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {useForm} from "antd/es/form/Form";


const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
/**
 * 添加图表页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [from] = useForm();
  const [submitting,setSubmitting] = useState<boolaen>(false);
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    if(submitting){
      return;
    }
    setSubmitting(true)
    // 对接后端,上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      // const res = await genChartByAiAsyncUsingPost(params, {}, values.file.file.originFileObj);
      const res = await genChartByAiAsyncMqUsingPost(params, {}, values.file.file.originFileObj);
      if(!res.data){
        message.error('分析失败');
      }else{
        message.success('分析任务提交成功，稍后请在我的表单页面查看');
        from.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
    }
    setSubmitting(false)
  };

  return (
    <div className="add-chart-async">
      <Card title = "智能分析">
        <Form from = {from} name="add-chart" labelAlign="left" labelCol={{span:4}} wrapperCol={{span:16}} onFinish={onFinish} initialValues={{}}>
          <Form.Item
            name="goal"
            label="分析目标"
            rules={[{ required: true, message: '请输入分析目标' }]}
          >
            <TextArea placeholder="请输入你的分析诉求，比如：网站用户的增长情况" />
          </Form.Item>
          <Form.Item name="name" label="图表名称">
            <Input placeholder="请输入你的分析诉求，比如：网站用户的增长情况" />
          </Form.Item>
          <Form.Item name="chartType" label="图表类型">
            <Select
              options={[
                { value: '折线图', label: '折线图' },
                { value: '柱状图', label: '柱状图' },
                { value: '堆叠图', label: '堆叠图' },
                { value: '饼图', label: '饼图' },
                { value: '雷达图', label: '雷达图' },
              ]}
            />
          </Form.Item>

          <Form.Item name="file" label="原始数据">
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>

  );
};
export default AddChartAsync;
