import './Invoice.sass';

// type InvoiceItem = {
//   title: string
//   price: number
//   quantity: number
// }

// type PaymentInformation = {
//   downPayment?: {
//     percentage: number
//     date: string
//   }
//   source?: {
//     title: string
//   }
//   target: {
//     bankName: string,
//     accountNumber: string
//   }
// }

export default function Invoice() {
  // const items: InvoiceItem[] = [{
  //   title: 'Web Development',
  //   price: 30000,
  //   quantity: 1,
  // }];

  // const payment: PaymentInformation = {
  //   downPayment: {
  //     percentage: 40,
  //     date: 'immediately',
  //   },
  //   source: {
  //     title: 'Trifta Technologies Limited',
  //   },
  //   target: {
  //     bankName: 'Access Bank',
  //     accountNumber: '0825909821',
  //   },
  // };

  // console.log(items, payment);

  return (
    <article>
      <header>
        <section>
          <h1>Antonio Okoro</h1>
          <h2>Software Engineer</h2>
        </section>
        <section>
          <h3>Bill To</h3>
        </section>
        <section>
          <h3>Payment To Be Made To</h3>
        </section>
      </header>
      <main>
        {/*  */}
      </main>
      <footer>
        {/*  */}
      </footer>
    </article>
  );
}
