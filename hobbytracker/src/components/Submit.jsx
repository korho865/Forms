'use client';
import { useFormStatus } from 'react-dom';

export default function Submit({ action_text, pending_text }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? pending_text : action_text}
    </button>
  );
}
