"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { analytics, diagnostic, site, type DiagnosticQuestion } from "@/content";
import { fill, mutedClass } from "@/lib/copy";
import { track } from "@/lib/track";

/**
 * The diagnostic form.
 *
 * mode "form" (v0): all ten questions on one screen, then the contact fields.
 * mode "stepper" (v1): one question per step, progress, back button. The
 * stepper's client-side scoring (diagnostic.scoring) is v1 work and is not
 * built here; the seam is `mode` plus the `questions` prop.
 *
 * Field names are the long-run contract for the v1 scoring function:
 * q1…q10 (radio value = option id), q5_contactsTotal / q5_contactsEmailable,
 * and name / company / email. They must match public/__forms.html.
 *
 * Submission goes to Netlify Forms: a urlencoded POST, including form-name,
 * to the static form definition in public/__forms.html.
 */

export type DiagnosticMode = "form" | "stepper";
type Status = "idle" | "submitting" | "success" | "error";
type Answers = Record<string, string>;

/* analytics.v0 = ["diagnostic_submit", "booking_click"] */
const [SUBMIT_EVENT, BOOKING_EVENT] = analytics.v0;

/* content.ts has no copy for the failure state (BUILD.md asks for a plain
   inline message). Listed in the build report as missing from content.ts. */
const SEND_FAILED = "That didn't send. Please try again, or email Sophie directly";
const SEND_FAILED_AT = " at ";

const FORM_ENDPOINT = "/__forms.html";

export function fieldNamesFor(question: DiagnosticQuestion): string[] {
  if (question.kind === "twoNumbers") {
    return (question.fields ?? []).map((field) => `q${question.id}_${field.id}`);
  }
  return [`q${question.id}`];
}

export function DiagnosticForm({
  questions,
  mode,
}: {
  questions: DiagnosticQuestion[];
  mode: DiagnosticMode;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);

  const { contact, thankYou, stageNote, netlifyFormName } = diagnostic;
  const questionFieldNames = questions.flatMap(fieldNamesFor);
  const contactFieldNames = contact.fields.map((field) => field.id);
  const allFieldNames = [...questionFieldNames, ...contactFieldNames];

  /* Stepper: one step per question, then the contact step. */
  const totalSteps = questions.length + 1;
  const isStepper = mode === "stepper";
  const lastStep = step === totalSteps - 1;

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  const set = (name: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [name]: value }));

  const next = () => {
    if (formRef.current?.reportValidity()) setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isStepper && !lastStep) {
      next();
      return;
    }
    setStatus("submitting");
    try {
      const body = new URLSearchParams({ "form-name": netlifyFormName });
      for (const name of allFieldNames) body.set(name, answers[name] ?? "");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      track(SUBMIT_EVENT);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="thank-you" role="status" tabIndex={-1} ref={statusRef}>
        <h3>{thankYou.heading}</h3>
        <p>{thankYou.body}</p>
        {site.bookingUrl !== null && (
          <p className="form__actions">
            <a
              href={site.bookingUrl}
              className="button button--primary"
              onClick={() => track(BOOKING_EVENT)}
            >
              {thankYou.bookingLabel}
            </a>
          </p>
        )}
      </div>
    );
  }

  const renderQuestion = (question: DiagnosticQuestion) => (
    <QuestionField key={question.id} uid={uid} question={question} answers={answers} set={set} />
  );

  const renderContact = () => (
    <div className="contact">
      <h3>{contact.heading}</h3>
      <div className="contact__fields">
        {contact.fields.map((field) => {
          const id = `${uid}-${field.id}`;
          return (
            <label
              key={field.id}
              htmlFor={id}
              className={["field", field.type === "email" ? "field--wide" : undefined].filter(Boolean).join(" ")}
            >
              <span className="field__label">{field.label}</span>
              <input
                id={id}
                className="input"
                type={field.type}
                name={field.id}
                required={field.required}
                autoComplete={autoCompleteFor(field.id)}
                value={answers[field.id] ?? ""}
                onChange={(e) => set(field.id, e.target.value)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <form
      ref={formRef}
      className="diagnostic"
      name={netlifyFormName}
      method="POST"
      action={FORM_ENDPOINT}
      onSubmit={(e) => void onSubmit(e)}
    >
      <input type="hidden" name="form-name" value={netlifyFormName} />
      <p className="diagnostic__note">{stageNote}</p>

      {isStepper ? (
        <>
          <p className="stepper__progress">
            {fill(diagnostic.progressLabel, { current: step + 1, total: totalSteps })}
          </p>
          {lastStep ? renderContact() : renderQuestion(questions[step])}
          <div className="stepper__actions">
            {step > 0 && (
              <button type="button" className="button" onClick={back}>
                {diagnostic.backLabel}
              </button>
            )}
            {lastStep ? (
              <button type="submit" className="button button--primary" disabled={status === "submitting"}>
                {contact.submitLabel}
              </button>
            ) : (
              <button type="button" className="button button--primary" onClick={next}>
                {diagnostic.nextLabel}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {questions.map(renderQuestion)}
          {renderContact()}
          <div className="form__actions">
            <button type="submit" className="button button--primary" disabled={status === "submitting"}>
              {contact.submitLabel}
            </button>
          </div>
        </>
      )}

      {status === "error" && (
        <p className="form__error" role="alert" tabIndex={-1} ref={statusRef}>
          {SEND_FAILED}
          {site.email !== null && (
            <>
              {SEND_FAILED_AT}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </>
          )}
          .
        </p>
      )}
    </form>
  );
}

function autoCompleteFor(fieldId: string): string | undefined {
  switch (fieldId) {
    case "name":
      return "name";
    case "company":
      return "organization";
    case "email":
      return "email";
    default:
      return undefined;
  }
}

function QuestionField({
  uid,
  question,
  answers,
  set,
}: {
  uid: string;
  question: DiagnosticQuestion;
  answers: Answers;
  set: (name: string, value: string) => void;
}) {
  const promptClass = mutedClass(question.prompt);

  if (question.kind === "single") {
    const name = `q${question.id}`;
    return (
      <fieldset className="question">
        <legend className={promptClass}>{question.prompt}</legend>
        <ul className="question__options">
          {(question.options ?? []).map((option) => {
            const id = `${uid}-${name}-${option.id}`;
            return (
              <li key={option.id}>
                <label htmlFor={id} className="option">
                  <input
                    id={id}
                    type="radio"
                    name={name}
                    value={option.id}
                    required
                    checked={answers[name] === option.id}
                    onChange={() => set(name, option.id)}
                  />
                  <span>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    );
  }

  if (question.kind === "twoNumbers") {
    return (
      <fieldset className="question">
        <legend className={promptClass}>{question.prompt}</legend>
        <div className="numbers">
          {(question.fields ?? []).map((field) => {
            const name = `q${question.id}_${field.id}`;
            const id = `${uid}-${name}`;
            return (
              <label key={field.id} htmlFor={id} className="field">
                <span className="field__label">{field.label}</span>
                <input
                  id={id}
                  className="input"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  name={name}
                  required
                  value={answers[name] ?? ""}
                  onChange={(e) => set(name, e.target.value)}
                />
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const name = `q${question.id}`;
  const id = `${uid}-${name}`;
  return (
    <div className="question">
      <label htmlFor={id} className={["question__label", promptClass].filter(Boolean).join(" ")}>
        {question.prompt}
      </label>
      <textarea
        id={id}
        className="input"
        name={name}
        required
        rows={3}
        value={answers[name] ?? ""}
        onChange={(e) => set(name, e.target.value)}
      />
    </div>
  );
}
