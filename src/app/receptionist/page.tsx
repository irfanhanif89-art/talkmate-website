import { redirect } from 'next/navigation'

// /receptionist is a parent of /receptionist/[slug] but doesn't have its
// own content. Send anyone who lands here to the homepage's team section.
export default function ReceptionistIndex() {
  redirect('/#team')
}
