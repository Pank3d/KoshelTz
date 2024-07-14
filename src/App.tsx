import { observer } from 'mobx-react-lite';
import style from './App.module.scss';
import { Formik, Field, Form } from 'formik';
import ConverterStore from './store';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useEffect, useState } from 'react';

const validationFormSchema = z.object({
  EUR: z.number({message:"Это поле только для чисел"}).optional(),
  USD: z.number({ message: "Это поле только для чисел" }).optional(),
});


const App = observer(() => {
  const [eurToUsd, setEurToUsd] = useState(false)
  const [usdToEur, setUsdToEur] = useState(false) 
  const oneEurToDollar = 1.07
  const store = ConverterStore;
  useEffect(() => {
    usdToEur && store.setEuInput(store.usInput / oneEurToDollar)
    eurToUsd && store.setUsInput(store.euInput * oneEurToDollar)
  }, [store.euInput, store.usInput])
  const reset =() =>{
    store.reset()
    setEurToUsd(false)
    setUsdToEur(false)

  }

  return (
    <section className={style.mainWrapper}>
      <div>
        <Formik
          initialValues={{
            EUR: '',
            USD: '',
          }}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={toFormikValidationSchema(validationFormSchema)}
          onSubmit={(values) => {
            console.log('Submitted values:', values);
          }}
        >
          {({ handleChange }) => (
            <Form className={style.fieldWrapper}>
              <div className={style.field}>
                <label>USD</label>
                <Field
                 value={isNaN(store.usInput) ? store.setUsInput(0) : store.usInput}
                  name="USD"
                  placeholder="Введите сумму в долларах"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    store.setUsInput(parseInt(e.target.value));
                    setUsdToEur(true)
                  }}
                />
                
              </div>
              {(eurToUsd ) && <p>Из евро в доллар</p>}
              {(usdToEur )  && <p>Из доллара в евро</p>}
              <div className={style.field}>
                <label>EUR</label>
                <Field
                  value={isNaN(store.euInput) ? store.setEuInput(0) : store.euInput}
                  name="EUR"
                  placeholder="Введите сумму в Евро"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    store.setEuInput(parseInt(e.target.value));
                    setEurToUsd(true)
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
        <button className={style.resetButton} onClick={() => reset()}>Отчистить</button> 
      </div>
    </section>
  );
});

export default App;
