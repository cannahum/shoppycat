import React from 'react';
import { Formik, Field, Form, FormikHelpers, FormikErrors } from 'formik';

import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import styles from '../styles.module.css';
import RandomFact from './RandomFact';

type AddCatExpenseFormProps = {
  submitCatExpenseForm: (p: CatExpenseCreateParameters) => Promise<unknown>;
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
          if (values.amount <= 0) {
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
        {({ errors, touched, isValid }) => (
          <Form className={styles.addCatExpenseForm}>
            <label htmlFor="itemName">Item:</label>
            <div className={styles.inputWrapper}>
              <Field id="itemName" name="itemName" placeholder="Whiskers Cat Food" />
              {errors.itemName && touched.itemName ? (
                <p className={styles.formValidationError}>{errors.itemName}</p>
              ) : null}
            </div>

            <label htmlFor="category">Category</label>
            <div className={styles.selectWrapper}>
              <Field as="select" id="category" name="category">
                <option value="Food">Food</option>
                <option value="Furniture">Furniture</option>
                <option value="Accessory">Accessory</option>
              </Field>
            </div>

            <label htmlFor="amount">Amount</label>
            <div className={styles.inputWrapper}>
              <Field
                id="amount"
                name="amount"
                type="number"
              />
              {errors.amount && touched.amount ? (
                <p className={styles.formValidationError}>{errors.amount}</p>
              ) : null}
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" disabled={!isValid}>Submit</button>
            </div>
          </Form>

        )}
      </Formik>
      <RandomFact />
    </div>
  )

}

export default AddCatExpenseForm;
