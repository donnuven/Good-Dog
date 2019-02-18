import * as Yup from "yup";

const getPrivacyPolicySchema = () =>
  Yup.object().shape({
    title: Yup.string().required("Title is required."),
    paragraph: Yup.string()
      .required("Paragraph must be between 128 and 500 characters.")
      .test("len", "Paragraph  must be between 128-500 characters.", val =>
        val ? val.length >= 128 && val.length <= 500 : ""
      ),
    sortOrder: Yup.number().required("Sort order requires a number")
  });

getPrivacyPolicySchema.initialValues = {
  title: "",
  paragraph: "",
  sortOrder: ""
};

export { getPrivacyPolicySchema };
