import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/primitives/buttons';
import { clearCoverLetter, initialState, State } from '../store';
import { setItem } from '../utils/local-storage';
import './CoverLetter.sass';

function Title({ position }: { position: string }) {
  return (
    <section className="app__title">
      <h1>Antonio Okoro</h1>
      <h2>RE: <strong>{position}</strong></h2>
    </section>
  );
}

function Address() {
  return (
    <address className="app__address">
      <p>+2349027286158</p>
      <p>cheezytony1@gmail.com</p>
      <p>
        Lagos, Nigeria
      </p>
    </address>
  );
}

function Salutation({ recipient }: { recipient: string }) {
  return (
    <section className="app__salutation">
      <h3>Dear <strong>{recipient}</strong>,</h3>
    </section>
  );
}

function Greeting() {
  return (
    <section className="app__greeting">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Ipsa, rem dolorum officiis molestias, ipsam libero porro eveniet,
        doloremque harum assumenda eos error aperiam.
        Ullam corrupti voluptates est reiciendis tempora facilis!
      </p>
    </section>
  );
}

function Opener({ companyName }: { companyName: string }) {
  return (
    <section>
      <p>
        Lorem ipsum dolor sit, amet consectetur <strong>{companyName}</strong>.
        Delectus autem numquam explicabo, modi sunt quos?
        Necessitatibus iure velit soluta iusto placeat laudantium esse
        laboriosam aperiam fugit maiores.
        Explicabo, velit laudantium.
      </p>
      <p>
        Praesentium veritatis accusamus id deleniti repellendus
        vitae mollitia saepe repellat pariatur quasi,
        repudiandae animi eos rerum ab autem doloribus cumque facere.
        Consequatur.
      </p>
    </section>
  );
}

function Body() {
  return (
    <section>
      <p>
        Eaque libero accusamus expedita unde,
        dolore vero voluptatem earum repellendus reprehenderit architecto atque
        illum repellat maiores placeat quibusdam iste fugiat voluptate voluptas!
      </p>
      <ul>
        <li>
          Aliquid quam, quia deserunt delectus quae,
          reiciendis vitae dolorem vero neque quisquam repellat nobis quaerat
          accusamus sequi doloremque amet nostrum error odit.
        </li>
        <li>
          Ratione optio debitis ipsa veritatis eius blanditiis, aut velit esse.
          Tempora quas nulla veritatis culpa. Numquam ad nobis doloremque sequi ducimus nemo?
        </li>
      </ul>
      <p>
        Asperiores laborum voluptate dolorum,
        quia obcaecati exercitationem explicabo ullam eveniet libero voluptatem
        quaerat amet hic quidem dolores consequuntur, architecto voluptatum.
        Itaque, esse.
      </p>
    </section>
  );
}

function Closer() {
  return (
    <section>
      <p>
        Illo architecto, dolore, nobis omnis aperiam sapiente sed pariatur culpa
        impedit nihil reprehenderit tempore optio maiores quis autem eum, quia repellendus.
        Possimus.
      </p>
    </section>
  );
}

function Signature() {
  return (
    <section className="app__signature">
      <p>
        Sincerely.
      </p>
      <p>
        Antonio Okoro.
      </p>
    </section>
  );
}

export default function CoverLetterPage() {
  const coverLetter = useSelector((state: State) => state.coverLetter);
  const dispatch = useDispatch();
  const { companyName = '', position = '', recipient = '' } = coverLetter || {};

  const resetCoverLetter = () => {
    dispatch(clearCoverLetter());
    setItem('cover-letter-data', initialState);
  };

  const print = () => window.print();

  return (
    <article>
      <header className="app__header">
        <Title position={position} />
        <Address />
      </header>
      <main>
        <Salutation recipient={recipient} />
        <Greeting />
        <Opener companyName={companyName} />
        <Body />
        <Closer />
        <Signature />
      </main>
      <footer>
        <div className="buttons">
          <Button href="/edit">
            Edit Cover Letter
          </Button>
          <Button onClick={() => print()}>
            Print
          </Button>
          <Button onClick={() => resetCoverLetter()}>
            Reset
          </Button>
        </div>
      </footer>
    </article>
  );
}
