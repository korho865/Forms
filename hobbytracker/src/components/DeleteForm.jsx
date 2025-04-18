'use client';
import Submit from './Submit';

export default function DeleteForm({ formAction }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formAction(formData);
    }}>
      <Submit action_text="Delete All Hobbies" pending_text="Deleting..." />
    </form>
  );
}
