import * as Yup from "yup";

const getFaqSchema = () =>
  Yup.object().shape({
    categoryId: Yup.number().required("Category id  requires a number"),
    question: Yup.string()
      .required("Question with a minimum length of 50 characters is required.")
      .test("len", "Question must be minimum of 50 characters", val =>
        val ? val.length >= 50 : ""
      ),
    answer: Yup.string()
      .required("Answer must be between 100 and 500 characters.")
      .test("len", "Answer must be between 100-500 characters.", val =>
        val ? val.length >= 100 && val.length <= 500 : ""
      ),
    sortOrder: Yup.number().required("Sort order requires a number")
  });

getFaqSchema.initialValues = {
  categoryId: "",
  question: "",
  answer: "",
  sortOrder: ""
};

export { getFaqSchema };
