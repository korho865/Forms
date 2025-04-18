'use client';
import { useOptimistic, useActionState } from 'react';
import { useHobbyTracker } from '../context/HobbyTrackerContext';
import AddHobbyForm from './AddHobbyForm';
import DeleteForm from './DeleteForm';

export default function HobbyTracker() {
  const { hobbies, addHobby, deleteHobbies } = useHobbyTracker();

  const [optimisticHobbies, setHobbiesOptimistically] = useOptimistic(
    hobbies,
    (prev, next) => [...prev, next]
  );

  const [addState, addAction] = useActionState(async (_, formData) => {
    if (!formData) return { errors: ['Missing form data'], enteredValues: {} };

    const hobby = {
      hobbyName: formData.get('hobbyName')?.trim() || '',
      description: formData.get('description')?.trim() || '',
      skillLevel: formData.get('skillLevel') || 'Beginner',
    };

    const errors = [];
    if (hobby.hobbyName.length < 3) errors.push('Hobby name must be at least 3 characters.');
    if (hobby.description.length < 5) errors.push('Description must be at least 5 characters.');

    if (errors.length > 0) return { errors, enteredValues: hobby };

    setHobbiesOptimistically(hobby);
    const result = await addHobby(hobby);

    if (!result.success) {
      return { errors: [result.error], enteredValues: hobby };
    }

    return {};
  }, null);

  const [_, deleteAction] = useActionState(async () => {
    await deleteHobbies();
    return {};
  }, null);

  return (
    <>
      <AddHobbyForm formAction={addAction} />
      <DeleteForm formAction={deleteAction} />
      <h2>Hobby List</h2>
      <ul>
        {optimisticHobbies.map((hobby, i) => (
          <li key={i}>
            <strong>{hobby.hobbyName}</strong> ({hobby.skillLevel}) – {hobby.description}
          </li>
        ))}
      </ul>
    </>
  );
}
