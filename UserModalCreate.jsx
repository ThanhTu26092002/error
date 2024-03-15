import { useState } from "react";
import { Form, Modal, message, notification, Input, Divider } from "antd";
import { callCreateAUser } from "../../../services/api";
const UserModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const { isSubmit, setIsSubmit } = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateAUser(fullName, password, email, phone);
    if (res && res.data) {
      message.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        onText={"tạo mới"}
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "vui lòng nhập tên hiển thị" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "vui lòng nhập mật khẩu" }]}
          >
            <Input.password />
          </Form.Item>
          <Form.Item
            confirmLoading={{ span: 24 }}
            label="email"
            name="email"
            rules={[{ required: true, message: "vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModalCreate;
