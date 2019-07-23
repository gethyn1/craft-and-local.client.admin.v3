import React from 'react'
import { Form, Input, Button } from 'antd'
import { path } from 'ramda'
import { Categories } from './categories'

const { TextArea } = Input

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class LocationForm extends React.Component {
  onCategoryChange = (checkedValues) => {
    this.props.onFieldUpdate({
      categories: checkedValues
    })
  }

  handleChange = (e) => {
    this.props.onFieldUpdate({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          id: path(['location', 'id'], this.props),
          fields: path(['updatedFields'], this.props)
        })
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const titleError = getFieldError('title')
    const emailError = isFieldTouched('email') && getFieldError('email')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Title is required' }],
            onChange: this.handleChange,
            initialValue: path(['location', 'title'], this.props)
          })(
            <Input placeholder="Title" name="title" />
          )}
        </Form.Item>

        <Form.Item label="Alias" extra="Use this to differentiate between similar locations">
          {getFieldDecorator('alias', {
            onChange: this.handleChange,
            initialValue: path(['location', 'alias'], this.props)
          })(
            <Input placeholder="Alias" name="alias" />
          )}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            onChange: this.handleChange,
            initialValue: path(['location', 'description'], this.props)
          })(
            <TextArea placeholder="Description" name="description" rows={4} />
          )}
        </Form.Item>

        <Categories
          categories={this.props.categories}
          defaultValue={path(['location', 'categories'], this.props)}
          onChange={this.onCategoryChange}
        />

        <Form.Item label="Instagram" extra="Just the username, not the URL">
          {getFieldDecorator('instagramHandle', {
            onChange: this.handleChange,
            initialValue: path(['location', 'instagramHandle'], this.props)
          })(
            <Input placeholder="Instagram" name="instagramHandle" />
          )}
        </Form.Item>

        <Form.Item label="Twitter" extra="Just the username, not the URL">
          {getFieldDecorator('twitterHandle', {
            onChange: this.handleChange,
            initialValue: path(['location', 'twitterHandle'], this.props)
          })(
            <Input placeholder="Twitter" name="twitterHandle" />
          )}
        </Form.Item>

        <Form.Item label="Email address" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [{ type: 'email', message: 'Enter a valid email address' }],
            onChange: this.handleChange,
            initialValue: path(['location', 'email'], this.props)
          })(
            <Input placeholder="Email address" name="email" />
          )}
        </Form.Item>

        <Form.Item label="Website">
          {getFieldDecorator('website', {
            onChange: this.handleChange,
            initialValue: path(['location', 'website'], this.props)
          })(
            <Input placeholder="Website" name="website" />
          )}
        </Form.Item>

        <Form.Item label="Telephone">
          {getFieldDecorator('telephone', {
            onChange: this.handleChange,
            initialValue: path(['location', 'telephone'], this.props)
          })(
            <Input placeholder="Telephone" name="telephone" />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            loading={this.props.isUpdating}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save location
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

/**
 * TO DO: make better use of Form.create API e.g. implement onFieldsChange()
 * for updating redux store.
 */
const WrappedLocationForm = Form.create({ name: 'location_form' })(LocationForm)

export {
  WrappedLocationForm
}
