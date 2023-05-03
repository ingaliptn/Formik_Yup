import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Мінімум 2 символи!")
          .required(`Обов'язкове поле!`),
        email: Yup.string()
          .email("Неправильна адресса")
          .required(`Обов'язкове поле!`),
        amount: Yup.number().min(5, "Не менше 5").required(`Обов'язкове поле!`),
        currency: Yup.string().required("Виберіть валюту!"),
        text: Yup.string().min(10, "Не менше 10 символів"),
        terms: Yup.boolean()
          .required("Необхідна згода!")
          .oneOf([true], "Необхідна згода!"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}>
      <Form className="form">
        <h2>Отправить пожертвование</h2>

        <MyTextInput label={"Ваше имя"} id="name" name="name" type="text" />

        <MyTextInput
          label={"Ваша почта"}
          id="email"
          name="email"
          type="email"
        />

        <MyTextInput
          label={"Количество"}
          id="amount"
          name="amount"
          type="number"
        />

        <label htmlFor="currency">Валюта</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div" />

        <label htmlFor="text">Ваше сообщение</label>
        <Field id="text" name="text" as="textarea" />
        <ErrorMessage className="error" name="text" component="div" />

        <label className="checkbox">
          <Field name="terms" type="checkbox" />
          Соглашаетесь с политикой конфиденциальности?
        </label>
        <ErrorMessage className="error" name="terms" component="div" />
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
