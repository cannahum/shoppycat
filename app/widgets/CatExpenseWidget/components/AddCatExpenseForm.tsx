import React from 'react';
import { Formik, Field, Form, FormikHelpers, FormikErrors } from 'formik';

import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import styles from '../styles.module.css';

type AddCatExpenseFormProps = {
  submitCatExpenseForm: (p: CatExpenseCreateParameters) => Promise<void>
};

function AddCatExpenseForm(props: AddCatExpenseFormProps): JSX.Element {
  return (
    <div className={styles.addCatExpenseFormWrapper}>
      <Formik
        initialValues={{
          itemName: '',
          amount: 0,
          category: 'Food'
        }}
        validate={(values: CatExpenseCreateParameters) => {
          const errors: FormikErrors<CatExpenseCreateParameters> = {};
          if (!values.itemName) {
            errors.itemName = 'Required';
          }
          if (values.amount === 0) {
            errors.amount = 'Amount should be > 0'
          }
          return errors;
        }}
        onSubmit={async (
          values: CatExpenseCreateParameters,
          { setSubmitting }: FormikHelpers<CatExpenseCreateParameters>
        ) => {
          setSubmitting(true);
          await props.submitCatExpenseForm(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.addCatExpenseForm}>
            <label htmlFor="itemName">Item:</label>
            <Field id="itemName" name="itemName" placeholder="Whiskers Cat Food" />
            {errors.itemName && touched.itemName ? (
              <p className={styles.formValidationError}>{errors.itemName}</p>
            ) : null}

            <label htmlFor="category">Category</label>
            <Field as="select" id="category" name="category">
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
              <option value="Accessory">Accessory</option>
            </Field>

            <label htmlFor="amount">Amount</label>
            <Field
              id="amount"
              name="amount"
              type="number"
            />
            {errors.amount && touched.amount ? (
              <p className={styles.formValidationError}>{errors.amount}</p>
            ) : null}

            <button type="submit">Submit</button>
          </Form>

        )}
      </Formik>
      <div className={styles.randomFactWrapper}>
        <span className={styles.randomFactTitle}>Random cat fact:</span>
        <span className={styles.randomFact}>Info here...</span>
      </div>
    </div>
  )

}

export default AddCatExpenseForm;
