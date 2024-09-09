import { redirect } from 'next/navigation';

export default function Builder() {
  redirect(`/builder/appearance`); // Navigate to the new post page
}
