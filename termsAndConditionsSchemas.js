import * as Yup from "yup";

const getTermsAndConditionsSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .required("Title must be between 10 and 50 characters.")
      .test("len", "Title must be between 10-50 characters.", val =>
        val ? val.length >= 10 && val.length <= 50 : ""
      ),
    paragraph: Yup.string()
      .required("Paragraph must be between 128 and 500 characters.")
      .test("len", "Paragraph  must be between 128-500 characters.", val =>
        val ? val.length >= 128 && val.length <= 500 : ""
      ),
    sortOrder: Yup.number().required("Sort order requires a number")
  });

getTermsAndConditionsSchema.initialValues = {
  title: "",
  paragraph: "",
  sortOrder: ""
};
export { getTermsAndConditionsSchema };
