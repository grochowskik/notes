'use client';

import { useNotesList } from '@/core/api/notes/hooks';
import { Section, Table } from '@/ui';

export function NotesSection() {
  const { data } = useNotesList();
  return (
    <Section title="Notes">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Version</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.notes.map((note) => (
            <Table.Row key={note.id}>
              <Table.Cell>{note.title}</Table.Cell>
              <Table.Cell>{note.content}</Table.Cell>
              <Table.Cell>{note.version}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  );
}
