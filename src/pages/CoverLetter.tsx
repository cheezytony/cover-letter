import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/primitives/buttons';
import {
  clearCoverLetter, CoverLetter, initialState, State,
} from '../store';
import { setItem } from '../utils/local-storage';
import './CoverLetter.sass';

function Title({ coverLetter: { position } }: { coverLetter: CoverLetter }) {
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
      <p>+2348105844849</p>
      <p>cheezytony1@gmail.com</p>
      <p>
        Lagos, Nigeria
      </p>
    </address>
  );
}

function Salutation({ coverLetter: { recipient } }: { coverLetter: CoverLetter }) {
  return (
    <section className="app__salutation">
      <h3>Dear <strong>{recipient}</strong>,</h3>
    </section>
  );
}

// function Greeting() {
//   return (
//     <section className="app__greeting">
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         Ipsa, rem dolorum officiis molestias, ipsam libero porro eveniet,
//         doloremque harum assumenda eos error aperiam.
//         Ullam corrupti voluptates est reiciendis tempora facilis!
//       </p>
//     </section>
//   );
// }

function Opener(
  { coverLetter: { position, referrer, referrerType } }: { coverLetter: CoverLetter },
) {
  const renderReferrer = () => {
    switch (referrerType) {
      case 'Job Listing':
        return `, which I saw advertised on the ${referrer} website. `;
      case 'Recruiter':
        return `, after being recruited by ${referrer}. `;
      default:
        return '. ';
    }
  };

  return (
    <section>
      <p>
        I&apos;m applying for the {position} position{renderReferrer()}
        I believe I meet all the essential criteria for the role and feel
        I can make an effective and immediate contribution to your team.
      </p>
    </section>
  );
}

function Body({ coverLetter: { currentPosition, currentEmployer } }: { coverLetter: CoverLetter }) {
  return (
    <section>
      <p>
        In my {currentPosition} position with {currentEmployer},
        I handled tasks very similar to what you outlined in your job ad.
        With my ability to learn, I know I can quickly close any knowledge
        gaps to become an asset to your team.
      </p>
      <p>
        I have effective communication skills and the motivation to take on challenging work.
        I am confident that I have the drive, knowledge and experience you need.
      </p>
    </section>
  );
}

function Closer({ coverLetter: { companyName } }: { coverLetter: CoverLetter }) {
  return (
    <section>
      <p>
        Thank you for your time. It would be a pleasure to speak with you and discuss
        this opportunity with {companyName}. I look forward to hearing from you soon.
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

  const resetCoverLetter = () => {
    dispatch(clearCoverLetter());
    setItem('cover-letter-data', initialState);
  };

  const print = () => window.print();

  return (
    <article>
      <header className="app__header">
        <Address />
        <Title coverLetter={coverLetter} />
      </header>
      <main>
        <Salutation coverLetter={coverLetter} />
        {/* <Greeting /> */}
        <Opener coverLetter={coverLetter} />
        <Body coverLetter={coverLetter} />
        <Closer coverLetter={coverLetter} />
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
