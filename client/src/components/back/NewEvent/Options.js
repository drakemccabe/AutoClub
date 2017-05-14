import React, { Component } from 'react';
import { Switch, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload } from 'antd';
import ImageUpload from "./Upload";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  handleSelectChange = (e) => {

  }

  onSwitchChange = (e) => {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map((website) => {
      return <AutoCompleteOption key={website}>{website}</AutoCompleteOption>;
    });

    return (
      <Form style={{ margin: "0 auto", maxWidth: 500 }} onSubmit={this.handleSubmit}>

        <FormItem
          {...formItemLayout}
          label="Event Name"
        >
          <Row gutter={0}>
            <Col span={24}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Event Name is required' }],
              })(
                <Input size="large" />
              )}
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Event Description"
        >
          <Row gutter={0}>
            <Col span={24}>
              {getFieldDecorator('captcha', {
                rules: [{ required: false, message: 'Event Name is required' }],
              })(
                <Input type="textarea" rows={4} size="large" />
              )}
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Event Location"
        >
          <Row gutter={0}>
            <Col span={24}>
              {getFieldDecorator('captcha', {
                rules: [{ required: false, message: 'Event Name is required' }],
              })(
                <Input size="large" />
              )}
            </Col>
          </Row>
        </FormItem>

        <FormItem
           {...formItemLayout}
           label="Facebook Page"
         >
           {getFieldDecorator('website', {
             rules: [{ required: true, message: 'Please input website!' }],
           })(
             <AutoComplete
               dataSource={websiteOptions}
               onChange={this.handleWebsiteChange}
             >
               <Input />
             </AutoComplete>
           )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Price"
        >
        {getFieldDecorator('website', {
          rules: [{ required: true, message: 'Please input website!' }],
        })(
                <Input
            type="number"
            size="large"
            value={0}
            onChange={this.handleNumberChange}
          />
        )}

        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Driver Limit"
        >
        {getFieldDecorator('limit', {
          rules: [{ required: true, message: 'Please input website!' }],
        })(
                <Input
            type="number"
            size="large"
            value={0}
            onChange={this.handleNumberChange}
          />
        )}

        </FormItem>


        <FormItem
          {...formItemLayout}
          label="Close Registration"
        >
        {getFieldDecorator('website', {
          rules: [{ required: true, message: 'Please input website!' }],
        })(
          <Select defaultValue="24" onChange={this.handleSelectChange}>
            <Option value="12">12 Hours Before</Option>
            <Option value="24">1 Day Before</Option>
            <Option value="36">36 Hours Before</Option>
            <Option value="48">2 Days Before</Option>
          </Select>

        )}

        </FormItem>

        <FormItem {...formItemLayout} label="Image">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <ImageUpload />
          )}
        </FormItem>

        <FormItem{...formItemLayout} label="Allow Registration">
          <Switch defaultChecked={true} onChange={this.onSwitchChange} />
        </FormItem>

        <FormItem{...formItemLayout} label="Publicly Viewable">
          <Switch defaultChecked={true} onChange={this.onSwitchChange} />
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>

      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;
