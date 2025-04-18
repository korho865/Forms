'use client';
import { useActionState, startTransition } from 'react';
import Submit from './Submit';

export default function AddHobbyForm({ formAction }) {
  const [state, dispatch] = useActionState(formAction, null);
  const errors = state?.errors || [];
  const entered = state?.enteredValues || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      dispatch(formData); // ✅ manually trigger it for Vite
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Hobby name:
        <input name="hobbyName" defaultValue={entered.hobbyName || ''} />
      </label>
      <br />
      <label>
        Description:
        <input name="description" defaultValue={entered.description || ''} />
      </label>
      <br />
      <label>
        Skill level:
        <select name="skillLevel" defaultValue={entered.skillLevel || 'Beginner'}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </label>
      <br />
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
      <Submit action_text="Add Hobby" pending_text="Adding..." />
    </form>
  );
}
