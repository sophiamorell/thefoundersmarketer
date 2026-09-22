"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { analytics, diagnostic, site, type DiagnosticQuestion } from "@/content";
import { fill, mutedClass } from "@/lib/copy";
import { track } from "@/lib/track";

/**
 * The diagnostic form.
 *
 * mode "stepper" (site-edits.md): a wizard, one question per screen, then the
 * contact step. Single-choice questions advance on their own shortly after a
 * tap; Q5, Q10 and the contact step use Next. Back restores the previous
 * answer. Answers live in React state only and are posted once at the end.
 *
 * mode "form": every question on one screen, then the contact fields.
 *
 * Field names are the long-run contract for the v1 scoring function:
 * q1…q10 (choice value = option id), q5_contactsTotal / q5_contactsEmailable,
 * and name / company / email. They must match public/__forms.html.
 *
 * Submission goes to Netlify Forms: a urlencoded POST, including form-name,
 * to the static form definition in public/__forms.html. No scoring, verdict
 * or results email happens in the browser; that is v1.
 */

export type DiagnosticMode = "form" | "stepper";
type Status = "idle" | "submitting" | "success" | "error";
type Answers = Record<string, string>;

/* analytics.v0 = ["diagnostic_start", "diagnostic_step", "diagnostic_submit", "booking_click"] */
const [START_EVENT, STEP_EVENT, SUBMIT_EVENT, BOOKING_EVENT] = analytics.v0;

/* content.ts has no copy for the failure state (BUILD.md asks for a plain
   inline message). Listed in the build report as missing from content.ts. */
const SEND_FAILED = "That didn't send. Please try again, or email Sophie directly";
const SEND_FAILED_AT = " at ";

const FORM_ENDPOINT = "/__forms.html";
const AUTO_ADVANCE_MS = 250;

export function fieldNamesFor(question: DiagnosticQuestion): string[] {
  if (question.kind === "twoNumbers") {
    return (question.fields ?? []).map((field) => `q${question.id}_${field.id}`);
  }
  return [`q${question.id}`];
}

function isRequired(question: DiagnosticQuestion): boolean {
  return question.required !== false;
}

function questionAnswered(question: DiagnosticQuestion, answers: Answers): boolean {
  if (!isRequired(question)) return true;
  return fieldNamesFor(question).every((name) => (answers[name] ?? "").trim() !== "");
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
  const stepHeadingRef = useRef<HTMLParagraphElement>(null);
  const advanceTimer = useRef<number | null>(null);
  const started = useRef(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);

  const { contact, thankYou, stageNote, netlifyFormName } = diagnostic;
  const questionFieldNames = questions.flatMap(fieldNamesFor);
  const contactFieldNames = contact.fields.map((field) => field.id);
  const allFieldNames = [...questionFieldNames, ...contactFieldNames];

  /* Stepper: one screen per question, then the contact step. */
  const isStepper = mode === "stepper";
  const contactStep = questions.length;
  const onContactStep = step === contactStep;
  const currentQuestion = onContactStep ? null : questions[step];

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  /* Announce each new screen and clear any pending auto-advance. */
  useEffect(() => {
    if (!isStepper) return;
    if (step > 0) stepHeadingRef.current?.focus();
    return () => {
      if (advanceTimer.current !== null) {
        window.clearTimeout(advanceTimer.current);
        advanceTimer.current = null;
      }
    };
  }, [isStepper, step]);

  const set = (name: string, value: string) => {
    if (!started.current && value.trim() !== "") {
      started.current = true;
      track(START_EVENT);
    }
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const advance = () => {
    track(STEP_EVENT, { step: step + 1 });
    setStep((s) => Math.min(s + 1, contactStep));
  };

  const next = () => {
    if (formRef.current?.reportValidity()) advance();
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const choose = (name: string, value: string) => {
    set(name, value);
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      advance();
    }, AUTO_ADVANCE_MS);
  };

  const send = async () => {
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isStepper && !onContactStep) {
      next();
      return;
    }
    void send();
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

  const contactComplete = contact.fields.every(
    (field) => !field.required || (answers[field.id] ?? "").trim() !== "",
  );

  const errorMessage = status === "error" && (
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
  );

  const contactFields = (
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

  if (isStepper) {
    const showNext = currentQuestion !== null && currentQuestion.kind !== "single";
    const canAdvance = currentQuestion !== null && questionAnswered(currentQuestion, answers);

    return (
      <form
        ref={formRef}
        className="diagnostic stepper"
        name={netlifyFormName}
        method="POST"
        action={FORM_ENDPOINT}
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value={netlifyFormName} />
        <p className="diagnostic__note">{stageNote}</p>

        <div className="stepper__header">
          {step > 0 && (
            <button type="button" className="button stepper__back" onClick={back}>
              {diagnostic.backLabel}
            </button>
          )}
          <p className="stepper__progress" ref={stepHeadingRef} tabIndex={-1} aria-live="polite">
            {onContactStep
              ? diagnostic.lastStepLabel
              : fill(diagnostic.progressLabel, { current: step + 1, total: questions.length })}
          </p>
        </div>

        {currentQuestion !== null && currentQuestion.kind === "single" && (
          <ChoiceStep
            uid={uid}
            question={currentQuestion}
            value={answers[`q${currentQuestion.id}`]}
            onChoose={(value) => choose(`q${currentQuestion.id}`, value)}
          />
        )}
        {currentQuestion !== null && currentQuestion.kind !== "single" && (
          <QuestionField
            uid={uid}
            question={currentQuestion}
            answers={answers}
            set={set}
            onEnter={next}
            autoFocus
          />
        )}
        {onContactStep && contactFields}

        {showNext && (
          <div className="stepper__actions">
            <button type="submit" className="button button--primary" disabled={!canAdvance}>
              {diagnostic.nextLabel}
            </button>
          </div>
        )}
        {onContactStep && (
          <div className="stepper__actions">
            <button
              type="submit"
              className="button button--primary"
              disabled={!contactComplete || status === "submitting"}
            >
              {contact.submitLabel}
            </button>
          </div>
        )}

        {errorMessage}
      </form>
    );
  }

  return (
    <form
      ref={formRef}
      className="diagnostic"
      name={netlifyFormName}
      method="POST"
      action={FORM_ENDPOINT}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={netlifyFormName} />
      <p className="diagnostic__note">{stageNote}</p>
      {questions.map((question) => (
        <QuestionField key={question.id} uid={uid} question={question} answers={answers} set={set} />
      ))}
      {contactFields}
      <div className="form__actions">
        <button type="submit" className="button button--primary" disabled={status === "submitting"}>
          {contact.submitLabel}
        </button>
      </div>
      {errorMessage}
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

/**
 * Stepper screen for a single-choice question. Options are a radio group
 * with roving focus: arrow keys move between options without selecting,
 * Space or Enter (or a tap) selects, and selecting advances the wizard.
 */
function ChoiceStep({
  uid,
  question,
  value,
  onChoose,
}: {
  uid: string;
  question: DiagnosticQuestion;
  value: string | undefined;
  onChoose: (value: string) => void;
}) {
  const options = question.options ?? [];
  const groupRef = useRef<HTMLDivElement>(null);
  const labelId = `${uid}-q${question.id}-label`;
  const focusIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value),
  );

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let target: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") target = (index + 1) % options.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") target = (index - 1 + options.length) % options.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = options.length - 1;
    if (target === null) return;
    event.preventDefault();
    const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>("[role=radio]");
    buttons?.[target]?.focus();
  };

  return (
    <div className="question">
      <p id={labelId} className={["question__label", mutedClass(question.prompt)].filter(Boolean).join(" ")}>
        {question.prompt}
      </p>
      <div ref={groupRef} role="radiogroup" aria-labelledby={labelId} className="choice">
        {options.map((option, index) => {
          const checked = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={index === focusIndex ? 0 : -1}
              className="choice__option"
              onClick={() => onChoose(option.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** A question rendered with native controls (form mode, and Q5 / Q10 in the stepper). */
function QuestionField({
  uid,
  question,
  answers,
  set,
  onEnter,
  autoFocus = false,
}: {
  uid: string;
  question: DiagnosticQuestion;
  answers: Answers;
  set: (name: string, value: string) => void;
  onEnter?: () => void;
  autoFocus?: boolean;
}) {
  const promptClass = mutedClass(question.prompt);
  const required = isRequired(question);

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
                    required={required}
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
          {(question.fields ?? []).map((field, index) => {
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
                  required={required}
                  autoFocus={autoFocus && index === 0}
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
        required={required}
        rows={3}
        autoFocus={autoFocus}
        value={answers[name] ?? ""}
        onChange={(e) => set(name, e.target.value)}
        onKeyDown={(e) => {
          if (onEnter && e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onEnter();
          }
        }}
      />
    </div>
  );
}
